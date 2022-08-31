const User = require("../models/user");
const Post = require("../models/post");
const { default: mongoose } = require("mongoose");
const post = require("../models/post");


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
        res.render('posts/show', {
            user: req.user,
            post,
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
        res.render('posts/edit', {
            user: req.user,
            post,
        })
    })
}


// function updatePost(req, res) {
//     Post.findById(req.params.id, function (err, post) {
//         post.update(req.body, function () {
//             res.redirect(`/posts/${post._id}`)
//         })
//     })
// }

function updatePost(req, res) {
    Post.findById(req.params.id)
    .then(function (post) {
        post.update(req.body, function () {
            res.redirect(`/posts/${post._id}`)
        })
    })
    .catch(function (err) {
        
    })
}

// function deletePost(req, res) {
//     Post.findById(req.params.id, function (err, post) {
//         post.remove(function (err) {
//             res.redirect('/posts/all')

//         })
//     })
// }

function deletePost(req, res) {
    Post.findById(req.params.id)
    .then(function (post) {
        post.remove(function () {
            res.redirect('/posts/all')
        })
    })
    .catch(function (err) {
        
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