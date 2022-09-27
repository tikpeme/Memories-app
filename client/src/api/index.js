import axios from "axios"; //Use to make api calls

const API = axios.create({ baseURL: "http://localhost:4000" }); // this returns all the posts we have in the database

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const fetchPostsBySearch = (searchQuery) => {
  console.log(`Fetching ${searchQuery} posts`);
  return API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
};

export const createPost = (newPost) => API.post("/posts", newPost);

export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost); //implement API call for updatePost route

export const deletePost = (id) => API.delete(`posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => {
  console.log(formData);
  return API.post(`/users/signin`, formData);
};
export const signUp = (formData) => API.post(`/users/signup`, formData);

export const comment = (value, id) =>
  API.post(`/posts/${id}/commentPost`, { value });
