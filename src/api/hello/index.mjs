import express from 'express'

const hello = express.Router()

hello.get('/api/hello', (_, res) => {
  res.json({ greeting: 'hello API' })
})

export { hello }
