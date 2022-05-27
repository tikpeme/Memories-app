import axios from 'axios';//Use to make api calls

const url = 'http://localhost:4000/posts'; // this returns all the posts we have in the database

export const fetchPosts = () => axios.get(url);

export const createPost = (newPost) => axios.post(url, newPost);

export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost ) //implement API call for updatePost route

export const deletePost = (id) => axios.delete(`${url}/${id}`);  

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);  