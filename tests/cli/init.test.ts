import { existsSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('CLI integration: gab init', () => {
  let testDir: string;
  const cliBin = join(import.meta.dirname, '../../dist/cli/host.js');

  beforeEach(() => {
    testDir = join(tmpdir(), `gab-init-test-${Date.now()}`);
  });

  afterEach(() => {
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true });
    }
  });

  it('creates a directory with gab.manifest.yaml', () => {
    execFileSync('node', [cliBin, 'init', testDir], { encoding: 'utf-8' });

    const manifestPath = join(testDir, 'gab.manifest.yaml');
    expect(existsSync(manifestPath)).toBe(true);

    const content = readFileSync(manifestPath, 'utf-8');
    expect(content).toContain('gabVersion');
    expect(content).toContain('gabKbVersion');
    expect(content).toContain('entities');
  });

  it('exits with code 0', () => {
    // execFileSync throws on non-zero exit
    const result = execFileSync('node', [cliBin, 'init', testDir], { encoding: 'utf-8' });
    expect(result).toContain('Initialized project');
  });
});
