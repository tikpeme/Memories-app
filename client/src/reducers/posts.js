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

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };

    case END_LOADING:
      return { ...state, isLoading: false };

    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      }; // Return all the post but filter out the ones we deleted o

    case FETCH_POST:
      return { ...state, post: action.payload };

    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberofPages: action.payload.numberofPages,
      };
    case FETCH_BY_SEARCH:
      return {
        ...state,
        posts: action.payload,
        currentPage: action.payload.currentPage,
        numberofPages: action.payload.numberofPages,
      };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          // if a "post" id is the same is the same as updated posts change change that post
          if (post._id === action.payload._id) {
            return action.payload;
          }
          // return all other posts normally...
          return post;
        }),
      };
    case UPDATE:
    case LIKE:
      // console.log(state);
      // console.log(action.payload);
      return {
        ...state,
        posts: state.posts.map((post) => {
          return post._id === action.payload._id ? action.payload : post;
        }),
      };
    default:
      return state;
  }
};
