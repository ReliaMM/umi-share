import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryRule(params: TableListParams) {
  return request('/api/bookmarks/type/tableList', {
    params,
  });
}

export async function removeRule(params: TableListParams) {
  return request('/api/bookmarks/type/delete', {
    method: 'POST',
    data: {
      ...params
    },
  });
}

export async function addRule(params: TableListParams) {
  return request('/api/bookmarks/type/add', {
    method: 'POST',
    data: {
      ...params
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/bookmarks/type/modify', {
    method: 'POST',
    data: {
      ...params
    },
  });
}
