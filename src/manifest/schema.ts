import type { JSONSchemaType } from 'ajv';

import type { Manifest } from './types.js';

export const manifestSchema: JSONSchemaType<Manifest> = {
  type: 'object',
  properties: {
    gabVersion: { type: 'string', minLength: 1 },
    gabKbVersion: { type: 'string', minLength: 1 },
    entities: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string', minLength: 1 },
          enabled: { type: 'boolean' },
        },
        required: ['name', 'enabled'],
        additionalProperties: false,
      },
    },
  },
  required: ['gabVersion', 'gabKbVersion', 'entities'],
  additionalProperties: false,
};
