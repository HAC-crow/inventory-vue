import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/v1/sell/getList',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    method: 'post',
    data: params
  })
}

export function create(params) {
  console.log(params)
  return request({
    url: '/api/v1/sell/create',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    method: 'post',
    data: params
  })
}

export function deleteById(id) {
  console.log(id)
  return request({
    url: '/api/v1/sell/delete/' + id,
    method: 'get'
  })
}

export function update(params) {
  return request({
    url: '/api/v1/sell/update',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    method: 'post',
    data: params
  })
}

export function getById(id) {
  console.log(id)
  return request({
    url: '/api/v1/sell/getById/' + id,
    method: 'get'
  })
}

