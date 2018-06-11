/**
 * Created by mds on 17/2/20.
 */
let request = {}
request.get = function (url) {
  return fetch(url,{
  })
    .then((response) => response.json())
}
request.post = function (url, params = {}) { //json参数
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(params)
  })
    .then((response) => response.json())
}
request.postForm = function (url, params) { //字符串参数
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Cache-Control': 'no-cache'
    },
    body: params
  })
    .then((response) => response.json())
}
export default request
