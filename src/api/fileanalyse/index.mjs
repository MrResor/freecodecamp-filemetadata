import express from 'express'
import multer from 'multer'
import fs from 'fs'

import { logger } from '../../logger.mjs'

const filemetadata = express.Router()
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, './uploads/')
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
  fileFilter: (_, file, cb) => {
    const err = new Error()
    const blocked = ['exe', 'bat', 'ps1', 'js', 'vbs', 'sh', 'msi', 'ps1']
    const parts = file.originalname.split('.')
    if (parts.length > 2) {
      err.code = 'TWO_EXT_FILE'
      cb(err, false)
    }
    if (blocked.includes(parts[parts.length - 1])) {
      err.code = 'BAD_EXT_FILE'
      cb(err, false)
    }
    cb(null, true) // Allow file upload
  }
}).single('upfile')

filemetadata.post('/api/fileanalyse', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      let code, msg
      switch (err.code) {
        case 'LIMIT_FILE_SIZE':
          code = 400
          msg = 'File size exceeds limit of 10MB'
          break
        case 'TWO_EXT_FILE':
          console.log('I WORK')
          code = 400
          msg = 'File name contains more than one extension'
          break
        case 'BAD_EXT_FILE':
          code = 400
          msg = 'File type not allowed'
          break
        default:
          code = 500
          msg = 'Internal server error'
      }
      return res.status(code).json({ error: msg })
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const { originalname, mimetype, size } = req.file
    fs.unlink(req.file.path, (err) => {
      if (err) {
        logger.error('Error deleting file:', err)
      }
    })

    return res.status(200).json({
      name: originalname,
      type: mimetype,
      size
    })
  })
})

export { filemetadata }
