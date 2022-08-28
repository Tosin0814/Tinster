const User = require("../models/user");
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
        res.redirect('/posts')
    })
    .catch()
}

function show(req, res) {
    Post.findById(req.params.id)
    .then(function (post) {
        console.log(post)
        res.render('posts/show', {
            user: req.user,
            post
        })
    }).catch(function (err) {
        console.log(err)
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


// Not working
function updatePost(req, res) {
    Post.findAndUpdate({_id:req.params.id}, {$set:req.body}, {new:true},function (err, post) {
        console.log(post)
    }).then(function () {
        res.redirect('/posts')
    })
}

// Not working
function deletePost(req, res) {
    Post.findById(req.params.id)
    .then(function(err, post) {
        console.log("post: ", post)
        post.remove()
    })
    .then(function () {
        res.redirect('/posts')
    })
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