import { config } from './config/index.js';
import { CosmosService } from './services/cosmos.js';

process.stdout.write('AI Coach application starting...\n');

export { config, CosmosService };
export * from './types/index.js';
