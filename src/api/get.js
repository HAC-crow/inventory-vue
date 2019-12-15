import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/v1/purchase/getList',
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
    url: '/api/v1/purchase/create',
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
    url: '/api/v1/purchase/delete/' + id,
    method: 'get'
  })
}

export function update(params) {
  return request({
    url: '/api/v1/purchase/update',
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
    url: '/api/v1/purchase/getById/' + id,
    method: 'get'
  })
}

