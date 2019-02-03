import * as React from "react";
import { IDataArticle } from "../index.service";
import { Article } from "./Article";
import styles from "./articles.scss";
import { StaggeredMotion, spring, presets } from "react-motion";

interface IProps {
  articles: IDataArticle[];
}

export const Articles: React.SFC<IProps> = ({ articles }) => {
  const items = Array.from({ length: articles.length }).map(_ => ({
    scale: 0
  }));
  return articles.length > 0 ? (
    <StaggeredMotion
      defaultStyles={items}
      styles={prevStyles =>
        prevStyles!.map((_, i) =>
          i === 0 ? { scale: spring(1, presets.noWobble) } : prevStyles![i - 1]
        )
      }
    >
      {(inStyles: any[]) => (
        <div className={styles.articles}>
          {items.map((_, i) => (
            <div key={i} style={{ transform: `scale(${inStyles[i].scale})` }}>
              <Article article={articles[i]} />
            </div>
          ))}
        </div>
      )}
    </StaggeredMotion>
  ) : (
    <div>没有数据哦</div>
  );
};
