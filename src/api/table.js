import fetch from '@/utils/fetch';

export function getList(params) {
  return fetch({
    url: '/table/list/v1',
    method: 'get',
    params
  });
}


