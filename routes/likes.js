var express = require('express');
var router = express.Router();
const likesCtrl = require('../controllers/likes')




router.post('/posts/:id/likes', likesCtrl.create);
router.delete('/likes/:id', likesCtrl.deleteLike)


module.exports = router;