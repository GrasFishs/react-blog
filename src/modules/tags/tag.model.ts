import { ITag } from "src/data/Tag";
import { IAction, IModel } from "src/types/redux";
import { EffectAction } from "src/reducers";
import { Dispatch } from "react";
import { tagService } from "./tag.service";

export interface ITagState {
  tags: ITag[];
}

type Payload = ITagState;

export type ITagAction = IAction<Payload>;

export const tagModel: IModel<ITagState, ITagAction> = {
  state: {
    tags: []
  },
  namespace: "tag",
  reducers: {
    SET_TAGS(state, { payload: { tags = [] } }) {
      return {
        ...state,
        tags
      };
    }
  }
};

export const tagActions = {
  setTags(tags: ITag[]) {
    return {
      type: "tag/SET_TAGS",
      payload: { tags }
    };
  }
};

export const tagEffects = {
  getTags(): EffectAction<Promise<ITag[]>, ITagAction> {
    return async (dispatch: Dispatch<ITagAction>): Promise<ITag[]> => {
      try {
        const { tags } = await tagService.getTags();
        dispatch(tagActions.setTags(tags));
        return tags;
      } catch (err) {
        throw err;
      }
    };
  }
};
