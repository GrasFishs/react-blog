import { Dispatch } from "redux";
import { IAction, IModel } from "../../types/redux";
import { loginService } from "./login.service";
import { IUser } from "src/data/User";
import { userActions, IUserAction } from "../user/detail/user.model";
import { EffectAction } from 'src/reducers';

export interface ILoginState {
  username: string;
  password: string;
  status: boolean;
}

type ILoginPayload = ILoginState;

export type ILoginAction = IAction<ILoginPayload>;

export const loginModel: IModel<ILoginState, ILoginAction> = {
  namespace: "login",
  state: {
    username: "",
    password: "",
    status: false
  },
  reducers: {
    SET_USERNAME(state, { payload: { username } }) {
      return {
        ...state,
        username: username!
      };
    },
    SET_PASSWORD(state, { payload: { password } }) {
      return {
        ...state,
        password: password!
      };
    },
    SET_STATUS(state, { payload: { status } }) {
      return {
        ...state,
        status: status!
      };
    }
  }
};

export const loginActions = {
  setUsername(username: string) {
    return {
      type: "SET_USERNAME",
      payload: {
        username
      }
    };
  },
  setPassword(password: string) {
    return {
      type: "SET_PASSWORD",
      payload: {
        password
      }
    };
  },
  setStatus(status: boolean) {
    return {
      type: "SET_STATUS",
      payload: {
        status
      }
    };
  }
};

export const loginEffects = {
  login(): EffectAction<Promise<IUser>, ILoginAction> {
    return async (
      dispatch: Dispatch<ILoginAction | IUserAction>,
      getState
    ): Promise<IUser> => {
      try {
        const { username, password } = getState().login;
        const { user, token } = await loginService.login({
          username,
          password
        });
        localStorage.setItem("token", token);
        dispatch(loginActions.setStatus(true));
        dispatch(userActions.setUser(user));
        return user;
      } catch (e) {
        dispatch(loginActions.setStatus(false));
        throw e;
      }
    };
  }
};
