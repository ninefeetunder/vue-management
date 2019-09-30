import axios from 'axios'
import QS from 'qs'

axios.defaults.baseURL = 'https://www.hut-idea.top'

axios.defaults.timeout = 10000

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截
// axios.interceptors.request.use(
//   config => {
//     const token = store.state.token
//     token && (config.headers.Authorization = token)
//     return config
//   },
//   error => {
//     return Promise.error(error)
//   }
// )

// 相应拦截
// axios.interceptors.response.use(
//   config => {

//   }
// )

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
