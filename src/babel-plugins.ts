import { createRequire } from 'node:module';
import type { EmberData412Options, EmberDataMacrosConfig } from './types.js';
import { defaultMacrosConfig } from './default-config.js';
import { ALL_PACKAGE_NAMES } from './utils/package-entries.js';

/**
 * Returns an array of babel plugins that configure @embroider/macros
 * with the correct ember-data 4.12 config.
 *
 * All @ember-data packages receive the same config object — this matches
 * the real addon-main.js behavior where every package's configureEmberData()
 * builds an identical config.
 *
 * Usage in babel.config.mjs:
 * ```js
 * import { emberDataBabelPlugins } from 'ember-data-4.12-vite';
 * export default {
 *   plugins: [
 *     ...emberDataBabelPlugins({ compatWith: '4.12' }),
 *     // other plugins
 *   ],
 * };
 * ```
 */
export function emberDataBabelPlugins(options?: EmberData412Options): unknown[] {
  // Use createRequire because @embroider/macros/babel is CJS-only
  // and ESM bundles can't use bare `require()`
  const require = createRequire(import.meta.url);
  const { buildMacros } = require('@embroider/macros/babel') as {
    buildMacros: (opts: {
      setConfig?: Record<string, unknown>;
      dir?: string;
    }) => { babelMacros: unknown[] };
  };

  const config = defaultMacrosConfig(options);

  const setConfig: Record<string, EmberDataMacrosConfig> = {};
  for (const name of ALL_PACKAGE_NAMES) {
    setConfig[name] = config;
  }

  const { babelMacros } = buildMacros({
    setConfig,
    dir: options?.rootDir ?? process.cwd(),
  });

  return babelMacros;
}
