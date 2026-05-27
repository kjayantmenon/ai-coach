# PRD: GAB Dual-Write Build & Deploy Accelerator (`gab` CLI)

## Problem Statement

Implementers building and customizing Microsoft's Global Address Book (GAB) dual-write solution between Dynamics 365 Finance & Operations and Dataverse/CE repeatedly hit the same classes of failures: sync loopbacks, mapping errors, plugin-image misuse, party-number coordination conflicts, and data-corruption scenarios. The bulk of these failures originate not in the shipped managed solution but in the customizations layered on top of it by customers and their partners — combined with inconsistent use of the published Troubleshooting Guides (TSGs).

Today, an implementer who wants to extend GAB has to assemble entity maps, plugin assemblies, and packaging by hand, with no opinionated scaffold that encodes the "right way" to do customizations. When things go wrong, they wait on the product team for diagnosis. The product team, in turn, sees the same root causes recur across customer engagements.

The implementer needs a tool that gets them from "blank project" to "working, deployable, customization-safe GAB dual-write solution" without inventing structural decisions that are already known-correct, and that flags risky customizations before they ship rather than after they break in production.

## Solution

Ship `gab`, an open-source, Microsoft-published .NET CLI that accelerates the build and deployment of GAB dual-write customizations through a deterministic generator driven by a declarative manifest, with an AI-assisted authoring and explanation surface.

The implementer authors a `gab.manifest.yaml` file describing which GAB entities they want, which custom fields and transformations to add, and how dedupe and party-number coordination should behave. `gab generate` deterministically emits an opinionated project skeleton: dual-write entity-map XML, a C# plugin project where framework-correct code (loopback guards, image handling, telemetry hooks, party-number coordination) is physically separated from customer business logic via partial classes with a closed set of named extension points, and supporting project files. `gab lint` evaluates the manifest against a versioned, hand-curated knowledge base of canonical GAB mappings and known anti-patterns drawn from TSGs and product-team experience; every finding carries a static remediation and a TSG citation. `gab explain` and the companion VS Code extension provide AI-assisted authoring — the LLM proposes manifest edits but never authors generated code, and every AI-proposed edit re-runs through the same lint pipeline before it can be applied.

The implementer can re-run `gab generate` safely after manifest changes: only the `*.Generated.cs` files are overwritten, and the hand-written partial-method files are preserved. The Roslyn compiler verifies emitted plugin code in-process and refuses to write files that won't build. The knowledge base ships as a separately versioned NuGet package pinned by the manifest, so generation is reproducible across machines and time.

## User Stories

