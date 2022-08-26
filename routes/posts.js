var express = require('express');
var router = express.Router();
const postsCtrl = require('../controllers/posts')


/* GET all posts */
router.get('/', postsCtrl.index);

module.exports = router;
