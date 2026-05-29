import { describe, expect, it } from 'vitest';

import type { GeneratedProject } from '../../src/generator/types.js';
import { verify } from '../../src/verifier/roslyn.js';

describe('RoslynVerifier', () => {
  it('returns no diagnostics for project without C# files', () => {
    const project: GeneratedProject = new Map([
      ['README.md', '# Hello'],
      ['Project.sln', 'solution content'],
    ]);

    const diagnostics = verify(project);
    expect(diagnostics).toEqual([]);
  });

  it('returns no diagnostics for non-empty C# file', () => {
    const project: GeneratedProject = new Map([
      ['Plugin.cs', 'namespace Foo { public class Bar {} }'],
    ]);

    const diagnostics = verify(project);
    expect(diagnostics).toEqual([]);
  });

  it('returns error for empty C# file', () => {
    const project: GeneratedProject = new Map([['Plugin.cs', '   ']]);

    const diagnostics = verify(project);
    expect(diagnostics).toHaveLength(1);
    expect(diagnostics[0].severity).toBe('error');
    expect(diagnostics[0].file).toBe('Plugin.cs');
  });
});
