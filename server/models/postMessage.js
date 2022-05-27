import mongoose from "mongoose";

//Create Moongoose Schema for posts
const postSchema = mongoose.Schema({
    title: String,  // each post will have a title
    message: String, // each post will have a message
    creator: String, // each post will have a controller
    tags: [String],//arrary of strings
    selectedFile: String, // For an image, convert image into a string with base 64
    likeCount: {   //For "likeCount" sets the default number to 0
        type: Number,
        default: 0
    },
    createdAt: { //For "CreatedAt" sets default date to new date
        type: Date,
        default: new Date()

    },
})

//Turn Schema into a model
const postMessage = mongoose.model('PostMessage', postSchema)

//export PostMessage to Post.js in Server side
export default postMessage;