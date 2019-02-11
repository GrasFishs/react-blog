import { tagModel } from "./../modules/tags/tag.model";
import { deviceModel } from "./global";
import { articlesModel } from "./../modules/article/List/index.model";
import { loginModel } from "src/modules/login/login.model";

import { userModel } from "src/modules/user/detail/user.model";

export const reducers = {
  loginModel,
  userModel,
  articlesModel,
  deviceModel,
  tagModel
};
