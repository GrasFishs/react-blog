import * as React from "react";
import { IDataArticle } from "../index.service";
import * as dayjs from "dayjs";
import * as Markdown from "markdown-it";
import * as hljs from "highlight.js";
import styles from "./article.scss";

const md = Markdown({
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, str).value;
    }
    return "";
  }
});

export const Article: React.SFC<{ article: IDataArticle }> = ({ article }) => (
  <div className={styles.article}>
    <div className={styles.title}>{article.title}</div>
    <div
      className={styles.content}
      dangerouslySetInnerHTML={{ __html: md.render(article.content) }}
    />
    <div className={styles.date}>
      最后编辑于{dayjs(article.updatedTime).format("YYYY-MM-DD hh:mm:ss")}
    </div>
  </div>
);
