import { TableListItem as TypeTableListItem } from '../type/data.d';
export interface TableListItem {
  id?: number;
  name?: string;
  subject?: string;
  type?: string;
  bookmark_type?: TypeTableListItem;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter: string;
  status: string;
  name: string;
  pageSize: number;
  currentPage: number;
}
