import { Hono } from 'hono';

import { zValidator } from '@hono/zod-validator';

import { prisma } from '../index';
import * as schemas from '../schemas/post.schema';

interface CreateOptions {
  title: string
  details: string
}

interface UpdateOptions {
  title?: string
  details?: string
}

const posts = new Hono()

posts.get('/', async (c) => {
  return c.json(await prisma.post.findMany())
})

posts.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'))

  return c.json(
    await prisma.post.findUnique({
      where: { id },
    })
  )
})

posts.post('/new', zValidator('json', schemas.createSchema), async (c) => {
  const validated: CreateOptions = c.req.valid('json')
  await prisma.post.create({
    data: {
      title: validated.title,
      details: validated.details,
    },
  })
})

posts.patch('/update/:id', zValidator('json', schemas.updateSchema), async (c) => {
  const id = parseInt(c.req.param('id'))
  const validated: UpdateOptions = c.req.valid('json')

  if (validated.details === undefined && validated.title === undefined) {
    return c.text('You must update at least one option!')
  }

  await prisma.post.update({
    where: { id },
    data: {
      title: validated.title || undefined,
      details: validated.details || undefined,
    },
  })

  return c.text(`Post with id: ${id} was updated.`)
})

posts.delete('delete/:id', async (c) => {
  const id = parseInt(c.req.param('id'))

  await prisma.post.delete({
    where: { id },
  })

  return c.text(`Post with id: ${id} was deleted successfully.`)
})

export default posts
