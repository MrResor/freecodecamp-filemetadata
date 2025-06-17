import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { app } from '../src/express.mjs'

describe('/api/docs', () => {
  it('should return redirect', async () => {
    const res = await request(app).get('/api/docs')

    expect(res.statusCode).toBe(301)
    expect(res.text).toContain('<title>Redirecting</title>')
  })

  it('should return docs page', async () => {
    const res = await request(app).get('/api/docs').redirects(1)

    expect(res.statusCode).toBe(200)
    expect(res.text).toContain('<title>Swagger UI</title>')
  })
})
