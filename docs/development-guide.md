# AI Coach Development Guide

This guide explains how to contribute to AI Coach effectively and consistently.

## Development Environment Setup

1. Install Node.js 20+ and npm 10+
2. Clone the repository
3. Run `npm install`
4. Create `.env` with your Cosmos DB settings
5. Run `npm run build` once to verify the toolchain
6. Use `npm run dev` while editing TypeScript files

For initial setup details, see [Getting Started](getting-started.md).

## Project Scripts Explained

AI Coach defines the following scripts in `package.json`:

| Script                 | Purpose                                                                |
| ---------------------- | ---------------------------------------------------------------------- |
| `npm run build`        | Compiles the TypeScript source using `tsc -p tsconfig.json`            |
| `npm start`            | Runs the compiled entrypoint from `dist/index.js`                      |
| `npm run dev`          | Starts the TypeScript compiler in watch mode for iterative development |
| `npm test`             | Runs the Vitest test suite (`--passWithNoTests` is enabled)            |
| `npm run lint`         | Runs ESLint across `.ts` files                                         |
| `npm run lint:fix`     | Runs ESLint and automatically fixes safe issues                        |
| `npm run format`       | Formats the repository with Prettier                                   |
| `npm run format:check` | Verifies formatting without rewriting files                            |
| `npm run clean`        | Removes the `dist/` directory before a fresh build                     |

## Code Organization and Conventions

AI Coach currently uses a compact source layout:

- `src/config/index.ts` — loads environment variables and builds `AppConfig`
- `src/services/cosmos.ts` — owns database initialization and data access helpers
- `src/types/index.ts` — stores shared interfaces such as `CosmosConfig` and `BaseDocument`
- `src/index.ts` — exports the public project surface and current startup log

### Conventions

- Keep configuration loading inside `src/config/`
- Keep Azure Cosmos DB access inside `src/services/`
- Add or extend interfaces in `src/types/` before spreading inline object shapes through the codebase
- Prefer ESM imports with `.js` extension in TypeScript source, matching the current project setup

## Adding New Features

When adding a new AI Coach feature:

1. Define the document or domain interface in `src/types/`
2. Extend `CosmosService` only when the feature needs reusable database behavior
3. Add new application modules under `src/` as the surface grows
4. Keep feature-specific container names and partition keys explicit
5. Update docs when setup, architecture, or usage patterns change

### Suggested structure for new domains

If AI Coach adds richer user flows, consider introducing folders such as:

- `src/features/goals/`
- `src/features/sessions/`
- `src/features/progress/`

Each domain can own its orchestration while still depending on shared config, types, and service layers.

## Testing Strategy and Writing Tests

AI Coach uses Vitest for automated testing.

### What to cover

- missing or invalid environment variables in config loading
- `CosmosService` initialization behavior
- CRUD and query behavior for domain documents
- error handling for failed Cosmos DB operations

### How to write tests

- place tests close to the code they validate or under a dedicated `test/` layout if the project adopts one
- mock Cosmos SDK interactions when unit testing service behavior
- use domain-realistic document examples such as goals, progress snapshots, and session summaries
- assert both success paths and not-found/error cases

## Debugging Tips

- Start with `.env` when initialization fails
- Check the configured database name and container id when reads or queries behave unexpectedly
- Remember that the default container uses partition key `/id`
- Use `console.info` or targeted logging sparingly to confirm initialization flow during local development
- Rebuild with `npm run build` if watch output becomes unclear

## Common Development Workflows

### Run the standard quality loop

```bash
npm run lint
npm run format:check
npm test
npm run build
```

### Clean and rebuild

```bash
npm run clean
npm run build
```

### Prepare a documentation change

```bash
git checkout -b docs/update-ai-coach-docs
npm run format
```

## Related Documentation

- [Project README](../README.md)
- [Architecture Overview](architecture.md)
- [API Reference](api-reference.md)
- [Security Practices](security-practices.md)
