import { describe, it, expect } from 'vitest';
import { emberDataResolvePlugin } from '../src/resolve-plugin.js';
import { PACKAGE_ENTRIES } from '../src/utils/package-entries.js';

describe('emberDataResolvePlugin', () => {
  it('returns a vite plugin object', () => {
    const plugin = emberDataResolvePlugin();
    expect(plugin).toHaveProperty('name', 'ember-data-4.12-resolve');
    expect(plugin).toHaveProperty('enforce', 'pre');
    expect(plugin).toHaveProperty('resolveId');
    expect(plugin).toHaveProperty('load');
    expect(typeof plugin.resolveId).toBe('function');
    expect(typeof plugin.load).toBe('function');
  });

  it('resolves ember-data/version to a virtual module id', () => {
    const plugin = emberDataResolvePlugin();
    const result = plugin.resolveId('ember-data/version');
    expect(result).toBe('\0ember-data/version');
  });

  it('loads the virtual version module', () => {
    const plugin = emberDataResolvePlugin();
    const result = plugin.load('\0ember-data/version');
    expect(result).toMatch(/^export default '[^']+';$/);
  });

  it('returns undefined for non-virtual module loads', () => {
    const plugin = emberDataResolvePlugin();
    const result = plugin.load('some-other-module');
    expect(result).toBeUndefined();
  });

  it('returns undefined for unknown specifiers', () => {
    const plugin = emberDataResolvePlugin();
    const result = plugin.resolveId('totally-unknown-package');
    expect(result).toBeUndefined();
  });

  it('PACKAGE_ENTRIES has correct structure', () => {
    // Verify the entry map structure
    for (const [pkg, { entries }] of Object.entries(PACKAGE_ENTRIES)) {
      expect(pkg).toMatch(/^@ember-data\//);
      expect(typeof entries).toBe('object');
      for (const [suffix, file] of Object.entries(entries)) {
        expect(typeof suffix).toBe('string');
        expect(file).toMatch(/\.js$/);
      }
    }
  });

  it('graph package has no index entry', () => {
    const graphEntries = PACKAGE_ENTRIES['@ember-data/graph'].entries;
    expect(graphEntries['']).toBeUndefined();
    expect(graphEntries['/-private']).toBe('-private.js');
  });

  it('store package has index and -private entries', () => {
    const storeEntries = PACKAGE_ENTRIES['@ember-data/store'].entries;
    expect(storeEntries['']).toBe('index.js');
    expect(storeEntries['/-private']).toBe('-private.js');
  });

  it('adapter package has all expected entries', () => {
    const adapterEntries = PACKAGE_ENTRIES['@ember-data/adapter'].entries;
    expect(adapterEntries['']).toBe('index.js');
    expect(adapterEntries['/-private']).toBe('-private.js');
    expect(adapterEntries['/error']).toBe('error.js');
    expect(adapterEntries['/json-api']).toBe('json-api.js');
    expect(adapterEntries['/rest']).toBe('rest.js');
  });

  it('serializer package has all expected entries', () => {
    const serializerEntries = PACKAGE_ENTRIES['@ember-data/serializer'].entries;
    expect(serializerEntries['']).toBe('index.js');
    expect(serializerEntries['/transform']).toBe('transform.js');
    expect(serializerEntries['/json']).toBe('json.js');
    expect(serializerEntries['/json-api']).toBe('json-api.js');
    expect(serializerEntries['/rest']).toBe('rest.js');
  });
});
