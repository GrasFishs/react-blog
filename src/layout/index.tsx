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
import styles from "./style.scss";

const UserModule = asyncComponent(() => import("../modules/user/User.module"));
const ArticleModule = asyncComponent(() =>
  import("../modules/article/Article.module")
);
const HomeModule = asyncComponent(() => import("../modules/home/index"));
const LoginModule = asyncComponent(() =>
  import("../modules/login/Login.module")
);

interface IRouteParams {
  id: string;
}

interface ILayoutProps extends RouteComponentProps<IRouteParams> {
  user: IUserState;
  loginStatus: boolean;
  dispatch: EffectDispatch<IUserAction | IDeviceAction>;
}

interface ILayoutState {
  isLogin: boolean;
}

class LayoutModule extends React.PureComponent<ILayoutProps, ILayoutState> {
  private subscribtion: Subscription;
  public state: ILayoutState = {
    isLogin: false
  };

  public componentDidMount() {
    this.props.dispatch(deviceActions.setWidth(window.innerWidth));
    const widthWatcher$ = fromEvent(window, "resize").pipe(
      debounceTime(10),
      map(() => window.innerWidth)
    );
    this.subscribtion = widthWatcher$.subscribe(width => {
      this.props.dispatch(deviceActions.setWidth(width));
    });
    this.setState({ isLogin: this.props.location.pathname === "/login" });
  }

  public componentWillReceiveProps(preProps: ILayoutProps) {
    this.setState({ isLogin: preProps.location.pathname === "/login" });
  }

  public componentWillUnmount() {
    this.subscribtion.unsubscribe();
  }

  public render() {
    const { history, user, loginStatus } = this.props;
    const { isLogin } = this.state;
    return isLogin ? (
      <Switch>
        <Route path="/login" component={LoginModule} />
      </Switch>
    ) : (
      <div>
        <Header user={user} loginStatus={loginStatus} history={history}>
          <div className={styles.body}>
            <Switch>
              <Route exact path="/" component={HomeModule} />
              <Route path="/article" component={ArticleModule} />
              <Route path="/user" component={UserModule} />
            </Switch>
          </div>
        </Header>
      </div>
    );
  }
}
export default withRouter(
  connect(({ user, login }: IStateRoot) => ({
    user,
    loginStatus: login.status
  }))(LayoutModule)
);
