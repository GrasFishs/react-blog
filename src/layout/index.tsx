import * as React from "react";
import {
  RouteComponentProps,
  withRouter,
  Switch
  // Redirect
} from "react-router";
import { Route } from "react-router-dom";
import { asyncComponent } from "../components/AsyncComponent";
import { EffectDispatch } from "../reducers";
import { IUserAction } from "src/modules/user/detail/user.model";
import { connect } from "react-redux";
import { fromEvent, Subscription } from "rxjs";
import { debounceTime, map } from "rxjs/operators";
import { IDeviceAction, deviceActions } from "src/models/global";

const userModule = asyncComponent(() => import("../modules/user/User.module"));
const ArticleModule = asyncComponent(() =>
  import("../modules/article/Article.module")
);

interface IRouteParams {
  id: string;
}

interface ILayoutProps extends RouteComponentProps<IRouteParams> {
  dispatch: EffectDispatch<IUserAction | IDeviceAction>;
}

class LayoutModule extends React.PureComponent<ILayoutProps> {
  private subscribtion: Subscription;

  public componentDidMount() {
    this.props.dispatch(deviceActions.setWidth(window.innerWidth));
    const widthWatcher$ = fromEvent(window, "resize").pipe(
      debounceTime(300),
      map(() => window.innerWidth)
    );
    this.subscribtion = widthWatcher$.subscribe(width => {
      this.props.dispatch(deviceActions.setWidth(width));
    });
  }

  public componentWillUnmount() {
    this.subscribtion.unsubscribe();
  }

  public render() {
    const {
      match: { url }
    } = this.props;
    return (
      <div>
        <Switch>
          {/* <Redirect from={url} to={`${url}/article`} /> */}
          <Route path={`${url}/user`} component={userModule} />
          <Route path={`${url}/article`} component={ArticleModule} />
        </Switch>
      </div>
    );
  }
}
export default withRouter(connect()(LayoutModule));
