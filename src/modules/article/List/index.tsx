import * as React from "react";
import { RouteChildrenProps } from "react-router";
import {
  IArticlesState,
  IArticlesAction,
  articlesEffects
} from "./index.model";
import { EffectDispatch, IStateRoot } from "src/reducers";
import { connect } from "react-redux";
import { Articles } from "./components/Articles";
import { Button } from "src/components";
interface IProps extends RouteChildrenProps {
  articles: IArticlesState;
  dispatch: EffectDispatch<IArticlesAction>;
}

interface IState {
  page: number;
  size: number;
}
class ArticleList extends React.PureComponent<IProps, IState> {
  public state: IState = {
    page: 1,
    size: 10
  };

  public componentDidMount() {
    this.fetch();
  }

  private fetch() {
    this.props.dispatch(articlesEffects.getArticles(this.state)).then(() => {
      document.body.scrollTo({ top: 0 });
    });
  }

  private changePage(change: number) {
    this.setState({ page: this.state.page + change }, () => this.fetch());
  }

  public render() {
    const { articles } = this.props;
    return (
      <div>
        <Articles articles={articles.articles} />
        <Button onClick={this.changePage.bind(this, -1)}>-</Button>
        <Button onClick={this.changePage.bind(this, 1)}>+</Button>
      </div>
    );
  }
}

export default connect(({ articles }: IStateRoot) => ({ articles }))(
  ArticleList
);
