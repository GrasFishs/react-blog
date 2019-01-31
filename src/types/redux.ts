import { Action } from "redux";

export interface IAction<Payload> {
  type: string;
  payload: Partial<Payload>;
}

type IReducer<S, A extends Action> = (state: S, action: A) => S;

export interface IModelReducer<S, A extends Action> {
  [key: string]: IReducer<S, A>;
}

export interface IModel<S, A extends Action> {
  namespace: string;
  state: S;
  reducers: IModelReducer<S, A>;
}
