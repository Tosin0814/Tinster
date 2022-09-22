const multer  = require('multer')
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3')

const s3 = new S3Client({
    credentials: {
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      region: 'ca-central-1',
    }
})


const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'tinster',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        var newFileName = Date.now() + "-" + file.originalname;
        cb(null, newFileName)
      },
    })
  })

  module.exports = {
    upload
  }