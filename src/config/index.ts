import dotenv from 'dotenv';

import type { AppConfig } from '../types/index.js';

dotenv.config();

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const config: AppConfig = {
  cosmos: {
    endpoint: getRequiredEnv('COSMOS_ENDPOINT'),
    key: getRequiredEnv('COSMOS_KEY'),
    databaseName: process.env.COSMOS_DATABASE_NAME ?? 'ai-coach',
  },
  nodeEnv: process.env.NODE_ENV ?? 'development',
};
