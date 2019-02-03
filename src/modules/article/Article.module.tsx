import { Switch, Route, RouteComponentProps } from "react-router-dom";
import * as React from "react";
import { asyncComponent } from "src/components/AsyncComponent";

const ArticleList = asyncComponent(() => import("./List/index"));

type IProps = RouteComponentProps;

const ArticleModule: React.SFC<IProps> = ({ match: { url } }) => {
  return (
    <Switch>
      <Route exact path={`${url}`} component={ArticleList} />
    </Switch>
  );
};

export default ArticleModule;
