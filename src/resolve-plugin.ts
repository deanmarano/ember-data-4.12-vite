import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { existsSync } from 'node:fs';
import type { EmberData412Options } from './types.js';
import { PACKAGE_ENTRIES } from './utils/package-entries.js';

interface ResolveMap {
  [specifier: string]: string;
}

const VIRTUAL_VERSION_ID = '\0ember-data/version';

/**
 * Vite plugin that resolves `@ember-data/*` imports to the pre-built
 * `addon/` directory files in each package's node_modules location.
 *
 * - `enforce: 'pre'` so it runs before @embroider/vite's resolver
 * - Handles `ember-data/version` as a virtual module
 * - For each known entry point, resolves to the addon/ file
 *
 * Usage in vite.config.mjs:
 * ```js
 * import { emberDataResolvePlugin } from 'ember-data-4.12-vite';
 * export default defineConfig({
 *   plugins: [emberDataResolvePlugin(), ember()],
 * });
 * ```
 */
export function emberDataResolvePlugin(options?: EmberData412Options) {
  let resolveMap: ResolveMap | null = null;
  let emberDataVersion: string | null = null;

  function getResolveMap(rootDir: string): ResolveMap {
    if (resolveMap) return resolveMap;

    const require = createRequire(rootDir + '/package.json');
    resolveMap = {};

    for (const [packageName, { entries }] of Object.entries(PACKAGE_ENTRIES)) {
      let packageDir: string;
      try {
        // Resolve the package's package.json to find its directory
        const pkgJsonPath = require.resolve(`${packageName}/package.json`);
        packageDir = dirname(pkgJsonPath);
      } catch {
        // Package not installed — skip
        continue;
      }

      const addonDir = join(packageDir, 'addon');

      for (const [suffix, file] of Object.entries(entries)) {
        const specifier = packageName + suffix;
        const resolved = join(addonDir, file);

        // Check if .js exists; if not, try .ts (ember-data meta-package ships .ts)
        if (existsSync(resolved)) {
          resolveMap[specifier] = resolved;
        } else {
          const tsPath = resolved.replace(/\.js$/, '.ts');
          if (existsSync(tsPath)) {
            resolveMap[specifier] = tsPath;
          }
        }
      }
    }

    // Also handle ember-data meta-package entries
    try {
      const emberDataPkgPath = require.resolve('ember-data/package.json');
      const emberDataDir = dirname(emberDataPkgPath);
      const emberDataAddon = join(emberDataDir, 'addon');

      // ember-data re-exports
      const emberDataEntries: Record<string, string> = {
        'ember-data': 'index.js',
        'ember-data/store': 'store.ts',
        'ember-data/model': 'model.ts',
        'ember-data/adapter': 'adapter.ts',
        'ember-data/serializer': 'serializer.ts',
        'ember-data/attr': 'attr.ts',
        'ember-data/relationships': 'relationships.ts',
        'ember-data/transform': 'transform.ts',
        'ember-data/setup-container': 'setup-container.ts',
      };

      for (const [specifier, file] of Object.entries(emberDataEntries)) {
        const resolved = join(emberDataAddon, file);
        if (existsSync(resolved)) {
          resolveMap[specifier] = resolved;
        } else {
          const jsPath = resolved.replace(/\.ts$/, '.js');
          if (existsSync(jsPath)) {
            resolveMap[specifier] = jsPath;
          }
        }
      }

      // Read version for virtual module
      try {
        const pkg = JSON.parse(
          require('node:fs').readFileSync(emberDataPkgPath, 'utf-8')
        );
        emberDataVersion = pkg.version;
      } catch {
        emberDataVersion = '4.12.0';
      }
    } catch {
      // ember-data meta-package not installed
    }

    return resolveMap;
  }

  return {
    name: 'ember-data-4.12-resolve',
    enforce: 'pre' as const,

    resolveId(source: string) {
      // Handle ember-data/version virtual module
      if (source === 'ember-data/version') {
        return VIRTUAL_VERSION_ID;
      }

      const rootDir = options?.rootDir ?? process.cwd();
      const map = getResolveMap(rootDir);
      const resolved = map[source];
      if (resolved) {
        return resolved;
      }

      return undefined;
    },

    load(id: string) {
      if (id === VIRTUAL_VERSION_ID) {
        const version = emberDataVersion ?? '4.12.0';
        return `export default '${version}';`;
      }
      return undefined;
    },
  };
}
