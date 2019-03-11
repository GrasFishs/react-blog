import { EffectAction } from "./../../reducers/index";
import { IModel, IAction } from "./../../types/redux";
import { IDataArticle } from "../home/index.service";
import { Dispatch } from "redux";
import { articleService } from "./article.service";

export interface IArticleState {
  article: IDataArticle | null;
  status: boolean;
  loading: boolean;
}

type Payload = IArticleState;

export type IArticleAction = IAction<Payload>;

export const articleModel: IModel<IArticleState, IArticleAction> = {
  namespace: "article",
  state: {
    article: null,
    status: false,
    loading: false
  },
  reducers: {
    SET_ARTICLE(state, { payload: { article = null } }) {
      return {
        ...state,
        article
      };
    },
    SET_STATUS(state, { payload: { status = false } }) {
      return {
        ...state,
        status
      };
    },
    SET_LOADING(state, { payload: { loading = false } }) {
      return {
        ...state,
        loading
      };
    }
  }
};

export const articleActions = {
  setArticle(article: IDataArticle | null) {
    return {
      type: "article/SET_ARTICLE",
      payload: { article }
    };
  },
  setStatus(status: boolean) {
    return {
      type: "article/SET_STATUS",
      payload: { status }
    };
  },
  setLoading(loading: boolean) {
    return {
      type: "article/SET_LOADING",
      payload: { loading }
    };
  }
};

export const articleEffects = {
  getArticle(id: number): EffectAction<Promise<IDataArticle>, IArticleAction> {
    return async (dispatch: Dispatch) => {
      dispatch(articleActions.setLoading(true));
      try {
        const { article } = await articleService.getArticle(id);
        dispatch(articleActions.setArticle(article));
        dispatch(articleActions.setStatus(true));
        return article;
      } catch (err) {
        dispatch(articleActions.setStatus(false));
        return err;
      } finally {
        dispatch(articleActions.setLoading(false));
      }
    };
  }
};
