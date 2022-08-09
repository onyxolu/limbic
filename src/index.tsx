import React from "react";
import ReactDOM from "react-dom";
import App from "App";
import './index.css';
import { init } from "utils/api";

init()

ReactDOM.render(
            <App />,
    document.getElementById("root")
);
