export interface CosmosConfig {
  endpoint: string;
  key: string;
  databaseName: string;
}

export interface BaseDocument {
  id: string;
  _ts?: number;
  _etag?: string;
}

export interface AppConfig {
  cosmos: CosmosConfig;
  nodeEnv: string;
}
