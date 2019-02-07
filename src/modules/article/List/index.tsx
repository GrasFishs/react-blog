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
import { Pagenation } from "../../../components/Pagination";
import { IDeviceState } from "src/models/global";
import styles from './style.scss';

interface IProps extends RouteChildrenProps {
  articles: IArticlesState;
  device: IDeviceState;
  dispatch: EffectDispatch<IArticlesAction>;
}

interface IState {
  page: number;
  size: number;
}
class ArticleList extends React.PureComponent<IProps, IState> {
  public state: IState = {
    page: 1,
    size: 5
  };

  public componentDidMount() {
    this.fetch();
  }

  private fetch() {
    this.props.dispatch(articlesEffects.getArticles(this.state)).then(() => {
      document.body.scrollTo({ top: 0 });
    });
  }

  private changePage(page: number) {
    this.setState({ page }, () => this.fetch());
  }

  public render() {
    const { articles, device } = this.props;
    const { size, page } = this.state;
    return (
      <div className={styles.articles}>
        <Articles articles={articles.articles} />
        <Pagenation
          total={articles.total}
          size={size}
          page={page}
          pagesCount={device.isMobile ? 3 : device.isPad ? 5 : 8}
          onChange={this.changePage.bind(this)}
        />
      </div>
    );
  }
}

export default connect(({ articles, device }: IStateRoot) => ({
  articles,
  device
}))(ArticleList);
