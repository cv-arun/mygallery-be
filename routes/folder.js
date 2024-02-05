
const express = require('express')
const router = express.Router();
const multer = require('multer')
const { uploadImageAndSave, getAllImages } = require('../controllers/folder');
const multerS3 = require('multer-s3')
const { S3Client } = require('@aws-sdk/client-s3')

const s3 = new S3Client({
    region: 'us-west-2',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    },
})

// const storage = multer.memoryStorage();
// const upload = multer({storage: storage, limits: { fileSize: 2e+7 }});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname, contentType: file.mimetype, contentDisposition: 'inline' });
        },
        key: function (req, file, cb) {
            cb(null, `gallery/${Date.now().toString()}.jpeg`)
        }
    }),
    limits: { fileSize: 1024 * 1024 * 15 }
})

router.post('/upload-image', upload.array('photos', 1), uploadImageAndSave)
router.get('/images', getAllImages)




module.exports = router