# Service Merge Plan: file-service + problem-service + ai-service

## 1. Goal
Merge `file-service`, `problem-service`, and `ai-service` into a single service boundary for the shared feature set, while keeping current behavior stable and avoiding downtime/regressions.

## 2. Scope
In scope:
- Consolidate APIs, business logic, and data access paths used by the shared feature.
- Preserve existing API contracts (or provide compatibility layer).
- Keep existing client functionality working during transition.

Out of scope (for this merge):
- Unrelated feature rewrites.
- Broad UI redesign.
- Non-essential schema redesign.

## 3. Success Criteria
- All current flows work from client and gateway without functional regression.
- No increase in P1/P2 production errors after rollout.
- p95 latency remains within agreed threshold for merged endpoints.
- Rollback can be executed within minutes using a documented switch.

## 4. Current State Summary (Codebase-Verified)

### 4.1 Existing Endpoints
file-service (`backend/services/file-service`):
- GET `/api/files/` -> file tree for user.
- POST `/api/files/` -> create folder/file; if file, triggers problem creation in problem-service.
- PUT `/api/files/:id` -> update node; if name changed for file, updates problem title.
- DELETE `/api/files/:id` -> delete node and cascade delete in problem-service.

problem-service (`backend/services/problem-service`):
- GET `/api/problems/:fileId` -> find-or-create problem skeleton.
- POST `/api/problems/` -> create/upsert problem.
- PUT `/api/problems/:fileId` -> update metadata/solutions/analysis.
- DELETE `/api/problems/:fileId` -> soft delete.
- POST `/api/problems/import` -> import LeetCode problem data.

ai-service (`backend/services/ai-service`):
- POST `/api/ai/analyze` -> code complexity analysis.

### 4.2 Gateway Routing Today
Gateway (`backend/gateway/server.js`) routes:
- `/api/files` -> `FILE_SERVICE_URL` (default `http://file-service:5002`).
- `/api/problems` -> `PROBLEM_SERVICE_URL` (default `http://problem-service:5003`).
- `/api/ai` -> `AI_SERVICE_URL` (default `http://ai-service:5004`).

Gateway auth sets `x-user-id` for downstream services.

### 4.3 Cross-Service Call Chains
- File create flow: file-service POST creates file node, then calls problem-service POST.
- File rename flow: file-service PUT updates node, then calls problem-service PUT for title sync.
- File delete flow: file-service DELETE removes node, then calls problem-service DELETE.

These calls are currently axios HTTP calls from file-service to problem-service and are not transactional.

### 4.4 Data + Config Reality
- file-service and problem-service both use Postgres (`DATABASE_URL`) with Sequelize.
- ai-service is stateless (no DB model).
- file-service relies on `PROBLEM_SERVICE_URL` for cross-service calls.
- ai-service requires `OPENAI_API_KEY`.

### 4.5 External Consumers to Keep Stable
- youtube-playlist-service calls file-service and problem-service APIs.
- profile-analysis-service calls file-service APIs.

Backward-compatible paths must stay stable until these consumers are migrated or validated.

## 5. Target State (Recommended)
Create one merged deployable service, suggested as `backend/services/unified-service`, with three internal domains and shared infrastructure:
- Domain A: file
- Domain B: problem
- Domain C: ai
- Shared: config, DB, auth context, validation, logging, error handling

Target structure:
- `server.js` (single Express app)
- `src/domains/file/*`
- `src/domains/problem/*`
- `src/domains/ai/*`
- `src/shared/*`
- `src/config/database.js` (single Sequelize instance)

Compatibility requirement:
- Keep route prefixes unchanged: `/api/files`, `/api/problems`, `/api/ai`.
- Replace internal file->problem axios calls with in-process domain/service calls.

## 6. Merge Strategy
Use Strangler + Compatibility-first approach:
1. Add merged internal modules in parallel.
2. Keep old routes active.
3. Switch traffic gradually via feature flag or gateway routing toggle.
4. Remove old paths only after parity and soak period.

