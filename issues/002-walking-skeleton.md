## Parent PRD

`issues/prd.md`

## What to build

The minimum CLI that proves the end-to-end pipeline (`ManifestModel` → `KbStore` → `Generator` → `RoslynVerifier` → `ProjectWriter` → `CliHost`) works, with no GAB entities enabled yet. See PRD §Implementation Decisions → _Module decomposition_ and _Subcommand contract_.

End-to-end behavior: `gab init my-project` creates a directory containing a valid `gab.manifest.yaml` that pins `gabVersion` and `gabKbVersion` and enables no entities. `gab generate` reads that manifest, loads an empty (entities-less) KB v0.0.1 package, emits an in-memory project containing a solution file, an empty plugin csproj, and a README, runs the emitted C# through Roslyn (trivially passes), and writes the project to disk through `ProjectWriter`. `gab kb info` prints the active KB version and the engine's supported KB version range. A snapshot test over the empty-manifest fixture asserts the emitted project layout.

## Acceptance criteria

- [ ] `gab init <dir>` creates a directory with a minimal valid `gab.manifest.yaml` and exits zero
- [ ] `gab generate` succeeds on the init output, producing a buildable empty `.sln` + plugin `.csproj` + README
- [ ] `gab kb info` prints active KB version and supported range
- [ ] `ManifestModel`, `KbStore`, `Generator`, `RoslynVerifier`, `ProjectWriter`, `CliHost` exist as separate projects/modules with the interfaces described in the PRD
- [ ] Roslyn compiles emitted C# in-process before any file is written to disk
- [ ] Snapshot test over the empty manifest passes; running it on CI catches accidental drift
- [ ] Unit tests for `ManifestModel` parse + schema-validation pass/fail cases
- [ ] CLI is distributable as a local `dotnet tool` (packing succeeds; install-from-local-feed verified)

## Blocked by

- Blocked by `issues/001-repo-bootstrap-and-ci-skeleton.md`

## User stories addressed

Reference by number from the parent PRD:

- User story 1
- User story 13
- User story 14
- User story 17
