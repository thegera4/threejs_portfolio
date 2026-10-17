import { generateText } from 'ai';
import { getPriorityTiers, isAIConfigured } from './_lib/ai-config.js';
import { RECOMMENDER_SYSTEM_PROMPT } from './_lib/ai-context.js';

export const config = {
  maxDuration: 20,
};

// Project index mapping matching src/constants/index.ts (myProjects)
export const PROJECT_CATALOG = [
  {
    index: 0,
    id: 'sqlite-viewer',
    title: 'SQLite Viewer-Browser',
    primaryTag: 'devtools',
    tags: ['devtools', 'javascript', 'frontend', 'tooling'],
    defaultPitch:
      'Given your interest in developer productivity, Gerardo created the SQLite Viewer-Browser extension with over 36,000+ active downloads on the official VSCode Marketplace!',
    animation: 'salute',
  },
  {
    index: 1,
    id: 'cenas-columpios',
    title: 'Cenas en Columpios',
    primaryTag: 'ai',
    tags: ['ai', 'fullstack', 'react', 'nextjs'],
    defaultPitch:
      "Since you're interested in AI-powered applications, check out Cenas en Columpios — a live production Next.js app where Gerardo built an intelligent AI agent to handle customer bookings!",
    animation: 'victory',
  },
  {
    index: 2,
    id: 'admin-dashboard',
    title: 'Admin Dashboard',
    primaryTag: 'fullstack',
    tags: ['fullstack', 'backend', 'flutter', 'dart', 'mongodb'],
    defaultPitch:
      'Looking for scalable full-stack architecture? Explore this Flutter & Node.js Admin Dashboard with over 80+ GitHub stars, featuring custom Auth and MongoDB.',
    animation: 'clapping',
  },
  {
    index: 3,
    id: 'notudus',
    title: 'Notudus',
    primaryTag: 'mobile',
    tags: ['mobile', 'react-native', 'security', 'sqlite'],
    defaultPitch:
      'Interested in mobile and security? Check out Notudus on Google Play, a privacy-first note-taking app with on-device biometric security.',
    animation: 'salute',
  },
  {
    index: 4,
    id: 'ecommerce',
    title: 'E-Commerce',
    primaryTag: 'frontend',
    tags: ['frontend', 'react', 'nextjs', 'stripe', 'sanity'],
    defaultPitch:
      'For e-commerce and payment workflows, explore this template powered by Next.js, Sanity CMS, and end-to-end Stripe checkout.',
    animation: 'victory',
  },
  {
    index: 5,
    id: 'gonext-events',
    title: 'GoNext Events',
    primaryTag: 'backend',
    tags: ['backend', 'go', 'gin', 'sqlite', 'fullstack'],
    defaultPitch:
      'For high-performance backend systems, check out GoNext Events built with Go and Gin framework for concurrent event scheduling.',
    animation: 'clapping',
  },
];

async function parseRequestBody(req: any): Promise<any> {
  if (req && req.body !== undefined) {
    if (typeof req.body === 'string') {
      try {
        return JSON.parse(req.body);
      } catch {
        return {};
      }
    }
    return req.body;
  }
  if (req && typeof req.json === 'function') {
    try {
      return await req.json();
    } catch {
      return {};
    }
  }
  if (req && typeof req[Symbol.asyncIterator] === 'function') {
    try {
      const chunks: any[] = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      const raw = Buffer.concat(chunks).toString('utf-8');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }
  return {};
}

function sendJsonResponse(res: any, data: any, status = 200, headers: Record<string, string> = {}) {
  if (res && typeof res.status === 'function') {
    res.status(status);
    Object.entries(headers).forEach(([k, v]) => res.setHeader(k, v));
    if (typeof res.json === 'function') {
      return res.json(data);
    }
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify(data));
  }
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
}

export default async function handler(req: any, res?: any) {
  try {
    const { interests = {} } = await parseRequestBody(req);

    // Determine top scoring category
    const entries = Object.entries(interests) as [string, number][];
    entries.sort((a, b) => b[1] - a[1]);
    const topInterest = entries[0]?.[0] || 'fullstack';

    // Best matching project by category
    const fallbackMatch =
      PROJECT_CATALOG.find((p) => p.tags.includes(topInterest)) || PROJECT_CATALOG[1];

    if (!isAIConfigured()) {
      return sendJsonResponse(res, {
        projectIndex: fallbackMatch.index,
        projectId: fallbackMatch.id,
        projectTitle: fallbackMatch.title,
        pitch: fallbackMatch.defaultPitch,
        animation: fallbackMatch.animation,
        matchReason: `Matched top visitor interest: ${topInterest}`,
        tier: 'fallback-simulation',
      });
    }

    const tiers = getPriorityTiers();
    const prompt = `
Visitor interest profile: ${JSON.stringify(interests)}
Top interest detected: ${topInterest}

Choose the best project from this list:
${JSON.stringify(PROJECT_CATALOG.map((p) => ({ index: p.index, id: p.id, title: p.title, tags: p.tags })))}

Write a custom 1-sentence recommendation pitch tailored to their specific interests.
Return JSON with { "projectIndex": number, "projectTitle": string, "pitch": string, "animation": "victory" | "clapping" | "salute", "matchReason": string }
`;

    // Multi-tier Fallback Execution:
    for (const tier of tiers) {
      try {
        const { text } = await generateText({
          model: tier.model as any,
          system: RECOMMENDER_SYSTEM_PROMPT,
          prompt,
          temperature: 0.5,
        });

        const cleanJson = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const parsed = JSON.parse(cleanJson);

        return sendJsonResponse(
          res,
          {
            ...parsed,
            tier: tier.id,
            modelId: tier.modelId,
          },
          200,
          {
            'x-ai-tier': tier.id,
            'x-ai-model': tier.modelId,
          }
        );
      } catch (tierErr: any) {
        console.warn(
          `[Recommender Tier Failover] Tier "${tier.name}" (${tier.modelId}) error: ${tierErr?.message || tierErr}. Falling back to next tier...`
        );
      }
    }

    // Default match if live models fail
    return sendJsonResponse(res, {
      projectIndex: fallbackMatch.index,
      projectId: fallbackMatch.id,
      projectTitle: fallbackMatch.title,
      pitch: fallbackMatch.defaultPitch,
      animation: fallbackMatch.animation,
      matchReason: `Matched interest in ${topInterest}`,
      tier: 'fallback-catalog',
    });
  } catch (error: any) {
    console.error('Error in /api/recommend handler:', error);
    return sendJsonResponse(res, {
      projectIndex: 1,
      projectTitle: 'Cenas en Columpios',
      pitch:
        "Since you're exploring modern full-stack web applications, check out Cenas en Columpios with its integrated AI assistant!",
      animation: 'victory',
    });
  }
}

export const POST = handler;
