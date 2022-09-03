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
    const path = req.file.path.split('/').slice(1).join('/');
    console.log(path);
    console.log('req.file: ', path)
    const newPost = new Post(req.body);
    newPost.img = path
    newPost.username = req.user.name
    newPost.userId = req.user._id;
    console.log(newPost)
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

function updatePost(req, res) {
    Post.findById(req.params.id)
    .then(function (post) {
        post.update(req.body, function () {
            res.redirect(`/posts/all`)
        })
    })
    .catch(function (err) {
        
    })
}

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