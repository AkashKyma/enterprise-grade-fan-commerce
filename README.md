# Enterprise-Grade Fan Commerce & Engagement Platform (Single-Tenant v1)

**Principle:** One Fan = One Identity = One Wallet = One Access.

## Quick Start (Dev)

**Requirements:** Node 20+. Docker is optional (see [Docker](#docker-optional) below).

### 1. Install dependencies

```bash
npm install
cd backend && npm install && cd ..
```

### 2. Environment

```bash
cp .env.example .env
```

Default database port is **5433** (embedded Postgres). Use **5432** if you run Postgres via Docker.

### 3. Run (three terminals)

| Terminal | Command | URL |
|----------|---------|-----|
| 1 — Database | `npm run db:start` | Postgres on `localhost:5433` |
| 2 — API | `npm run api:dev` | http://localhost:3000 |
| 3 — Web UI | `npm run web:dev` | http://localhost:8080 |

Open **http://localhost:8080** in your browser. The home page shows an **API connected** badge when the backend is running.

> **Windows without Docker:** `npm run db:start` uses [embedded-postgres](https://www.npmjs.com/package/embedded-postgres) and stores data in `backend/.pgdata/`.

### 4. Test the API

**Identity — upsert user**

```bash
curl -X POST http://localhost:3000/identity/upsert \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","phone":"+5511999999999"}'
```

**Identity — link provider**

```bash
curl -X POST http://localhost:3000/identity/USER_ID/link \
  -H "Content-Type: application/json" \
  -d '{"provider":"ticketing","providerId":"ext-123"}'
```

**CDP — ingest event**

```bash
curl -X POST http://localhost:3000/cdp/ingest \
  -H "Content-Type: application/json" \
  -d '{"userId":"USER_ID","type":"purchase","payload":{"amount":100}}'
```

**Health check**

```bash
curl http://localhost:3000/health
```

## URLs

| Service | URL | Description |
|---------|-----|-------------|
| Web UI | http://localhost:8080 | React app (Home, Profile, Membership, Ticketing, Loyalty) |
| API | http://localhost:3000 | NestJS REST API |
| API health | http://localhost:3000/health | Status and endpoint list |
| Postgres | `localhost:5433` (embedded) or `5432` (Docker) | Database `fan_platform` |

Visiting http://localhost:3000 in a browser redirects to the web UI.

## Docker (optional)

If you have Docker installed:

```bash
cp .env.example .env
# Set DB_PORT=5432 in .env
docker compose up -d db redis
npm run api:dev
npm run web:dev
```

## Domains Implemented (V1 foundations)

- **Identity** — unified profile + provider links
- **CDP** — event ingestion

Other domains (Membership, Ticketing, Loyalty, etc.) are scaffolded in the UI for future expansion.

## npm Scripts

| Script | Description |
|--------|-------------|
| `npm run db:start` | Start embedded Postgres (port 5433) |
| `npm run api:dev` | Start NestJS API in watch mode (port 3000) |
| `npm run web:dev` | Start React dev server (port 8080) |
| `npm run build` | Build frontend for production |

## Environment Variables

See `.env.example` for placeholders (GitHub tokens, LLM keys, AWS, DB, cache, WhatsApp provider, Voucherify, etc.).

| Variable | Default | Notes |
|----------|---------|-------|
| `DB_HOST` | `localhost` | |
| `DB_PORT` | `5433` | Use `5432` with Docker Compose |
| `DB_USER` | `postgres` | |
| `DB_PASSWORD` | `postgres` | |
| `DB_NAME` | `fan_platform` | |

## Troubleshooting

**`EADDRINUSE` on port 3000** — another process is using the port:

```powershell
netstat -ano | findstr ":3000"
Stop-Process -Id <PID> -Force
```

Use the **PID** from the last column, not the port number.

**API offline on the web UI** — ensure `npm run api:dev` is running in a separate terminal.

**Port 5432 conflicts on Windows** — Cursor or another tool may use 5432. Keep `DB_PORT=5433` and use `npm run db:start`.

## Notes

- TypeORM `synchronize` is enabled for development; switch to migrations for production.
- Modules are designed to be extracted into services in the future.
