import { EffectAction } from "../reducers";
import { IUserAction, userActions } from "src/modules/user/detail/user.model";
import { Dispatch } from "redux";
import { get } from "src/tools/request";
import { IUser } from "src/data/User";

const tokenError = {
  JsonWebTokenError: "您可能清空了localstorage或cookie导致不能在线",
  TokenExpiredError: "登录超时，请重新登陆"
};

export const gloablService = {
  checkToken(): EffectAction<Promise<IUser>, IUserAction> {
    return async (dispatch: Dispatch<IUserAction>): Promise<IUser> => {
      try {
        const { user } = await get<{ user: IUser }>("/auth/check");
        dispatch(userActions.setUser(user));
        return user;
      } catch (err) {
        if (err.response) {
          const errorName = err.response.data.error.name;
          if (errorName in tokenError) {
            throw new Error(tokenError[errorName]);
          } else {
            throw new Error("请重新你登录");
          }
        } else {
          throw new Error("网络错误");
        }
      }
    };
  }
};
