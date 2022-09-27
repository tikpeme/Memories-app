import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
  COMMENT,
} from "../constants/actionTypes";
import * as api from "../api";

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id); //First getting the respons from the api
    dispatch({ type: FETCH_POST, payload: data }); // An action, object that has a "type" and "payload"
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

//create action creators. Functions that return an  action
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page); //First getting the respons from the api
    console.log(data);
    dispatch({ type: FETCH_ALL, payload: data }); // An action, object that has a "type" and "payload"
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  console.log("getPostsBySearch was called");
  console.log(`My searchQuery is ${{ searchQuery }}`);

  try {
    dispatch({ type: START_LOADING });

    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post); //This is making a POST API request to the backend server, to send a post
    navigate(`/post/${data._id}`);
    console.log("successfully API call");
    dispatch({ type: CREATE, payload: data });
    //console.log("successfully dispatch CREATE");

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post); // api.updatePost() returns the updated memory or post, and response is destructured to get the 'data' directly
    console.log(`successfully recived data from backend server: ${data}`);
    dispatch({ type: UPDATE, payload: data }); //once data is successfully collected, the dispatch fuction is called
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    //since we don't need the response of the api call

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    console.log(data);

    dispatch({ type: LIKE, payload: data }); //once data is successfully collected, the dispatch fuction is called
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id); /// The returned "data" is the updated post from the server
    dispatch({ type: COMMENT, payload: data });
    return data.comments;
  } catch (error) {
    console.log(error);
  }
};
