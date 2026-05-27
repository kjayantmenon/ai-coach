# AI Coach API Reference

This reference covers the configuration types and `CosmosService` API used by AI Coach.

## CosmosService Class

`CosmosService` lives in `src/services/cosmos.ts` and wraps the Azure Cosmos DB SDK with a smaller, application-friendly interface.

## Constructor

```ts
const service = new CosmosService({
  endpoint: process.env.COSMOS_ENDPOINT!,
  key: process.env.COSMOS_KEY!,
  databaseName: process.env.COSMOS_DATABASE_NAME ?? 'ai-coach',
});
```

## Initialization Options

```ts
interface CosmosInitializationOptions {
  containerId?: string;
  partitionKeyPath?: `/${string}`;
}
```

Use `initialize()` options when AI Coach needs a container other than the default `documents` container or a partition key other than `/id`.

## Method Reference

### `initialize(options?: CosmosInitializationOptions): Promise<void>`

Creates the configured database if needed and ensures the target container exists.

```ts
await service.initialize();

await service.initialize({
  containerId: 'goals',
  partitionKeyPath: '/userId',
});
```

### `createItem<T extends BaseDocument>(item: T): Promise<T>`

Creates a new document in the currently initialized container.

```ts
const created = await service.createItem({
  id: 'goal-123',
  title: 'Improve stakeholder communication',
  userId: 'user-42',
});
```

### `readItem<T extends BaseDocument>(id: string, partitionKey = id): Promise<T | null>`

Reads a document by id and partition key. Returns `null` when the document is not found.

```ts
const goal = await service.readItem('goal-123', 'user-42');
```

### `updateItem<T extends BaseDocument>(item: T, partitionKey = item.id): Promise<T>`

Replaces an existing document with the supplied item.

```ts
const updated = await service.updateItem(
  {
    id: 'goal-123',
    title: 'Improve stakeholder communication',
    userId: 'user-42',
    status: 'completed',
  },
  'user-42',
);
```

### `deleteItem(id: string, partitionKey = id): Promise<boolean>`

Deletes a document and returns `true` when a delete occurred. Returns `false` when the document does not exist.

```ts
const deleted = await service.deleteItem('goal-123', 'user-42');
```

### `queryItems<T extends BaseDocument>(query: string | SqlQuerySpec): Promise<T[]>`

Runs a Cosmos DB query against the initialized container.

```ts
const results = await service.queryItems({
  query: 'SELECT * FROM c WHERE c.userId = @userId',
  parameters: [{ name: '@userId', value: 'user-42' }],
});
```

## Configuration Types

### `CosmosConfig`

Defined in `src/types/index.ts`:

```ts
export interface CosmosConfig {
  endpoint: string;
  key: string;
  databaseName: string;
}
```

### `BaseDocument`

```ts
export interface BaseDocument {
  id: string;
  _ts?: number;
  _etag?: string;
}
```

> AI Coach feature-specific documents can extend `BaseDocument` with fields such as `userId`, `title`, `score`, or `status`.

### `AppConfig`

```ts
export interface AppConfig {
  cosmos: CosmosConfig;
  nodeEnv: string;
}
```

## Usage Examples

### Initialize the service from app config

```ts
import { config } from './config/index.js';
import { CosmosService } from './services/cosmos.js';

const cosmos = new CosmosService(config.cosmos);
await cosmos.initialize();
```

### Query AI Coach goal documents

```ts
interface GoalDocument extends BaseDocument {
  userId: string;
  title: string;
  status: 'active' | 'completed';
}

await cosmos.initialize({
  containerId: 'goals',
  partitionKeyPath: '/userId',
});

const activeGoals = await cosmos.queryItems<GoalDocument>({
  query: 'SELECT * FROM c WHERE c.userId = @userId AND c.status = @status',
  parameters: [
    { name: '@userId', value: 'user-42' },
    { name: '@status', value: 'active' },
  ],
});
```

## Configuration Notes

- `COSMOS_ENDPOINT` and `COSMOS_KEY` are required at startup
- `COSMOS_DATABASE_NAME` is optional and defaults to `ai-coach`
- Call `initialize()` before using CRUD or query methods
- Match partition key values with the container's configured partition key path

## Related Documentation

- [Getting Started](getting-started.md)
- [Architecture Overview](architecture.md)
- [Development Guide](development-guide.md)
