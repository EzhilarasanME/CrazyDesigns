import React from "react";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { render } from "react-dom";
import App from "./App";
import  ReactDOM  from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-icons';

ReactDOM.createRoot(document.getElementById("root")).render(<App></App>)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
