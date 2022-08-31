const Post = require('../models/post')

function create(req, res) {
    Post.findById(req.params.id, function(err,post){
        post.likes.push(req.user._id);
        post.save(function (err) {
            console.log(post.likes)
            res.redirect(`/posts/${post._id}`)
        })
    })
}


function deleteLike(req, res) {
    Post.findById(req.params.id, function(err, post) {
        const likeIndex = post.likes.indexOf(req.user.id)
        if (likeIndex > -1) {
            post.likes.splice(likeIndex, 1)
        }
        post.save(function(err) {
            console.log(post.likes)
            res.redirect(`/posts/${post._id}`);
        });
    })
}

module.exports = {
    create,
    deleteLike
}