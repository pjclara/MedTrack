#!/usr/bin/env bash
# =============================================================================
# deploy.sh — Deploy para Hostinger (medtrack.click)
# Uso: bash deploy.sh [--no-migrate]
# =============================================================================

set -euo pipefail

# ---------------------------------------------------------------------------
# Configuração
# ---------------------------------------------------------------------------
REMOTE_USER="u854694057"
REMOTE_HOST="145.79.20.9"
REMOTE_PORT="65002"
APP_DIR="/home/${REMOTE_USER}/domains/medtrack.click/MedTrack"
PUBLIC_HTML="/home/${REMOTE_USER}/domains/medtrack.click/public_html"
SSH_KEY=""   # caminho para chave SSH, ex: ~/.ssh/id_hostinger (deixar vazio para agente padrão)

NO_MIGRATE=false
for arg in "$@"; do
    [[ "$arg" == "--no-migrate" ]] && NO_MIGRATE=true
done

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
SSH_OPTS="-p ${REMOTE_PORT} -o StrictHostKeyChecking=no -o BatchMode=yes"
[[ -n "$SSH_KEY" ]] && SSH_OPTS="${SSH_OPTS} -i ${SSH_KEY}"

ssh_run() {
    # shellcheck disable=SC2086
    ssh ${SSH_OPTS} "${REMOTE_USER}@${REMOTE_HOST}" "$@"
}

log()  { echo -e "\033[1;32m[DEPLOY]\033[0m $*"; }
err()  { echo -e "\033[1;31m[ERROR]\033[0m $*"; exit 1; }

# ---------------------------------------------------------------------------
# 1. Build local
# ---------------------------------------------------------------------------
log "Instalando dependências NPM..."
npm ci --silent

log "A compilar assets (npm run build)..."
npm run build

log "Assets compilados."

# ---------------------------------------------------------------------------
# 2. Upload da pasta build para o servidor
# ---------------------------------------------------------------------------
log "A enviar pasta build para o servidor..."
# shellcheck disable=SC2086
rsync -az --delete \
    -e "ssh ${SSH_OPTS}" \
    "public/build/" \
    "${REMOTE_USER}@${REMOTE_HOST}:${APP_DIR}/public/build/"

# ---------------------------------------------------------------------------
# 3. Comandos remotos
# ---------------------------------------------------------------------------
log "A executar comandos remotos..."
ssh_run bash -s << EOF
set -e
cd "${APP_DIR}"

echo "--- git pull ---"
git pull --ff-only

echo "--- Composer install (sem dev) ---"
composer install --no-dev --optimize-autoloader --no-interaction --quiet

echo "--- Modo de manutenção: ligar ---"
php artisan down --retry=60 --render="errors::503" || true

$(if [[ "$NO_MIGRATE" == false ]]; then
    echo 'echo "--- Migrações ---"'
    echo 'php artisan migrate --force --no-interaction'
fi)

echo "--- Cache de configuração, rotas e views ---"
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

echo "--- Wayfinder ---"
php artisan wayfinder:generate || true

echo "--- Reiniciar filas ---"
php artisan queue:restart || true

echo "--- Copiar build para public_html ---"
rm -rf "${PUBLIC_HTML}/build"
cp -r "${APP_DIR}/public/build" "${PUBLIC_HTML}/build"

echo "--- Permissões ---"
chmod -R 755 storage bootstrap/cache

echo "--- Modo de manutenção: desligar ---"
php artisan up

echo "--- Deploy concluído! ---"
EOF

log "Deploy concluído com sucesso! ✓"
