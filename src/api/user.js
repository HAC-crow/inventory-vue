import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/v1/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/v1/getUserInfo',
    method: 'post',
    data: token
  })
}

export function logout() {
  return request({
    url: '/api/v1/loginout',
    method: 'get'
  })
}
