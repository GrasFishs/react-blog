import * as React from "react";
import { IDataArticle } from "src/modules/home/index.service";

interface IProps {
  article: IDataArticle;
}

export const ArticleComponent: React.SFC<IProps> = ({ article }) => {
  return (
    <div>
      <div>{article.title}</div>
      <div>{article.content}</div>
    </div>
  );
};
