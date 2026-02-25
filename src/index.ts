// Public API
export { defaultMacrosConfig } from './default-config.js';
export { emberDataBabelPlugins } from './babel-plugins.js';
export { emberDataResolvePlugin } from './resolve-plugin.js';
export { emberData412 } from './ember-data-412.js';

// Types
export type {
  DebugFlags,
  DeprecationFlags,
  FeatureFlags,
  PackageFlags,
  EnvFlags,
  EmberDataMacrosConfig,
  EmberData412Options,
} from './types.js';

export type { EmberData412Result } from './ember-data-412.js';

// Utilities (exposed for advanced use cases)
export { computeDeprecations } from './utils/compute-deprecations.js';
export { computeEnv } from './utils/compute-env.js';
export { detectPackages } from './utils/detect-packages.js';
export { DEPRECATION_VERSIONS } from './utils/deprecation-versions.js';
export { PACKAGE_ENTRIES, ALL_PACKAGE_NAMES } from './utils/package-entries.js';
