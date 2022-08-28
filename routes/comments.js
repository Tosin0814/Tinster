var express = require('express');
var router = express.Router();
const commentsCtrl = require('../controllers/comments')


/* Post new comments */
router.post('/posts/:id/comments', commentsCtrl.create);


module.exports = router;