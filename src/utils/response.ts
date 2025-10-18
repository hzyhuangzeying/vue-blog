/**
 * 统一响应处理工具 (TypeScript版本)
 */
import type { BaseResponse, PageResponse } from '@/types/api'
import { ResponseCode } from '@/types/api'
import { ElMessage, ElMessageBox } from 'element-plus'
import { deleteCookie } from './cookie'

/**
 * 响应处理配置接口
 */
interface ResponseConfig {
  /** 是否显示成功消息 */
  showSuccessMessage?: boolean
  /** 是否显示错误消息 */
  showErrorMessage?: boolean
  /** 是否自动处理登录过期 */
  autoHandleAuth?: boolean
  /** 自定义成功消息 */
  successMessage?: string
  /** 自定义错误消息 */
  errorMessage?: string
}

/**
 * 业务状态码处理器接口
 */
interface BusinessCodeHandler {
  message: string
  type: 'success' | 'error'
  shouldReject: boolean
  autoRedirect?: boolean
}

/**
 * 业务状态码处理映射
 */
const BUSINESS_CODE_HANDLERS: Record<number, BusinessCodeHandler> = {
  [ResponseCode.SUCCESS]: {
    message: '操作成功',
    type: 'success',
    shouldReject: false
  },
  [ResponseCode.CREATED]: {
    message: '创建成功',
    type: 'success',
    shouldReject: false
  },
  [ResponseCode.BAD_REQUEST]: {
    message: '请求参数错误',
    type: 'error',
    shouldReject: true
  },
  [ResponseCode.UNAUTHORIZED]: {
    message: '未授权访问',
    type: 'error',
    shouldReject: true,
    autoRedirect: true
  },
  [ResponseCode.FORBIDDEN]: {
    message: '禁止访问',
    type: 'error',
    shouldReject: true
  },
  [ResponseCode.NOT_FOUND]: {
    message: '资源不存在',
    type: 'error',
    shouldReject: true
  },
  [ResponseCode.INTERNAL_ERROR]: {
    message: '服务器内部错误',
    type: 'error',
    shouldReject: true
  },
  [ResponseCode.VALIDATION_ERROR]: {
    message: '数据验证失败',
    type: 'error',
    shouldReject: true
  }
}

/**
 * 统一响应处理工具
 */
