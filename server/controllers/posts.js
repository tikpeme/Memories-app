//Create all the handler for the routes
//import Mongoose model from PostMessages as PostMessage
import { request } from "express";
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js"; // Give access to a real model

export const getPost = async (req, res) => {
  // console.log("Running getPost function in the backend");
  // console.log(req.params);

  const { id } = req.params;

  //console.log(id);

  try {
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
    console.log("successfully getPost");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  console.log("Running getPosts function in the backend");

  const { page } = req.query;

  try {
    const LIMIT = 8; //limit the number of posts to be returned
    const startIndex = (Number(page) - 1) * LIMIT; // get starting index of post on a specific page
    const total = await PostMessage.countDocuments({});

    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex); // Retreices the latest po
    //sconsole.log(total);

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberofPages: Math.ceil(total / LIMIT),
    });
    console.log("successfully getPosts");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  //console.log("Running getPostsBySearch function in the backend");

  const { searchQuery, tags } = req.query;
  //console.log(req.query);

  try {
    const title = new RegExp(searchQuery, "i"); // The 'i' ingnores the case. Converted to regular expression  to be easier for mongdB

    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Logic for adding more posts
export const createPost = async (req, res) => {
  console.log("Running createPost function in the backend");

  const post = req.body;
  const newPostMessage = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPostMessage.save(); //Save new post. Asychronus

    res.status(201).json(newPostMessage); // If new post is saved "sends" new post
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//When a request is made, it will be made to "/posts/"id"
export const updatePost = async (req, res) => {
  console.log("Running updatePost function in the backend");

  const { id: _id } = req.params; //recieving the id of the post
  const post = req.body; // recieveing the data of the post update from
  console.log(post);
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id"); //check to see if "_id" is really a mongoose object Id

  //If the ID is valid, then update our post
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  );

  res.json(updatedPost); // sends over the updated post
};

export const deletePost = async (req, res) => {
  console.log("Running deletePost function in the backend");

  const { id } = req.params;
  console.log("Delete");
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id"); //check to see if "_id" is really a mongoose object Id

  await PostMessage.findByIdAndRemove(id); //
  res.json({ message: "Post deleted sucessfully" });
};

export const likePost = async (req, res) => {
  console.log("Running likePost function in the backend");

  const { id } = req.params;
  console.log("likepost");
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id"); //check to see if "_id" is really a mongoose object Id

  const post = await PostMessage.findById(id); //

  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    //like post
    post.likes.push(req.userId);
  } else {
    //dislike a post
    post.likes = post.likes.filter((id) => id != String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const post = await PostMessage.findById(id); //Fetch Post to add comment to
  console.log(post);

  post.comments.push(value);

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};
