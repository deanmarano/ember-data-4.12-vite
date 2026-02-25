export interface DebugFlags {
  LOG_PAYLOADS: boolean;
  LOG_OPERATIONS: boolean;
  LOG_MUTATIONS: boolean;
  LOG_NOTIFICATIONS: boolean;
  LOG_REQUESTS: boolean;
  LOG_REQUEST_STATUS: boolean;
  LOG_IDENTIFIERS: boolean;
  LOG_GRAPH: boolean;
  LOG_INSTANCE_CACHE: boolean;
}

export interface DeprecationFlags {
  DEPRECATE_CATCH_ALL: boolean;
  DEPRECATE_3_12: boolean;
  DEPRECATE_RSVP_PROMISE: boolean;
  DEPRECATE_SAVE_PROMISE_ACCESS: boolean;
  DEPRECATE_SNAPSHOT_MODEL_CLASS_ACCESS: boolean;
  DEPRECATE_STORE_FIND: boolean;
  DEPRECATE_HAS_RECORD: boolean;
  DEPRECATE_STRING_ARG_SCHEMAS: boolean;
  DEPRECATE_JSON_API_FALLBACK: boolean;
  DEPRECATE_MODEL_REOPEN: boolean;
  DEPRECATE_EARLY_STATIC: boolean;
  DEPRECATE_HELPERS: boolean;
  DEPRECATE_PROMISE_MANY_ARRAY_BEHAVIORS: boolean;
  DEPRECATE_V1CACHE_STORE_APIS: boolean;
  DEPRECATE_RELATIONSHIPS_WITHOUT_TYPE: boolean;
  DEPRECATE_RELATIONSHIPS_WITHOUT_ASYNC: boolean;
  DEPRECATE_RELATIONSHIPS_WITHOUT_INVERSE: boolean;
  DEPRECATE_V1_RECORD_DATA: boolean;
  DEPRECATE_A_USAGE: boolean;
  DEPRECATE_PROMISE_PROXIES: boolean;
  DEPRECATE_ARRAY_LIKE: boolean;
  DEPRECATE_COMPUTED_CHAINS: boolean;
  DEPRECATE_NON_EXPLICIT_POLYMORPHISM: boolean;
  DEPRECATE_INSTANTIATE_RECORD_ARGS: boolean;
}

export interface FeatureFlags {
  SAMPLE_FEATURE_FLAG: boolean;
}

export interface PackageFlags {
  HAS_EMBER_DATA_PACKAGE: boolean;
  HAS_STORE_PACKAGE: boolean;
  HAS_MODEL_PACKAGE: boolean;
  HAS_JSON_API_PACKAGE: boolean;
  HAS_GRAPH_PACKAGE: boolean;
  HAS_REQUEST_PACKAGE: boolean;
  HAS_COMPAT_PACKAGE: boolean;
  HAS_TRACKING_PACKAGE: boolean;
  HAS_ADAPTER_PACKAGE: boolean;
  HAS_SERIALIZER_PACKAGE: boolean;
  HAS_DEBUG_PACKAGE: boolean;
}

export interface EnvFlags {
  TESTING: boolean;
  PRODUCTION: boolean;
  DEBUG: boolean;
}

export interface EmberDataMacrosConfig {
  compatWith: string | null;
  debug: DebugFlags;
  deprecations: DeprecationFlags;
  features: FeatureFlags;
  includeDataAdapter: boolean;
  packages: PackageFlags;
  env: EnvFlags;
  polyfillUUID: boolean;
}

export interface EmberData412Options {
  compatWith?: string | null;
  rootDir?: string;
  polyfillUUID?: boolean;
  includeDataAdapter?: boolean;
  debug?: Partial<DebugFlags>;
  deprecations?: Partial<DeprecationFlags>;
  features?: Partial<FeatureFlags>;
  packages?: Partial<PackageFlags>;
  env?: Partial<EnvFlags>;
}
