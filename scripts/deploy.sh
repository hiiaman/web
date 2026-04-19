#!/usr/bin/env bash
# =============================================================================
# Zommie — Native Deploy: Web
# =============================================================================
# Run on the server to pull latest web code, rebuild, and reload Nginx.
#
# Usage:
#   ./scripts/deploy.sh [OPTIONS]
#
# Options:
#   --skip-pull   Skip git pull (use current local code)
#
# Example:
#   ./scripts/deploy.sh
#   ./scripts/deploy.sh --skip-pull
# =============================================================================

set -euo pipefail

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
BLUE='\033[0;34m'; BOLD='\033[1m'; RESET='\033[0m'

log()  { echo -e "${BLUE}[web-deploy]${RESET} $*"; }
ok()   { echo -e "${GREEN}[   ok     ]${RESET} $*"; }
warn() { echo -e "${YELLOW}[  warn    ]${RESET} $*"; }
die()  { echo -e "${RED}[  error   ]${RESET} $*" >&2; exit 1; }

WEB_DIR="/var/html/zommie/web"
SKIP_PULL=false

for arg in "$@"; do
    case $arg in
        --skip-pull) SKIP_PULL=true ;;
        *) die "Unknown option: $arg" ;;
    esac
done

[[ -d "$WEB_DIR" ]] || die "Web directory not found: $WEB_DIR"

echo ""
echo -e "${BOLD}=== Zommie Web Deploy ===${RESET}"
echo ""

# ── 1. Git pull ───────────────────────────────────────────────────────────────
if $SKIP_PULL; then
    warn "Skipping git pull (--skip-pull)."
else
    log "Pulling latest web code…"
    git -C "$WEB_DIR" pull --ff-only
    ok "Code: $(git -C "$WEB_DIR" rev-parse --short HEAD)"
fi

# ── 2. Install frontend deps ──────────────────────────────────────────────────
log "Installing frontend dependencies…"
cd "$WEB_DIR"
npm ci --silent
ok "npm deps installed."

# ── 3. Build ──────────────────────────────────────────────────────────────────
log "Building frontend…"
npm run build
ok "Frontend built → $WEB_DIR/dist"

# ── 4. Reload Nginx ───────────────────────────────────────────────────────────
log "Reloading Nginx…"
sudo nginx -t && sudo systemctl reload nginx
ok "Nginx reloaded."

echo ""
echo -e "${GREEN}${BOLD}Web deploy complete!${RESET}"
echo "  Commit: $(git -C "$WEB_DIR" rev-parse --short HEAD 2>/dev/null || echo 'n/a')"
echo "  Dist:   $WEB_DIR/dist"
echo ""
