import React from "react";
import ReactDOM from 'react-dom';
import "./generics/css/global.css";
//import "./i18n";
import App from "./app";
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:8000';

ReactDOM.render(
  <App/>, document.getElementById('root')
);