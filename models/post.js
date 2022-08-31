const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    commentText: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId
    },
    username: String,
},{
    timestamps: true
})


const postSchema = new Schema({
    username: String,
    title: String,
    img: { 
        type: String,
    },
    description: String,
    userId: {
        type: Schema.Types.ObjectId,
    },
    comments: [commentSchema],
    likes: [Schema.Types.ObjectId,],
  }, {
    timestamps: true
  });
  
  module.exports = mongoose.model('Post', postSchema);