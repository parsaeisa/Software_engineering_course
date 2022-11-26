import ReactDOM from "react-dom";
import React from "react";
import { Provider } from "react-redux";
import store from "./core/store/index";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Router>,
  document.getElementById("app")
);
