import type { EnvFlags } from '../types.js';

/**
 * Compute environment flags from process.env.
 * Mirrors the logic in @ember-data/private-build-infra/src/utilities/get-env.js
 */
export function computeEnv(): EnvFlags {
  const env = process.env;
  const isProd = env.EMBER_ENV === 'production';
  const isTest = env.EMBER_ENV === 'test';

  const PRODUCTION = isProd;
  const DEBUG = !isProd;
  const TESTING = !isProd || isTest || Boolean(env.IS_TESTING) || Boolean(env.EMBER_CLI_TEST_COMMAND);

  return {
    TESTING,
    PRODUCTION,
    DEBUG,
  };
}
