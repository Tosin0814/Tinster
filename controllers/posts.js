const post = require("../models/post");
const Post = require("../models/post")


function index(req, res, next) {
    Post.find({})
    .then(function (posts) {
        res.render('posts/index', {
            posts,
            user: req.user,
            name: req.query.name
        });
    })
    .catch(function (err) {
        console.log(err);
        res.status(500).send('An error occurred', err);
    })
    
}

function newPost(req, res) {
    res.render('posts/new',{
        user: req.user,
    })
}

function create(req, res) {
    const newPost = new Post(req.body);
    newPost.username = req.user.name
    newPost.userId = req.user._id;
    newPost.save()
    .then(function () {
        console.log(newPost)
        res.redirect('/posts')
    })
    .catch()
}

function show(req, res) {
    res.render('posts/show', {
        post: post.getOne(req.params.id)
    })
}

function userPosts(req, res) {
    Post.find({userId: req.user._id})
    .then(function (posts) {
        res.render('posts/userPosts', {
            user: req.user,
            posts,
        })
    })
}

function editPost(req, res) {
    Post.findById(req.params.id)
    .then(function (post) {
        console.log(post)
        res.render('posts/edit', {
            user: req.user,
            post,
        })
    })
}

function updatePost(req, res) {
    Post.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true},function (err, post) {
        console.log(post)
    })
    res.redirect('/posts')
}

function deletePost(req, res) {
    Post.findByIdAndDelete(req.params.id, function(err, post) {
        console.log(post)
        res.redirect('/posts');
    });
    
}



module.exports = {
    index,
    create,
    new: newPost,
    userPosts,
    show,
    editPost,
    updatePost,
    deletePost,
  };