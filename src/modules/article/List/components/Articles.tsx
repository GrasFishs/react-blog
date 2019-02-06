import * as React from "react";
import { IDataArticle } from "../index.service";
import { Article } from "./Article";
import styles from "./articles.scss";

interface IProps {
  articles: IDataArticle[];
}

export const Articles: React.SFC<IProps> = ({ articles }) => {
  return articles.length > 0 ? (
    <div className={styles.articles}>
      {articles.map(article => (
        <Article key={article.id} article={article} />
      ))}
    </div>
  ) : (
    <div>没有数据哦</div>
  );
};
