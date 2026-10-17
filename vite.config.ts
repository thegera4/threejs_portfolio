import { defineConfig, loadEnv, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import istanbul from 'vite-plugin-istanbul';
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configure local temp directory to prevent Windows Defender / OS locks on AppData/Local/Temp during esbuild transformations
const localTmp = path.resolve(__dirname, '.tmp')
if (!fs.existsSync(localTmp)) {
  fs.mkdirSync(localTmp, { recursive: true })
}
process.env.TEMP = localTmp
process.env.TMP = localTmp

/**
 * Dev plugin allowing `/api/chat` and `/api/recommend` to be handled
 * directly by Vite dev server during local development with pnpm dev.
 */
function aiDevPlugin(env: Record<string, string>): Plugin {
  // Sync loaded env to process.env
  Object.assign(process.env, env);

  return {
    name: 'vite-plugin-ai-api-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.method === 'POST' && (req.url === '/api/chat' || req.url === '/api/recommend')) {
          try {
            const chunks: Buffer[] = [];
            for await (const chunk of req) {
              chunks.push(chunk as Buffer);
            }
            const bodyStr = Buffer.concat(chunks).toString('utf-8');
            const parsedBody = bodyStr ? JSON.parse(bodyStr) : {};

            if (req.url === '/api/chat') {
              const { POST } = await server.ssrLoadModule('/api/chat.ts');
              const webReq = new Request('http://localhost:5173/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(parsedBody),
              });
              const webRes: Response = await POST(webReq);

              res.statusCode = webRes.status;
              webRes.headers.forEach((val, key) => res.setHeader(key, val));

              if (webRes.body) {
                const reader = webRes.body.getReader();
                while (true) {
                  const { done, value } = await reader.read();
                  if (done) break;
                  res.write(value);
                }
              }
              res.end();
              return;
            }

            if (req.url === '/api/recommend') {
              const { POST } = await server.ssrLoadModule('/api/recommend.ts');
              const webReq = new Request('http://localhost:5173/api/recommend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(parsedBody),
              });
              const webRes: Response = await POST(webReq);

              res.statusCode = webRes.status;
              webRes.headers.forEach((val, key) => res.setHeader(key, val));
              const text = await webRes.text();
              res.end(text);
              return;
            }
          } catch (err: any) {
            console.error('AI dev middleware error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err?.message || 'Server Error' }));
            return;
          }
        }
        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      istanbul({
        include: 'src/*',
        exclude: ['node_modules', 'test/'],
        extension: ['.js', '.ts', '.tsx'],
        requireEnv: true, // Only active when VITE_COVERAGE=true
      }),
      aiDevPlugin(env),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      watch: {
        // Ignore helper scripts (and their temp files) so the file watcher
        // doesn't crash on locked files during development.
        ignored: ['**/scripts/**', '**/.tmp/**'],
      },
    },
  };
})

