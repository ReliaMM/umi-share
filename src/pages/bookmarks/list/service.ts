import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryRule(params: TableListParams) {
  return request('/api/bookmarks/list/tableList', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function queryCascader(params: TableListParams) {
  return request('/api/bookmarks/list/getTypeTag', {
    params,
  });
}

export async function removeRule(params: TableListParams) {
  return request('/api/bookmarks/list/delete', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListParams) {
  return request('/api/bookmarks/list/add', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/bookmarks/list/modify', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
