import request from '@/utils/request';

export async function queryFakeList(params: { count: number }) {
  // return request('/api/fake_list', {
  return request('/api/share/list', {
    params,
  });
}
