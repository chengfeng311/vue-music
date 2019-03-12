import axios from 'axios'
import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

export function getRecommand() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const params = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1,
  })
  return jsonp(url, params, options)
}

export function getDiscList() {
  // 线上环境使用线上地址
  const url = '/api/getDiscList'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json',
  })

  return axios.get(url, {
    params: data,
  }).then(res => Promise.resolve(res.data))
}
