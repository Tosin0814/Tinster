const User = require("../models/post")

function index(req, res, next) {
    res.render('posts/index', {
        // posts,
        user: req.user,
        name: req.query.name
    });
}




module.exports = {
    index,
    // addFact,
    // delFact,
  };