import { config } from './config/index.js';
import { CosmosService } from './services/cosmos.js';

process.stdout.write('AI Coach application starting...\n');

export { config, CosmosService };
export * from './types/index.js';

// Walking skeleton modules
export * from './manifest/index.js';
export * from './kb/index.js';
export * from './generator/index.js';
export * from './verifier/index.js';
export * from './writer/index.js';
