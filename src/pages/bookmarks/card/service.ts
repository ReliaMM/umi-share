import request from '@/utils/request';

export async function queryFakeList(params: { count: number }) {
  // return request('/api/fake_list', {
  return request('/api/bookmarks/list/tableList', {
    method: 'POST',
    data: {
      ...params
    }
  });
}
