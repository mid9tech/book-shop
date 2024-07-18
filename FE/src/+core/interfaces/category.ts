export interface Category {
  id: string;
  name: string;
  type: string;
  parentId?: string;
  childs?: Category[];
}
