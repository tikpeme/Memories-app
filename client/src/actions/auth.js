import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const signin = (formData, Navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    console.log("successfully signed");
    dispatch({ type: AUTH, data });

    Navigate("/"); // navigate to home page after login
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, Navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    console.log(data);

    dispatch({ type: AUTH, data });
    Navigate("/"); // navigate to home page after login
    ///
  } catch (error) {
    console.log(error);
  }
};
