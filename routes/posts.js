var express = require('express');
var router = express.Router();
const postsCtrl = require('../controllers/posts')


/* GET all posts */
router.get('/', postsCtrl.index);
router.get('/', postsCtrl.userPosts)
router.get('/new', postsCtrl.new);
router.post('/', postsCtrl.create);
router.get('/all', postsCtrl.userPosts)
router.get('/:id', postsCtrl.show)
router.get('/:id/edit', postsCtrl.editPost)
router.put('/:id', postsCtrl.updatePost)
router.delete('/:id', postsCtrl.deletePost)


module.exports = router;