export const ResponseHandler = {
  /**
   * 处理成功的响应
   * @param response - API响应对象
   * @param config - 响应处理配置
   * @returns 提取后的数据
   */
  handleSuccess<T>(response: BaseResponse<T>, config: ResponseConfig = {}): T {
    const {
      showSuccessMessage = false,
      successMessage,
      showErrorMessage = true
    } = config

    if (response && (response.code === ResponseCode.SUCCESS || response.code === 0)) {
      if (showSuccessMessage && successMessage) {
        ElMessage.success(successMessage)
      }
      return response.data
    } else {
      const errorMessage = response?.message || '请求成功但数据异常'
      if (showErrorMessage) {
        ElMessage.error(errorMessage)
      }
      throw new Error(errorMessage)
    }
  },

  /**
   * 处理分页响应
   * @param response - API分页响应对象
   * @param config - 响应处理配置
   * @returns 提取后的分页数据
   */
  handlePageResponse<T>(response: BaseResponse<PageResponse<T>>, config: ResponseConfig = {}): PageResponse<T> {
    const { showErrorMessage = true } = config

    if (response && (response.code === ResponseCode.SUCCESS || response.code === 0)) {
      return {
        list: response.data.list || [],
        pagination: response.data.pagination || { pageNum: 1, pageSize: 10, total: 0, pages: 0 }
      }
    } else {
      const errorMessage = response?.message || '获取分页数据失败'
      if (showErrorMessage) {
        ElMessage.error(errorMessage)
      }
      throw new Error(errorMessage)
    }
  },

  /**
   * 处理列表响应
   * @param response - API列表响应对象
   * @param config - 响应处理配置
   * @returns 提取后的列表数据
   */
  handleListResponse<T>(response: BaseResponse<T[]>, config: ResponseConfig = {}): T[] {
    const { showErrorMessage = true } = config

    if (response && (response.code === ResponseCode.SUCCESS || response.code === 0)) {
      return response.data || []
    } else {
      const errorMessage = response?.message || '获取列表数据失败'
      if (showErrorMessage) {
        ElMessage.error(errorMessage)
      }
      throw new Error(errorMessage)
    }
  },

  /**
   * 处理错误的响应
   * @param error - 错误对象
   * @param configOrMessage - 响应处理配置或错误消息（向后兼容）
   */
  handleError(error: any, configOrMessage: ResponseConfig | string = {}): void {
    // 向后兼容：如果第二个参数是字符串，则转换为配置对象
    const config: ResponseConfig = typeof configOrMessage === 'string' 
      ? { errorMessage: configOrMessage }
      : configOrMessage
    const {
      showErrorMessage = true,
      errorMessage: customErrorMessage,
      autoHandleAuth = true
    } = config

    console.error('API Error:', error)
    const { response } = error

    if (response) {
      const { status, data } = response
      const businessCode = data?.code || status
      const handler = BUSINESS_CODE_HANDLERS[businessCode as keyof typeof BUSINESS_CODE_HANDLERS]

      if (handler) {
        const message = customErrorMessage || data?.message || handler.message
        
        if (showErrorMessage) {
          ElMessage[handler.type](message)
        }

        // 处理需要自动重定向的情况
        if (handler.autoRedirect && autoHandleAuth) {
          this.handleAuthExpired()
        }

        if (handler.shouldReject) {
          throw error
        }
      } else {
        // 处理其他HTTP状态码
        this.handleHttpError(status, data, showErrorMessage, customErrorMessage)
        throw error
      }
    } else if (error.code === 'ECONNABORTED') {
      if (showErrorMessage) {
        ElMessage.error('请求超时，请检查网络连接')
      }
      throw error
    } else {
      if (showErrorMessage) {
        ElMessage.error('网络错误，请检查网络连接')
      }
      throw error
    }
  },

  /**
   * 处理HTTP错误
   * @param status - HTTP状态码
   * @param data - 响应数据
   * @param showErrorMessage - 是否显示错误消息
   * @param customErrorMessage - 自定义错误消息
   */
  handleHttpError(status: number, data: any, showErrorMessage: boolean, customErrorMessage?: string): void {
    const errorMessages: Record<number, string> = {
      400: '请求参数错误',
      401: '未授权访问',
      403: '禁止访问',
      404: '请求的资源不存在',
      405: '请求方法不被允许',
      408: '请求超时',
      409: '请求冲突',
      422: '数据验证失败',
      429: '请求过于频繁',
      500: '服务器内部错误',
      502: '网关错误',
      503: '服务不可用',
      504: '网关超时'
    }

    const message = customErrorMessage || data?.message || errorMessages[status] || `请求失败 (${status})`
    
    if (showErrorMessage) {
      ElMessage.error(message)
    }

    // 特殊处理401错误
    if (status === 401) {
      this.handleAuthExpired()
    }
  },

  /**
   * 处理认证过期
   */
  handleAuthExpired(): void {
    deleteCookie('Authorization')
    deleteCookie('user')
    
    ElMessageBox.confirm(
      '登录已过期，请重新登录',
      '提示',
      {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then(() => {
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }).catch(() => {
      // 用户取消，不做任何操作
    })
  },

  /**
   * 处理业务状态码
   * @param code - 业务状态码
   * @param message - 自定义消息
   * @param showMessage - 是否显示消息
   */
  handleBusinessCode(code: number, message?: string, showMessage: boolean = true): void {
    const handler = BUSINESS_CODE_HANDLERS[code as keyof typeof BUSINESS_CODE_HANDLERS]
    
    if (handler) {
      const finalMessage = message || handler.message
      
      if (showMessage) {
        ElMessage[handler.type](finalMessage)
      }

      if (handler.autoRedirect) {
        this.handleAuthExpired()
      }
    }
  }
}

/**
 * 增强的Axios响应拦截器函数
 */
export const responseInterceptor = {
  onFulfilled: (response: any) => {
    const { data } = response
    
    // 检查是否有业务状态码
    if (data && typeof data.code === 'number') {
      const handler = BUSINESS_CODE_HANDLERS[data.code as keyof typeof BUSINESS_CODE_HANDLERS]
      
      if (handler) {
        if (handler.shouldReject) {
          // 业务错误，但HTTP状态码可能是200
          return Promise.reject({
            response: {
              status: data.code,
              data: data
            },
            message: data.message || handler.message
          })
        } else {
          // 业务成功
          return data
        }
      }
    }
    
    // 兼容旧格式：code === 0 或 code === 200
    if (data && (data.code === ResponseCode.SUCCESS || data.code === 0)) {
      return data
    } else {
      // 业务错误，但HTTP状态码可能是200
      return Promise.reject({
        response: {
          status: data?.code || 400,
          data: data
        },
        message: data?.message || '业务请求失败'
      })
    }
  },
  
  onRejected: (error: any) => {
    // 使用增强的错误处理
    ResponseHandler.handleError(error, {
      showErrorMessage: true,
      autoHandleAuth: true
    })
    return Promise.reject(error)
  }
}

/**
 * 创建自定义响应处理器
 * @param config - 响应处理配置
 * @returns 自定义响应处理器
 */
export const createResponseHandler = (config: ResponseConfig) => {
  return {
    handleSuccess: <T>(response: BaseResponse<T>) => 
      ResponseHandler.handleSuccess(response, config),
    handlePageResponse: <T>(response: BaseResponse<PageResponse<T>>) =>
      ResponseHandler.handlePageResponse(response, config),
    
    handleListResponse: <T>(response: BaseResponse<T[]>) => 
      ResponseHandler.handleListResponse(response, config),
    
    handleError: (error: any) => 
      ResponseHandler.handleError(error, config)
  }
}

/**
 * 常用的响应处理器预设
 */
export const ResponseHandlers = {
  // 静默处理（不显示任何消息）
  silent: createResponseHandler({
    showSuccessMessage: false,
    showErrorMessage: false,
    autoHandleAuth: false
  }),
  
  // 只显示成功消息
  successOnly: createResponseHandler({
    showSuccessMessage: true,
    showErrorMessage: false,
    autoHandleAuth: false
  }),
  
  // 只显示错误消息
  errorOnly: createResponseHandler({
    showSuccessMessage: false,
    showErrorMessage: true,
    autoHandleAuth: true
  }),
  
  // 完整处理（默认）
  full: createResponseHandler({
    showSuccessMessage: true,
    showErrorMessage: true,
    autoHandleAuth: true
  })
}