//Create all the handler for the routes
//import Mongoose model from PostMessages as PostMessage
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js"; // Give access to a real model

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find(); //Retrieve all the post messages in the data base. Using await as it is asynchronus
    // console.log(postMessages);

    res.status(200).json(postMessages); // If all post messages are recieved, returns array of all messages
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Logic for adding more posts
export const createPost = async (req, res) => {
  const body = req.body;
  const newPost = new PostMessage(body);

  try {
    await newPost.save(); //Save new post. Asychronus

    res.status(201).json(newPost); // If new post is saved "sends" new post
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//When a request is made, it will be made to "/posts/"id"
export const updatePost = async (req, res) => {
  const { id: _id } = req.params; //recieving the if of the post
  const post = req.body; // recieveing the data of the post update from

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id"); //check to see if "_id" is really a mongoose object Id

  //If the ID is valid, then update our post
  {
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  );

  res.json(updatedPost); // sends over the updated post
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  console.log("Delete");
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id"); //check to see if "_id" is really a mongoose object Id

  await PostMessage.findByIdAndRemove(id); //

  console.log("Delete");
  res.json({ message: "Post deleted sucessfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id"); //check to see if "_id" is really a mongoose object Id

  const post = await PostMessage.findById(id); //
  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );

  res.json(updatedPost);
};
