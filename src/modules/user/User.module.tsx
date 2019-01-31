import { Switch, Route, RouteComponentProps } from "react-router-dom";
import * as React from "react";
import { asyncComponent } from "src/components/AsyncComponent";

const UserDetail = asyncComponent(() => import("./detail/User"));

type IProps = RouteComponentProps;

const UserModule: React.SFC<IProps> = ({ match: { url } }) => {
  return (
    <Switch>
      <Route path={`${url}/:id`} component={UserDetail} />
    </Switch>
  );
};

export default UserModule;
