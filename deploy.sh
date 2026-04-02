#!/usr/bin/env bash
set -euo pipefail

# One-command deploy for local, unpushed changes.
# Usage:
#   DEPLOY_HOST=ec2-xx-xx-xx-xx.compute.amazonaws.com DEPLOY_USER=ubuntu ./deploy.sh
#
# Optional environment variables:
#   DEPLOY_PORT=22
#   DEPLOY_PATH=/opt/algonote
#   SSH_KEY=~/.ssh/my-key.pem
#   SKIP_FRONTEND_BUILD=true
#   SYNC_ENV=true
#
# Notes:
# - This script syncs your local working tree directly to the server (no Git push required).
# - By default it does NOT sync .env to avoid overwriting server secrets.

DEPLOY_HOST="${DEPLOY_HOST:-}"
DEPLOY_USER="${DEPLOY_USER:-ubuntu}"
DEPLOY_PORT="${DEPLOY_PORT:-22}"
DEPLOY_PATH="${DEPLOY_PATH:-/opt/algonote}"
SSH_KEY="${SSH_KEY:-}"
SKIP_FRONTEND_BUILD="${SKIP_FRONTEND_BUILD:-false}"
SYNC_ENV="${SYNC_ENV:-false}"

if [[ -z "$DEPLOY_HOST" ]]; then
  echo "Error: DEPLOY_HOST is required."
  echo "Example: DEPLOY_HOST=ec2-xx-xx-xx-xx.compute.amazonaws.com DEPLOY_USER=ubuntu ./deploy.sh"
  exit 1
fi

for cmd in ssh rsync docker npm; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "Error: required command '$cmd' not found in PATH."
    exit 1
  fi
done

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

SSH_OPTS=("-p" "$DEPLOY_PORT" "-o" "StrictHostKeyChecking=accept-new")
if [[ -n "$SSH_KEY" ]]; then
  SSH_OPTS+=("-i" "$SSH_KEY")
fi

REMOTE="${DEPLOY_USER}@${DEPLOY_HOST}"

echo "==> Deploy target: ${REMOTE}:${DEPLOY_PATH}"

if [[ "$SKIP_FRONTEND_BUILD" != "true" ]]; then
  echo "==> Building frontend (client/dist)..."
  npm --prefix "$ROOT_DIR/client" run build
else
  echo "==> Skipping frontend build"
fi

echo "==> Ensuring remote deploy path exists..."
ssh "${SSH_OPTS[@]}" "$REMOTE" "mkdir -p '$DEPLOY_PATH'"

echo "==> Syncing project files to remote..."
RSYNC_EXCLUDES=(
  "--exclude=.git"
  "--exclude=.github"
  "--exclude=node_modules"
  "--exclude=**/node_modules"
  "--exclude=.DS_Store"
  "--exclude=*.log"
  "--exclude=.env"
)

if [[ "$SYNC_ENV" == "true" ]]; then
  RSYNC_EXCLUDES=(
    "--exclude=.git"
    "--exclude=.github"
    "--exclude=node_modules"
    "--exclude=**/node_modules"
    "--exclude=.DS_Store"
    "--exclude=*.log"
  )
fi

rsync -az --delete "${RSYNC_EXCLUDES[@]}" \
  "$ROOT_DIR/" "$REMOTE:$DEPLOY_PATH/"

echo "==> Running remote Docker deployment..."
ssh "${SSH_OPTS[@]}" "$REMOTE" "bash -lc '
  set -euo pipefail
  cd \"$DEPLOY_PATH\"

  echo "🚀 Rebuilding containers..."
  docker compose up -d --build --remove-orphans

  echo "🧹 Cleaning unused Docker images..."
  docker system prune -f

  echo "⏳ Waiting for services..."
  sleep 5

  echo "📦 Container status:"
  docker compose ps

  echo "📜 Recent logs:"
  docker compose logs --tail=50
'"

echo "==> Deploy completed successfully"
