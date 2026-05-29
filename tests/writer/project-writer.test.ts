import { existsSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import type { GeneratedProject } from '../../src/generator/types.js';
import { writeProject } from '../../src/writer/project-writer.js';

describe('ProjectWriter', () => {
  let testDir: string;

  beforeEach(() => {
    testDir = join(tmpdir(), `gab-writer-test-${Date.now()}`);
  });

  afterEach(() => {
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true });
    }
  });

  it('writes files from a generated project', async () => {
    const project: GeneratedProject = new Map([
      ['README.md', '# Test'],
      ['src/Plugin.cs', 'namespace Test {}'],
    ]);

    await writeProject(project, testDir);

    expect(existsSync(join(testDir, 'README.md'))).toBe(true);
    expect(existsSync(join(testDir, 'src/Plugin.cs'))).toBe(true);
    expect(readFileSync(join(testDir, 'README.md'), 'utf-8')).toBe('# Test');
    expect(readFileSync(join(testDir, 'src/Plugin.cs'), 'utf-8')).toBe('namespace Test {}');
  });

  it('creates nested directories', async () => {
    const project: GeneratedProject = new Map([['a/b/c/deep.txt', 'content']]);

    await writeProject(project, testDir);

    expect(existsSync(join(testDir, 'a/b/c/deep.txt'))).toBe(true);
  });

  it('handles empty project', async () => {
    const project: GeneratedProject = new Map();
    await writeProject(project, testDir);
    // Should not throw
  });
});
