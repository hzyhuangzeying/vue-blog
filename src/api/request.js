import { getCookie } from '@/utils/cookie'
import { responseInterceptor } from '@/utils/response'
import axios from 'axios'

// 创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // 自动携带cookie
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = getCookie("Authorization");
    if (token){
      config.headers.Authorization=`Bearer ${token}`
    }
    // 添加时间戳防止缓存
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now()
      }
    }
    return config
  },
  (error) => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  responseInterceptor.onFulfilled,
  responseInterceptor.onRejected
)

// 封装请求方法
export const http = {
  get(url, params = {}, config = {}) {
    return request({
      method: 'get',
      url,
      params,
      ...config
    })
  },
  
  post(url, data = {}, config = {}) {
    return request({
      method: 'post',
      url,
      data,
      ...config
    })
  },
  
  put(url, data = {}, config = {}) {
    return request({
      method: 'put',
      url,
      data,
      ...config
    })
  },
  
  delete(url, params = {}, config = {}) {
    return request({
      method: 'delete',
      url,
      params,
      ...config
    })
  },
  
  patch(url, data = {}, config = {}) {
    return request({
      method: 'patch',
      url,
      data,
      ...config
    })
  },
  
  // 文件上传
  upload(url, file, onProgress = null) {
    const formData = new FormData()
    formData.append('file', file)
    
    return request({
      method: 'post',
      url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          onProgress(percentCompleted)
        }
      }
    })
  },
  
  // 下载文件
  download(url, filename = '') {
    return request({
      method: 'get',
      url,
      responseType: 'blob'
    }).then(response => {
      const blob = new Blob([response])
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    })
  }
}

export default request
