import React from "react";
import ReactDOM from 'react-dom';
import "./generics/css/global.css";
import "./i18n";
import App from "./app";
import axios from "axios";
import { createStore, applyMiddleware } from 'redux'
import thunk from "redux-thunk";
import { Provider } from 'react-redux'
import combineReducers from "./redux/reducers";

const store = createStore(combineReducers, applyMiddleware(thunk));
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  </Provider>, 
  document.getElementById('root')
);