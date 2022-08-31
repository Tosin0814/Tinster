var express = require('express');
var router = express.Router();
const commentsCtrl = require('../controllers/comments')


/* Post new comments */
router.post('/posts/:id/comments', commentsCtrl.create);
router.delete('/comments/:id', commentsCtrl.deleteComment)


module.exports = router;