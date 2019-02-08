import { ITag } from "../../../data/Tag";
import { IArticle } from "src/data/Article";
import { IService } from "src/types/interface";
import { IUser } from "src/data/User";
import { get } from "src/tools/request";

export interface IDataArticle extends IArticle {
  cover: string | null;
  likes: number;
  views: number;
  comments: number;
  tags: ITag[];
  user: IUser;
}

export interface IArticlesData {
  articles: IDataArticle[];
  total: number;
}
class ArticlesService implements IService {
  public prefix = "/articles";

  public async getCommonArticles({
    page,
    size,
    sortby,
    order
  }: {
    page: number;
    size: number;
    sortby: string;
    order: string;
  }): Promise<IArticlesData> {
    return get<IArticlesData>(this.prefix, {
      page,
      size,
      sortby,
      order
    });
  }

  public async getTags(): Promise<{ tags: ITag[] }> {
    return get<{ tags: ITag[] }>("/tag/all");
  }
}

export const articlesService = new ArticlesService();
