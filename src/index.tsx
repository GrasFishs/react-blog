import * as React from "react";
import * as ReactDOM from "react-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Provider } from "react-redux";
import { reducer } from "./reducers";
import { createStore, applyMiddleware } from "redux";
import { Action } from "redux";
import { Routes } from "./routes";
import "./theme/index.scss";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
const state = store.getState();
export type IStateRoot = typeof state;

export type EffectAction<R, A extends Action> = ThunkAction<
  R,
  IStateRoot,
  undefined,
  A
>;

export type EffectDispatch<A extends Action> = ThunkDispatch<
  IStateRoot,
  undefined,
  A
>;

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
