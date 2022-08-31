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

function deleteComment(req, res) {
    Post.findOne({'comments._id': req.params.id}, function(err, post) {
        const commentSubdoc = post.comments.id(req.params.id);
        commentSubdoc.remove();
        post.save(function(err) {
            res.redirect(`/posts/${post._id}`);
        });
    })
}

module.exports = {
    create,
    deleteComment,
}