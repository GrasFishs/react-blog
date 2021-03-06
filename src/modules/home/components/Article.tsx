import * as React from "react";
import { IDataArticle } from "../index.service";
import { FaCommentAlt, FaHeart, FaEye } from "react-icons/fa";
import styles from "./article.scss";

interface IProps {
  article: IDataArticle;
  onClick: (articleId: number) => void;
}

export const Article: React.SFC<IProps> = ({ article, onClick }) => {
  return (
    <div className={styles.article}>
      <div className={styles.header}>
        <div className={styles.user}>
          <img className={styles.avatar} src={article.user.avatar} />
          <div className={styles.username}>{article.user.username}</div>
        </div>
        <div className={styles}>
          {article.tags.map(tag => tag.name).join("/")}
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.info}>
          <div onClick={() => onClick(article.id)} className={styles.title}>
            {article.title}
          </div>
          <div className={styles.content}>{article.content}</div>
        </div>
        {article.cover ? (
          <div className={styles.cover}>
            <div
              className={styles.zoomImage}
              style={{ backgroundImage: `url(${article.cover})` }}
            />
          </div>
        ) : null}
      </div>
      <div className={styles.bottom}>
        <div className={styles.item}>
          <FaEye style={{ fontSize: 18 }} />
          <span className={styles.value}>{article.views}</span>
        </div>
        <div className={styles.item}>
          <FaHeart style={{ fontSize: 15 }} />
          <span className={styles.value}>{article.likes}</span>
        </div>
        <div className={styles.item}>
          <FaCommentAlt style={{ fontSize: 15 }} />
          <span className={styles.value}>{article.comments}</span>
        </div>
      </div>
      {/* <div className={styles.date}>
        最后编辑于{dayjs(article.updatedTime).format("YYYY-MM-DD hh:mm:ss")}
      </div> */}
    </div>
  );
};
