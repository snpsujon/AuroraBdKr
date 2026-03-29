#!/usr/bin/env bash
# Push files that Git does NOT track so the server matches your dev PC.
# After: git push on dev -> git pull on server -> run this FROM DEV (or copy files any way you prefer).
#
# Usage:
#   ./scripts/sync-dev-to-server.sh user@myserver.com:/var/www/AuroraBdKr
#   ./scripts/sync-dev-to-server.sh user@myserver.com:/var/www/AuroraBdKr --with-uploads
#
# Requires: rsync and SSH access (WSL, Linux, or macOS; on Windows use WSL or install rsync).

set -euo pipefail

if ! command -v rsync >/dev/null 2>&1; then
  echo "rsync not found. Install it (e.g. WSL: sudo apt install rsync) or copy these files manually:"
  echo "  docker/projects.state.json"
  echo "  clients/aurora-skincare/.env"
  exit 1
fi

DEST="${1:?Usage: $0 user@host:/path/to/AuroraBdKr [--with-uploads]}"
WITH_UPLOADS=false
if [[ "${2:-}" == "--with-uploads" ]]; then
  WITH_UPLOADS=true
fi

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${ROOT}"

echo "Syncing from: ${ROOT}"
echo "Destination:   ${DEST}"
echo ""

if [[ -f docker/projects.state.json ]]; then
  rsync -avz docker/projects.state.json "${DEST}/docker/"
else
  echo "Skip: docker/projects.state.json (not found locally — publish will ask domain/port on server)."
fi

if [[ -f clients/aurora-skincare/.env ]]; then
  rsync -avz clients/aurora-skincare/.env "${DEST}/clients/aurora-skincare/"
else
  echo "ERROR: clients/aurora-skincare/.env missing locally."
  exit 1
fi

if [[ "${WITH_UPLOADS}" == true ]]; then
  if [[ -d clients/aurora-skincare/public/uploads ]]; then
    rsync -avz clients/aurora-skincare/public/uploads/ "${DEST}/clients/aurora-skincare/public/uploads/"
  else
    echo "Skip: public/uploads (directory not found)."
  fi
fi

echo ""
echo "Done. On the server: git pull (if needed), ensure .env APP_URL matches production, then ./publish.sh"
