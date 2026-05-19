import EmbeddedPostgres from 'embedded-postgres';
import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '..', '.pgdata');
const isInitialized = fs.existsSync(path.join(dataDir, 'PG_VERSION'));

async function isRunning() {
  const probe = new pg.Client({
    host: 'localhost',
    port: 5433,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres',
    connectionTimeoutMillis: 2000,
  });
  try {
    await probe.connect();
    await probe.end();
    return true;
  } catch {
    return false;
  }
}

if (await isRunning()) {
  console.log('Embedded Postgres already running on localhost:5433 (db: fan_platform)');
  process.exit(0);
}

const server = new EmbeddedPostgres({
  databaseDir: dataDir,
  user: 'postgres',
  password: 'postgres',
  port: 5433,
  persistent: true,
});

if (!isInitialized) {
  await server.initialise();
}

await server.start();

const admin = new pg.Client({
  host: 'localhost',
  port: 5433,
  user: 'postgres',
  password: 'postgres',
  database: 'postgres',
});
await admin.connect();
const exists = await admin.query(
  "SELECT 1 FROM pg_database WHERE datname = 'fan_platform'",
);
if (!exists.rows.length) {
  await admin.query('CREATE DATABASE fan_platform');
}
await admin.end();

console.log('Embedded Postgres running on localhost:5433 (db: fan_platform)');

process.on('SIGINT', async () => {
  await server.stop();
  process.exit(0);
});
