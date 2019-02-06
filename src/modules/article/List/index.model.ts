import { IDataArticle, IArticlesData, articlesService } from "./index.service";
import { IAction, IModel } from "src/types/redux";
import { EffectAction } from "src/reducers";
import { Dispatch } from "react";
import { message } from "src/components/Message";

export interface IArticlesState {
  articles: IDataArticle[];
  total: number;
}

type Payload = IArticlesState;

export type IArticlesAction = IAction<Payload>;

export const articlesModel: IModel<IArticlesState, IArticlesAction> = {
  namespace: "articles",
  state: {
    articles: [],
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
  }
};

export const articlesEffects = {
  getArticles({
    page,
    size
  }: {
    page: number;
    size: number;
  }): EffectAction<Promise<IArticlesData>, IArticlesAction> {
    return async (
      dispatch: Dispatch<IArticlesAction>
    ): Promise<IArticlesData> => {
      try {
        const data = await articlesService.getCommonArticles({
          page,
          size
        });
        dispatch(articlesActions.setArticles(data.articles));
        dispatch(articlesActions.setTotal(data.total));
        return data;
      } catch (err) {
        message.danger(err.message);
        throw err;
      }
    };
  }
};
