import { createRequire } from 'node:module';
import type { PackageFlags } from '../types.js';

/**
 * Map of package flag names to npm package names.
 * Source of truth: @ember-data/private-build-infra/virtual-packages/packages.js
 */
const FLAG_TO_PACKAGE: Record<string, string> = {
  HAS_EMBER_DATA_PACKAGE: 'ember-data',
  HAS_STORE_PACKAGE: '@ember-data/store',
  HAS_MODEL_PACKAGE: '@ember-data/model',
  HAS_JSON_API_PACKAGE: '@ember-data/json-api',
  HAS_GRAPH_PACKAGE: '@ember-data/graph',
  HAS_REQUEST_PACKAGE: '@ember-data/request',
  HAS_COMPAT_PACKAGE: '@ember-data/legacy-compat',
  HAS_TRACKING_PACKAGE: '@ember-data/tracking',
  HAS_ADAPTER_PACKAGE: '@ember-data/adapter',
  HAS_SERIALIZER_PACKAGE: '@ember-data/serializer',
  HAS_DEBUG_PACKAGE: '@ember-data/debug',
};

/**
 * Auto-detect which @ember-data packages are installed by attempting to
 * resolve each one from the given root directory.
 */
export function detectPackages(rootDir?: string): PackageFlags {
  const require = createRequire((rootDir ?? process.cwd()) + '/package.json');
  const flags: Record<string, boolean> = {};

  for (const [flag, packageName] of Object.entries(FLAG_TO_PACKAGE)) {
    try {
      require.resolve(packageName);
      flags[flag] = true;
    } catch {
      flags[flag] = false;
    }
  }

  return flags as unknown as PackageFlags;
}

export { FLAG_TO_PACKAGE };
