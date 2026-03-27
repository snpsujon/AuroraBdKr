#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="${SCRIPT_DIR}/docker/projects.json"
STATE_FILE="${SCRIPT_DIR}/docker/projects.state.json"

SELECTED_PROJECT_ID=""

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1"
    exit 1
  fi
}

ensure_json_files() {
  if [[ ! -f "${CONFIG_FILE}" ]]; then
    echo "Missing config file: ${CONFIG_FILE}"
    exit 1
  fi

  if [[ ! -f "${STATE_FILE}" ]]; then
    cat > "${STATE_FILE}" <<EOF
{
  "projects": {}
}
EOF
  fi
}

project_count() {
  jq -r '.projects | length' "${CONFIG_FILE}"
}

project_ids() {
  jq -r '.projects[].id' "${CONFIG_FILE}"
}

project_field() {
  local project_id="$1"
  local field="$2"
  jq -r --arg id "${project_id}" --arg field "${field}" \
    '.projects[] | select(.id == $id) | .[$field]' "${CONFIG_FILE}"
}

state_get() {
  local project_id="$1"
  local key="$2"
  jq -r --arg id "${project_id}" --arg key "${key}" \
    '.projects[$id][$key] // empty' "${STATE_FILE}"
}

state_set() {
  local project_id="$1"
  local key="$2"
  local value="$3"
  local tmp
  tmp="$(mktemp)"

  jq --arg id "${project_id}" --arg key "${key}" --arg value "${value}" \
    '.projects[$id] = (.projects[$id] // {}) | .projects[$id][$key] = $value' \
    "${STATE_FILE}" > "${tmp}"

  mv "${tmp}" "${STATE_FILE}"
}

is_valid_port() {
  local port="$1"
  [[ "${port}" =~ ^[0-9]+$ ]] && ((port >= 1 && port <= 65535))
}

get_project_port() {
  local project_id="$1"
  local state_port
  local default_port

  state_port="$(state_get "${project_id}" "port")"
  if [[ -n "${state_port}" ]]; then
    echo "${state_port}"
    return
  fi

  default_port="$(project_field "${project_id}" "default_port")"
  echo "${default_port}"
}

get_project_dev_port() {
  local project_id="$1"
  local dev_port_env
  local state_dev_port
  local default_dev_port

  dev_port_env="$(project_field "${project_id}" "dev_port_env")"
  if [[ -z "${dev_port_env}" || "${dev_port_env}" == "null" ]]; then
    echo ""
    return
  fi

  state_dev_port="$(state_get "${project_id}" "dev_port")"
  if [[ -n "${state_dev_port}" ]]; then
    echo "${state_dev_port}"
    return
  fi

  default_dev_port="$(project_field "${project_id}" "default_dev_port")"
  if [[ -z "${default_dev_port}" || "${default_dev_port}" == "null" ]]; then
    echo ""
    return
  fi
  echo "${default_dev_port}"
}

set_project_port() {
  local project_id="$1"
  local port="$2"

  if ! is_valid_port "${port}"; then
    echo "Invalid port: ${port}"
    return 1
  fi

  state_set "${project_id}" "port" "${port}"
}

get_project_domain() {
  local project_id="$1"
  state_get "${project_id}" "domain"
}

get_project_public_url() {
  local project_id="$1"
  local domain
  local port

  domain="$(get_project_domain "${project_id}")"
  port="$(get_project_port "${project_id}")"

  if [[ -n "${domain}" ]]; then
    echo "https://${domain}"
  else
    echo "http://localhost:${port}"
  fi
}

set_project_domain() {
  local project_id="$1"
  local domain="$2"
  state_set "${project_id}" "domain" "${domain}"
}

set_project_ssl_enabled() {
  local project_id="$1"
  local enabled="$2"
  state_set "${project_id}" "ssl_enabled" "${enabled}"
}

now_utc() {
  date -u +"%Y-%m-%dT%H:%M:%SZ"
}

