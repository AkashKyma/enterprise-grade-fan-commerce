import pg from 'pg';

const client = new pg.Client({
  host: 'localhost',
  port: 5433,
  user: 'postgres',
  password: 'postgres',
  database: 'postgres',
});

await client.connect();
const exists = await client.query(
  "SELECT 1 FROM pg_database WHERE datname = 'fan_platform'",
);
if (!exists.rows.length) {
  await client.query('CREATE DATABASE fan_platform');
  console.log('Created database fan_platform');
} else {
  console.log('Database fan_platform already exists');
}
await client.end();
