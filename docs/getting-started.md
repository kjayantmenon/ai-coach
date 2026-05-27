# Getting Started with AI Coach

This guide shows how to run AI Coach locally against Azure Cosmos DB or the Azure Cosmos DB Emulator.

## Prerequisites

Make sure you have:

- Node.js 20 or later
- npm 10 or later
- Either:
  - an Azure account with an Azure Cosmos DB for NoSQL instance, or
  - the Azure Cosmos DB Emulator for local development

## Installation Steps

### 1. Clone the repository

```bash
git clone https://github.com/kjayantmenon/ai-coach.git
cd ai-coach
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a local environment file

Create `.env` in the repository root:

```env
COSMOS_ENDPOINT=https://your-account.documents.azure.com:443/
COSMOS_KEY=your-primary-key
COSMOS_DATABASE_NAME=ai-coach
NODE_ENV=development
```

## Configuration

AI Coach loads its runtime configuration from environment variables in `src/config/index.ts`.

| Variable               | Required | Description                                                                |
| ---------------------- | -------- | -------------------------------------------------------------------------- |
| `COSMOS_ENDPOINT`      | Yes      | Cosmos DB account endpoint or emulator endpoint used by `CosmosClient`.    |
| `COSMOS_KEY`           | Yes      | Primary or secondary key used to authenticate with Cosmos DB.              |
| `COSMOS_DATABASE_NAME` | No       | Database name for AI Coach documents. Defaults to `ai-coach` when omitted. |
| `NODE_ENV`             | No       | Runtime environment label. Defaults to `development`.                      |

## Running Locally

### Development mode

AI Coach's development script runs the TypeScript compiler in watch mode:

```bash
npm run dev
```

Use this while editing `src/` files so changes are rebuilt continuously.

### Production mode

Build the project and run the compiled entrypoint:

```bash
npm run build
npm start
```

When startup succeeds, the current entrypoint logs:

```text
AI Coach application starting...
```

## Running with the Cosmos DB Emulator

### Install the emulator

- **Windows:** install the Azure Cosmos DB Emulator from Microsoft
- **macOS/Linux:** use the Linux-based emulator container or a shared development Cosmos account if that is your team standard

### Configure emulator connection values

```env
COSMOS_ENDPOINT=https://localhost:8081/
COSMOS_KEY=C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+qXg==
COSMOS_DATABASE_NAME=ai-coach-local
NODE_ENV=development
```

### Emulator notes

- The emulator uses a well-known development key; never use it outside local work
- Trust the emulator certificate if your machine blocks HTTPS requests to `localhost:8081`
- The service can create the configured database and the default `documents` container during initialization

## Verifying the Setup

After configuration:

1. Run `npm run build`
2. Start the app with `npm start`
3. Confirm the startup message appears without configuration errors
4. If you have a small bootstrap script or REPL, call `CosmosService.initialize()` and verify the database/container is available
5. Run the automated checks:

```bash
npm run lint
npm test
```

A healthy setup should compile, start, and connect to Cosmos DB with valid credentials.

## Troubleshooting Common Issues

### Missing required environment variable

If startup throws `Missing required environment variable`, verify `.env` exists and includes `COSMOS_ENDPOINT` and `COSMOS_KEY`.

### Authentication failures (`401` or `403`)

Make sure the endpoint and key belong to the same Cosmos DB account and that you are not mixing cloud and emulator credentials.

### Certificate errors with the emulator

Trust the emulator certificate locally, then restart your shell before retrying.

### Initialization failures

If `CosmosService.initialize()` fails, check that the configured database name is valid and that your account allows creating databases and containers.

### Query or read failures

The default container is initialized with partition key `/id`. If you later customize the partition key, make sure reads, updates, and deletes use the matching partition key value.

## Next Steps

- Read the [Architecture Overview](architecture.md)
- Review the [API Reference](api-reference.md)
- Follow the [Development Guide](development-guide.md) when contributing
