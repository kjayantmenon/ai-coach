import { describe, expect, it } from 'vitest';

import { generate } from '../../src/generator/generator.js';
import type { Kb } from '../../src/kb/types.js';
import type { Manifest } from '../../src/manifest/types.js';

describe('Generator', () => {
    const emptyManifest: Manifest = {
        gabVersion: '0.1.0',
        gabKbVersion: '0.0.1',
        entities: [],
    };

    const emptyKb: Kb = {
        version: '0.0.1',
        entities: [],
    };

    it('generates a project with .sln, .csproj, and README', () => {
        const project = generate(emptyManifest, emptyKb);

        const paths = [...project.keys()].sort();
        expect(paths).toEqual([
            'GabPlugin.sln',
            'GabPlugin/GabPlugin.csproj',
            'README.md',
        ]);
    });

    it('generates a valid solution file', () => {
        const project = generate(emptyManifest, emptyKb);
        const sln = project.get('GabPlugin.sln')!;

        expect(sln).toContain('Microsoft Visual Studio Solution File');
        expect(sln).toContain('GabPlugin');
    });

    it('generates a valid csproj', () => {
        const project = generate(emptyManifest, emptyKb);
        const csproj = project.get('GabPlugin/GabPlugin.csproj')!;

        expect(csproj).toContain('<Project Sdk="Microsoft.NET.Sdk">');
        expect(csproj).toContain('net462');
        expect(csproj).toContain('GabPlugin');
    });

    it('generates README with version info', () => {
        const project = generate(emptyManifest, emptyKb);
        const readme = project.get('README.md')!;

        expect(readme).toContain('GAB Version: 0.1.0');
        expect(readme).toContain('KB Version: 0.0.1');
        expect(readme).toContain('Entities: none');
    });
});
