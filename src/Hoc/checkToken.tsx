import * as React from "react";
import { EffectDispatch } from "src/reducers";
import { IUserAction } from "src/modules/user/detail/user.model";
import { gloablService } from "./service";
import { RouteChildrenProps } from "react-router";
import { connect } from "react-redux";
import { Dialog } from "src/components/Dialog";

interface IProps extends RouteChildrenProps {
  dispatch: EffectDispatch<IUserAction>;
}

export const checkToken = (
  Cmpt: React.ComponentClass | React.FunctionComponent
) => {
  class CheckTokenComponent extends React.Component<IProps> {
    public componentDidMount() {
      const { dispatch, history } = this.props;
      dispatch(gloablService.checkToken()).catch(err => {
        Dialog({
          type: "danger",
          content: err.message,
          onOk() {
            history.push("/login");
          }
        });
      });
    }
    public render() {
      return <Cmpt {...this.props} />;
    }
  }
  return connect()(CheckTokenComponent);
};
