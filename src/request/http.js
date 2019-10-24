import axios from 'axios'
import QS from 'qs'

axios.defaults.baseURL = 'https://www.hut-idea.top'
axios.defaults.timeout = 10000

// 处理上传的axios对象
const uploadServe = axios.create({
  baseURL: 'https://www.hut-idea.top',
  timeout: 5000
})
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 封装get方法
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 封装post方法
export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 封装上传文件的方法
export function uploadFile (url, params, config = {}) {
  return new Promise((resolve, reject) => {
    uploadServe.post(url, params, config)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
}
