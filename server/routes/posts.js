import express from "express";

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js";
const router = express.Router(); //Set up of router

//localhost:4000/posts
router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePost); // "id is used because we need to know the id of the existing psot before we edit is
router.delete("/:id", deletePost);
router.patch("/:id/likePost", likePost);

export default router;
