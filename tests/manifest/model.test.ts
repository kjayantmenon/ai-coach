import { describe, expect, it } from 'vitest';

import {
  createDefaultManifest,
  parseManifest,
  serializeManifest,
  validateManifest,
} from '../../src/manifest/model.js';

describe('ManifestModel', () => {
  describe('parseManifest', () => {
    it('parses a valid manifest', () => {
      const yaml = `
gabVersion: "0.1.0"
gabKbVersion: "0.0.1"
entities: []
`;
      const manifest = parseManifest(yaml);
      expect(manifest.gabVersion).toBe('0.1.0');
      expect(manifest.gabKbVersion).toBe('0.0.1');
      expect(manifest.entities).toEqual([]);
    });

    it('parses a manifest with entities', () => {
      const yaml = `
gabVersion: "0.1.0"
gabKbVersion: "0.0.1"
entities:
  - name: party
    enabled: true
  - name: postalAddress
    enabled: false
`;
      const manifest = parseManifest(yaml);
      expect(manifest.entities).toHaveLength(2);
      expect(manifest.entities[0]).toEqual({ name: 'party', enabled: true });
    });

    it('throws on missing gabVersion', () => {
      const yaml = `
gabKbVersion: "0.0.1"
entities: []
`;
      expect(() => parseManifest(yaml)).toThrow('Invalid manifest');
    });

    it('throws on missing gabKbVersion', () => {
      const yaml = `
gabVersion: "0.1.0"
entities: []
`;
      expect(() => parseManifest(yaml)).toThrow('Invalid manifest');
    });

    it('throws on missing entities', () => {
      const yaml = `
gabVersion: "0.1.0"
gabKbVersion: "0.0.1"
`;
      expect(() => parseManifest(yaml)).toThrow('Invalid manifest');
    });

    it('throws on non-object input', () => {
      expect(() => parseManifest('hello')).toThrow('Manifest must be a YAML object');
    });

    it('throws on empty input', () => {
      expect(() => parseManifest('')).toThrow('Manifest must be a YAML object');
    });
  });

  describe('validateManifest', () => {
    it('returns valid for correct data', () => {
      const result = validateManifest({
        gabVersion: '0.1.0',
        gabKbVersion: '0.0.1',
        entities: [],
      });
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('rejects additional properties', () => {
      const result = validateManifest({
        gabVersion: '0.1.0',
        gabKbVersion: '0.0.1',
        entities: [],
        extra: 'field',
      });
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('rejects empty gabVersion string', () => {
      const result = validateManifest({
        gabVersion: '',
        gabKbVersion: '0.0.1',
        entities: [],
      });
      expect(result.valid).toBe(false);
    });

    it('rejects entity with missing name', () => {
      const result = validateManifest({
        gabVersion: '0.1.0',
        gabKbVersion: '0.0.1',
        entities: [{ enabled: true }],
      });
      expect(result.valid).toBe(false);
    });
  });

  describe('serializeManifest', () => {
    it('round-trips a manifest', () => {
      const original = createDefaultManifest();
      const yaml = serializeManifest(original);
      const parsed = parseManifest(yaml);
      expect(parsed).toEqual(original);
    });
  });

  describe('createDefaultManifest', () => {
    it('returns a valid default manifest', () => {
      const manifest = createDefaultManifest();
      expect(manifest.gabVersion).toBe('0.1.0');
      expect(manifest.gabKbVersion).toBe('0.0.1');
      expect(manifest.entities).toEqual([]);
    });
  });
});
