import fs from 'fs'
import path from 'path'

import express from 'express'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yaml'

const __dirname = import.meta.dirname

const file = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'documentation.yaml'), 'utf8')
const swaggerDocument = YAML.parse(file)

const docs = express.Router()

docs.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export { docs }