1. As a Dynamics 365 partner implementer, I want to scaffold a new GAB dual-write project with one command, so that I do not have to assemble entity maps, plugins, and project structure by hand.
2. As an implementer, I want to describe my customization intent in a declarative manifest, so that my project's intent is reviewable in source control and reproducible across machines.
3. As an implementer, I want the generated plugin code to enforce loopback guards, image handling, and party-number coordination by default, so that I cannot accidentally reintroduce the most common GAB failure modes through customization.
4. As an implementer, I want framework-correct generated code to live in files clearly marked as generated and never hand-edited, so that I can re-run the generator without losing my work.
5. As an implementer, I want a fixed set of named extension points (partial methods) for my business logic, so that I always know where my code belongs and the linter can statically check that I have not bypassed the framework guards.
6. As an implementer, I want to add custom fields to GAB entities through the manifest, so that I can extend canonical entities without rewriting their mappings.
7. As an implementer, I want to add entities outside the GAB canonical set through a generic extensions block, so that my customer-specific tables can ride alongside GAB without forcing me out of the tool.
8. As an implementer, I want every lint finding to come with a plain-text remediation and a TSG link, so that I can fix issues without waiting for the product team and without an LLM running.
9. As an implementer, I want the linter to flag risky configurations before generation, so that I learn about loopback risks and mapping mistakes at authoring time rather than at deployment time.
10. As an implementer, I want an `explain` command that turns a lint rule ID into a grounded natural-language explanation with a suggested manifest edit, so that I understand _why_ a rule fires and not just _that_ it fires.
11. As an implementer, I want a VS Code chat panel where I can describe a change in natural language and receive a proposed manifest diff that passes the linter, so that authoring the manifest is faster than reading the schema by hand.
12. As an implementer, I want JSON-schema-driven autocompletion and inline diagnostics on `gab.manifest.yaml`, so that I get immediate feedback as I author the manifest.
13. As an implementer, I want the generator to verify emitted plugin code compiles via Roslyn before writing it to disk, so that I never end up with an unbuildable project on my filesystem.
14. As an implementer, I want generation to be deterministic given a pinned `gabVersion` and `gabKbVersion`, so that my CI pipeline produces the same output as my workstation.
15. As an implementer, I want to opt out of AI features entirely and still get full lint and generate functionality, so that I can work in environments without network access or LLM credentials.
16. As an implementer, I want telemetry to be off by default and previewable before opt-in, so that I retain full control over what leaves my workstation.
17. As an implementer, I want a `kb info` command that prints the active KB version and the supported `gabVersion` range, so that I can reason about compatibility.
18. As a partner technical lead, I want CI to run `gab lint` on pull requests and fail the build on errors, so that customization mistakes are caught at review time.
19. As a partner technical lead, I want lint suppressions to require a written justification recorded in the manifest, so that suppressions are auditable in code review.
20. As a Microsoft product-team engineer, I want to add new lint rules through a PR that includes the rule definition, a TSG excerpt, a remediation, and a paired FakeXrmEasy test, so that no rule lands in the KB without an executable specification of the behavior it catches.
21. As a Microsoft product-team engineer, I want to publish a new KB version without recutting the CLI, so that field-observed failure modes can be encoded as lints and shipped at the speed they are discovered.
22. As a Microsoft product-team engineer, I want anonymous lint-fire and suppression telemetry from opted-in users, so that I can prioritize which rules to refine and which remediations are unclear.
23. As a Microsoft product-team engineer, I want a one-off KB-seed tool that introspects the shipped GAB managed solution and emits draft KB content, so that bootstrapping a KB for a new GAB version is not a hand-typing exercise.
24. As a community contributor, I want to propose new lint rules through PRs against a public repository, so that field experience from outside Microsoft can flow into the KB.
25. As an open-source maintainer, I want CODEOWNERS gating on the KB and a CI meta-test that rejects rules missing a paired test, so that openness of contribution does not compromise editorial control.
26. As an implementer upgrading GAB, I want to bump `gabKbVersion` in the manifest, regenerate, and see a reviewable diff of generated artifacts, so that upgrades are explicit decisions rather than silent behavior changes.
27. As an implementer, I want the generator to never touch my hand-written partial-method files, so that re-running generation after a manifest change is risk-free.
28. As an implementer, I want a snapshot of "what would be sent" for any AI request via a dry-run flag, so that I can audit prompts before tokens leave the workstation.
29. As an implementer, I want the CLI to ship as a `dotnet tool` from the public NuGet feed under Microsoft's verified publisher identity, so that installation is one signed command and supply-chain trust is explicit.
30. As an implementer, I want the VS Code extension to be a thin wrapper over the CLI rather than a duplicate implementation, so that CI and IDE behavior cannot drift apart.

## Implementation Decisions

**Primary product framing.** The v1 tool is a build/deploy accelerator. Live-production troubleshooting is explicitly a separate product not in scope.

**Outputs produced.** A full opinionated project skeleton containing entity-map artifacts, a C# plugin project, and supporting project files. Deployment-pipeline scaffolding (solution packaging, ALM scripts) is deferred to a later version.

