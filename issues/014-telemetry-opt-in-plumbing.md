## Parent PRD

`issues/prd.md`

## What to build

The `TelemetrySink` module and the supporting CLI surface for opt-in, previewable telemetry. See PRD §Implementation Decisions → _Telemetry_ and _Module decomposition_ → `TelemetrySink`.

End-to-end behavior: Telemetry is configured in `gab.toml` with `[telemetry] mode = "off" | "anonymous" | "anonymous+errors"`, default `off`. The CLI prints a one-paragraph notice the first time it runs in a workspace where telemetry is unconfigured, linking to `docs/telemetry.md`. The `TelemetrySink` module owns opt-in checking, payload construction, scrubbing rules (no manifest content, no entity names, no transforms, no identifiers), batching, and POSTing to an MS-operated endpoint. Two v1 payload categories: anonymous lint-fire-and-suppression counters, and engine error reports with scrubbed stack traces. `gab telemetry preview` prints exactly what would be sent for the current workspace state without sending anything.

## Acceptance criteria

- [ ] `gab.toml` schema accepts `[telemetry] mode` with documented enum values; default is `off`
- [ ] First-run notice printed once per workspace when telemetry is unconfigured
- [ ] `TelemetrySink` enforces opt-in gating in a single seam (unit-tested)
- [ ] Payload scrubbing rules implemented and unit-tested: no manifest content, no entity names, no transforms, no identifiers
- [ ] Two payload shapes implemented: lint counter and error report, both versioned
- [ ] `gab telemetry preview` prints exactly what would be sent, exits zero, sends nothing
- [ ] Endpoint URL hardcoded; configuration cannot redirect it (verified by test)
- [ ] `docs/telemetry.md` documents data shapes, retention policy, and opt-in flow
- [ ] Integration test asserts `gab lint` records a counter when opted in and records nothing when opted out

## Blocked by

- Blocked by `issues/005-first-lint-rule-and-meta-test.md`

## User stories addressed

Reference by number from the parent PRD:

- User story 16
- User story 22
- User story 28
