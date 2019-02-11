import { IService } from "src/types/interface";
import { ITag } from "src/data/Tag";
import { get } from "src/tools/request";

class TagService implements IService {
  public prefix = "/tag";

  public async getTags(): Promise<{ tags: ITag[] }> {
    return get<{ tags: ITag[] }>(this.prefix + "/all");
  }
}

export const tagService = new TagService();
