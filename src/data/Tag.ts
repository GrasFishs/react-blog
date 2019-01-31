export interface ITag {
  id: number;
  parentTag: ITag | null;
  name: string;
}
