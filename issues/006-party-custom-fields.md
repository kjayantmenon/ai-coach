## Parent PRD

`issues/prd.md`

## What to build

Extend the Party slice with the `customFields` manifest construct so implementers can add custom attributes to a canonical entity through the manifest. See PRD §User Stories #6.

End-to-end behavior: The manifest schema gains `gab.party.customFields[]` with `name`, `sourceField`, `type`, and optional `transform`. The `Generator` extends the emitted entity-map XML with the custom field mappings and emits typed accessors in `PartyPlugin.Generated.cs`. A snapshot test over a Party-with-two-custom-fields manifest passes. A FakeXrmEasy integration test asserts that a Create pipeline correctly propagates a custom-field value through the generated plugin.

## Acceptance criteria

- [ ] Manifest schema accepts `gab.party.customFields[]` with required and optional fields documented
- [ ] `ManifestModel` parses and validates the new schema; invalid types produce diagnostics with manifest line numbers
- [ ] `Generator` emits matching entries in the entity-map XML
- [ ] `Generator` emits typed accessors in `PartyPlugin.Generated.cs` for declared custom fields
- [ ] Snapshot test over a two-custom-field manifest passes
- [ ] FakeXrmEasy test asserts custom-field propagation through the Create pipeline
- [ ] Documentation example added to manifest reference page

## Blocked by

- Blocked by `issues/003-first-entity-party-end-to-end.md`

## User stories addressed

Reference by number from the parent PRD:

- User story 6