Additional safeguards for this codebase:
- Keep legacy services running in parallel during canary/soak window.
- Add consistency check job: file exists without problem, and problem exists without file.
- Add retry + alerting around file->problem propagation logic during transition.

## 7. Work Plan (Tasks and Subtasks)

### Phase 0 - Discovery and Contract Freeze
- [x] Inventory all endpoints for file/problem/ai services.
  - [x] Capture method, path, request/response schema, auth requirements.
  - [x] Identify cross-service call chains between these 3 services.
- [ ] Freeze API contracts for merge window.
  - [ ] Mark allowed changes as additive-only.
  - [ ] Publish deprecation policy for any planned path moves.
- [ ] Define non-functional baselines.
  - [ ] Current error rates.
  - [ ] Current latency and throughput.
  - [ ] Baseline file->problem propagation failure rate.
  - [ ] Baseline AI analyze latency/error rate.

Deliverables:
- Endpoint inventory document.
- Contract freeze note.

### Phase 1 - Architecture and Design
- [ ] Decide merged service package structure.
  - [ ] `src/domains/file/*` (from file-service).
  - [ ] `src/domains/problem/*` (from problem-service).
  - [ ] `src/domains/ai/*` (from ai-service).
  - [ ] `src/shared/*` for middleware/utilities.
- [ ] Define unified error/response format.
  - [ ] Standard error codes.
  - [ ] Correlation/request ID propagation.
- [ ] Define data access strategy.
  - [ ] Reuse existing models first.
  - [ ] Resolve duplicate DB config/connection management into one Sequelize init.
  - [ ] Decide transaction strategy for file create/update/delete + problem sync.
- [ ] Define route compatibility layer.
  - [ ] Keep old service route prefixes mapped to new handlers.
  - [ ] Validate compatibility for youtube-playlist-service and profile-analysis-service callers.

Deliverables:
- HLD/LLD for merged service.
- Routing compatibility map.

### Phase 2 - Foundation Setup (No Behavior Change)
- [ ] Scaffold merged service folder/module.
- [ ] Add shared middleware in merged service.
  - [ ] auth/context middleware
  - [ ] validation middleware
  - [ ] centralized error handler
  - [ ] logging + request IDs
- [ ] Add health/readiness endpoints.
- [ ] Add consistency endpoint (optional protected): file/problem linkage health.
- [ ] Add config parity with existing env vars.
  - [ ] `DATABASE_URL`
  - [ ] `OPENAI_API_KEY`
  - [ ] `CLERK_SECRET_KEY` (if validated in merged service)

Safety checks:
- [ ] Existing services still run unchanged.
- [ ] Merged service boots in local/dev.

### Phase 3 - Domain Migration: File
- [ ] Move/copy file-domain controllers/routes/models into merged structure.
- [ ] Keep existing path contracts through compatibility routes.
- [ ] Replace axios calls to problem-service with internal service calls.
- [ ] Preserve current behavior when problem sync fails (log + non-blocking) for initial parity.
- [ ] Add unit tests for moved file logic.
- [ ] Add integration tests for key file flows.
  - [ ] create file -> problem auto-created
  - [ ] rename file -> problem title updated
  - [ ] delete file -> problem deleted/soft-deleted

Exit criteria:
- [ ] File-domain routes in merged service pass parity tests.

### Phase 4 - Domain Migration: Problem
- [ ] Move/copy problem-domain controllers/routes/services/models.
- [ ] Validate imports and DB dependencies.
- [ ] Add parity tests for problem APIs.
- [ ] Ensure import flows and edge cases work.
  - [ ] verify find-or-create behavior of GET `/api/problems/:fileId`
  - [ ] verify nested response shape remains unchanged for client

Exit criteria:
- [ ] Problem-domain routes in merged service pass parity tests.

### Phase 5 - Domain Migration: AI
- [ ] Move/copy ai-domain controllers/routes/services.
- [ ] Keep ai domain stateless and isolated from DB.
- [ ] Preserve timeout/retry/guardrails for AI operations.
- [ ] Add AI flow integration tests with mocks/stubs for external providers.
  - [ ] verify `/api/ai/analyze` request/response compatibility

