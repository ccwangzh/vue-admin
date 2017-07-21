import fetch from '@/utils/fetch';

export function login(email, password) {
  return fetch({
    url: '/user/login/v1',
    method: 'post',
    params: {
      email,
      password
    }
  });
}

export function getInfo(token) {
  return fetch({
    url: '/user/info/v1',
    method: 'get',
    params: { token }
  });
}

export function logout(token) {
  return fetch({
    url: '/user/logout/v1',
    method: 'post',
    params: { token }
  });
}



