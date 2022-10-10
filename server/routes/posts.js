import express from "express";
import auth from "../middleware/auth.js";
import {
  getPostsBySearch,
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  commentPost,
} from "../controllers/posts.js";
const router = express.Router(); //Set up of router

//localhost:4000/posts
router.post("/", auth, createPost);
router.post("/:id/commentPost", auth, commentPost);

router.get("/search", getPostsBySearch);
router.get("/:id", getPost); //  ":id" allows for dynamic inputs for id
router.get("/", getPosts);

router.patch("/:id", auth, updatePost); // "id is used because we need to know the id of the existing psot before we edit is
router.patch("/:id/likePost", auth, likePost);
router.delete("/:id", auth, deletePost);

export default router;
