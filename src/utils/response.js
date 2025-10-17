/**
 * API响应处理工具
 */
import { ElMessage } from 'element-plus'

/**
 * 统一响应处理类
 */
export class ResponseHandler {
  /**
   * 处理成功响应
   * @param {any} response - 响应数据
   * @param {string} message - 成功消息
   * @returns {any} 处理后的数据
   */
  static handleSuccess(response, message = '操作成功') {
    if (response.success !== false) {
      if (message && message !== '操作成功') {
        ElMessage.success(message)
      }
      return response.data || response
    }
    throw new Error(response.message || '操作失败')
  }

  /**
   * 处理错误响应
   * @param {any} error - 错误对象
   * @param {string} defaultMessage - 默认错误消息
   */
  static handleError(error, defaultMessage = '操作失败') {
    const message = error.response?.data?.message || error.message || defaultMessage
    ElMessage.error(message)
    throw error
  }

  /**
   * 处理分页响应
   * @param {any} response - 响应数据
   * @returns {object} 分页数据
   */
  static handlePageResponse(response) {
    if (response.success !== false) {
      return {
        list: response.data?.list || [],
        total: response.data?.total || 0,
        page: response.data?.page || 1,
        size: response.data?.size || 10,
        pages: response.data?.pages || 0
      }
    }
    throw new Error(response.message || '获取数据失败')
  }

  /**
   * 处理列表响应
   * @param {any} response - 响应数据
   * @returns {array} 列表数据
   */
  static handleListResponse(response) {
    if (response.success !== false) {
      return response.data || []
    }
    throw new Error(response.message || '获取数据失败')
  }
}

/**
 * 响应拦截器配置
 */
export const responseInterceptor = {
  /**
   * 成功响应处理
   */
  onFulfilled: (response) => {
    const { data, status } = response
    
    // 如果响应状态码是200，直接返回数据
    if (status === 200) {
      return data
    }
    
    // 如果后端返回了自定义的状态码
    if (data.code !== undefined) {
      if (data.code === 200 || data.code === 0) {
        return data.data || data
      } else {
        ElMessage.error(data.message || '请求失败')
        return Promise.reject(new Error(data.message || '请求失败'))
      }
    }
    
    return data
  },

  /**
   * 错误响应处理
   */
  onRejected: (error) => {
    console.error('响应错误:', error)
    
    const { response } = error
    
    if (response) {
      const { status, data } = response
      
      switch (status) {
        case 401:
          ElMessage.error('登录已过期，请重新登录')
          // 清除认证信息
          if (typeof window !== 'undefined') {
            document.cookie = 'Authorization=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;'
            window.location.href = '/login'
          }
          break
        case 403:
          ElMessage.error('没有权限访问该资源')
          break
        case 404:
          ElMessage.error('请求的资源不存在')
          break
        case 422:
          ElMessage.error(data?.message || '数据验证失败')
          break
        case 500:
          ElMessage.error('服务器内部错误')
          break
        default:
          ElMessage.error(data?.message || `请求失败 (${status})`)
      }
    } else if (error.code === 'ECONNABORTED') {
      ElMessage.error('请求超时，请检查网络连接')
    } else {
      ElMessage.error('网络错误，请检查网络连接')
    }
    
    return Promise.reject(error)
  }
}

/**
 * 创建标准响应格式
 * @param {any} data - 响应数据
 * @param {string} message - 响应消息
 * @param {number} code - 响应码
 * @returns {object} 标准响应格式
 */
export const createResponse = (data = null, message = '操作成功', code = 200) => {
  return {
    code,
    message,
    data,
    success: code === 200,
    timestamp: Date.now()
  }
}

/**
 * 创建分页响应格式
 * @param {array} list - 数据列表
 * @param {number} total - 总数
 * @param {number} page - 当前页
 * @param {number} size - 每页大小
 * @param {string} message - 响应消息
 * @returns {object} 分页响应格式
 */
export const createPageResponse = (list = [], total = 0, page = 1, size = 10, message = '获取成功') => {
  const pages = Math.ceil(total / size)
  return {
    code: 200,
    message,
    data: {
      list,
      total,
      page,
      size,
      pages
    },
    success: true,
    timestamp: Date.now()
  }
}

/**
 * 创建错误响应格式
 * @param {string} message - 错误消息
 * @param {number} code - 错误码
 * @param {any} details - 错误详情
 * @returns {object} 错误响应格式
 */
export const createErrorResponse = (message = '操作失败', code = 500, details = null) => {
  return {
    code,
    message,
    details,
    success: false,
    timestamp: Date.now()
  }
}
