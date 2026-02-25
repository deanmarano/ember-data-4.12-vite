import type {
  DebugFlags,
  EmberData412Options,
  EmberDataMacrosConfig,
} from './types.js';
import { computeDeprecations } from './utils/compute-deprecations.js';
import { computeEnv } from './utils/compute-env.js';
import { detectPackages } from './utils/detect-packages.js';

const DEFAULT_DEBUG_FLAGS: DebugFlags = {
  LOG_PAYLOADS: false,
  LOG_OPERATIONS: false,
  LOG_MUTATIONS: false,
  LOG_NOTIFICATIONS: false,
  LOG_REQUESTS: false,
  LOG_REQUEST_STATUS: false,
  LOG_IDENTIFIERS: false,
  LOG_GRAPH: false,
  LOG_INSTANCE_CACHE: false,
};

/**
 * Build the full macros config object that @embroider/macros will use
 * for all @ember-data packages.
 *
 * This replicates what each package's `addon-main.js` `configureEmberData()`
 * method does at build time in a classic ember-cli build.
 */
export function defaultMacrosConfig(options?: EmberData412Options): EmberDataMacrosConfig {
  const compatWith = options?.compatWith ?? null;
  const rootDir = options?.rootDir;

  // 1. Deprecation flags from compatWith
  const baseDeprecations = computeDeprecations(compatWith);
  const deprecations = options?.deprecations
    ? { ...baseDeprecations, ...options.deprecations }
    : baseDeprecations;

  // 2. Debug flags (all false by default)
  const debug = options?.debug
    ? { ...DEFAULT_DEBUG_FLAGS, ...options.debug }
    : { ...DEFAULT_DEBUG_FLAGS };

  // 3. Feature flags (only one in 4.12)
  const features = {
    SAMPLE_FEATURE_FLAG: false,
    ...options?.features,
  };

  // 4. Auto-detect installed packages
  const basePackages = detectPackages(rootDir);
  const packages = options?.packages
    ? { ...basePackages, ...options.packages }
    : basePackages;

  // 5. Environment flags
  const baseEnv = computeEnv();
  const env = options?.env
    ? { ...baseEnv, ...options.env }
    : baseEnv;

  // 6. Additional flags
  const includeDataAdapter = options?.includeDataAdapter ?? false;
  const polyfillUUID = options?.polyfillUUID ?? false;

  return {
    compatWith,
    debug,
    deprecations,
    features,
    packages,
    env,
    includeDataAdapter,
    polyfillUUID,
  };
}
