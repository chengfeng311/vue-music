import jsonp from 'jsonp'

function param(url, data) {
  const params = []
  Object.keys(data).forEach((key) => {
    params.push(`${key}=${data[key]}`)
  })

  return `${url}?${params.join('&')}`
}

export default function (url, params, options) {
  return new Promise((resolve, reject) => {
    jsonp(param(url, params), options, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
