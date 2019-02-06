import { ITag } from "../../../data/Tag";
import { IArticle } from "src/data/Article";
import { IService } from "src/types/interface";

export interface IDataArticle extends IArticle {
  cover: string | null;
  tags: ITag[];
}

export interface IArticlesData {
  articles: IDataArticle[];
  total: number;
  page: number;
  size: number;
}

const createArticles = (len: number) => {
  const articles: IDataArticle[] = [];
  for (let i = 0; i < len; i++) {
    articles.push({
      id: i,
      title: "标题" + i,
      content:
        "打算打算的撒655555555555从下周才执行宣传行政村自行车现在czx894d89sf4sd98f4sd980f4sd980ds9f8sd04f980dsf980d4f89sd0490ds80sd98f04d890",
      createdTime: +new Date(),
      updatedTime: +new Date(),
      cover: null,
      tags: [{ id: 0, parentTag: null, name: "javascript" }]
    });
  }
  return articles;
};

class ArticlesService implements IService {
  public prefix = "articles";

  private total = 46;
  private data: IDataArticle[];
  constructor() {
    this.data = createArticles(this.total);
  }

  public async getCommonArticles({
    page,
    size
  }: {
    page: number;
    size: number;
  }): Promise<IArticlesData> {
    return {
      articles: this.data.slice((page - 1) * size, page * size),
      total: this.total,
      page,
      size
    };
  }
}

export const articlesService = new ArticlesService();
