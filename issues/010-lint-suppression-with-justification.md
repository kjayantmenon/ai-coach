## Parent PRD

`issues/prd.md`

## What to build

Allow lint findings to be suppressed in the manifest only when accompanied by a written justification, making suppressions auditable in code review. See PRD §User Stories #19.

End-to-end behavior: The manifest schema gains `lints.suppress[]` where each entry requires a `ruleId` and a `reason` (non-empty string). The `Linter` reads this list and downgrades matching findings from `error` to `suppressed` with the reason attached. `gab lint` reports suppressed findings in a separate section of its output (so reviewers see them) and exits zero for suppressed-only output. A suppression entry without a `reason` is itself a lint error.

## Acceptance criteria

- [ ] Manifest schema accepts `lints.suppress[]` with required `ruleId` and `reason`
- [ ] Suppression without a `reason` produces a lint error referencing the suppression entry's line
- [ ] `Linter` correctly downgrades matching findings
- [ ] `gab lint` text output lists suppressed findings under a clearly labeled section
- [ ] `gab lint --format json` exposes suppressions distinctly from active findings
- [ ] Unit tests: suppression with reason silences a rule; suppression without reason becomes an error
- [ ] Telemetry emits a separate counter for suppressed vs. fired findings (per PRD §Implementation Decisions → _Telemetry_)

## Blocked by

- Blocked by `issues/005-first-lint-rule-and-meta-test.md`

## User stories addressed

Reference by number from the parent PRD:

- User story 19
