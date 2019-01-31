import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { asyncComponent } from "../components/AsyncComponent";

const LayoutModule = asyncComponent(() => import("../layout/index"));
const LoginModule = asyncComponent(() => import("../modules/login/Login.module"));

export function Routes() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/index" />
        <Route path="/index" component={LayoutModule} />
        <Route path="/login" component={LoginModule} />
        <Route render={() => <div>404</div>} />
      </Switch>
    </Router>
  );
}
