## Parent PRD

`issues/prd.md`

## What to build

The `gab explain` subcommand and the `AiClient` module that powers it, including the prompt design used for grounded lint-finding explanations. See PRD §Implementation Decisions → _AI surface_ and _Module decomposition_ → `AiClient`.

This slice is HITL because the prompt template, the bounded input shape sent to the LLM, and the dry-run preview format are reviewable design artifacts with safety implications — they define exactly what does and does not leave the developer's workstation.

End-to-end behavior: `gab explain <findingId>` accepts a finding ID from a prior `gab lint` run, gathers the bounded input `{ lintFinding, manifestSnippet, kbEntry, tsgExcerpt }`, calls the configured LLM backend (default Azure OpenAI, pluggable via configuration), and streams a grounded explanation followed by a proposed manifest edit. `gab explain --dry-run <findingId>` prints exactly what would be sent without making the call. A stub backend is used in CI to keep tests hermetic. The CLI works fully without the LLM configured; `gab lint` and `gab generate` never call it.

## Acceptance criteria

- [ ] Prompt template designed and reviewed; checked in under `prompts/explain.v1.md`
- [ ] `AiClient` exposes `Explain(finding, manifest, kb) → Stream<string>` and `ProposeEdit(...)`
- [ ] Bounded input shape enforced in code; tests assert generated code, plugin source, and live D365 metadata never appear in prompts
- [ ] `gab explain --dry-run` prints the exact prompt body
- [ ] Default backend: Azure OpenAI via `AZURE_OPENAI_ENDPOINT` / `AZURE_OPENAI_API_KEY`
- [ ] Pluggable backend interface; in-memory stub used in CI
- [ ] `gab lint` and `gab generate` are verified by unit test to never call `AiClient`
- [ ] Documentation page `docs/ai-surface.md` describes data flow, opt-out, and dry-run usage
- [ ] Unit tests cover prompt construction, dry-run output, streaming, and stub backend

## Blocked by

- Blocked by `issues/005-first-lint-rule-and-meta-test.md`

## User stories addressed

Reference by number from the parent PRD:

- User story 10
- User story 15
- User story 28