setup_nginx_proxy() {
  local project_id="$1"
  local domain="$2"
  local port
  local site_name
  local conf_path
  local link_path

  port="$(get_project_port "${project_id}")"
  site_name="$(project_field "${project_id}" "nginx_site")"
  conf_path="/etc/nginx/sites-available/${site_name}.conf"
  link_path="/etc/nginx/sites-enabled/${site_name}.conf"

  sudo mkdir -p /etc/nginx/sites-available /etc/nginx/sites-enabled

  sudo tee "${conf_path}" >/dev/null <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${domain};

    client_max_body_size 150M;

    location / {
        proxy_pass http://127.0.0.1:${port};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_read_timeout 3600;
        proxy_send_timeout 3600;
    }
}
EOF

  sudo ln -sf "${conf_path}" "${link_path}"
  sudo nginx -t
  sudo systemctl reload nginx
}

has_ssl_certificate() {
  local domain="$1"
  [[ -f "/etc/letsencrypt/live/${domain}/fullchain.pem" ]]
}

setup_ssl_for_project() {
  local project_id="$1"
  local domain

  domain="$(get_project_domain "${project_id}")"
  if [[ -z "${domain}" ]]; then
    echo "No domain configured."
    return
  fi

  require_cmd certbot

  if has_ssl_certificate "${domain}"; then
    echo "SSL already exists for ${domain}."
    read -rp "Renew/reinstall this SSL now? (y/n): " renew_choice
    if [[ "${renew_choice}" =~ ^[Yy]$ ]]; then
      sudo certbot --nginx -d "${domain}"
      sudo systemctl reload nginx
      set_project_ssl_enabled "${project_id}" "true"
      state_set "${project_id}" "last_ssl_action_at" "$(now_utc)"
      echo "SSL renew/reinstall complete for ${domain}."
    fi
  else
    echo "No SSL found for ${domain}."
    read -rp "Create SSL with Certbot now? (y/n): " issue_choice
    if [[ "${issue_choice}" =~ ^[Yy]$ ]]; then
      sudo certbot --nginx -d "${domain}"
      sudo systemctl reload nginx
      set_project_ssl_enabled "${project_id}" "true"
      state_set "${project_id}" "last_ssl_action_at" "$(now_utc)"
      echo "SSL setup complete for ${domain}."
    fi
  fi

  state_set "${project_id}" "last_ssl_check_at" "$(now_utc)"
}