**Input contract.** A single declarative manifest (`gab.manifest.yaml`) is the canonical input. The manifest pins both `gabVersion` and `gabKbVersion`. AI features assist with authoring the manifest and explaining lint findings but never sit on the deterministic generation path.

**Manifest schema specialization.** The schema is GAB-specialized: top-level concepts are GAB domain objects (party, postal address, electronic address, contact person, party relationship). A generic `extensions[]` slot allows non-GAB entities to be modeled alongside the canonical core with reduced lint coverage.

**Knowledge-base sourcing.** Hand-curated, versioned YAML files for canonical mappings, lint rules, and local TSG excerpts. Initial content is seeded by a one-off introspection tool that reads the shipped GAB managed solution (run on the user's machine to avoid republishing licensed content). LLM is layered on top for explanation only, never to author the KB or override its decisions.

**Regeneration model.** Per-entity plugin code is emitted as a pair: a `*Plugin.Generated.cs` file that is always overwritten and contains framework-correct logic (step registration, image handling, loopback guard, party-number coordination, telemetry hooks), and a `*Plugin.cs` file that is created once, never overwritten, and contains a closed set of named partial-method stubs (`OnBeforeCreate`, `OnAfterUpdate`, etc.) for customer business logic. The closed-set discipline is enforced by the linter.

**Form factor.** A .NET 8 CLI (`gab`, distributed as a `dotnet tool` named `Microsoft.Gab.Cli`) is the engine. A thin TypeScript VS Code extension wraps the CLI with manifest IntelliSense, diagnostic rendering, and a chat panel that shells out to `gab explain`. The CLI is fully usable on its own; the extension contains no engine logic.

**Engine language and verification.** .NET 8 / C#. The generator emits entity-map XML via a schema-aware XML object model and plugin C# code via a templating layer; emitted C# is compiled in-process by Roslyn against pinned Xrm reference assemblies before any file is written to disk.

**Validation posture.** Static checks (lint rules, Roslyn build-check, XML-schema validation) are the baseline. Golden-snapshot tests over a fixture corpus of canonical manifests catch accidental output drift. FakeXrmEasy-based integration tests assert behaviors of emitted plugins. Every lint rule in the KB must ship with a paired integration test demonstrating the behavior it catches; this pairing is enforced by a CI meta-test.

**AI surface.** Two AI-powered capabilities ship in v1: `gab explain <findingId>` produces a grounded explanation and proposed manifest edit, and the VS Code chat panel supports multi-turn manifest-authoring where every AI suggestion is rendered as a manifest diff and re-linted before it can be applied. The LLM input is bounded to the manifest, the lint finding, the matching KB entry, and a local TSG excerpt — never generated code, never live D365 metadata. `gab` provides a dry-run flag that prints exactly what would be sent. AI provider is pluggable, default Azure OpenAI, configured per-workspace.

**KB workflow and versioning.** The KB ships as a separately versioned NuGet package (`Microsoft.Gab.Cli.Kb`). KB authoring is PR-driven against a public repository with CODEOWNERS gating, schema validation, and the paired-test requirement enforced in CI. The CLI declares a supported KB version range; the manifest pins the exact version it was authored against.

**Telemetry.** Opt-in, off by default, configured per-workspace. Two payload categories in v1: anonymous lint-fire and suppression counters (rule ID, version pins, suppression flag), and engine error reports with scrubbed stack traces. Manifest content, entity names, transform expressions, and customer identifiers are never collected. A `gab telemetry preview` command prints exactly what would be sent for the current workspace state.

**Distribution, licensing, ownership.** Open source under `github.com/microsoft`, MIT licensed, in two repositories — engine plus VS Code extension in `microsoft/gab-cli`, KB content in `microsoft/gab-cli-kb`. Both NuGet and VSIX artifacts are signed under Microsoft's verified publisher identity. KB contributions are accepted from outside Microsoft via PR but gated on product-team review.

**Module decomposition.**

- _ManifestModel_ — deep module owning parse, schema validation, version pinning, and round-trip serialization of the manifest. Pure in-memory, no I/O.
- _KbStore_ — deep module loading a versioned KB package and exposing canonical mappings, lint rules, and TSG excerpts behind a small query interface.
- _Linter_ — deep, pure module mapping `(Manifest, Kb)` to an ordered list of findings. Single seam for every static correctness check.
- _Generator_ — deep, pure module mapping `(Manifest, Kb)` to an in-memory `GeneratedProject` (file path → content). Composes internal sub-emitters for entity-map XML and plugin C# but exposes one boundary, which keeps the output snapshot-testable as a single unit.
- _RoslynVerifier_ — deep module compiling a `GeneratedProject`'s C# against pinned Xrm reference assemblies and returning diagnostics.
- _ProjectWriter_ — the only module that performs filesystem writes; enforces the partial-class boundary by overwriting `*.Generated.cs` and preserving hand-written `*.cs` files.
- _AiClient_ — deep module abstracting the LLM provider; owns all prompt construction. Pluggable backends, default Azure OpenAI.
- _TelemetrySink_ — deep module owning opt-in checks, payload scrubbing, batching, and posting. Off-by-default semantics are internal to the module.
- _KbSeed_ — deep, separately distributed one-off tool that introspects a shipped GAB managed solution and emits draft KB content for human review.
- _CliHost_ — shallow orchestrator wiring the above modules to subcommands (`init`, `generate`, `lint`, `explain`, `kb info`, `telemetry preview`).
- _VS Code extension_ — separate TypeScript project, thin wrapper. Contributes a YAML schema, runs `gab lint --format json` on save and renders diagnostics, hosts a chat panel that streams `gab explain`. No engine logic.

**Subcommand contract (v1).** `init`, `generate`, `lint`, `explain`, `kb info`, `telemetry preview`. `lint` supports a `--format json` mode consumed by the extension. `generate` is deterministic and fails loudly on any verifier diagnostic. `explain` accepts a finding ID and emits a streamed explanation plus a manifest diff suggestion.

## Testing Decisions

**What makes a good test for this codebase.** Tests target observable behavior at module boundaries — the inputs and outputs declared by each deep module's interface — and avoid asserting on internal collaborators, intermediate data shapes, or template-rendering specifics that change with refactoring. A good test for the Linter asserts "given this manifest and this KB, these finding IDs fire in this order"; it does not assert how the detection was implemented. A good test for the Generator asserts the structure of the emitted project and behaviors of emitted plugin code; it does not assert string-level template output except via the dedicated snapshot suite, which is explicitly a regression-catching tool, not a specification.

**Modules tested in v1.**

- _Linter_: unit tests over a corpus of crafted manifest fixtures, one per lint rule (positive case) plus negative cases that must not fire; ordering and idempotence properties.
- _Generator_: golden-snapshot tests over a small canonical manifest corpus, plus FakeXrmEasy-style integration tests that load emitted plugins and assert behaviors (loopback guard activates under recorded pipeline contexts, image checks short-circuit correctly, party-number coordination runs in the right order, telemetry events emit with expected shape).
- _KbStore_: unit tests for loading, version-compat resolution, query correctness, and error handling on malformed KB packages.
- _RoslynVerifier_: unit tests over crafted `GeneratedProject` inputs covering pass, fail-with-syntax-error, and fail-with-reference-error cases.
- _ProjectWriter_: unit tests over a tmp directory verifying overwrite-vs-preserve discipline (`*.Generated.cs` overwritten, hand-written `*.cs` preserved, new files created, stale generated files removed under a defined policy).
- _AiClient_: unit tests with a stub backend covering prompt construction, dry-run output, and streaming behavior; no live LLM calls in CI.
- _TelemetrySink_: unit tests covering opt-in default-off behavior, payload scrubbing rules, and `Preview` output.
- _CliHost_: thin smoke tests, one per subcommand, exercising argument parsing and module wiring only.
- _KbSeed_: not directly tested; quality is established by review of the KB content it produces and by the downstream Linter/Generator tests that consume that KB.

**Cross-cutting test.** A CI meta-test asserts that every lint rule in the KB has a corresponding integration test referenced by ID. New KB entries cannot land without a paired test; this is the executable form of the "every lint rule has a behavior" contract.

**Prior art.** No equivalent tests exist in the current repository (which is an unrelated TypeScript / Cosmos DB scaffold). The test architecture is established fresh in this project. Conventions to adopt: xUnit for unit and integration tests, Verify.NET for snapshot tests, FakeXrmEasy for plugin-behavior tests, fixture YAML/JSON checked in under `test/<Project>/Fixtures/`.

## Out of Scope

- Live-production troubleshooting copilot (chat over telemetry/logs/TSGs for a running customer environment). This is a distinct product.
- Solution-packaging and deployment-pipeline scaffolding (managed-solution build, dependency ordering, environment-variable scaffolding, ALM helpers). Targeted for v1.2.
- Live discovery of F&O and Dataverse schemas via authenticated API calls to propose an initial manifest. Targeted for v1.3.
- LLM-authored code inside the hand-written extension-point partial methods. Explicitly excluded indefinitely — that boundary is a load-bearing safety property of the design.
- LLM authorship of generated artifacts (plugin C# or entity-map XML) directly. Excluded indefinitely for the same reason.
- Automated ingestion of MS Learn TSG pages into KB candidate rules. Targeted for v2 once the KB has enough hand-curated content to triage proposed updates.
- Manifest-shape telemetry (structural summaries of customer manifests). Gated on a formal privacy/data-handling review.
- Live-environment smoke testing against deployed F&O and Dataverse pairs. Targeted post-v1 once a sacrificial environment is available.
- Coverage of all GAB entities in v1. v1 covers `gab.party` and `gab.postalAddress` only. Remaining canonical entities (`electronicAddress`, `contactPerson`, `partyRelationship`, etc.) land in v1.1.
- Power Platform Admin Center integration. Possible long-term distribution surface; not a v1 engineering item.
- Visual Studio extension (as distinct from VS Code). Not planned; VS Code plus CLI covers the target audience.

## Further Notes

**Acceptance demo for v1.** An implementer runs `gab init my-gab-project`, edits `manifest.yaml` to enable `gab.party` and `gab.postalAddress` with two custom fields and a dedupe rule that intentionally triggers lint `LB-007`; the VS Code extension underlines the offending block, the chat panel explains the loopback risk and proposes a manifest edit, the implementer accepts the edit, runs `gab generate`, the emitted plugin compiles via Roslyn, snapshot tests pass, and a deployed copy in a sandbox successfully round-trips a Party record between F&O and Dataverse without loopbacks. This demo exercises every architectural decision in the PRD end-to-end.

**KB seed and licensing nuance.** The KB-seed tool reads MS-shipped managed-solution artifacts on the user's machine and emits draft YAML for human curation. The _published_ KB content is hand-edited from open documentation rather than republished verbatim from extracted managed-solution files, to keep the KB package's licensing clean. This is a content-process discipline, not an engineering constraint.

**Sequencing after v1.** v1.1 expands canonical entity coverage and grows the KB to roughly twenty lint rules; v1.2 adds deployment-pipeline scaffolding and generated-code explanation chat; v1.3 adds live-discovery; v2 adds automated docs ingestion, manifest-shape telemetry behind privacy review, and a live-environment smoke suite.

**Repository to bootstrap.** The current `ai-coach` workspace is unrelated scaffolding (TypeScript, Cosmos DB) and is not the implementation target. v1 work begins in two fresh repositories under `microsoft/`: `microsoft/gab-cli` (engine, VS Code extension, tests, KB-seed tool) and `microsoft/gab-cli-kb` (KB content).
