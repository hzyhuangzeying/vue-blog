/**
 * 带自动刷新Token的请求封装
 */
import { deleteCookie } from '@/utils/cookie'
import { responseInterceptor } from '@/utils/response'
import { tokenManager } from '@/utils/tokenManager'
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

// 请求拦截器 - 自动添加访问令牌
request.interceptors.request.use(
  async (config) => {
    // 跳过不需要认证的请求
    const skipAuthUrls = ['/auth/login', '/auth/register', '/auth/refresh']
    if (skipAuthUrls.some(url => config.url.includes(url))) {
      return config
    }

    try {
      // 获取有效的访问令牌（自动刷新）
      const accessToken = await tokenManager.getValidAccessToken()
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
    } catch (error) {
      console.error('获取访问令牌失败:', error)
      // 如果获取令牌失败，清除所有令牌并跳转到登录页
      tokenManager.clearTokens()
      window.location.href = '/login'
      return Promise.reject(error)
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

// 响应拦截器 - 处理401错误和自动刷新
request.interceptors.response.use(
  (response) => {
    return responseInterceptor.onFulfilled(response)
  },
  async (error) => {
    const originalRequest = error.config

    // 如果是401错误且不是刷新令牌的请求
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // 尝试刷新访问令牌
        const newAccessToken = await tokenManager.refreshAccessToken()
        
        // 更新请求头
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        
        // 重新发送原始请求
        return request(originalRequest)
      } catch (refreshError) {
        console.error('刷新令牌失败:', refreshError)
        
        // 刷新失败，清除所有令牌并跳转到登录页
        tokenManager.clearTokens()
        deleteCookie('user')
        
        // 显示错误消息
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
        
        return Promise.reject(refreshError)
      }
    }

    // 其他错误使用统一的错误处理
    return responseInterceptor.onRejected(error)
  }
)

// 封装请求方法
export const httpWithRefresh = {
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

  delete(url, config = {}) {
    return request({
      method: 'delete',
      url,
      ...config
    })
  },

  upload(url, file, onProgress, config = {}) {
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
      },
      ...config
    })
  }
}

export default request
