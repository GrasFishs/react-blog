import { reducers } from "./../models/index";
import { IModelReducer } from "./../types/redux";
import { combineReducers, Action } from "redux";
import { IModel } from "../types/redux";

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
) => (state: S = inistalState, action: A): S => {
  const type = action.type.replace(`${prefix}/`, "");
  return modelReducers.hasOwnProperty(type)
    ? modelReducers[type](state, action)
    : state;
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
    const { namespace, state, reducers: r } = models[key];
    obj[namespace] = createReducer(state, namespace, r);
  });
  return obj;
}

export const reducer = combineReducers(createReducers(reducers));
