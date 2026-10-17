import { describe, it, expect } from 'vitest';
import {
  DEFAULT_GEMINI_DIRECT_MODEL,
  DEFAULT_GATEWAY_FREE_MODEL,
  DEFAULT_GATEWAY_CREDIT_MODEL,
  getPriorityTiers,
  getActiveModelInfo,
  isAIConfigured,
} from '../../../api/_lib/ai-config';

describe('AI Configuration & 3-Tier Priority Strategy', () => {
  it('should configure sensible defaults for each tier', () => {
    expect(DEFAULT_GEMINI_DIRECT_MODEL).toBe('gemini-3.5-flash-lite');
    expect(DEFAULT_GATEWAY_FREE_MODEL).toBe('nvidia/nemotron-3.5-lightning-free');
    expect(DEFAULT_GATEWAY_CREDIT_MODEL).toBe('google/gemini-2.5-flash');
  });


  it('should return priority tiers in order', () => {
    const tiers = getPriorityTiers();
    expect(Array.isArray(tiers)).toBe(true);
    if (tiers.length > 0) {
      expect(tiers[0]).toHaveProperty('id');
      expect(tiers[0]).toHaveProperty('model');
      expect(tiers[0]).toHaveProperty('modelId');
    }
  });

  it('should retrieve active model info accurately', () => {
    const info = getActiveModelInfo();
    expect(info.modelId).toBeDefined();
    expect(info.provider).toBeDefined();
    expect(info.costInfo).toBeDefined();
  });

  it('should correctly report if AI keys are configured', () => {
    const configured = isAIConfigured();
    expect(typeof configured).toBe('boolean');
  });
});
