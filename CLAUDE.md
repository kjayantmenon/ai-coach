# CLAUDE.md

## Engineering Mode

Do not vibe-code. Act as a senior engineer working in a production-grade repository.

Before editing code:

1. Read relevant files.
2. Summarize the requirement.
3. Identify impacted modules.
4. Propose an implementation plan.
5. List tests required.
6. Wait for approval before large changes.

## Coding Standards

- Follow existing repo style.
- Prefer simple, explicit code.
- Keep functions small.
- Use meaningful names.
- Do not introduce dependencies without justification.
- Do not change public APIs without calling it out.
- Preserve backward compatibility.
- Handle errors explicitly.
- Do not suppress exceptions silently.

## Testing Standards

Every meaningful change must include:

- unit tests
- edge case tests
- failure/negative tests
- integration tests where service boundaries are touched

Do not mark work complete unless tests are added or a clear reason is given.

## Security Standards

- Validate all external input.
- Do not log secrets or PII.
- Do not hardcode credentials.
- Call out auth/authz impact.
- Flag injection, SSRF, path traversal, unsafe deserialization, and privilege risks.

## Observability Standards

Production code must include:

- structured logs
- correlation/request ID propagation
- meaningful error categories
- latency/error metrics where applicable
- trace spans around external calls

No telemetry means not production-ready.

## PR Standard

For every change, provide:

- summary
- design notes
- files changed
- tests run
- security impact
- observability impact
- breaking-change assessment
