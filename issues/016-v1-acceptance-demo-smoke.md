## Parent PRD

`issues/prd.md`

## What to build

An automated smoke test that exercises the v1 acceptance demo end-to-end as described in PRD §Further Notes → _Acceptance demo for v1_.

End-to-end behavior: A scripted test (runnable locally and in CI) performs the demo scenario in sequence: `gab init` a fresh project; write a manifest that enables `gab.party` and `gab.postalAddress` with two custom fields and a dedupe rule that intentionally triggers lint `LB-007`; run `gab lint --format json` and assert `LB-007` fires; invoke `gab explain LB-007` with the stub AI backend and assert it returns a manifest-diff suggestion that, when applied, makes the lint clean; run `gab generate`; assert Roslyn verification passes and snapshot diffs match expectations; load the emitted plugins in FakeXrmEasy and assert a Party Create round-trip completes without firing the loopback guard erroneously. This test is the executable form of the PRD's demo and gates v1 release.

## Acceptance criteria

- [ ] Scripted test runs locally via a single command and in CI
- [ ] Test uses the stub AI backend (no live LLM calls in CI)
- [ ] Test asserts `LB-007` fires on the intentionally-bad manifest
- [ ] Test asserts the AI-proposed diff makes the lint clean (after re-lint)
- [ ] Test asserts `gab generate` succeeds and Roslyn verification passes
- [ ] Test asserts FakeXrmEasy Party Create scenario completes correctly
- [ ] Test failure produces an artifact bundle (manifest, generated project, lint output) for triage
- [ ] Documentation page `docs/acceptance-demo.md` reproduces the script as a human-followable walkthrough

## Blocked by

- Blocked by `issues/007-dedupe-and-party-number-strategy.md`
- Blocked by `issues/008-postal-address-entity.md`
- Blocked by `issues/010-lint-suppression-with-justification.md`
- Blocked by `issues/011-gab-explain-and-ai-client.md`
- Blocked by `issues/013-vscode-chat-panel.md`

## User stories addressed

Reference by number from the parent PRD:

- User story 1
- User story 3
- User story 4
- User story 5
- User story 6
- User story 8
- User story 9
- User story 10
- User story 11
- User story 13
- User story 14
- User story 18
- User story 27
