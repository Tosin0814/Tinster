const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: {
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

const likeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId
    },
    username: {
        type: String
    },
    like: {
        type: Boolean
    }

},{
    timestamps: true
})

const postSchema = new Schema({
    username: String,
    img: { 
        type: String,
    },
    description: String,
    userId: {
        type: Schema.Types.ObjectId,
    },
    comments: [commentSchema],
    likes: [likeSchema],
  }, {
    timestamps: true
  });
  
  module.exports = mongoose.model('Post', postSchema);