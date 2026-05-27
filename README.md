# AI Coach

[![CI Status](https://img.shields.io/badge/CI-pending-lightgrey)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

AI Coach is an open-source, AI-powered coaching platform that helps users develop skills, track progress, and receive personalized guidance. Built with TypeScript and backed by Azure Cosmos DB.

## Features

- Azure Cosmos DB-backed persistence for coaching data, goals, and progress records
- A reusable `CosmosService` abstraction for initialization, CRUD operations, and query execution
- Centralized environment-based configuration with sensible defaults for local development
- TypeScript models for app configuration and stored document metadata
- Local-first development flow with Azure Cosmos DB Emulator compatibility
- Automated quality gates through linting, formatting, build validation, tests, and security workflows

## Quick Start

### Prerequisites

- Node.js 20+
- npm 10+
- An Azure Cosmos DB account or the Azure Cosmos DB Emulator

### Clone

```bash
git clone https://github.com/kjayantmenon/ai-coach.git
cd ai-coach
```

### Install

```bash
npm install
```

### Configure

Create a `.env` file in the repository root:

```env
COSMOS_ENDPOINT=https://your-account.documents.azure.com:443/
COSMOS_KEY=your-primary-key
COSMOS_DATABASE_NAME=ai-coach
NODE_ENV=development
```

### Run

Development watch mode:

```bash
npm run dev
```

Production build and startup:

```bash
npm run build
npm start
```

For a full setup walkthrough, see [docs/getting-started.md](docs/getting-started.md).

## Project Structure

```text
.
├── src/
│   ├── config/
│   │   └── index.ts
│   ├── services/
│   │   └── cosmos.ts
│   ├── types/
│   │   └── index.ts
│   └── index.ts
├── docs/
│   ├── README.md
│   ├── getting-started.md
│   ├── architecture.md
│   ├── api-reference.md
│   ├── development-guide.md
│   └── security-practices.md
├── .github/
│   ├── workflows/
│   ├── ISSUE_TEMPLATE/
│   ├── CODEOWNERS
│   └── PULL_REQUEST_TEMPLATE.md
├── package.json
├── tsconfig.json
└── README.md
```

## Tech Stack

- TypeScript
- Node.js 20+
- Azure Cosmos DB
- Vitest

## Documentation

- [Documentation Index](docs/README.md)
- [Getting Started Guide](docs/getting-started.md)
- [Architecture Overview](docs/architecture.md)
- [API Reference](docs/api-reference.md)
- [Development Guide](docs/development-guide.md)
- [Security Practices](docs/security-practices.md)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Licensed under the [MIT License](LICENSE).

## Security

See [SECURITY.md](SECURITY.md) for reporting guidance.

## Code of Conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
