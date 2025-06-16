import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { app } from '../src/express.mjs'

describe('/', () => {
  it('should return mainpage', async () => {
    const res = await request(app).get('/')

    expect(res.statusCode).toBe(200)
    expect(res.text).toContain('<title>File Metadata</title>')
  })

  it('should return 404 for non-existing route', async () => {
    const res = await request(app).get('/non-existing-route')

    expect(res.statusCode).toBe(404)
    expect(res.text).toContain('<title>Error</title>')
    expect(res.headers['content-type']).toContain('text/html')
    expect(res.text).toContain('Cannot GET /non-existing-route')
  })

  it('should return 404 for non-existing API route', async () => {
    const res = await request(app).get('/api/non-existing-route')

    expect(res.statusCode).toBe(404)
    expect(res.text).toContain('<title>Error</title>')
    expect(res.headers['content-type']).toContain('text/html')
    expect(res.text).toContain('Cannot GET /api/non-existing-route')
  })
})

describe('/style.css', () => {
  it('should return style.css', async () => {
    const res = await request(app).get('/style.css')

    expect(res.statusCode).toBe(200)
    expect(res.headers['content-type']).toContain('text/css')
    expect(res.text).toContain('body')
  })
})
