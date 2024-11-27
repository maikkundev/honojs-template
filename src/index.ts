import { Hono } from 'hono';
import { logger } from 'hono/logger';

import { serve } from '@hono/node-server';
import { PrismaClient } from '@prisma/client';

import posts from './routes/posts';

const app = new Hono();
export const prisma = new PrismaClient();

app.use(logger());

app.route('/posts', posts);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
