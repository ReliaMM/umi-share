export interface TableListItem {
  id: number;
  disabled?: boolean;
  name: string;
  subject: string;
  icon: string;
  link: string;
  type: number;
  tag: number;
  bookmark_type: TypeTagList;
  bookmark_tag: TypeTagList;
}

interface TypeTagList {
  name: string;
}
export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}
export interface CascaderOption {
  id: string;
  name?: React.ReactNode;
  disabled?: boolean;
  bookmark_tags?: CascaderOption[];
}
export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface CascaderListData {
  list: CascaderOption[];
  pagination: Partial<TableListPagination>;
}
export interface TableListParams {
  sorter: string;
  status: string;
  name: string;
  pageSize: number;
  currentPage: number;
}
