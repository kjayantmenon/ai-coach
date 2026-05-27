## Parent PRD

`issues/prd.md`

## What to build

The complete lint pipeline, established by landing the first real rule (LB-007 loopback risk) end-to-end. See PRD §Implementation Decisions → _Knowledge-base sourcing_, _KB workflow and versioning_, _Validation posture_, and _Module decomposition_ → `Linter`.

End-to-end behavior: The KB schema for lint rules is defined (rule ID, detector predicate over manifest, remediation text, TSG excerpt reference, paired test reference). One rule (LB-007) is authored against the v0.1 KB with a paired FakeXrmEasy test. The `Linter` module evaluates `(Manifest, Kb) → IReadOnlyList<Finding>` purely. `gab lint` reports findings to stdout in human-readable format and to JSON via `--format json` (the contract consumed later by the VS Code extension). A CI meta-test enumerates every rule in the KB and fails if any lacks a paired test, a TSG excerpt, or a remediation; this is the executable form of the "every lint rule has a behavior" contract.

## Acceptance criteria

- [ ] KB schema defines lint-rule shape: `id`, `detector`, `remediation`, `tsgRef`, `pairedTestRef`
- [ ] LB-007 rule authored with all four fields plus paired FakeXrmEasy test demonstrating the loopback failure mode
- [ ] `Linter` module emits ordered, deterministic `Finding`s
- [ ] `gab lint` returns non-zero on errors, zero on warnings or clean
- [ ] `gab lint --format json` produces a stable schema (versioned) consumed by extension and CI
- [ ] CI meta-test fails when a KB rule is missing any required field or its paired test
- [ ] Unit tests: LB-007 fires on a crafted positive-case manifest and does not fire on a clean manifest
- [ ] Documentation page (auto-generated from KB) lists LB-007 with remediation and TSG link

## Blocked by

- Blocked by `issues/003-first-entity-party-end-to-end.md`

## User stories addressed

Reference by number from the parent PRD:

- User story 8
- User story 9
- User story 18
- User story 20
- User story 25
