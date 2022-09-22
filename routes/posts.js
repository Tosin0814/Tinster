var express = require('express');
var router = express.Router();
const postsCtrl = require('../controllers/posts')
const multer_S3 = require('../config/multer_S3');

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}


router.get('/', isLoggedIn, postsCtrl.index);
router.get('/new', isLoggedIn, postsCtrl.new);
router.post('/', multer_S3.upload.single('img'), postsCtrl.create);
router.get('/all', isLoggedIn, postsCtrl.userPosts)
router.get('/:id', isLoggedIn, postsCtrl.show)
router.get('/:id/edit', postsCtrl.editPost)
router.put('/:id', postsCtrl.updatePost)
router.delete('/:id', postsCtrl.deletePost)


module.exports = router;

