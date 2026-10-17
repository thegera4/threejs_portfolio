import { streamText } from 'ai';
import { getPriorityTiers, isAIConfigured, getActiveModelInfo } from './_lib/ai-config.js';
import { GERARDO_PORTFOLIO_SYSTEM_PROMPT } from './_lib/ai-context.js';

export const config = {
  maxDuration: 30,
};

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

/**
 * Fallback response generator when all live AI tiers are depleted or unconfigured.
 * Ensures the portfolio never crashes or looks broken.
 */
async function sendMockStream(userQuery: string, res?: any) {
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

  const modelId = getActiveModelInfo().modelId;
  const words = reply.split(' ');

  if (res && typeof res.writeHead === 'function') {
    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
      'x-ai-model': modelId,
      'x-ai-tier': 'fallback-simulation',
      'Cache-Control': 'no-cache',
    });
    for (let i = 0; i < words.length; i++) {
      const chunk = (i === 0 ? '' : ' ') + words[i];
      res.write(chunk);
      await new Promise((r) => setTimeout(r, 20));
    }
    res.end();
    return;
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < words.length; i++) {
        const chunk = (i === 0 ? '' : ' ') + words[i];
        controller.enqueue(encoder.encode(chunk));
        await new Promise((r) => setTimeout(r, 20));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'x-ai-model': modelId,
      'x-ai-tier': 'fallback-simulation',
      'Cache-Control': 'no-cache',
    },
  });
}

export default async function handler(req: any, res?: any) {
  try {
    const body = await parseRequestBody(req);
    const { messages = [] } = body;
    const lastMessage = Array.isArray(messages) && messages.length > 0
      ? messages[messages.length - 1]?.content || ''
      : '';

    // Check if any AI credentials exist
    if (!isAIConfigured()) {
      return sendMockStream(lastMessage, res);
    }

    const tiers = getPriorityTiers();

    // Multi-tier Fallback Execution:
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

        if (res && typeof res.writeHead === 'function') {
          res.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8',
            'Transfer-Encoding': 'chunked',
            'x-ai-tier': tier.id,
            'x-ai-model': tier.modelId,
            'Cache-Control': 'no-cache',
          });
          if (first.value) {
            res.write(first.value);
          }
          try {
            for await (const chunk of { [Symbol.asyncIterator]: () => iterator }) {
              res.write(chunk);
            }
          } catch (streamErr) {
            console.error(`Stream interrupted on tier ${tier.name}:`, streamErr);
          } finally {
            res.end();
          }
          return;
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
      }
    }

    // If all live tiers failed/depleted, serve intelligent fallback stream
    console.warn('[AI Tiers Depleted] All live AI tiers depleted. Serving intelligent fallback stream.');
    return sendMockStream(lastMessage, res);
  } catch (error: any) {
    console.error('Error in /api/chat handler:', error);
    if (res && typeof res.status === 'function') {
      res.status(500);
      res.setHeader('Content-Type', 'application/json');
      return res.end(
        JSON.stringify({
          error: error?.message || 'An error occurred while generating AI response.',
        })
      );
    }
    return new Response(
      JSON.stringify({
        error: error?.message || 'An error occurred while generating AI response.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export const POST = handler;
