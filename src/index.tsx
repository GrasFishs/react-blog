import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Routes } from "./routes";
import "./theme/index.scss";
import { store } from './reducers';


ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
