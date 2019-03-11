import * as React from "react";
import { RouteComponentProps } from "react-router";
import {
  IArticleState,
  articleEffects,
  IArticleAction
} from "../article.model";
import { connect } from "react-redux";
import { IStateRoot, EffectDispatch } from "src/reducers";
import { ArticleComponent } from "./components/Article";

interface IRouteParams {
  id: string;
}

interface IProps extends RouteComponentProps<IRouteParams> {
  article: IArticleState;
  dispatch: EffectDispatch<IArticleAction>;
}

class ArticleItem extends React.PureComponent<IProps> {
  public componentDidMount() {
    const {
      dispatch,
      match: {
        params: { id }
      }
    } = this.props;

    dispatch(articleEffects.getArticle(Number(id)));
  }
  public render() {
    const {
      article: { article }
    } = this.props;
    return (
      <div>
        {article ? <ArticleComponent article={article!} /> : <div>加载中</div>}
      </div>
    );
  }
}
export default connect(({ article }: IStateRoot) => ({ article }))(ArticleItem);
