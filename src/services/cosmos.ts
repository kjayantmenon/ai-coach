import { CosmosClient, type Container, type Database, type SqlQuerySpec } from '@azure/cosmos';

import type { BaseDocument, CosmosConfig } from '../types/index.js';

export interface CosmosInitializationOptions {
  containerId?: string;
  partitionKeyPath?: `/${string}`;
}

export class CosmosService {
  private readonly client: CosmosClient;
  private database?: Database;
  private container?: Container;

  public constructor(private readonly config: CosmosConfig) {
    this.client = new CosmosClient({
      endpoint: config.endpoint,
      key: config.key,
    });
  }

  public async initialize(options: CosmosInitializationOptions = {}): Promise<void> {
    const { containerId = 'documents', partitionKeyPath = '/id' } = options;

    try {
      const { database } = await this.client.databases.createIfNotExists({
        id: this.config.databaseName,
      });
      const { container } = await database.containers.createIfNotExists({
        id: containerId,
        partitionKey: {
          paths: [partitionKeyPath],
        },
      });

      this.database = database;
      this.container = container;
    } catch (error) {
      throw new Error(`Failed to initialize Cosmos DB resources: ${this.getErrorMessage(error)}`);
    }
  }

  public async createItem<T extends BaseDocument>(item: T): Promise<T> {
    try {
      const { resource } = await this.getContainer().items.create<T>(item);

      if (!resource) {
        throw new Error('No resource was returned from Cosmos DB.');
      }

      return resource;
    } catch (error) {
      throw new Error(`Failed to create item "${item.id}": ${this.getErrorMessage(error)}`);
    }
  }

  public async readItem<T extends BaseDocument>(
    id: string,
    partitionKey: string = id,
  ): Promise<T | null> {
    try {
      const { resource } = await this.getContainer().item(id, partitionKey).read<T>();
      return resource ?? null;
    } catch (error) {
      if (this.isNotFoundError(error)) {
        return null;
      }

      throw new Error(`Failed to read item "${id}": ${this.getErrorMessage(error)}`);
    }
  }

  public async updateItem<T extends BaseDocument>(
    item: T,
    partitionKey: string = item.id,
  ): Promise<T> {
    try {
      const { resource } = await this.getContainer().item(item.id, partitionKey).replace<T>(item);

      if (!resource) {
        throw new Error('No resource was returned from Cosmos DB.');
      }

      return resource;
    } catch (error) {
      throw new Error(`Failed to update item "${item.id}": ${this.getErrorMessage(error)}`);
    }
  }

  public async deleteItem(id: string, partitionKey: string = id): Promise<boolean> {
    try {
      await this.getContainer().item(id, partitionKey).delete();
      return true;
    } catch (error) {
      if (this.isNotFoundError(error)) {
        return false;
      }

      throw new Error(`Failed to delete item "${id}": ${this.getErrorMessage(error)}`);
    }
  }

  public async queryItems<T extends BaseDocument>(query: string | SqlQuerySpec): Promise<T[]> {
    try {
      const { resources } = await this.getContainer().items.query<T>(query).fetchAll();
      return resources;
    } catch (error) {
      throw new Error(`Failed to query items: ${this.getErrorMessage(error)}`);
    }
  }

  public getDatabase(): Database | undefined {
    return this.database;
  }

  public getContainerInstance(): Container | undefined {
    return this.container;
  }

  private getContainer(): Container {
    if (!this.container) {
      throw new Error('CosmosService has not been initialized. Call initialize() first.');
    }

    return this.container;
  }

  private isNotFoundError(error: unknown): boolean {
    if (!error || typeof error !== 'object') {
      return false;
    }

    const statusCode =
      'code' in error ? error.code : 'statusCode' in error ? error.statusCode : undefined;
    return statusCode === 404;
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    return 'Unknown error';
  }
}
