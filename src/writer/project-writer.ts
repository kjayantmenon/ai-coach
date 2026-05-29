import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

import type { GeneratedProject } from '../generator/types.js';

export async function writeProject(project: GeneratedProject, outputDir: string): Promise<void> {
    for (const [relativePath, content] of project) {
        const fullPath = join(outputDir, relativePath);
        const dir = dirname(fullPath);

        await mkdir(dir, { recursive: true });
        await writeFile(fullPath, content, 'utf-8');
    }
}
