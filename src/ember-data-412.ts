import type { EmberData412Options, EmberDataMacrosConfig } from './types.js';
import { defaultMacrosConfig } from './default-config.js';
import { emberDataBabelPlugins } from './babel-plugins.js';
import { emberDataResolvePlugin } from './resolve-plugin.js';
import { PACKAGE_ENTRIES } from './utils/package-entries.js';

export interface EmberData412Result {
  /** Babel plugins array — spread into babel.config plugins */
  babelPlugins: unknown[];
  /** Vite plugins array — spread into vite.config plugins */
  vitePlugins: unknown[];
  /** The raw macros config object for inspection/customization */
  macrosConfig: EmberDataMacrosConfig;
  /** Vite optimizeDeps.include entries for pre-bundling */
  optimizeDeps: { include: string[] };
}

/**
 * Convenience wrapper that composes all pieces needed for ember-data 4.12
 * in a Vite + Embroider build.
 *
 * Usage:
 * ```js
 * import { emberData412 } from 'ember-data-4.12-vite';
 *
 * const ed = emberData412({ compatWith: '4.12' });
 *
 * // babel.config.mjs
 * export default { plugins: [...ed.babelPlugins, ...otherPlugins] };
 *
 * // vite.config.mjs
 * export default defineConfig({
 *   plugins: [...ed.vitePlugins, ember()],
 *   optimizeDeps: ed.optimizeDeps,
 * });
 * ```
 */
export function emberData412(options?: EmberData412Options): EmberData412Result {
  const macrosConfig = defaultMacrosConfig(options);
  const babelPlugins = emberDataBabelPlugins(options);
  const resolvePlugin = emberDataResolvePlugin(options);

  // Build optimizeDeps.include from known package entry points
  const include: string[] = [];
  for (const [packageName, { entries }] of Object.entries(PACKAGE_ENTRIES)) {
    for (const suffix of Object.keys(entries)) {
      include.push(packageName + suffix);
    }
  }

  return {
    babelPlugins,
    vitePlugins: [resolvePlugin],
    macrosConfig,
    optimizeDeps: { include },
  };
}
