import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";
import * as api from "../api";

//create action creators. Functions that return an  action
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts(); //First getting the respons from the api
    dispatch({ type: FETCH_ALL, payload: data }); // An action, object that has a "type" and "payload"
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post); //This is making a POST API request to the backend server, to send a post

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    //console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post); // api.updatePost() returns the updated memory or post, and response is destructured to get the 'data' directly

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
