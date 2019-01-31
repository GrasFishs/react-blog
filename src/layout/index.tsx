import * as React from "react";
import { RouteComponentProps, withRouter, Switch } from "react-router";
import { Route } from "react-router-dom";
import { Button, Input } from "src/components";
import { asyncComponent } from "../components/AsyncComponent";
import { EffectDispatch } from "src";
import { IUserAction } from "src/modules/user/detail/user.model";
import { connect } from "react-redux";
import { gloablService } from "./service";

const userModule = asyncComponent(() => import("../modules/user/User.module"));

interface IRouteParams {
  id: string;
}

interface ILayoutProps extends RouteComponentProps<IRouteParams> {
  dispatch: EffectDispatch<IUserAction>;
}

class LayoutModule extends React.PureComponent<ILayoutProps> {
  public componentDidMount() {
    this.props.dispatch(gloablService.checkToken()).catch(err => {
      console.log(err);
    });
  }
  public render() {
    const {
      match: { url },
      history
    } = this.props;
    return (
      <div>
        <Button theme="danger" block onClick={() => history.push("/login")}>
          按钮
        </Button>
        <Input tip="username" theme={"success"} />
        <Switch>
          <Route path={`${url}/user`} component={userModule} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect()(LayoutModule));
