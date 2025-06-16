import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '../src/express.mjs'
import { filePrep, fileCleanup } from './file_utils.mjs'

const files = {
  't1.jpg': 256,
  't2.jpg': 11 * 1024 * 1024,
  't3.exe.jpeg': 256,
  't4.exe': 256,
  't5.bat': 256,
  't6.ps1': 256,
  't7.js': 256,
  't8.vbs': 256,
  't9.sh': 256,
  't10.msi': 256,
  't11.exe': 11 * 1024 * 1024
}


beforeAll(() => {
  for (const [key, value] of Object.entries(files)) {
    filePrep(key, value)
  }
})

afterAll(() => {
  Object.keys(files).forEach((key) => {
    fileCleanup(key)
  })
})

describe('/api/fileanalyse', () => {
  it('return data about the file', async () => {
    const res = await request(app).post('/api/fileanalyse').attach('upfile', 't1.jpg')

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({
      name: 't1.jpg',
      type: 'image/jpeg',
      size: files['t1.jpg']
    })
  })

  it('return 400 for file size limit exceeded', async () => {

    const res = await request(app).post('/api/fileanalyse').attach('upfile', 't2.jpg')

    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual({ error: 'File size exceeds limit of 10MB' })
  })

  it('return 400 for file with more than one extension', async () => {
    const res = await request(app).post('/api/fileanalyse').attach('upfile', 't3.exe.jpeg')

    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual({ error: 'File name contains more than one extension' })
  })

  it('return 400 for file with .exe extension', async () => {
    const res = await request(app).post('/api/fileanalyse').attach('upfile', 't4.exe')

    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual({ error: 'File type not allowed' })
  })

  it('return 400 for file with .bat extension', async () => {
    const res = await request(app).post('/api/fileanalyse').attach('upfile', 't5.bat')

    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual({ error: 'File type not allowed' })
  })

  it('return 400 for file with .ps1 extension', async () => {
    const res = await request(app).post('/api/fileanalyse').attach('upfile', 't6.ps1')

    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual({ error: 'File type not allowed' })
  })

  it('return 400 for file with .js extension', async () => {
    const res = await request(app).post('/api/fileanalyse').attach('upfile', 't7.js')

    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual({ error: 'File type not allowed' })
  })

  it('return 400 for file with .vbs extension', async () => {
    const res = await request(app).post('/api/fileanalyse').attach('upfile', 't8.vbs')

    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual({ error: 'File type not allowed' })
  })

  it('return 400 for file with .sh extension', async () => {
    const res = await request(app).post('/api/fileanalyse').attach('upfile', 't9.sh')

    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual({ error: 'File type not allowed' })
  })

  it('return 400 for file with .msi extension', async () => {
    const res = await request(app).post('/api/fileanalyse').attach('upfile', 't10.msi')

    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual({ error: 'File type not allowed' })
  })

  it('return 400 for file size limit exceeded with .exe', async () => {
    const res = await request(app).post('/api/fileanalyse').attach('upfile', 't11.exe')

    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual({ error: 'File type not allowed' })
  })
})