import { Hono } from 'hono';
import { logger } from 'hono/logger';

import { serve } from '@hono/node-server';

const app = new Hono();
app.use(logger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
