## Parent PRD

`issues/prd.md`

## What to build

A thin VS Code extension that surfaces manifest IntelliSense and inline lint diagnostics by shelling out to the CLI. See PRD §Implementation Decisions → _Form factor_ and _Module decomposition_ → _VS Code extension_.

End-to-end behavior: The extension contributes a JSON Schema for `gab.manifest.yaml` so VS Code provides autocompletion and structural validation as the user types. On save (and on demand via a command), the extension runs `gab lint --format json` against the workspace manifest, maps each finding to a VS Code `Diagnostic` (with severity, range, message, and a code-action link to TSG documentation), and renders squigglies inline. The extension contains no engine logic — it parses the CLI's stable JSON output only. A small smoke test in CI invokes the extension's lint command against a fixture workspace.

## Acceptance criteria

- [ ] Extension contributes a YAML JSON-Schema for `gab.manifest.yaml`
- [ ] On save, extension runs `gab lint --format json` and renders diagnostics
- [ ] Command `Gab: Lint Manifest` available in the command palette
- [ ] Diagnostics include source line ranges and link to TSG via VS Code code-action
- [ ] Extension reads `gab` path from configuration with fallback to `PATH` resolution
- [ ] Extension contains zero engine logic (verified by package contents and code review)
- [ ] Smoke test in CI runs `npm run test` exercising the lint command against a fixture workspace
- [ ] VSIX builds and installs locally; documented in `docs/vscode-extension.md`

## Blocked by

- Blocked by `issues/005-first-lint-rule-and-meta-test.md`

## User stories addressed

Reference by number from the parent PRD:

- User story 11
- User story 12
- User story 30
