/**
 * Maps each @ember-data package to its addon/ entry points.
 * Derived from the rollup `publicEntrypoints` config in each package.
 *
 * Key = bare package specifier suffix (e.g. '' for index, '/-private' for -private)
 * Value = relative path within addon/ directory
 */
export interface PackageEntryMap {
  /** Import specifier suffix → addon/ relative path */
  entries: Record<string, string>;
}

export const PACKAGE_ENTRIES: Record<string, PackageEntryMap> = {
  '@ember-data/store': {
    entries: {
      '': 'index.js',
      '/-private': '-private.js',
    },
  },
  '@ember-data/model': {
    entries: {
      '': 'index.js',
      '/-private': '-private.js',
    },
  },
  '@ember-data/adapter': {
    entries: {
      '': 'index.js',
      '/-private': '-private.js',
      '/error': 'error.js',
      '/json-api': 'json-api.js',
      '/rest': 'rest.js',
    },
  },
  '@ember-data/serializer': {
    entries: {
      '': 'index.js',
      '/-private': '-private.js',
      '/transform': 'transform.js',
      '/json': 'json.js',
      '/json-api': 'json-api.js',
      '/rest': 'rest.js',
    },
  },
  '@ember-data/graph': {
    entries: {
      // graph has no index.js — only -private
      '/-private': '-private.js',
    },
  },
  '@ember-data/json-api': {
    entries: {
      '': 'index.js',
    },
  },
  '@ember-data/legacy-compat': {
    entries: {
      '': 'index.js',
      '/-private': '-private.js',
    },
  },
  '@ember-data/request': {
    entries: {
      '': 'index.js',
      '/fetch': 'fetch.js',
    },
  },
  '@ember-data/tracking': {
    entries: {
      '': 'index.js',
      '/-private': '-private.js',
    },
  },
};

/**
 * All @ember-data package names that receive macros config via setConfig.
 * This includes packages that may not have addon/ entries (like ember-data itself)
 * but still need macros configuration.
 */
export const ALL_PACKAGE_NAMES = [
  'ember-data',
  '@ember-data/store',
  '@ember-data/model',
  '@ember-data/adapter',
  '@ember-data/serializer',
  '@ember-data/graph',
  '@ember-data/json-api',
  '@ember-data/legacy-compat',
  '@ember-data/request',
  '@ember-data/tracking',
  '@ember-data/debug',
];
