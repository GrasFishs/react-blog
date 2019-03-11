import { IService } from "src/types/interface";
import { IDataArticle } from "../home/index.service";
import { get } from "src/tools/request";

class ArticleService implements IService {
  public prefix = "/article";

  public getArticle(id: number): Promise<{ article: IDataArticle }> {
    return get<{ article: IDataArticle }>(this.prefix + "/" + id);
  }
}

export const articleService = new ArticleService();
