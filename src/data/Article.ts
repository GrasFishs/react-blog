import { IImage } from "./Image";
import { ITag } from "./Tag";

export interface IArticle {
  id: number;
  title: string;
  content: string;
  createdTime: string;
  updatedTime: string;
  articleImages: IArticleImage[];
  tags: ITag[];
}

export interface IArticleImage {
  id: number;
  index: number;
  image: IImage;
}

export interface IArticleTag {
  id: number;
  tag: ITag;
}
