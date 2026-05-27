## Parent PRD

`issues/prd.md`

## What to build

The `ProjectWriter` overwrite-vs-preserve discipline made enforceable and demonstrable. See PRD §Implementation Decisions → _Regeneration model_ and _Module decomposition_ → `ProjectWriter`.

End-to-end behavior: After running `gab generate` once and hand-editing `PartyPlugin.cs` to add real business logic inside `OnBeforeCreate`, running `gab generate` again leaves that hand-edited file completely untouched while overwriting `PartyPlugin.Generated.cs` with whatever the current manifest + KB version produces. Stale generated files (e.g. the Generated file for an entity that was disabled in the manifest since the last run) are removed under a defined policy. The `ProjectWriter` exposes a `WriteReport` describing what was overwritten, preserved, and removed.

## Acceptance criteria

- [ ] `ProjectWriter` overwrites `*.Generated.cs` on every run
- [ ] `ProjectWriter` never overwrites hand-written `*.cs` partial files once they exist
- [ ] `ProjectWriter` removes stale `*.Generated.cs` files for entities no longer present in the manifest
- [ ] `ProjectWriter` returns a `WriteReport` listing overwritten, preserved, created, and removed files
- [ ] Unit test: simulate hand-edit to `PartyPlugin.cs`, rerun generate, assert content unchanged
- [ ] Unit test: disable Party entity, rerun generate, assert `PartyPlugin.Generated.cs` removed and `PartyPlugin.cs` retained with a warning logged
- [ ] CLI surfaces the `WriteReport` summary on `generate` completion

## Blocked by

- Blocked by `issues/003-first-entity-party-end-to-end.md`

## User stories addressed

Reference by number from the parent PRD:

- User story 4
- User story 5
- User story 27
