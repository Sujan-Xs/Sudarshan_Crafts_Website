import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import getUploadUrlHandler from './api/get-upload-url.js';
import uploadImageHandler from './api/upload-image.js';

// Load .env.local for backend keys
dotenv.config({ path: '.env.local' });

// Simple Vite middleware to mock Vercel serverless functions locally
const apiMiddleware = () => {
  return {
    name: 'api-middleware',
    configureServer(server) {
      server.middlewares.use('/api/get-upload-url', (req, res, next) => {
        if (req.method === 'POST') {
           let body = '';
           req.on('data', chunk => body += chunk.toString());
           req.on('end', () => {
              req.body = JSON.parse(body || '{}');
              getUploadUrlHandler(req, res);
           });
        } else {
           next();
        }
      });

      server.middlewares.use('/api/upload-image', (req, res, next) => {
        if (req.method === 'POST') {
           const chunks = [];
           req.on('data', chunk => chunks.push(chunk));
           req.on('end', () => {
              req.body = Buffer.concat(chunks);
              uploadImageHandler(req, res);
           });
        } else {
           next();
        }
      });
    }
  }
};

export default defineConfig({
  plugins: [react(), apiMiddleware()],
  server: {
    port: 3000,
    open: true,
  },
});