import * as React from "react";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { IUserState, IUserAction } from "./user.model";
import { EffectDispatch, IStateRoot } from "src/reducers";
import { checkToken } from "src/Hoc/checkToken";

interface IRouteParams {
  id: string;
}

interface IProps extends RouteComponentProps<IRouteParams> {
  user: IUserState;
  dispatch: EffectDispatch<IUserAction>;
}

const User: React.SFC<IProps> = ({ user }) =>
  user.user ? (
    <div>
      <div>{user.user.username}</div>
    </div>
  ) : (
    <div>正在确认登录信息...</div>
  );

export default connect((state: IStateRoot) => ({ user: state.user }))(
  checkToken(User)
);