run_compose() {
  local project_id="$1"
  shift

  local compose_file
  local port_env
  local project_port
  local dev_port_env
  local project_dev_port
  local project_public_url
  local force_https

  compose_file="${SCRIPT_DIR}/$(project_field "${project_id}" "compose_file")"
  port_env="$(project_field "${project_id}" "port_env")"
  project_port="$(get_project_port "${project_id}")"
  dev_port_env="$(project_field "${project_id}" "dev_port_env")"
  project_dev_port="$(get_project_dev_port "${project_id}")"
  project_public_url="$(get_project_public_url "${project_id}")"
  if [[ "${project_public_url}" == https://* ]]; then
    force_https="On"
  else
    force_https="Off"
  fi

  if [[ ! -f "${compose_file}" ]]; then
    echo "Compose file not found: ${compose_file}"
    return 1
  fi

  if [[ -n "${dev_port_env}" && "${dev_port_env}" != "null" && -n "${project_dev_port}" ]]; then
    env "${port_env}=${project_port}" "${dev_port_env}=${project_dev_port}" "APP_URL=${project_public_url}" "ASSET_URL=${project_public_url}" "FORCE_HTTPS=${force_https}" docker compose \
      --project-directory "${SCRIPT_DIR}" \
      -f "${compose_file}" \
      "$@"
  else
    env "${port_env}=${project_port}" "APP_URL=${project_public_url}" "ASSET_URL=${project_public_url}" "FORCE_HTTPS=${force_https}" docker compose \
      --project-directory "${SCRIPT_DIR}" \
      -f "${compose_file}" \
      "$@"
  fi
}

configure_project_port() {
  local project_id="$1"
  local name
  local current_port
  local new_port

  name="$(project_field "${project_id}" "label")"
  current_port="$(get_project_port "${project_id}")"
  echo "Current proxy/app port for ${name}: ${current_port}"

  read -rp "Keep this port? (y/n): " keep_port
  if [[ "${keep_port}" =~ ^[Yy]$ ]]; then
    return 0
  fi

  while true; do
    read -rp "Enter new port for ${name}: " new_port
    if set_project_port "${project_id}" "${new_port}"; then
      echo "Saved port ${new_port} for ${name}."
      return 0
    fi
    echo "Please enter a valid port between 1 and 65535."
  done
}

configure_project_dev_port() {
  local project_id="$1"
  local name
  local dev_port_env
  local current_dev_port
  local new_dev_port

  name="$(project_field "${project_id}" "label")"
  dev_port_env="$(project_field "${project_id}" "dev_port_env")"
  if [[ -z "${dev_port_env}" || "${dev_port_env}" == "null" ]]; then
    return 0
  fi

  current_dev_port="$(get_project_dev_port "${project_id}")"
  if [[ -z "${current_dev_port}" ]]; then
    echo "No dev port configured for ${name} (${dev_port_env})."
  else
    echo "Current dev port for ${name} (${dev_port_env}): ${current_dev_port}"
  fi

  read -rp "Keep this dev port? (y/n): " keep_dev_port
  if [[ "${keep_dev_port}" =~ ^[Yy]$ ]]; then
    return 0
  fi

  while true; do
    read -rp "Enter new dev port for ${name}: " new_dev_port
    if is_valid_port "${new_dev_port}"; then
      state_set "${project_id}" "dev_port" "${new_dev_port}"
      echo "Saved dev port ${new_dev_port} for ${name}."
      return 0
    fi
    echo "Please enter a valid port between 1 and 65535."
  done
}

deploy_compose_project() {
  local project_id="$1"
  run_compose "${project_id}" up -d --build
}

configure_project_domain() {
  local project_id="$1"
  local name
  local domain

  name="$(project_field "${project_id}" "label")"
  domain="$(get_project_domain "${project_id}")"

  if [[ -z "${domain}" ]]; then
    echo "First-time init for ${name}."
    read -rp "Enter domain for ${name} (example: app.example.com): " domain
    if [[ -z "${domain}" ]]; then
      echo "Domain cannot be empty."
      return 1
    fi
    set_project_domain "${project_id}" "${domain}"
    return 0
  fi

  echo "Configured domain: ${domain}"
  read -rp "Keep current domain? (y/n): " keep_choice
  if [[ "${keep_choice}" =~ ^[Yy]$ ]]; then
    return 0
  fi

  read -rp "Enter new domain: " domain
  if [[ -z "${domain}" ]]; then
    echo "Domain cannot be empty."
    return 1
  fi
  set_project_domain "${project_id}" "${domain}"
}

manage_project_containers() {
  local action="$1"
  local project_id="$2"
  local name
  local default_service
  local service_input

  name="$(project_field "${project_id}" "label")"
  default_service="$(project_field "${project_id}" "default_service")"

  echo ""
  echo "Target project: ${name}"
  echo "Press Enter to target all services."
  echo "Default service: ${default_service}"
  read -rp "Enter service name (optional): " service_input

  case "${action}" in
    stop)
      if [[ -n "${service_input}" ]]; then
        run_compose "${project_id}" stop "${service_input}"
      else
        run_compose "${project_id}" stop
      fi
      echo "Stop completed for ${name}."
      ;;
    remove)
      read -rp "Remove with volumes too? (y/n): " remove_volumes
      if [[ -n "${service_input}" ]]; then
        run_compose "${project_id}" stop "${service_input}" || true
        run_compose "${project_id}" rm -f "${service_input}"
      else
        if [[ "${remove_volumes}" =~ ^[Yy]$ ]]; then
          run_compose "${project_id}" down --remove-orphans --volumes
        else
          run_compose "${project_id}" down --remove-orphans
        fi
      fi
      echo "Remove completed for ${name}."
      ;;
    status)
      run_compose "${project_id}" ps
      ;;
    *)
      echo "Unsupported action: ${action}"
      return 1
      ;;
  esac
}

