/**
 * 请求封装 (TypeScript版本)
 */
import { getCookie } from '@/utils/cookie'
import { responseInterceptor } from '@/utils/response'
import axios, { type AxiosInstance, type AxiosRequestConfig, type InternalAxiosRequestConfig } from 'axios'

// 创建axios实例
const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // 自动携带cookie
})

// 请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getCookie("Authorization")
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
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
  get<T = any>(url: string, params: Record<string, any> = {}, config: AxiosRequestConfig = {}): Promise<T> {
    return request({
      method: 'get',
      url,
      params,
      ...config
    })
  },

  post<T = any>(url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<T> {
    return request({
      method: 'post',
      url,
      data,
      ...config
    })
  },

  put<T = any>(url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<T> {
    return request({
      method: 'put',
      url,
      data,
      ...config
    })
  },

  delete<T = any>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    return request({
      method: 'delete',
      url,
      ...config
    })
  },

  upload<T = any>(
    url: string, 
    file: File, 
    onProgress?: (progress: number) => void, 
    config: AxiosRequestConfig = {}
  ): Promise<T> {
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
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          onProgress(percentCompleted)
        }
      },
      ...config
    })
  }
}

export default request
