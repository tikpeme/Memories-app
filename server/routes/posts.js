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
router.get("/search", getPostsBySearch);
router.get("/:id", getPost); //  ":id" allows for dynamic inputs for id

router.get("/", getPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost); // "id is used because we need to know the id of the existing psot before we edit is
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", auth, commentPost);

export default router;
