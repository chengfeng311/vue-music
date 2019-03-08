import jsonp from 'jsonp'
import { commonParams, options } from './config'

function param(url, data) {
	const params = []
	Object.keys(data).forEach((key) => {
		params.push(`${key}=${data[key]}`)
	})

	return `${url}?${params.join('&')}`
}

export default function getRecommand() {
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
