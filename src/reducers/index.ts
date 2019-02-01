import { reducers } from "./../models/index";
import { IModelReducer } from "./../types/redux";
import { combineReducers, Action, createStore, applyMiddleware } from "redux";
import { IModel } from "../types/redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";

interface IReducerModel {
  [key: string]: IModel<any, Action>;
}

/**
 * 将ModelReducer对象转换为reducer函数
 * @param inistalState 初始状态
 * @param prefix 域名空间
 * @param modelReducers redcuer
 */
export const createReducer = <S, A extends Action>(
  inistalState: S,
  prefix: string,
  modelReducers: IModelReducer<S, A>
) => (s: S = inistalState, action: A): S => {
  const type = action.type.replace(`${prefix}/`, "");
  return modelReducers.hasOwnProperty(type)
    ? modelReducers[type](s, action)
    : s;
};

/**
 * 将state集合合并成reducers
 * @param models state集合
 */
function createReducers(models: IReducerModel): IModelReducer<any, Action> {
  const obj: IModelReducer<any, Action> = {};
  const modelsKeys = Object.keys(models);
  if (modelsKeys.length > Array.from(new Set(modelsKeys)).length) {
    throw new Error("namespace should be unique");
  }
  modelsKeys.forEach(key => {
    const { namespace: n, state: s, reducers: r } = models[key];
    obj[n] = createReducer(s, n, r);
  });
  return obj;
}
const reducer = combineReducers(createReducers(reducers));

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
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