Exit criteria:
- [ ] AI-domain routes in merged service pass parity tests.

### Phase 6 - Cross-Domain Integration Hardening
- [ ] Validate end-to-end flows touching file + problem + ai together.
- [ ] Remove duplicated utility logic and conflicting middleware.
- [ ] Ensure transaction boundaries/idempotency where needed.
- [ ] Verify authorization consistency across all merged routes.
- [ ] Add orphan detector and repair script for file/problem inconsistencies.
- [ ] Validate external callers (youtube-playlist-service, profile-analysis-service) against merged routes.

Exit criteria:
- [ ] Full E2E shared feature regression suite passes.

### Phase 7 - Gateway and Traffic Migration
- [ ] Add routing toggle in gateway (old services vs merged service).
- [ ] Deploy merged service dark (no traffic) and run smoke checks.
- [ ] Canary rollout:
  - [ ] 5% traffic
  - [ ] 25% traffic
  - [ ] 50% traffic
  - [ ] 100% traffic
- [ ] Monitor errors, latency, saturation at each step.
  - [ ] Monitor file/problem consistency mismatches.

Rollback criteria:
- [ ] Error spike threshold exceeded.
- [ ] Latency threshold exceeded.
- [ ] Critical flow failures detected.
- [ ] Consistency mismatch threshold exceeded.

### Phase 8 - Decommission and Cleanup
- [ ] Keep compatibility routes for agreed deprecation window.
- [ ] Remove old direct service routing after window ends.
- [ ] Archive/deprecate redundant service code and Docker configs.
- [ ] Update runbooks, architecture docs, onboarding docs.
- [ ] Remove file-service -> problem-service URL dependency and related axios wiring.

## 8. Testing Plan
- Unit tests:
  - domain-level logic for file/problem/ai.
- Contract tests:
  - old vs merged route response parity.
- Integration tests:
  - DB-backed API tests per domain.
- E2E tests:
  - critical user scenarios using all three domains.
- Non-functional tests:
  - load test merged hot endpoints.
  - resilience tests for timeout/retry behavior.

## 9. Observability and Operations
- Metrics:
  - request count, p95/p99 latency, error rate, timeout count.
- Logs:
  - structured logs with request ID and user/context identifiers.
- Tracing:
  - domain span visibility for file/problem/ai calls.
- Alerts:
  - SLO breach alerts during rollout window.

## 10. Risk Register and Mitigation
- Risk: Hidden contract drift.
  - Mitigation: contract tests + compatibility routes.
- Risk: DB contention or connection pool issues.
  - Mitigation: pooled connection tuning + load testing.
- Risk: Non-transactional file->problem propagation can create inconsistencies.
  - Mitigation: transaction or compensating actions, orphan detector, retries.
- Risk: External consumers break due to subtle response differences.
  - Mitigation: caller-level regression tests for youtube-playlist-service and profile-analysis-service.
- Risk: AI latency regressions.
  - Mitigation: timeout budgets + circuit breakers + response size limits.
- Risk: Authorization inconsistencies.
  - Mitigation: centralized auth middleware + permission regression tests.

## 11. Rollback Plan
- Keep old services live until full rollout stability window is complete.
- Rollback switch in gateway to route 100% back to legacy services.
- Preserve backward-compatible schemas and avoid destructive migrations during initial rollout.
- Maintain rollback runbook with owner and on-call contacts.

## 12. Ownership and Tracking Template
- Tech lead:
- Domain owners:
  - File:
  - Problem:
  - AI:
- QA owner:
- DevOps owner:
- Target milestones:
  - M1 Discovery freeze:
  - M2 File migration done:
  - M3 Problem migration done:
  - M4 AI migration done:
  - M5 Canary complete:
  - M6 Legacy decommission:

## 13. Definition of Done
- [ ] All phase exit criteria completed.
- [ ] No Sev-1/Sev-2 incidents attributable to merge for agreed soak period.
- [ ] Documentation and runbooks updated.
- [ ] Team sign-off from backend, QA, and DevOps.
