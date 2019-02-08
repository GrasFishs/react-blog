import { IDataArticle, IArticlesData, articlesService } from "./index.service";
import { IAction, IModel } from "src/types/redux";
import { EffectAction } from "src/reducers";
import { Dispatch } from "react";
import { message } from "src/components/Message";
import { ITag } from "src/data/Tag";

export interface IArticlesState {
  articles: IDataArticle[];
  tags: ITag[];
  total: number;
}

type Payload = IArticlesState;

export type IArticlesAction = IAction<Payload>;

export const articlesModel: IModel<IArticlesState, IArticlesAction> = {
  namespace: "articles",
  state: {
    articles: [],
    tags: [],
    total: 0
  },
  reducers: {
    SET_ARTICLES(state, { payload: { articles = [] } }) {
      return {
        ...state,
        articles
      };
    },
    SET_TOTAL(state, { payload: { total = 0 } }) {
      return {
        ...state,
        total
      };
    },
    SET_TAGS(state, { payload: { tags = [] } }) {
      return {
        ...state,
        tags
      };
    }
  }
};

export const articlesActions = {
  setArticles(articles: IDataArticle[]) {
    return {
      type: "articles/SET_ARTICLES",
      payload: { articles }
    };
  },
  setTotal(total: number) {
    return {
      type: "articles/SET_TOTAL",
      payload: { total }
    };
  },
  setTags(tags: ITag[]) {
    return {
      type: "articles/SET_TAGS",
      payload: { tags }
    };
  }
};

export const articlesEffects = {
  getArticles({
    page,
    size,
    sortby = "createdTime",
    order = "desc"
  }: {
    page: number;
    size: number;
    sortby?: string;
    order?: string;
  }): EffectAction<Promise<IArticlesData>, IArticlesAction> {
    return async (
      dispatch: Dispatch<IArticlesAction>
    ): Promise<IArticlesData> => {
      try {
        const data = await articlesService.getCommonArticles({
          page,
          size,
          sortby,
          order
        });
        dispatch(articlesActions.setArticles(data.articles));
        dispatch(articlesActions.setTotal(data.total));
        return data;
      } catch (err) {
        message.danger(err.message);
        throw err;
      }
    };
  },
  getTags(): EffectAction<Promise<ITag[]>, IArticlesAction> {
    return async (dispatch: Dispatch<IArticlesAction>): Promise<ITag[]> => {
      try {
        const { tags } = await articlesService.getTags();
        dispatch(articlesActions.setTags(tags));
        return tags;
      } catch (err) {
        throw err;
      }
    };
  }
};
