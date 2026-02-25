# ember-data-4.12-vite

Vite integration for ember-data 4.12. Provides the `@embroider/macros` config and module resolution that `addon-main.js` would normally handle in a classic ember-cli build.

## Why?

Ember-data 4.12 packages are V1 addons whose `addon-main.js` configures `@embroider/macros` at build time via ember-cli hooks. Vite never executes `addon-main.js`, so the macros config is never set and module resolution fails.

This package bridges the gap by:
1. Providing the macros config that `addon-main.js` would have provided
2. Resolving `@ember-data/*` imports to the pre-built `addon/` output

No patching of published 4.12 packages is required.

## Install

```bash
npm install ember-data-4.12-vite
```

## Quick Start (do it all)

```js
import { emberData412 } from 'ember-data-4.12-vite';

const ed = emberData412({ compatWith: '4.12' });

// babel.config.mjs
export default { plugins: [...ed.babelPlugins] };

// vite.config.mjs
export default defineConfig({
  plugins: [...ed.vitePlugins, ember()],
  optimizeDeps: ed.optimizeDeps,
});
```

## Composable API

### `defaultMacrosConfig(options?)`

Returns the full config object. Inspect, tweak, or spread it.

```js
import { defaultMacrosConfig } from 'ember-data-4.12-vite';
const config = defaultMacrosConfig({ compatWith: '4.12' });
```

### `emberDataBabelPlugins(options?)`

Returns a babel plugin array with `@embroider/macros` configured for ember-data.

```js
import { emberDataBabelPlugins } from 'ember-data-4.12-vite';
export default { plugins: [...emberDataBabelPlugins({ compatWith: '4.12' })] };
```

### `emberDataResolvePlugin(options?)`

Vite plugin that resolves `@ember-data/*` imports to the correct `addon/` files.

```js
import { emberDataResolvePlugin } from 'ember-data-4.12-vite';
export default defineConfig({
  plugins: [emberDataResolvePlugin(), ember()],
});
```

## Options

```ts
interface EmberData412Options {
  compatWith?: string | null;   // e.g. '4.12' — controls deprecation stripping
  rootDir?: string;             // defaults to process.cwd()
  polyfillUUID?: boolean;       // default false
  includeDataAdapter?: boolean; // default false
  debug?: Partial<DebugFlags>;
  deprecations?: Partial<DeprecationFlags>;
  features?: Partial<FeatureFlags>;
  packages?: Partial<PackageFlags>;
  env?: Partial<EnvFlags>;
}
```

## License

MIT
