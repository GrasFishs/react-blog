import { EffectAction } from "src";
import { IUserAction, userActions } from "src/modules/user/detail/user.model";
import { Dispatch } from "redux";
import { get } from "src/tools/request";
import { IUser } from "src/data/User";

export const gloablService = {
  checkToken(): EffectAction<Promise<IUser>, IUserAction> {
    return async (dispatch: Dispatch<IUserAction>): Promise<IUser> => {
      try {
        const { user } = await get<{ user: IUser }>("/auth/check");
        dispatch(userActions.setUser(user));
        return user;
      } catch (err) {
        throw err;
      }
    };
  }
};
