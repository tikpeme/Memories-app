//This is the file to connect React application to the index HTML file

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; //Keep track of store, global state, from anywhere from the app
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";

import App from "./App";

import "./index.css";

const store = createStore(reducers, compose(applyMiddleware(thunk))); //

//
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") //Connecting to the DIV with at ID of root
);