select_project_menu() {
  local prompt="${1:-Select project: }"
  local idx
  local count
  local label
  local pid

  echo ""
  count="$(project_count)"
  for ((idx=0; idx<count; idx++)); do
    label="$(jq -r ".projects[${idx}].label" "${CONFIG_FILE}")"
    echo "$((idx + 1))) ${label}"
  done
  read -rp "${prompt}" choice

  if ! [[ "${choice}" =~ ^[0-9]+$ ]]; then
    echo "Invalid project selection."
    return 1
  fi

  idx=$((choice - 1))
  pid="$(jq -r ".projects[${idx}].id // empty" "${CONFIG_FILE}")"
  if [[ -z "${pid}" ]]; then
    echo "Invalid project selection."
    return 1
  fi

  SELECTED_PROJECT_ID="${pid}"
}

project_exists() {
  local project_id="$1"
  jq -e --arg id "${project_id}" '.projects[] | select(.id == $id)' "${CONFIG_FILE}" >/dev/null 2>&1
}

add_project_to_config() {
  local project_id
  local label
  local compose_file
  local default_service
  local nginx_site
  local port_env
  local default_port
  local dev_port_env
  local default_dev_port
  local tmp

  echo ""
  echo "Add New Project"
  echo "Example:"
  echo "  id: aurora-blog"
  echo "  label: Aurora Blog"
  echo "  compose_file: docker/compose/aurora-blog.yml"
  echo "  default_service: web"
  echo "  nginx_site: aurora-blog"
  echo "  port_env: APP_PORT"
  echo "  default_port: 8090"
  echo "  dev_port_env: DEV_PORT (optional)"
  echo "  default_dev_port: 4200 (optional)"
  echo ""

  read -rp "Project id (unique, lowercase-dash): " project_id
  if [[ -z "${project_id}" ]]; then
    echo "Project id cannot be empty."
    return 1
  fi
  if ! [[ "${project_id}" =~ ^[a-z0-9][a-z0-9-]*$ ]]; then
    echo "Invalid id format. Use lowercase letters, numbers, dashes."
    return 1
  fi
  if project_exists "${project_id}"; then
    echo "Project id already exists: ${project_id}"
    return 1
  fi

  read -rp "Project label: " label
  if [[ -z "${label}" ]]; then
    echo "Project label cannot be empty."
    return 1
  fi

  read -rp "Compose file path (from repo root): " compose_file
  if [[ -z "${compose_file}" ]]; then
    echo "Compose file path cannot be empty."
    return 1
  fi
  if [[ ! -f "${SCRIPT_DIR}/${compose_file}" ]]; then
    echo "Warning: compose file does not exist now: ${SCRIPT_DIR}/${compose_file}"
    read -rp "Continue anyway? (y/n): " continue_anyway
    if [[ ! "${continue_anyway}" =~ ^[Yy]$ ]]; then
      return 1
    fi
  fi

  read -rp "Default service name (e.g. web/api): " default_service
  if [[ -z "${default_service}" ]]; then
    echo "Default service cannot be empty."
    return 1
  fi

  read -rp "Nginx site key (e.g. aurora-blog): " nginx_site
  if [[ -z "${nginx_site}" ]]; then
    echo "Nginx site key cannot be empty."
    return 1
  fi

  read -rp "Port env variable name (e.g. APP_PORT/API_PORT): " port_env
  if [[ -z "${port_env}" ]]; then
    echo "Port env cannot be empty."
    return 1
  fi
  if ! [[ "${port_env}" =~ ^[A-Z_][A-Z0-9_]*$ ]]; then
    echo "Invalid env variable format."
    return 1
  fi

  read -rp "Default port: " default_port
  if ! is_valid_port "${default_port}"; then
    echo "Invalid default port."
    return 1
  fi

  read -rp "Dev port env variable (optional, e.g. DEV_PORT): " dev_port_env
  if [[ -n "${dev_port_env}" && ! "${dev_port_env}" =~ ^[A-Z_][A-Z0-9_]*$ ]]; then
    echo "Invalid dev env variable format."
    return 1
  fi

  if [[ -n "${dev_port_env}" ]]; then
    read -rp "Default dev port: " default_dev_port
    if ! is_valid_port "${default_dev_port}"; then
      echo "Invalid default dev port."
      return 1
    fi
  fi

  tmp="$(mktemp)"
  if [[ -n "${dev_port_env}" ]]; then
    jq \
      --arg id "${project_id}" \
      --arg label "${label}" \
      --arg compose_file "${compose_file}" \
      --arg default_service "${default_service}" \
      --arg nginx_site "${nginx_site}" \
      --arg port_env "${port_env}" \
      --arg dev_port_env "${dev_port_env}" \
      --argjson default_port "${default_port}" \
      --argjson default_dev_port "${default_dev_port}" \
      '.projects += [{
        id: $id,
        label: $label,
        compose_file: $compose_file,
        default_service: $default_service,
        nginx_site: $nginx_site,
        port_env: $port_env,
        default_port: $default_port,
        dev_port_env: $dev_port_env,
        default_dev_port: $default_dev_port
      }]' \
      "${CONFIG_FILE}" > "${tmp}"
  else
    jq \
      --arg id "${project_id}" \
      --arg label "${label}" \
      --arg compose_file "${compose_file}" \
      --arg default_service "${default_service}" \
      --arg nginx_site "${nginx_site}" \
      --arg port_env "${port_env}" \
      --argjson default_port "${default_port}" \
      '.projects += [{
        id: $id,
        label: $label,
        compose_file: $compose_file,
        default_service: $default_service,
        nginx_site: $nginx_site,
        port_env: $port_env,
        default_port: $default_port
      }]' \
      "${CONFIG_FILE}" > "${tmp}"
  fi
  mv "${tmp}" "${CONFIG_FILE}"

  state_set "${project_id}" "port" "${default_port}"
  if [[ -n "${default_dev_port:-}" ]]; then
    state_set "${project_id}" "dev_port" "${default_dev_port}"
  fi
  state_set "${project_id}" "domain" ""
  state_set "${project_id}" "ssl_enabled" "false"

  echo "Project added to config: ${project_id}"
}

