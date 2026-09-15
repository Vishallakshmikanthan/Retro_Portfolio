import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'node:process'
import path from 'node:path'

function vercelApiDevPlugin() {
  return {
    name: 'vercel-api-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, 'http://localhost');
        if (url.pathname === '/api/projects') {
          if (!res.status) {
            res.status = (code) => {
              res.statusCode = code;
              return res;
            };
          }
          if (!res.json) {
            res.json = (data) => {
              res.setHeader('Content-Type', 'application/json; charset=utf-8');
              res.end(JSON.stringify(data));
              return res;
            };
          }

          try {
            const { default: handler } = await import('./api/projects.js');
            await handler(req, res);
          } catch (err) {
            console.error('Local API execution error:', err);
            res.status(500).json({
              success: false,
              error: 'Local dev API error occurred.',
            });
          }
          return;
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const currentEnv = loadEnv(mode, process.cwd(), '');
  const parentEnv = loadEnv(mode, path.resolve(process.cwd(), '..'), '');
  const env = { ...parentEnv, ...currentEnv };

  if (env.GITHUB_TOKEN && !process.env.GITHUB_TOKEN) {
    process.env.GITHUB_TOKEN = env.GITHUB_TOKEN;
  }
  if (env.GITHUB_USERNAME && !process.env.GITHUB_USERNAME) {
    process.env.GITHUB_USERNAME = env.GITHUB_USERNAME;
  }

  return {
    plugins: [react(), vercelApiDevPlugin()],
  };
})


