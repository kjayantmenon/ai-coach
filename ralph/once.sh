#!/bin/bash

issues=$(cat issues/*.md 2>/dev/null || echo "No issues found")
commits=$(git log -n 5 --format="%H%n%ad%n%B---" --date=short 2>/dev/null || echo "No commits found")
prompt=$(cat ralph/prompt.md)

#agency claude --permission-mode acceptEdits \
#  "Previous commits: $commits Issues: $issues $prompt"

#agency copilot "Previous commits: $commits Issues: $issues $prompt"
agency copilot --prompt "$(cat <<EOF
Previous commits: $commits
Issues: $issues
$prompt
EOF
)"