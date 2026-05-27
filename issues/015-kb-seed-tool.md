## Parent PRD

`issues/prd.md`

## What to build

A separately distributed one-off tool that introspects a shipped GAB managed solution and emits draft KB YAML files for human curation. See PRD §Implementation Decisions → _Knowledge-base sourcing_ and _Module decomposition_ → `KbSeed`, plus the licensing nuance in §Further Notes.

End-to-end behavior: `gab-kb-seed --solution-path <zip> --assemblies <dir> --out <dir>` reads the entity-map XML and plugin step registrations from the shipped GAB managed solution and reflects over the plugin assemblies, then emits draft `entities/*.yaml` and structural skeletons for `lints/*.yaml` (rules are not auto-generated; the tool produces placeholders the product team fills in). The tool is distributed as a separate `dotnet tool` so it does not bloat the main CLI. Output is consumed as input to the curation process described in the PRD's licensing-nuance note: the _published_ KB is hand-edited from open documentation rather than verbatim from the seed output.

## Acceptance criteria

- [ ] Separate `dotnet tool` package `Microsoft.Gab.Cli.KbSeed` builds and installs
- [ ] Tool reads entity-map XML from a managed-solution zip
- [ ] Tool reflects over plugin assemblies and extracts step registrations and image configurations
- [ ] Tool emits draft `entities/*.yaml` in the KB schema format
- [ ] Tool emits placeholder `lints/*.yaml` skeletons for product-team curation (not automatic rule generation)
- [ ] Unit tests over a fixture managed-solution zip
- [ ] Documentation describes the seed → curate → publish process and the licensing discipline (do not republish extracted XML verbatim)

## Blocked by

- Blocked by `issues/003-first-entity-party-end-to-end.md`

## User stories addressed

Reference by number from the parent PRD:

- User story 21
- User story 23
