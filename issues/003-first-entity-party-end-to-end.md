## Parent PRD

`issues/prd.md`

## What to build

The first canonical GAB entity (`gab.party`) flowing end-to-end through every layer, with no customization options yet. See PRD §Implementation Decisions → _Manifest schema specialization_, _Regeneration model_, and _Validation posture_.

End-to-end behavior: A manifest with `gab.party.enabled: true` triggers the `Generator` to emit (a) the dual-write entity-map XML for Party using the canonical mapping from the KB and (b) a per-entity plugin pair `PartyPlugin.Generated.cs` (containing step registration, pre/post image setup, loopback guard via origin-tag inspection, telemetry hook) plus `PartyPlugin.cs` (created once, containing the closed set of named partial-method stubs `OnBeforeCreate`, `OnAfterCreate`, `OnBeforeUpdate`, `OnAfterUpdate`). Roslyn verifies the emission. A snapshot test asserts the emitted project structure. A FakeXrmEasy integration test asserts the generated plugin's loopback guard short-circuits when the inbound context carries the dual-write origin tag.

This slice establishes the patterns every subsequent entity slice will follow: KB-driven canonical mapping, Generated/hand-written file pair, paired behavioral test.

## Acceptance criteria

- [ ] `KbStore` loads a KB v0.1 package containing the canonical Party mapping
- [ ] `Generator` emits Party entity-map XML matching the canonical KB definition
- [ ] `Generator` emits `PartyPlugin.Generated.cs` with step registration, image setup, loopback guard, and telemetry hook
- [ ] `Generator` emits `PartyPlugin.cs` with the closed set of partial-method stubs
- [ ] Roslyn verifies the emitted plugin against pinned Xrm reference assemblies
- [ ] Snapshot test over the Party-only manifest passes
- [ ] FakeXrmEasy test asserts loopback guard short-circuits on origin-tagged inbound
- [ ] FakeXrmEasy test asserts the partial-method hook is invoked when origin-tag is absent
- [ ] `KbStore` unit tests cover entity lookup and error on missing entity

## Blocked by

- Blocked by `issues/002-walking-skeleton.md`

## User stories addressed

Reference by number from the parent PRD:

- User story 1
- User story 3
- User story 4
- User story 5
- User story 13
