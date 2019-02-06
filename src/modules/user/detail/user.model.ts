import { IUser } from "src/data/User";
import { IAction, IModel } from "src/types/redux";

export interface IUserState {
  user: IUser | null;
}

type IUserPayload = IUserState;

export type IUserAction = IAction<IUserPayload>;

export const userModel: IModel<IUserState, IUserAction> = {
  namespace: "user",
  state: {
    user: null
  },
  reducers: {
    SET_USER(state, { payload: { user } }) {
      return {
        ...state,
        user: user!
      };
    }
  }
};

export const userActions = {
  setUser(user: IUser) {
    return {
      type: "user/SET_USER",
      payload: { user }
    };
  }
};

