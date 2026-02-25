import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { defaultMacrosConfig } from '../src/default-config.js';

describe('defaultMacrosConfig', () => {
  const originalEnv = { ...process.env };

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it('returns a complete config object with default options', () => {
    const config = defaultMacrosConfig();

    expect(config).toHaveProperty('compatWith');
    expect(config).toHaveProperty('debug');
    expect(config).toHaveProperty('deprecations');
    expect(config).toHaveProperty('features');
    expect(config).toHaveProperty('packages');
    expect(config).toHaveProperty('env');
    expect(config).toHaveProperty('includeDataAdapter');
    expect(config).toHaveProperty('polyfillUUID');
  });

  it('defaults compatWith to null', () => {
    const config = defaultMacrosConfig();
    expect(config.compatWith).toBeNull();
  });

  it('passes through compatWith option', () => {
    const config = defaultMacrosConfig({ compatWith: '4.12' });
    expect(config.compatWith).toBe('4.12');
  });

  it('sets all debug flags to false by default', () => {
    const config = defaultMacrosConfig();
    for (const value of Object.values(config.debug)) {
      expect(value).toBe(false);
    }
  });

  it('allows overriding individual debug flags', () => {
    const config = defaultMacrosConfig({
      debug: { LOG_PAYLOADS: true, LOG_GRAPH: true },
    });
    expect(config.debug.LOG_PAYLOADS).toBe(true);
    expect(config.debug.LOG_GRAPH).toBe(true);
    expect(config.debug.LOG_OPERATIONS).toBe(false);
  });

  it('sets SAMPLE_FEATURE_FLAG to false by default', () => {
    const config = defaultMacrosConfig();
    expect(config.features.SAMPLE_FEATURE_FLAG).toBe(false);
  });

  it('allows overriding feature flags', () => {
    const config = defaultMacrosConfig({
      features: { SAMPLE_FEATURE_FLAG: true },
    });
    expect(config.features.SAMPLE_FEATURE_FLAG).toBe(true);
  });

  it('applies deprecation overrides on top of computed deprecations', () => {
    const config = defaultMacrosConfig({
      compatWith: '4.12',
      deprecations: {
        // Force a resolved deprecation back to true
        DEPRECATE_RSVP_PROMISE: true,
      },
    });

    // The override takes precedence
    expect(config.deprecations.DEPRECATE_RSVP_PROMISE).toBe(true);

    // Other computed values remain
    expect(config.deprecations.DEPRECATE_3_12).toBe(false);
  });

  it('defaults includeDataAdapter to false', () => {
    const config = defaultMacrosConfig();
    expect(config.includeDataAdapter).toBe(false);
  });

  it('defaults polyfillUUID to false', () => {
    const config = defaultMacrosConfig();
    expect(config.polyfillUUID).toBe(false);
  });

  it('respects includeDataAdapter option', () => {
    const config = defaultMacrosConfig({ includeDataAdapter: true });
    expect(config.includeDataAdapter).toBe(true);
  });

  it('computes env flags from process.env', () => {
    process.env.EMBER_ENV = 'production';
    const config = defaultMacrosConfig();
    expect(config.env.PRODUCTION).toBe(true);
    expect(config.env.DEBUG).toBe(false);
  });

  it('allows overriding env flags', () => {
    const config = defaultMacrosConfig({
      env: { TESTING: true, PRODUCTION: false, DEBUG: true },
    });
    expect(config.env.TESTING).toBe(true);
    expect(config.env.PRODUCTION).toBe(false);
    expect(config.env.DEBUG).toBe(true);
  });

  it('allows overriding package detection', () => {
    const config = defaultMacrosConfig({
      packages: {
        HAS_STORE_PACKAGE: true,
        HAS_MODEL_PACKAGE: false,
      },
    });
    expect(config.packages.HAS_STORE_PACKAGE).toBe(true);
    expect(config.packages.HAS_MODEL_PACKAGE).toBe(false);
  });

  it('has correct debug flag keys', () => {
    const config = defaultMacrosConfig();
    const expectedKeys = [
      'LOG_PAYLOADS',
      'LOG_OPERATIONS',
      'LOG_MUTATIONS',
      'LOG_NOTIFICATIONS',
      'LOG_REQUESTS',
      'LOG_REQUEST_STATUS',
      'LOG_IDENTIFIERS',
      'LOG_GRAPH',
      'LOG_INSTANCE_CACHE',
    ];
    expect(Object.keys(config.debug).sort()).toEqual(expectedKeys.sort());
  });
});
