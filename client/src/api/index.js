import axios from "axios"; //Use to make api calls

const API = axios.create({ baseURL: "http://localhost:4000" }); // this returns all the posts we have in the database

export const fetchPosts = () => API.get("/posts");

export const createPost = (newPost) => API.post("/posts", newPost);

export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost); //implement API call for updatePost route

export const deletePost = (id) => axios.delete(`posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post(`/users/signin`, formData);
export const signUp = (formData) => API.post(`/users/signup`, formData);
