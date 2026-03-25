# Deployment Fix Tasks

Purpose: track and complete production-readiness fixes one by one.

Status legend:

- [ ] Not started
- [~] In progress
- [x] Done

## Phase 1: Security and Access Control (Critical)

- [x] T1. Remove hardcoded Postgres credentials from source code
  - Files:
    - backend/services/unified-service/src/config/database.js
    - backend/services/youtube-playlist-service/src/config/database.js
  - Done when:
    - App fails fast if DATABASE_URL is missing in production.
    - No credential fallback values remain in code.

- [x] T2. Disable insecure gateway fallback auth in production
  - File:
    - backend/gateway/server.js
  - Done when:
    - In production, service refuses to start without CLERK_SECRET_KEY.
    - Dev fallback can only run in explicit development mode.

- [x] T3. Add user scoping for playlist sheets and problems
  - Files:
    - backend/services/youtube-playlist-service/src/models/LearningSheet.js
    - backend/services/youtube-playlist-service/src/models/SheetProblem.js
    - backend/services/youtube-playlist-service/src/controllers/playlistController.js
  - Done when:
    - Every sheet/problem is tied to userId.
    - Read/update/delete endpoints filter by userId.

- [x] T4. Fix profile revision ownership checks
  - Files:
    - backend/services/profile-analysis-service/src/controllers/profileController.js
    - backend/services/profile-analysis-service/src/routes/profileRoutes.js
  - Done when:
    - Revisions are fetched/deleted only for authenticated user.
    - ID-only deletion without ownership check is removed.

## Phase 2: Data Safety and Startup Stability (High)

- [x] T5. Replace sequelize sync alter in runtime with safe strategy
  - Files:
    - backend/services/unified-service/server.js
    - backend/services/youtube-playlist-service/server.js
  - Done when:
    - No sequelize.sync({ alter: true }) in production startup path.
    - Startup uses non-destructive sync or migration flow.

- [x] T6. Replace sleep-based startup ordering in compose
  - File:
    - docker-compose.yml
  - Done when:
    - Healthchecks are added.
    - depends_on uses health conditions where needed.

- [x] T7. Remove sensitive URI logging
  - File:
    - backend/services/profile-analysis-service/server.js
  - Done when:
    - Logs do not print full MONGO_URI.

## Phase 3: Reliability and Ops Readiness (Medium)

- [x] T8. Add startup environment validation
  - Scope:
    - gateway, unified-service, youtube-playlist-service, profile-analysis-service
  - Done when:
    - Missing required env vars produce clear startup errors.

- [x] T9. Update docs to match current architecture
  - Files:
    - README.md
    - REVISION.md (if needed)
  - Done when:
    - Docs describe unified-service based architecture.
    - Outdated services (file-service/problem-service/ai-service) are removed from setup steps.

- [x] T10. Reduce frontend production bundle size warning
  - Files:
    - client/vite.config.js
    - client/src/\*\*
  - Done when:
    - Main bundle reduced by code splitting where practical.
    - Build warning impact is documented if still present.

## Execution Order

1. T1
2. T2
3. T3
4. T4
5. T5
6. T6
7. T7
8. T8
9. T9
10. T10

## Current Focus

- Next task to start: Completed all listed tasks
