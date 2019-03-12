import jsonp from 'jsonp'
import axios from 'axios'
import { commonParams, options } from './config'

function param(url, data) {
  const params = []
  Object.keys(data).forEach((key) => {
    params.push(`${key}=${data[key]}`)
  })

  return `${url}?${params.join('&')}`
}

export function getRecommand() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const obj = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1,
  })

  return new Promise((resolve, reject) => {
    jsonp(param(url, obj), options, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
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
