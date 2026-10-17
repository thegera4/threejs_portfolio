import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import type { LanguageModel } from 'ai';

/**
 * Priority Tier definition for the AI service.
 */
export interface PriorityTier {
  id: 'tier1-gemini-free' | 'tier2-gateway-free' | 'tier3-gateway-credits';
  name: string;
  label: string;
  model: LanguageModel | string;
  modelId: string;
  provider: string;
  costInfo: string;
}

/**
 * Configurable Model IDs (defaults can be overridden via .env variables):
 * 1. AI_DIRECT_GEMINI_MODEL: Free tier Google Gemini direct model (default: gemini-3.8-flash)
 * 2. AI_GATEWAY_FREE_MODEL: Free tier model on Vercel AI Gateway (default: nvidia/nemotron-3.5-lightning-free)
 * 3. AI_GATEWAY_CREDIT_MODEL: Credit model on Vercel AI Gateway (default: google/gemini-2.5-flash)
 */
export const DEFAULT_GEMINI_DIRECT_MODEL = process.env.AI_DIRECT_GEMINI_MODEL || 'gemini-3.5-flash-lite';
export const DEFAULT_GATEWAY_FREE_MODEL = process.env.AI_GATEWAY_FREE_MODEL || 'nvidia/nemotron-3.5-lightning-free';
export const DEFAULT_GATEWAY_CREDIT_MODEL = process.env.AI_GATEWAY_CREDIT_MODEL || 'google/gemini-2.5-flash';


/**
 * Returns the ordered priority tiers:
 * Priority 1: Google Gemini Free Tier (Direct API)
 * Priority 2: Vercel AI Gateway Free Tier Model (e.g. nvidia/nemotron-3.5-lightning-free)
 * Priority 3: Vercel AI Gateway Credits Model (e.g. google/gemini-2.5-flash)
 */
export function getPriorityTiers(): PriorityTier[] {
  const tiers: PriorityTier[] = [];

  const googleApiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.VITE_GEMINI_API_KEY;

  const hasGateway = Boolean(process.env.AI_GATEWAY_API_KEY);

  // Priority 1: Direct Google Gemini Free Tier
  if (googleApiKey) {
    const google = createGoogleGenerativeAI({
      apiKey: googleApiKey,
      baseURL: process.env.GOOGLE_BASE_URL,
    });
    const modelId = process.env.AI_DIRECT_GEMINI_MODEL || DEFAULT_GEMINI_DIRECT_MODEL;
    tiers.push({
      id: 'tier1-gemini-free',
      name: 'Google Gemini (Free Tier)',
      label: `Gemini (${modelId})`,
      model: google(modelId),
      modelId,
      provider: 'google-direct',
      costInfo: 'Google AI Studio Free Tier',
    });
  }

  // Priority 2: Vercel AI Gateway Free Model (Zero credits consumed)
  if (hasGateway) {
    const freeModelId = process.env.AI_GATEWAY_FREE_MODEL || DEFAULT_GATEWAY_FREE_MODEL;
    tiers.push({
      id: 'tier2-gateway-free',
      name: 'Vercel Gateway Free Tier',
      label: `Gateway Free (${freeModelId.split('/')[1] || freeModelId})`,
      model: freeModelId,
      modelId: freeModelId,
      provider: 'vercel-ai-gateway-free',
      costInfo: 'Vercel AI Gateway Free Model',
    });
  }

  // Priority 3: Vercel AI Gateway Credit Model (Uses Vercel credits)
  if (hasGateway) {
    const creditModelId = process.env.AI_GATEWAY_CREDIT_MODEL || DEFAULT_GATEWAY_CREDIT_MODEL;
    tiers.push({
      id: 'tier3-gateway-credits',
      name: 'Vercel Gateway (Credits)',
      label: `Gateway Credits (${creditModelId.split('/')[1] || creditModelId})`,
      model: creditModelId,
      modelId: creditModelId,
      provider: 'vercel-ai-gateway-credits',
      costInfo: 'Vercel AI Gateway Credits',
    });
  }

  // Fallback if only OpenAI key is present without gateway
  if (tiers.length === 0 && process.env.OPENAI_API_KEY) {
    const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });
    tiers.push({
      id: 'tier3-gateway-credits',
      name: 'OpenAI Direct',
      label: 'GPT-4o Mini',
      model: openai('gpt-4o-mini'),
      modelId: 'gpt-4o-mini',
      provider: 'openai-direct',
      costInfo: 'OpenAI API',
    });
  }

  return tiers;
}

/**
 * Helper to check if any AI credentials exist
 */
export function isAIConfigured(): boolean {
  return Boolean(
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.VITE_GEMINI_API_KEY ||
    process.env.AI_GATEWAY_API_KEY ||
    process.env.OPENAI_API_KEY
  );
}

/**
 * Returns metadata about the highest-priority active model
 */
export function getActiveModelInfo() {
  const tiers = getPriorityTiers();
  if (tiers.length > 0) {
    return {
      modelId: tiers[0].modelId,
      label: tiers[0].label,
      provider: tiers[0].provider,
      costInfo: tiers[0].costInfo,
    };
  }
  return {
    modelId: DEFAULT_GEMINI_DIRECT_MODEL,
    label: 'Gemini Free Tier',
    provider: 'simulation',
    costInfo: 'Local Dev Simulation',
  };
}
