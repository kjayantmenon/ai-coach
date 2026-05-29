---
name: create-github-issues
description: Push a folder of local issue markdown files (e.g. `issues/NNN-*.md` produced by the prd-to-issues skill) to a GitHub repository as real issues, in dependency order, rewriting local `Blocked by` cross-references to live issue numbers. Use when the user wants to "move issues to GitHub", "create the issues on GitHub", or "open issues from the issues/ folder".
---

This skill turns a folder of local markdown issue files into GitHub issues using the `gh` CLI. It assumes the prd-to-issues skill (or equivalent) has produced numbered markdown files under `issues/`.

## Process

### 1. Verify prerequisites

Before doing anything, confirm:

- The `gh` CLI is installed and authenticated to the correct host. Run `gh auth status` and inspect the output. If unauthenticated, stop and tell the user to run `gh auth login -h <host>` themselves — do NOT drive an interactive credential flow.
- The target repository is correct. Run `gh repo view --json nameWithOwner -q .nameWithOwner` and present the result to the user for confirmation. If the user wants a different repo, accept an explicit `OWNER/NAME` instead.
- The `issues/` folder exists and contains `NNN-slug.md` files.

### 2. Confirm bulk operation

Creating GitHub issues is a non-reversible action that affects a shared system. Before invoking the script, present:

- Target repo
- Count of issues to be created
- Title-derivation rule (filename → `NNN: Title`)
- Whether labels should be applied (default: none; ask the user if they want any)

Wait for explicit user confirmation before proceeding.

### 3. Run the helper script

Invoke `ralph/create_issues.sh` from the repository root. The script:

1. Discovers `NNN-*.md` files in the `issues/` directory, sorted by leading number.
2. Derives each issue title from the filename (or the first H1 if present).
3. For each file, rewrites `Blocked by `issues/NNN-slug.md` ` references to `Blocked by #N` using the GitHub issue numbers of previously-created issues.
4. Calls `gh issue create` with the rewritten body.
5. Prints a mapping table of `local file → #issue-number`.

Use `--dry-run` first if the user is unsure about the title-derivation or body rewriting. The dry run prints every issue title and body without calling the GitHub API.

### 4. Present the result

Show the user a table mapping local filenames to live GitHub issue URLs/numbers. Mention any HITL-flagged slices explicitly so the user remembers which issues need human action before downstream work can start.

### 5. Optional follow-ups

After the issues are created, offer (do not assume):

- Adding labels (`hitl`, `v1`, etc.) via `gh issue edit <num> --add-label`.
- Deleting the local `issues/NNN-*.md` files now that they are on GitHub.
- Creating a GitHub Project board and adding the issues to it via `gh project item-add`.

## Safety notes

- Never run this skill without the user's explicit confirmation of the target repo. Wrong repo = irreversible noise in someone's issue tracker.
- Do not modify or delete `issues/prd.md` — the PRD stays local even when its decomposed issues move to GitHub.
- If the script fails partway through, it does not roll back already-created issues. Report the failure and let the user decide whether to close the partial set or resume.
