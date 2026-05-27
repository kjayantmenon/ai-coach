## Parent PRD

`issues/prd.md`

## What to build

The generic `extensions[]` escape hatch that lets implementers model non-GAB entities alongside the canonical core, with reduced lint coverage. See PRD §Implementation Decisions → _Manifest schema specialization_ (the "C" choice: GAB-specialized core + generic extension slot).

End-to-end behavior: The manifest schema gains a top-level `extensions[]` array where each entry has `name`, `source`, `target`, and `fields[]` (the generic dual-write shape). The `Generator` emits entity-map XML and a generic plugin scaffold for each extension entry, with the same Generated/hand-written file boundary. The `Linter` applies a reduced rule set to extensions (only generic best-practice rules, not GAB-specific ones) and emits an informational finding noting reduced coverage. A snapshot test covers a manifest with one Party + one extension entity.

## Acceptance criteria

- [ ] Manifest schema accepts `extensions[]` with documented shape
- [ ] `Generator` emits entity-map XML and plugin pair per extension entry
- [ ] `Linter` applies only the rules tagged `appliesTo: extensions` (or both) to extension entries
- [ ] Informational finding emitted noting reduced lint coverage on extensions
- [ ] Snapshot test over a Party + one extension manifest passes
- [ ] FakeXrmEasy test asserts the generated extension plugin emits structured telemetry like canonical plugins
- [ ] Documentation explains the coverage tradeoff and when to use `extensions[]` vs. waiting for canonical support

## Blocked by

- Blocked by `issues/008-postal-address-entity.md`

## User stories addressed

Reference by number from the parent PRD:

- User story 7
