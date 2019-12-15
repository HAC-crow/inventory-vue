import request from '@/utils/request'

export function getXData() {
  return request({
    url: '/api/v1/getXData',
    method: 'get'
  })
}
