import * as React from "react";
import { RouteComponentProps, withRouter, Switch } from "react-router";
import { Route } from "react-router-dom";
import { asyncComponent } from "../components/AsyncComponent";
import { EffectDispatch, IStateRoot } from "../reducers";
import { IUserAction, IUserState } from "src/modules/user/detail/user.model";
import { connect } from "react-redux";
import { fromEvent, Subscription } from "rxjs";
import { debounceTime, map } from "rxjs/operators";
import { IDeviceAction, deviceActions } from "src/models/global";
import { Header } from "./components/Header";
import { checkToken } from "src/Hoc/checkToken";
import styles from "./style.scss";

const userModule = asyncComponent(() => import("../modules/user/User.module"));
const ArticleModule = asyncComponent(() =>
  import("../modules/article/Article.module")
);

interface IRouteParams {
  id: string;
}

interface ILayoutProps extends RouteComponentProps<IRouteParams> {
  user: IUserState;
  loginStatus: boolean;
  dispatch: EffectDispatch<IUserAction | IDeviceAction>;
}

class LayoutModule extends React.PureComponent<ILayoutProps> {
  private subscribtion: Subscription;

  public componentDidMount() {
    this.props.dispatch(deviceActions.setWidth(window.innerWidth));
    const widthWatcher$ = fromEvent(window, "resize").pipe(
      debounceTime(10),
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
      match: { url },
      history,
      user,
      loginStatus
    } = this.props;
    return (
      <div>
        <Header user={user} loginStatus={loginStatus} history={history}>
          <div className={styles.body}>
            <Switch>
              <Route exact path={url} component={ArticleModule} />
              <Route path={`${url}/user`} component={userModule} />
            </Switch>
          </div>
        </Header>
      </div>
    );
  }
}
export default checkToken(false)(
  withRouter(
    connect(({ user, login }: IStateRoot) => ({
      user,
      loginStatus: login.status
    }))(LayoutModule)
  )
);
