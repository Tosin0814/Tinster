const Post = require('../models/post')

function create(req, res) {
    Post.findById(req.params.id, function(err,post){
        req.body.userId = req.user._id;
        req.body.username = req.user.name;
        post.comments.push(req.body);
        post.save(function (err) {
            res.redirect(`/posts/${post._id}`)
        })
    })
}

module.exports = {
    create,
}