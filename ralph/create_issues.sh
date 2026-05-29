#!/usr/bin/env bash
# Wrapper around ralph/create_issues.py.
#
# Usage:
#   ralph/create_issues.sh [--repo OWNER/NAME] [--issues-dir PATH] [--dry-run]
#
# Defaults: repo inferred from `gh repo view`; issues dir is ./issues.
# Requires: gh CLI authenticated to the target host; python3 on PATH.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PYTHON_SCRIPT="${SCRIPT_DIR}/create_issues.py"

if ! command -v gh >/dev/null 2>&1; then
  echo "Error: gh CLI not found on PATH." >&2
  exit 1
fi

if ! command -v python3 >/dev/null 2>&1; then
  echo "Error: python3 not found on PATH." >&2
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Error: gh CLI is not authenticated. Run: gh auth login" >&2
  exit 1
fi

exec python3 "${PYTHON_SCRIPT}" "$@"
