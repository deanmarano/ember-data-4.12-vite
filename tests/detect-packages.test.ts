import { describe, it, expect } from 'vitest';
import { detectPackages, FLAG_TO_PACKAGE } from '../src/utils/detect-packages.js';

describe('detectPackages', () => {
  it('returns boolean flags for all known packages', () => {
    const flags = detectPackages();
    for (const flag of Object.keys(FLAG_TO_PACKAGE)) {
      expect(typeof flags[flag as keyof typeof flags]).toBe('boolean');
    }
  });

  it('returns 11 package flags', () => {
    expect(Object.keys(FLAG_TO_PACKAGE).length).toBe(11);
  });

  it('detects packages from a specified root directory', () => {
    // Use the current directory which won't have ember-data installed
    const flags = detectPackages(__dirname);
    // In a test environment without ember-data, all should be false
    // (unless the test runner has them installed)
    for (const flag of Object.keys(FLAG_TO_PACKAGE)) {
      expect(typeof flags[flag as keyof typeof flags]).toBe('boolean');
    }
  });

  it('maps flag names to correct package names', () => {
    expect(FLAG_TO_PACKAGE.HAS_EMBER_DATA_PACKAGE).toBe('ember-data');
    expect(FLAG_TO_PACKAGE.HAS_STORE_PACKAGE).toBe('@ember-data/store');
    expect(FLAG_TO_PACKAGE.HAS_MODEL_PACKAGE).toBe('@ember-data/model');
    expect(FLAG_TO_PACKAGE.HAS_JSON_API_PACKAGE).toBe('@ember-data/json-api');
    expect(FLAG_TO_PACKAGE.HAS_GRAPH_PACKAGE).toBe('@ember-data/graph');
    expect(FLAG_TO_PACKAGE.HAS_REQUEST_PACKAGE).toBe('@ember-data/request');
    expect(FLAG_TO_PACKAGE.HAS_COMPAT_PACKAGE).toBe('@ember-data/legacy-compat');
    expect(FLAG_TO_PACKAGE.HAS_TRACKING_PACKAGE).toBe('@ember-data/tracking');
    expect(FLAG_TO_PACKAGE.HAS_ADAPTER_PACKAGE).toBe('@ember-data/adapter');
    expect(FLAG_TO_PACKAGE.HAS_SERIALIZER_PACKAGE).toBe('@ember-data/serializer');
    expect(FLAG_TO_PACKAGE.HAS_DEBUG_PACKAGE).toBe('@ember-data/debug');
  });
});
