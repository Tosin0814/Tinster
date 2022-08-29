var express = require('express');
var router = express.Router();
const likesCtrl = require('../controllers/likes')




router.post('/posts/:id/likes', likesCtrl.create);
// router.get('/:id/edit', likesCtrl.editPost)
// router.put('/:id', likesCtrl.updatePost)
router.delete('/:id', likesCtrl.deleteLike)


module.exports = router;