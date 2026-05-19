# Enterprise-Grade Fan Commerce & Engagement Platform (Single-Tenant v1)

Principle: One Fan = One Identity = One Wallet = One Access.

## Quick Start (Dev)

Requirements: Docker, Node 20.

1. Copy env: `cp .env.example .env`
2. Start services: `docker compose up -d db redis`
3. Install backend deps: `cd backend && npm install`
4. Run backend: `npm run start:dev`
5. Test identity API:
   - Upsert: `curl -X POST http://localhost:3000/identity/upsert -H "Content-Type: application/json" -d '{"email":"test@example.com","phone":"+5511999999999"}'`
   - Link: `curl -X POST http://localhost:3000/identity/USER_ID/link -H "Content-Type: application/json" -d '{"provider":"ticketing","providerId":"ext-123"}'`
6. CDP ingest:
   - `curl -X POST http://localhost:3000/cdp/ingest -H "Content-Type: application/json" -d '{"userId":"USER_ID","type":"purchase","payload":{"amount":100}}'`

## Domains Implemented (V1 foundations)
- Identity (unified profile + provider links)
- CDP (event ingestion)

Other domains are scaffolded for future expansion per architecture.

## Environment Variables
See `.env.example` for required placeholders (GitHub tokens, LLM keys, AWS, DB, cache, WhatsApp provider, Voucherify, etc.).

## Notes
- TypeORM synchronize is enabled for development; switch to migrations for production.
- Modules are designed to be extracted into services in the future.
