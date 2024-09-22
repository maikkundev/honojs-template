import { z } from 'zod';

export const createSchema = z.object({
  title: z.string().min(1).max(255),
  details: z.string().min(10).max(2000),
});

export const updateSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  details: z.string().min(10).max(2000).optional(),
});
