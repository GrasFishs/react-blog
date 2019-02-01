import { Switch, Route, RouteComponentProps } from "react-router-dom";
import * as React from "react";
import { asyncComponent } from "src/components/AsyncComponent";

const UserDetail = asyncComponent(() => import("./detail/User"));
const PostArticle = asyncComponent(() => import("./post/Post"));

type IProps = RouteComponentProps;

const UserModule: React.SFC<IProps> = ({ match: { url } }) => {
  return (
    <Switch>
      <Route exact path={`${url}/:id`} component={UserDetail} />
      <Route path={`${url}/:id/post`} component={PostArticle} />
    </Switch>
  );
};

export default UserModule;