is_project_up() {
  local project_id="$1"
  local output
  output="$(run_compose "${project_id}" ps -q 2>/dev/null || true)"
  [[ -n "${output//[[:space:]]/}" ]]
}

edit_project_config() {
  local project_id="$1"
  local current_label
  local current_compose_file
  local current_default_service
  local current_nginx_site
  local current_port_env
  local current_default_port
  local current_dev_port_env
  local current_default_dev_port
  local new_label
  local new_compose_file
  local new_default_service
  local new_nginx_site
  local new_port_env
  local new_default_port
  local new_dev_port_env
  local new_default_dev_port
  local tmp

  echo ""
  echo "Edit Project Config: ${project_id}"
  if is_project_up "${project_id}"; then
    read -rp "Project is currently UP. Down it now before editing? (y/n): " down_first
    if [[ ! "${down_first}" =~ ^[Yy]$ ]]; then
      echo "Edit cancelled. Please down the project first."
      return 1
    fi
    run_compose "${project_id}" down --remove-orphans
    echo "Project is down."
  else
    echo "Project is currently DOWN."
    read -rp "Run down command anyway for clean state? (y/n): " down_anyway
    if [[ "${down_anyway}" =~ ^[Yy]$ ]]; then
      run_compose "${project_id}" down --remove-orphans || true
    fi
  fi

  current_label="$(project_field "${project_id}" "label")"
  current_compose_file="$(project_field "${project_id}" "compose_file")"
  current_default_service="$(project_field "${project_id}" "default_service")"
  current_nginx_site="$(project_field "${project_id}" "nginx_site")"
  current_port_env="$(project_field "${project_id}" "port_env")"
  current_default_port="$(project_field "${project_id}" "default_port")"
  current_dev_port_env="$(project_field "${project_id}" "dev_port_env")"
  current_default_dev_port="$(project_field "${project_id}" "default_dev_port")"

  read -rp "Label [${current_label}]: " new_label
  new_label="${new_label:-${current_label}}"

  read -rp "Compose file [${current_compose_file}]: " new_compose_file
  new_compose_file="${new_compose_file:-${current_compose_file}}"

  read -rp "Default service [${current_default_service}]: " new_default_service
  new_default_service="${new_default_service:-${current_default_service}}"

  read -rp "Nginx site key [${current_nginx_site}]: " new_nginx_site
  new_nginx_site="${new_nginx_site:-${current_nginx_site}}"

  while true; do
    read -rp "Port env [${current_port_env}]: " new_port_env
    new_port_env="${new_port_env:-${current_port_env}}"
    if [[ "${new_port_env}" =~ ^[A-Z_][A-Z0-9_]*$ ]]; then
      break
    fi
    echo "Invalid env variable format."
  done

  while true; do
    read -rp "Default port [${current_default_port}]: " new_default_port
    new_default_port="${new_default_port:-${current_default_port}}"
    if is_valid_port "${new_default_port}"; then
      break
    fi
    echo "Invalid port."
  done

  if [[ "${current_dev_port_env}" == "null" ]]; then
    current_dev_port_env=""
  fi
  if [[ "${current_default_dev_port}" == "null" ]]; then
    current_default_dev_port=""
  fi

  read -rp "Dev port env (blank to disable) [${current_dev_port_env}]: " new_dev_port_env
  new_dev_port_env="${new_dev_port_env:-${current_dev_port_env}}"
  if [[ -n "${new_dev_port_env}" && ! "${new_dev_port_env}" =~ ^[A-Z_][A-Z0-9_]*$ ]]; then
    echo "Invalid dev env variable format."
    return 1
  fi

  if [[ -n "${new_dev_port_env}" ]]; then
    while true; do
      read -rp "Default dev port [${current_default_dev_port}]: " new_default_dev_port
      new_default_dev_port="${new_default_dev_port:-${current_default_dev_port}}"
      if is_valid_port "${new_default_dev_port}"; then
        break
      fi
      echo "Invalid dev port."
    done
  else
    new_default_dev_port=""
  fi

  if [[ ! -f "${SCRIPT_DIR}/${new_compose_file}" ]]; then
    echo "Warning: compose file does not exist now: ${SCRIPT_DIR}/${new_compose_file}"
    read -rp "Continue anyway? (y/n): " continue_anyway
    if [[ ! "${continue_anyway}" =~ ^[Yy]$ ]]; then
      return 1
    fi
  fi

  tmp="$(mktemp)"
  if [[ -n "${new_dev_port_env}" ]]; then
    jq \
      --arg id "${project_id}" \
      --arg label "${new_label}" \
      --arg compose_file "${new_compose_file}" \
      --arg default_service "${new_default_service}" \
      --arg nginx_site "${new_nginx_site}" \
      --arg port_env "${new_port_env}" \
      --arg dev_port_env "${new_dev_port_env}" \
      --argjson default_port "${new_default_port}" \
      --argjson default_dev_port "${new_default_dev_port}" \
      '(.projects[] | select(.id == $id)) |= (
        .label = $label
        | .compose_file = $compose_file
        | .default_service = $default_service
        | .nginx_site = $nginx_site
        | .port_env = $port_env
        | .default_port = $default_port
        | .dev_port_env = $dev_port_env
        | .default_dev_port = $default_dev_port
      )' \
      "${CONFIG_FILE}" > "${tmp}"
  else
    jq \
      --arg id "${project_id}" \
      --arg label "${new_label}" \
      --arg compose_file "${new_compose_file}" \
      --arg default_service "${new_default_service}" \
      --arg nginx_site "${new_nginx_site}" \
      --arg port_env "${new_port_env}" \
      --argjson default_port "${new_default_port}" \
      '(.projects[] | select(.id == $id)) |= (
        .label = $label
        | .compose_file = $compose_file
        | .default_service = $default_service
        | .nginx_site = $nginx_site
        | .port_env = $port_env
        | .default_port = $default_port
        | del(.dev_port_env)
        | del(.default_dev_port)
      )' \
      "${CONFIG_FILE}" > "${tmp}"
    state_set "${project_id}" "dev_port" ""
  fi
  mv "${tmp}" "${CONFIG_FILE}"

  state_set "${project_id}" "port" "${new_default_port}"
  if [[ -n "${new_default_dev_port}" ]]; then
    state_set "${project_id}" "dev_port" "${new_default_dev_port}"
  fi

  echo "Project config updated: ${project_id}"
  read -rp "Bring project UP now? (y/n): " bring_up
  if [[ "${bring_up}" =~ ^[Yy]$ ]]; then
    run_compose "${project_id}" up -d --build
    echo "Project is up."
  fi
}

