import type { GeneratedProject } from '../generator/types.js';

import type { Diagnostic } from './types.js';

/**
 * Verifies that the generated C# compiles without errors.
 *
 * For the walking skeleton, this is a stub that performs no real Roslyn
 * compilation. When entities are enabled and C# files are emitted, this
 * will shell out to `dotnet build` or use a Roslyn-based in-process compiler.
 */
export function verify(project: GeneratedProject): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];

  for (const [filePath, content] of project) {
    if (!filePath.endsWith('.cs')) {
      continue;
    }

    // Stub: verify file is non-empty
    if (content.trim().length === 0) {
      diagnostics.push({
        file: filePath,
        line: 0,
        column: 0,
        severity: 'error',
        message: 'Empty C# file',
      });
    }
  }

  return diagnostics;
}
