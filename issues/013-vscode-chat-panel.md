## Parent PRD

`issues/prd.md`

## What to build

The VS Code chat panel that supports multi-turn manifest authoring by streaming `gab explain` and applying proposed manifest diffs as VS Code edit suggestions, with every proposed diff re-linted before it can be saved. See PRD §Implementation Decisions → _AI surface_ and §User Stories #11, #12.

End-to-end behavior: The extension contributes a chat view participant (or webview if needed) where the user can ask for manifest changes in natural language. Each turn shells out to `gab explain` (or a chat-mode variant), streams tokens into the panel, and renders any proposed manifest diff as a VS Code edit suggestion the user can accept or reject. On acceptance, the extension re-runs `gab lint --format json` against the would-be new manifest; if the diff would introduce a fresh lint error, the suggestion is blocked with a clear message. No code other than the manifest is touched.

## Acceptance criteria

- [ ] Chat panel registered with VS Code chat API (or webview fallback)
- [ ] User can ask multi-turn questions; history is preserved per session
- [ ] Each AI response that includes a manifest diff renders it as a VS Code edit suggestion
- [ ] Accepting a suggestion triggers a re-lint via `gab lint --format json`
- [ ] If re-lint reports any new error-level finding, the suggestion is blocked and the user sees the finding
- [ ] No code path applies edits to anything other than `gab.manifest.yaml`
- [ ] Smoke test covers an accept + reject path against a fixture workspace with a stubbed AI backend
- [ ] Documentation updated with chat-panel usage and the "AI cannot bypass the linter" guarantee

## Blocked by

- Blocked by `issues/011-gab-explain-and-ai-client.md`
- Blocked by `issues/012-vscode-extension-mvp.md`

## User stories addressed

Reference by number from the parent PRD:

- User story 11
- User story 12
- User story 30
