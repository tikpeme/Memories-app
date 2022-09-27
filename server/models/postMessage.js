import mongoose from "mongoose";

//Create Moongoose Schema for posts
const postSchema = mongoose.Schema({
  title: String, // each post will have a title
  message: String, // each post will have a message
  name: String,
  creator: String, // each post will have a controller
  tags: [String], //arrary of strings
  selectedFile: String, // For an image, convert image into a string with base 64
  likes: {
    //For "likes" sets the default number to 0
    type: [String],
    default: [],
  },
  comments: { type: [String], default: [] },
  createdAt: {
    //For "CreatedAt" sets default date to new date
    type: Date,
    default: new Date(),
  },
  location: String,
});

//Turn Schema into a model
const postMessage = mongoose.model("PostMessage", postSchema);

//export PostMessage to Post.js in Server side
export default postMessage;
