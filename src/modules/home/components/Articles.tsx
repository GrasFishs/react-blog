import * as React from "react";
import { IDataArticle } from "../index.service";
import { Article } from "./Article";
import styles from "./articles.scss";

interface IProps {
  articles: IDataArticle[];
  onDetail: (id: number) => void;
  url: string;
}

export const Articles: React.SFC<IProps> = ({ articles, onDetail }) => {
  return articles.length > 0 ? (
    <div className={styles.articles}>
      {articles.map(article => (
        <Article
          key={article.id}
          article={article}
          onClick={id => onDetail(id)}
        />
      ))}
    </div>
  ) : (
    <div>没有数据哦</div>
  );
};