publish_project() {
  local project_id="$1"
  local name
  local domain
  local port

  name="$(project_field "${project_id}" "label")"
  echo "Publishing ${name} ..."

  configure_project_port "${project_id}"
  configure_project_dev_port "${project_id}"
  deploy_compose_project "${project_id}"
  configure_project_domain "${project_id}" || return

  domain="$(get_project_domain "${project_id}")"
  port="$(get_project_port "${project_id}")"
  setup_nginx_proxy "${project_id}" "${domain}"
  echo "Nginx reverse proxy configured for ${domain} -> 127.0.0.1:${port}"

  read -rp "Do SSL setup now using Certbot? (y/n): " ssl_choice
  if [[ "${ssl_choice}" =~ ^[Yy]$ ]]; then
    setup_ssl_for_project "${project_id}"
  fi
}

show_ssl_status_menu() {
  local pid
  local domain
  local label

  while true; do
    echo ""
    echo "SSL Setup Menu"
    while IFS= read -r pid; do
      label="$(project_field "${pid}" "label")"
      domain="$(get_project_domain "${pid}")"
      if [[ -z "${domain}" ]]; then
        domain="<not configured>"
      fi
      echo "- ${label}: ${domain}"
    done < <(project_ids)
    echo ""
    echo "1) Select project for SSL action"
    echo "0) Back"
    read -rp "Choose: " ssl_menu_choice

    case "${ssl_menu_choice}" in
      1)
        select_project_menu "Select project for SSL action: " || continue
        pid="${SELECTED_PROJECT_ID}"
        domain="$(get_project_domain "${pid}")"

        if [[ -z "${domain}" ]]; then
          echo "No domain configured."
          read -rp "Set domain now? (y/n): " set_now
          if [[ "${set_now}" =~ ^[Yy]$ ]]; then
            read -rp "Enter domain: " domain
            if [[ -z "${domain}" ]]; then
              echo "Domain cannot be empty."
              continue
            fi
            set_project_domain "${pid}" "${domain}"
            setup_nginx_proxy "${pid}" "${domain}"
          else
            continue
          fi
        fi

        if has_ssl_certificate "${domain}"; then
          echo "SSL status for ${domain}: INSTALLED"
          set_project_ssl_enabled "${pid}" "true"
        else
          echo "SSL status for ${domain}: NOT INSTALLED"
          set_project_ssl_enabled "${pid}" "false"
        fi
        state_set "${pid}" "last_ssl_check_at" "$(now_utc)"
        setup_ssl_for_project "${pid}"
        ;;
      0)
        return
        ;;
      *)
        echo "Invalid option."
        ;;
    esac
  done
}

