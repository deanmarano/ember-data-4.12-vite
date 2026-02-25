import semver from 'semver';
import type { DeprecationFlags } from '../types.js';
import { DEPRECATION_VERSIONS } from './deprecation-versions.js';

/**
 * Compute deprecation flags based on a compatibility version.
 *
 * If `compatWith` is provided, any deprecation introduced at or before that
 * version is considered "resolved" and its flag is set to `false` (strip the
 * deprecated code path). Unresolved deprecations are `true` (keep the code).
 *
 * If `compatWith` is null/undefined, all flags default to `true` (keep all
 * deprecated code).
 */
export function computeDeprecations(compatWith?: string | null): DeprecationFlags {
  const flags: Record<string, boolean> = {};

  for (const [flag, deprecatedSince] of Object.entries(DEPRECATION_VERSIONS)) {
    let flagState = true; // default: keep deprecated code

    if (compatWith) {
      const sinceMin = semver.minVersion(deprecatedSince);
      const compatMin = semver.minVersion(compatWith);
      if (sinceMin && compatMin) {
        const isResolved = semver.lte(sinceMin, compatMin);
        flagState = !isResolved;
      }
    }

    flags[flag] = flagState;
  }

  return flags as unknown as DeprecationFlags;
}
