import express from 'express';
import multer from 'multer';
import fs from 'fs';

const filemetadata = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 100MB
    fileFilter: (req, file, cb) => {
        const parts = file.originalname.split('.');
        if (parts.length > 2) {
            let err = new Error();
            err.code = 'TWO_EXT_FILE';
            return cb(err);
        }
        const ext = parts[parts.length - 1].toLowerCase();
        if (['exe', 'js', 'sh', 'bat', 'ps1'].includes(ext)) {
            let err = new Error();
            err.code = 'BAD_EXT_FILE';
            return cb(err);
        }
        cb(null, true) // Allow file upload
    }
}).single('upfile');

filemetadata.post('/api/fileanalyse', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            switch (err.code) {
                case 'LIMIT_FILE_SIZE':
                    return res.status(400).json({ error: 'File size exceeds limit of 10MB' });
                case 'TWO_EXT_FILE':
                    return res.status(400).json({ error: 'File name contains more than one extension' });
                case 'BAD_EXT_FILE':
                    return res.status(400).json({ error: 'File type not allowed' });
                default:
                    return res.status(500).json({ error: 'Internal server error' });
            }
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const { originalname, mimetype, size } = req.file;
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            }
        });
        res.status(200).json({
            name: originalname,
            type: mimetype,
            size: size
        });
    });
});

export { filemetadata };