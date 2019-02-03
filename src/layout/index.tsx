import * as React from "react";
import {
  RouteComponentProps,
  withRouter,
  Switch
} from "react-router";
import { Route } from "react-router-dom";
import { asyncComponent } from "../components/AsyncComponent";
import { EffectDispatch } from "../reducers";
import { IUserAction } from "src/modules/user/detail/user.model";
import { connect } from "react-redux";

const userModule = asyncComponent(() => import("../modules/user/User.module"));
const ArticleModule = asyncComponent(() =>
  import("../modules/article/Article.module")
);

interface IRouteParams {
  id: string;
}

interface ILayoutProps extends RouteComponentProps<IRouteParams> {
  dispatch: EffectDispatch<IUserAction>;
}

const LayoutModule: React.SFC<ILayoutProps> = ({ match: { url } }) => (
  <div>
    <Switch>
      {/* <Redirect from={url} to={`${url}/article`} /> */}
      <Route path={`${url}/user`} component={userModule} />
      <Route path={`${url}/article`} component={ArticleModule} />
    </Switch>
  </div>
);

export default withRouter(connect()(LayoutModule));
