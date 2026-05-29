#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

import { Command } from 'commander';

import { generate } from '../generator/generator.js';
import { KbStore } from '../kb/store.js';
import { createDefaultManifest, parseManifest, serializeManifest } from '../manifest/model.js';
import { verify } from '../verifier/roslyn.js';
import { writeProject } from '../writer/project-writer.js';

const program = new Command();

program
  .name('gab')
  .description('GAB CLI – code generation tool for Dynamics 365 plugins')
  .version('0.1.0');

program
  .command('init <dir>')
  .description('Create a new project directory with a default gab.manifest.yaml')
  .action(async (dir: string) => {
    const targetDir = resolve(dir);
    const manifest = createDefaultManifest();
    const yamlContent = serializeManifest(manifest);

    const { mkdir, writeFile } = await import('node:fs/promises');
    await mkdir(targetDir, { recursive: true });
    await writeFile(join(targetDir, 'gab.manifest.yaml'), yamlContent, 'utf-8');

    process.stdout.write(`Initialized project in ${targetDir}\n`);
  });

program
  .command('generate')
  .description('Generate project files from the manifest in the current directory')
  .action(async () => {
    const cwd = process.cwd();
    const manifestPath = join(cwd, 'gab.manifest.yaml');

    let yamlContent: string;
    try {
      yamlContent = await readFile(manifestPath, 'utf-8');
    } catch {
      process.stderr.write(`Error: gab.manifest.yaml not found in ${cwd}\n`);
      process.exitCode = 1;
      return;
    }

    const manifest = parseManifest(yamlContent);
    const kbStore = new KbStore(manifest.gabKbVersion);
    const kb = kbStore.load(manifest.gabKbVersion);

    const project = generate(manifest, kb);

    const diagnostics = verify(project);
    if (diagnostics.length > 0) {
      process.stderr.write('Verification failed:\n');
      for (const d of diagnostics) {
        process.stderr.write(`  ${d.file}(${d.line},${d.column}): ${d.severity} – ${d.message}\n`);
      }
      process.exitCode = 1;
      return;
    }

    await writeProject(project, cwd);
    process.stdout.write(`Generated ${project.size} files in ${cwd}\n`);
  });

program
  .command('kb')
  .description('Knowledge base commands')
  .command('info')
  .description('Print active KB version and supported range')
  .action(() => {
    const kbStore = new KbStore('0.0.1');
    const range = kbStore.getSupportedRange();
    const active = kbStore.getActiveVersion();

    process.stdout.write(`Active KB version: ${active}\n`);
    process.stdout.write(`Supported range:   ${range.min} – ${range.max}\n`);
  });

program.parse();