main_menu() {
  while true; do
    echo ""
    echo "==== Aurora Publish Menu ===="
    echo "1) Publish project"
    echo "2) SSL setup"
    echo "3) Stop container(s)"
    echo "4) Remove container(s)"
    echo "5) Container status"
    echo "6) Add project to JSON config"
    echo "7) Edit project config (down/edit/up)"
    echo "0) Exit"
    read -rp "Choose an option: " choice

    case "${choice}" in
      1)
        select_project_menu "Select project to publish: " || continue
        publish_project "${SELECTED_PROJECT_ID}"
        ;;
      2)
        show_ssl_status_menu
        ;;
      3)
        select_project_menu "Select project to stop: " || continue
        manage_project_containers "stop" "${SELECTED_PROJECT_ID}"
        ;;
      4)
        select_project_menu "Select project to remove: " || continue
        manage_project_containers "remove" "${SELECTED_PROJECT_ID}"
        ;;
      5)
        select_project_menu "Select project for status: " || continue
        manage_project_containers "status" "${SELECTED_PROJECT_ID}"
        ;;
      6)
        add_project_to_config || true
        ;;
      7)
        select_project_menu "Select project to edit: " || continue
        edit_project_config "${SELECTED_PROJECT_ID}" || true
        ;;
      0)
        echo "Bye."
        exit 0
        ;;
      *)
        echo "Invalid option."
        ;;
    esac
  done
}

require_cmd docker
require_cmd nginx
require_cmd jq
ensure_json_files
main_menu
