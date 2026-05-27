## Parent PRD

`issues/prd.md`

## What to build

Stand up the two public repositories that will host the project and wire up the minimum CI required for every subsequent slice to land cleanly. See PRD §Implementation Decisions → _Distribution, licensing, ownership_.

End-to-end behavior: `microsoft/gab-cli` and `microsoft/gab-cli-kb` exist as public repositories under the Microsoft GitHub organization, MIT-licensed, with CODEOWNERS scoped so KB content requires product-team approval. Both repositories have a CI workflow that runs on PR and main, executes build + test, and is ready to publish signed artifacts (NuGet for the CLI and KB packages, VSIX for the extension) once those slices land. The signing identity and publisher configuration are decided and documented even if the first signed publish does not happen in this slice.

This slice is HITL because the repository names, team membership, signing identity, and CODEOWNERS scope are organizational decisions that materially affect every downstream slice and cannot be made unilaterally by automation.

## Acceptance criteria

- [ ] Two public repositories created under `microsoft/`: `gab-cli` and `gab-cli-kb`, both MIT-licensed
- [ ] Root README in each repo links to `issues/prd.md`
- [ ] CODEOWNERS in `gab-cli-kb` requires product-team approval on `kb/**`
- [ ] CODEOWNERS in `gab-cli` requires maintainer approval on `src/**` and `templates/**`
- [ ] CI workflow on each repo runs on PR and main; build + test placeholders are green on an empty solution
- [ ] Signing identity and NuGet publisher configuration documented in `docs/release.md` in `gab-cli`
- [ ] Decision recorded for which Microsoft team owns secrets and signing certificates
- [ ] Branch protection on `main` requires CI green and CODEOWNERS approval

## Blocked by

None - can start immediately

## User stories addressed

Reference by number from the parent PRD:

- User story 24
- User story 25
- User story 29
