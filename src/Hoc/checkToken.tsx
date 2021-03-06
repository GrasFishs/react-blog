import * as React from "react";
import { EffectDispatch } from "src/reducers";
import { IUserAction } from "src/modules/user/detail/user.model";
import { gloablService } from "./service";
import { RouteChildrenProps } from "react-router";
import { connect } from "react-redux";
import { dialog } from "src/components/Dialog";

interface IProps extends RouteChildrenProps {
  dispatch: EffectDispatch<IUserAction>;
}

export const checkToken = (isReLogin = true) => {
  return (Cmpt: React.ComponentClass | React.FunctionComponent) => {
    class CheckTokenComponent extends React.Component<IProps> {
      public componentDidMount() {
        const { dispatch, history } = this.props;
        dispatch(gloablService.checkToken()).catch(err => {
          if (isReLogin) {
            dialog.danger({
              content: err.message,
              onOk() {
                history.replace("/login");
              }
            });
          }
        });
      }
      public render() {
        return <Cmpt {...this.props} />;
      }
    }
    return connect()(CheckTokenComponent);
  };
};
