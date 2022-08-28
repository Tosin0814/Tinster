// utility to initialize database
require('./config/database');
const Post = require('./models/post');
const data = require('./data');

// First clear out all previous posts to prevent dups, then seed data

Post.deleteMany({})
.then(function(results) {
  return Post.create(data.posts);
})
.then(function() {
  process.exit();
});


