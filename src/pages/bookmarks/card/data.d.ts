export interface Member {
  avatar: string;
  name: string;
  id: string;
}

interface TypeTagList {
  name: string;
}
export interface CascaderOption {
  id: string;
  name?: React.ReactNode;
  disabled?: boolean;
  bookmark_tags?: CascaderOption[];
}
export interface ListItemDataType {
  id: string;
  name: string;
  type: string;
  tag: string;
  icon: string;
  link: string;
  subject: string;
  updatedAt: number;
  createdAt: number;
  bookmark_type: TypeTagList;
  bookmark_tag: TypeTagList;
}
