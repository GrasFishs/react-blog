import * as React from "react";
import { Switch, Route, RouteComponentProps } from "react-router";
import { asyncComponent } from "src/components/AsyncComponent";

const ArticleDetail = asyncComponent(() => import("../article/Item/index"));

type IProps = RouteComponentProps;

const ArticleModule: React.SFC<IProps> = ({ match:{path} }) => {
  return (
    <Switch>
      <Route path={`${path}/:id`} component={ArticleDetail} />
    </Switch>
  );
};

export default ArticleModule;
