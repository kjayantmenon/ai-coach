import Ajv, { type ErrorObject } from 'ajv';
import { parse, stringify } from 'yaml';

import { manifestSchema } from './schema.js';
import type { Manifest, ValidationResult } from './types.js';

const ajv = new Ajv.default({ allErrors: true });
const validateSchema = ajv.compile(manifestSchema);

export function parseManifest(yamlContent: string): Manifest {
  const raw: unknown = parse(yamlContent);

  if (raw === null || raw === undefined || typeof raw !== 'object') {
    throw new Error('Manifest must be a YAML object');
  }

  const result = validateManifest(raw);

  if (!result.valid) {
    const messages = result.errors.map((e) => `${e.path}: ${e.message}`).join('; ');
    throw new Error(`Invalid manifest: ${messages}`);
  }

  return raw as Manifest;
}

export function validateManifest(data: unknown): ValidationResult {
  const valid = validateSchema(data);

  if (valid) {
    return { valid: true, errors: [] };
  }

  const errors = (validateSchema.errors ?? []).map((err: ErrorObject) => ({
    path: err.instancePath || '/',
    message: err.message ?? 'Unknown validation error',
  }));

  return { valid: false, errors };
}

export function serializeManifest(manifest: Manifest): string {
  return stringify(manifest);
}

export function createDefaultManifest(): Manifest {
  return {
    gabVersion: '0.1.0',
    gabKbVersion: '0.0.1',
    entities: [],
  };
}
