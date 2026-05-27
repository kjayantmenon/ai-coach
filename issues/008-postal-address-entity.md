## Parent PRD

`issues/prd.md`

## What to build

Add the second canonical entity (`gab.postalAddress`) end-to-end, including its relationship to Party and one paired lint rule for the address-role mismatch failure mode. See PRD §Out of Scope (v1 includes Party and PostalAddress only) and §Implementation Decisions → _Manifest schema specialization_.

End-to-end behavior: The manifest schema gains `gab.postalAddress` with `enabled`, `customFields`, and address-role configuration. The KB v0.1 package gains the canonical PostalAddress mapping and the address-role-mismatch lint rule (AR-012). The `Generator` emits the PostalAddress entity-map XML, a `PostalAddressPlugin.Generated.cs` with the canonical guards, and a corresponding hand-written partial stub. The relationship between Party and PostalAddress is correctly modeled in the generated artifacts. A FakeXrmEasy test asserts the address-role guard catches a mismatch, and a snapshot test covers a Party+PostalAddress manifest.

## Acceptance criteria

- [ ] Manifest schema accepts `gab.postalAddress` parallel to `gab.party`
- [ ] KB ships canonical PostalAddress mapping and AR-012 lint rule with paired test
- [ ] `Generator` emits the PostalAddress entity-map XML and plugin pair
- [ ] Generated plugins correctly model Party↔PostalAddress relationship semantics
- [ ] FakeXrmEasy test asserts AR-012 detects address-role mismatch
- [ ] FakeXrmEasy test asserts emitted PostalAddress plugin honors its loopback guard
- [ ] Snapshot test over Party + PostalAddress manifest passes
- [ ] Documentation page updated to list PostalAddress

## Blocked by

- Blocked by `issues/003-first-entity-party-end-to-end.md`
- Blocked by `issues/005-first-lint-rule-and-meta-test.md`

## User stories addressed

Reference by number from the parent PRD:

- User story 1
- User story 3
- User story 6
- User story 8
- User story 9
