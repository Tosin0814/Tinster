const { S3Client } = require('@aws-sdk/client-s3')
var express = require('express');
var router = express.Router();
const postsCtrl = require('../controllers/posts')
const multer  = require('multer')
const multerS3 = require('multer-s3');


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

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}


router.get('/', isLoggedIn, postsCtrl.index);
// router.get('/', isLoggedIn, postsCtrl.userPosts)
router.get('/new', isLoggedIn, postsCtrl.new);
router.post('/', upload.single('img'), postsCtrl.create);
router.get('/all', isLoggedIn, postsCtrl.userPosts)
router.get('/:id', isLoggedIn, postsCtrl.show)
router.get('/:id/edit', postsCtrl.editPost)
router.put('/:id', postsCtrl.updatePost)
router.delete('/:id', postsCtrl.deletePost)


module.exports = router;

