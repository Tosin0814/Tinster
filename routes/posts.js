var express = require('express');
var router = express.Router();
const postsCtrl = require('../controllers/posts')
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/postUploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })



router.get('/', postsCtrl.index);
router.get('/', postsCtrl.userPosts)
router.get('/new', postsCtrl.new);
router.post('/', upload.single('img'), postsCtrl.create);
router.get('/all', postsCtrl.userPosts)
router.get('/:id', postsCtrl.show)
router.get('/:id/edit', postsCtrl.editPost)
router.put('/:id', postsCtrl.updatePost)
router.delete('/:id', postsCtrl.deletePost)


module.exports = router;
