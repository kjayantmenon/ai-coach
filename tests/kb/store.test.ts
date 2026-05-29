import { describe, expect, it } from 'vitest';

import { KbStore } from '../../src/kb/store.js';

describe('KbStore', () => {
  it('loads KB version 0.0.1', () => {
    const store = new KbStore('0.0.1');
    const kb = store.load('0.0.1');
    expect(kb.version).toBe('0.0.1');
    expect(kb.entities).toEqual([]);
  });

  it('throws on unknown version', () => {
    const store = new KbStore('0.0.1');
    expect(() => store.load('99.99.99')).toThrow('not found');
  });

  it('returns active version', () => {
    const store = new KbStore('0.0.1');
    expect(store.getActiveVersion()).toBe('0.0.1');
  });

  it('returns supported range', () => {
    const store = new KbStore('0.0.1');
    const range = store.getSupportedRange();
    expect(range.min).toBe('0.0.1');
    expect(range.max).toBe('0.1.0');
  });

  it('updates active version on load', () => {
    const store = new KbStore('0.0.1');
    store.load('0.0.1');
    expect(store.getActiveVersion()).toBe('0.0.1');
  });
});
