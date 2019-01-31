import * as React from "react";
import { RouteComponentProps } from "react-router";
import { IStateRoot, EffectDispatch } from "src";
import { connect } from "react-redux";
import { IUserState, IUserAction } from "./user.model";
import { gloablService } from "src/layout/service";

interface IRouteParams {
  id: string;
}

interface IProps extends RouteComponentProps<IRouteParams> {
  user: IUserState;
  dispatch: EffectDispatch<IUserAction>;
}

class User extends React.PureComponent<IProps> {
  public componentDidMount() {
    this.props.dispatch(gloablService.checkToken()).catch(err => {
      console.log(err);
    });
  }

  public render() {
    const { user } = this.props;
    return user.user ? (
      <div>
        <div>{user.user.username}</div>
      </div>
    ) : (
      <div>正在确认登录信息...</div>
    );
  }
}

export default connect((state: IStateRoot) => ({ user: state.user }))(User);
