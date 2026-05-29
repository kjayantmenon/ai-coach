import type { Kb, KbVersionRange } from './types.js';

const SUPPORTED_RANGE: KbVersionRange = { min: '0.0.1', max: '0.1.0' };

const KB_REGISTRY: Record<string, Kb> = {
  '0.0.1': {
    version: '0.0.1',
    entities: [],
  },
};

export class KbStore {
  private activeVersion: string;

  public constructor(version: string) {
    this.activeVersion = version;
  }

  public load(version: string): Kb {
    const kb = KB_REGISTRY[version];

    if (!kb) {
      throw new Error(
        `KB version "${version}" not found. Supported range: ${SUPPORTED_RANGE.min} – ${SUPPORTED_RANGE.max}`,
      );
    }

    this.activeVersion = version;
    return kb;
  }

  public getActiveVersion(): string {
    return this.activeVersion;
  }

  public getSupportedRange(): KbVersionRange {
    return SUPPORTED_RANGE;
  }
}
