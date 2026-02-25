import { describe, it, expect } from 'vitest';
import { computeDeprecations } from '../src/utils/compute-deprecations.js';
import { DEPRECATION_VERSIONS } from '../src/utils/deprecation-versions.js';

describe('computeDeprecations', () => {
  it('returns all flags as true when no compatWith is provided', () => {
    const flags = computeDeprecations();
    for (const key of Object.keys(DEPRECATION_VERSIONS)) {
      expect(flags[key as keyof typeof flags]).toBe(true);
    }
  });

  it('returns all flags as true when compatWith is null', () => {
    const flags = computeDeprecations(null);
    for (const key of Object.keys(DEPRECATION_VERSIONS)) {
      expect(flags[key as keyof typeof flags]).toBe(true);
    }
  });

  it('strips deprecations at or before compatWith version', () => {
    const flags = computeDeprecations('4.12');

    // 3.12 <= 4.12 → resolved → false
    expect(flags.DEPRECATE_3_12).toBe(false);

    // 4.4 <= 4.12 → resolved → false
    expect(flags.DEPRECATE_RSVP_PROMISE).toBe(false);
    expect(flags.DEPRECATE_SAVE_PROMISE_ACCESS).toBe(false);

    // 4.5 <= 4.12 → resolved → false
    expect(flags.DEPRECATE_SNAPSHOT_MODEL_CLASS_ACCESS).toBe(false);
    expect(flags.DEPRECATE_STORE_FIND).toBe(false);
    expect(flags.DEPRECATE_HAS_RECORD).toBe(false);

    // 4.7 <= 4.12 → resolved → false
    expect(flags.DEPRECATE_MODEL_REOPEN).toBe(false);
    expect(flags.DEPRECATE_PROMISE_PROXIES).toBe(false);
    expect(flags.DEPRECATE_ARRAY_LIKE).toBe(false);

    // 4.12 <= 4.12 → resolved → false
    expect(flags.DEPRECATE_V1_RECORD_DATA).toBe(false);
    expect(flags.DEPRECATE_INSTANTIATE_RECORD_ARGS).toBe(false);

    // 5.0 > 4.12 → not resolved → true
    expect(flags.DEPRECATE_COMPUTED_CHAINS).toBe(true);

    // 99.0 > 4.12 → not resolved → true
    expect(flags.DEPRECATE_CATCH_ALL).toBe(true);
  });

  it('handles partial version stripping with compatWith 4.5', () => {
    const flags = computeDeprecations('4.5');

    // 3.12 <= 4.5 → false
    expect(flags.DEPRECATE_3_12).toBe(false);

    // 4.4 <= 4.5 → false
    expect(flags.DEPRECATE_RSVP_PROMISE).toBe(false);

    // 4.5 <= 4.5 → false
    expect(flags.DEPRECATE_STORE_FIND).toBe(false);
    expect(flags.DEPRECATE_HAS_RECORD).toBe(false);

    // 4.7 > 4.5 → true (keep deprecated code)
    expect(flags.DEPRECATE_MODEL_REOPEN).toBe(true);
    expect(flags.DEPRECATE_PROMISE_PROXIES).toBe(true);

    // 4.12 > 4.5 → true
    expect(flags.DEPRECATE_V1_RECORD_DATA).toBe(true);
  });

  it('handles compatWith 3.12', () => {
    const flags = computeDeprecations('3.12');

    // 3.12 <= 3.12 → false
    expect(flags.DEPRECATE_3_12).toBe(false);

    // 4.4 > 3.12 → true
    expect(flags.DEPRECATE_RSVP_PROMISE).toBe(true);
  });

  it('has the correct number of flags', () => {
    const flags = computeDeprecations();
    expect(Object.keys(flags).length).toBe(Object.keys(DEPRECATION_VERSIONS).length);
  });
});
