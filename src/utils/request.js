import axios from 'axios'
import qs from 'qs'

const baseOptions = ({ path, data, params, method, headers }) => axios({
  method,
  headers,
  params,
  data,
  url: path,
  // withCredentials: true,
})
.then(res => {
  if (res.status !== 200) {
    throw new Error(`请求响应HTTP状态码：${res.status}`)
  }
  return res.data
})
.catch(e => {
  console.log(e.status)
  console.log(e)
  return { success: false, data: { list: [] } }
})

const get = ({ path, params, headers={} }) => baseOptions({
  path,
  params,
  method: 'get',
  headers,
})

const post = ({ path, params, data, headers={}, type='form' }) => baseOptions({
  path,
  params,
  data: type === 'form' ? qs.stringify(data) : data,
  method: 'post',
  headers: {
    'Content-type': type === 'form' ? 'application/x-www-form-urlencoded' : 'application/json'
  },
})

export {
  get,
  post,
}
