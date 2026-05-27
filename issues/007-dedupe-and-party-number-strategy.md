## Parent PRD

`issues/prd.md`

## What to build

Add the two highest-leverage GAB customization controls — dedupe rules and party-number coordination — with their paired lint rules. See PRD §User Stories #3, #6, #9 and §Implementation Decisions → _Manifest schema specialization_.

End-to-end behavior: The manifest gains `gab.party.dedupe` (e.g. by email, by composite key) and `gab.party.partyNumberStrategy` (e.g. `auto`, `manual`, `customerProvided`). The `Generator` extends the emitted plugin's pre-create step to perform the configured dedupe lookup and party-number coordination in the correct order relative to image capture (encoded as KB knowledge). Two new lint rules land in the KB — one for dedupe misconfiguration and one for unsafe party-number strategies (e.g. `manual` without a pre-create image guard) — each with paired FakeXrmEasy tests asserting both the lint fires on the bad shape and the generated plugin behaves correctly on the good shape.

## Acceptance criteria

- [ ] Manifest accepts `dedupe` and `partyNumberStrategy` with documented enums and validation
- [ ] `Generator` emits matching plugin logic ordered correctly with image capture
- [ ] One dedupe-related lint rule lands with paired test
- [ ] One party-number-related lint rule (e.g. PN-003) lands with paired test
- [ ] FakeXrmEasy test asserts generated plugin reserves the party number before image capture under `manual` strategy
- [ ] FakeXrmEasy test asserts dedupe lookup short-circuits Create when a match is found
- [ ] Snapshot tests over both new manifest shapes pass

## Blocked by

- Blocked by `issues/005-first-lint-rule-and-meta-test.md`
- Blocked by `issues/006-party-custom-fields.md`

## User stories addressed

Reference by number from the parent PRD:

- User story 3
- User story 6
- User story 9
- User story 20
