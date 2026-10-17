import { streamText } from 'ai';
import { getPriorityTiers, isAIConfigured, getActiveModelInfo } from './ai-config';
import { GERARDO_PORTFOLIO_SYSTEM_PROMPT } from './ai-context';

export const config = {
  maxDuration: 30,
};

/**
 * Fallback response generator when all live AI tiers are depleted or unconfigured.
 * Ensures the portfolio never crashes or looks broken.
 */
function createMockStream(userQuery: string) {
  const query = (userQuery || '').toLowerCase();
  let reply = '';

  if (query.includes('cv') || query.includes('resume') || query.includes('curriculum') || query.includes('pdf')) {
    reply =
      "You can download Gerardo's official CV in PDF format right here:\n\n[Download Gerardo's CV (PDF)](#download-cv)\n\nIt covers his software engineering roles at **Ford Motor Company** and **Financiera Independencia**, as well as his prior 11 years of engineering leadership in manufacturing!";
  } else if (query.includes('project') || query.includes('sqlite') || query.includes('popular')) {
    reply =
      "Gerardo's most popular project is the **SQLite Viewer-Browser** VSCode extension, with over **36,000+ active downloads**! He also created **Cenas en Columpios** (a production Next.js/React web app with an integrated AI chatbot), and **Notudus** (a privacy-focused note-taking app published on Google Play). You can inspect all of them in the 3D demo viewer right in the Projects section above!";
  } else if (query.includes('skill') || query.includes('stack') || query.includes('language') || query.includes('tech')) {
    reply =
      'Gerardo is a versatile full-stack engineer proficient in **TypeScript, JavaScript, Dart, Java, Go, Python, and C#**. On the frontend, he builds with React, Next.js, Flutter, and Three.js. On the backend, he works with Node.js/Express, Go (Gin), Spring Boot, and databases like SQLite, MongoDB, and Turso DB.';
  } else if (query.includes('ford') || query.includes('experience') || query.includes('work') || query.includes('job')) {
    reply =
      'Gerardo currently works as a **Software Engineer at Ford Motor Company**, developing and maintaining global internal web applications. Previously, he was a Front End Developer at Financiera Independencia. He also brings **11 years of prior engineering experience in manufacturing**, which gives him extraordinary discipline in quality control, process optimization, and system reliability.';
  } else if (query.includes('why') || query.includes('hire') || query.includes('recruit')) {
    reply =
      'Recruiters value Gerardo because he blends **deep technical full-stack competence** with **real-world manufacturing discipline**. His software has real users (36,000+ downloads on VSCode Marketplace), and he builds production AI workflows. Plus, his strong problem-solving mindset translates to high-velocity delivery.';
  } else {
    reply =
      "Hello! I'm Gerardo's interactive AI assistant. I can answer questions about his software engineering roles at Ford Motor Company and Financiera Independencia, his 100+ GitHub repositories, his 36k-downloaded VSCode extension, or his technical expertise across React, Flutter, Go, and TypeScript. What would you like to know?";
  }

  const encoder = new TextEncoder();

  const words = reply.split(' ');

  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < words.length; i++) {
        const chunk = (i === 0 ? '' : ' ') + words[i];
        controller.enqueue(encoder.encode(chunk));
        await new Promise((r) => setTimeout(r, 25));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'x-ai-model': modelInfo.modelId,
      'x-ai-tier': 'fallback-simulation',
      'Cache-Control': 'no-cache',
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;
    const lastMessage = Array.isArray(messages) && messages.length > 0
      ? messages[messages.length - 1]?.content || ''
      : '';

    // Check if any AI credentials exist
    if (!isAIConfigured()) {
      return createMockStream(lastMessage);
    }

    const tiers = getPriorityTiers();

    // Multi-tier Fallback Execution:
    // Priority 1: Direct Google Gemini Free Tier
    // Priority 2: Vercel AI Gateway Free Model (e.g. nvidia/nemotron-3.5-lightning-free)
    // Priority 3: Vercel AI Gateway Credits Model (e.g. google/gemini-2.5-flash)
    for (const tier of tiers) {
      try {
        const result = streamText({
          model: tier.model as any,
          system: GERARDO_PORTFOLIO_SYSTEM_PROMPT,
          messages,
          temperature: 0.7,
        });

        // Test the first chunk to catch quota exhaustion / rate limits before sending headers
        const iterator = result.textStream[Symbol.asyncIterator]();
        const first = await iterator.next();

        if (first.done && !first.value) {
          continue;
        }

        const encoder = new TextEncoder();
        const responseStream = new ReadableStream({
          async start(controller) {
            if (first.value) {
              controller.enqueue(encoder.encode(first.value));
            }
            try {
              for await (const chunk of { [Symbol.asyncIterator]: () => iterator }) {
                controller.enqueue(encoder.encode(chunk));
              }
            } catch (streamErr) {
              console.error(`Stream interrupted on tier ${tier.name}:`, streamErr);
            } finally {
              controller.close();
            }
          },
        });

        return new Response(responseStream, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'x-ai-tier': tier.id,
            'x-ai-model': tier.modelId,
            'Cache-Control': 'no-cache',
          },
        });
      } catch (tierErr: any) {
        console.warn(
          `[AI Tier Failover] Tier "${tier.name}" (${tier.modelId}) error: ${tierErr?.message || tierErr}. Falling back to next tier...`
        );
        // Continue loop to next tier
      }
    }

    // If all live tiers failed/depleted, serve intelligent fallback stream
    console.warn('[AI Tiers Depleted] All live AI tiers depleted. Serving intelligent fallback stream.');
    return createMockStream(lastMessage);
  } catch (error: any) {
    console.error('Error in /api/chat handler:', error);
    return new Response(
      JSON.stringify({
        error: error?.message || 'An error occurred while generating AI response.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export default POST;
