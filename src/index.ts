import { Hono } from "hono";
import { logger } from "hono/logger";

import posts from "./handlers/posts.ts";

const app = new Hono();

app.use(logger());

app.route("/posts", posts);

const port = 3000;
console.log(`Server is running on port ${port}`);

Deno.serve({ port }, app.fetch);
