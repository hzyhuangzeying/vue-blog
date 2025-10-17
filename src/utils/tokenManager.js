/**
 * Token管理工具类
 * 处理访问令牌和刷新令牌的自动管理
 */
import { tokenApi } from '@/api'
import { deleteCookie, getCookie, setCookie } from './cookie'

class TokenManager {
  constructor() {
    this.accessTokenKey = 'accessToken'
    this.refreshTokenKey = 'refreshToken'
    this.isRefreshing = false
    this.failedQueue = []
  }

  /**
   * 获取访问令牌
   * @returns {string|null} 访问令牌
   */
  getAccessToken() {
    return getCookie(this.accessTokenKey)
  }

  /**
   * 获取刷新令牌
   * @returns {string|null} 刷新令牌
   */
  getRefreshToken() {
    return getCookie(this.refreshTokenKey)
  }

  /**
   * 设置令牌
   * @param {string} accessToken - 访问令牌
   * @param {string} refreshToken - 刷新令牌
   * @param {number} expiresIn - 过期时间（秒）
   */
  setTokens(accessToken, refreshToken, expiresIn = 3600) {
    // 设置访问令牌（短期有效）
    setCookie(this.accessTokenKey, accessToken, expiresIn / 86400) // 转换为天数
    
    // 设置刷新令牌（长期有效）
    setCookie(this.refreshTokenKey, refreshToken, 7) // 7天有效期
  }

  /**
   * 清除所有令牌
   */
  clearTokens() {
    deleteCookie(this.accessTokenKey)
    deleteCookie(this.refreshTokenKey)
  }

  /**
   * 检查访问令牌是否过期
   * @returns {boolean} 是否过期
   */
  isAccessTokenExpired() {
    const token = this.getAccessToken()
    if (!token) return true

    try {
      // 解析JWT令牌获取过期时间
      const payload = JSON.parse(atob(token.split('.')[1]))
      const currentTime = Math.floor(Date.now() / 1000)
      return payload.exp < currentTime
    } catch (error) {
      console.error('解析令牌失败:', error)
      return true
    }
  }

  /**
   * 刷新访问令牌
   * @returns {Promise<string|null>} 新的访问令牌
   */
  async refreshAccessToken() {
    const refreshToken = this.getRefreshToken()
    if (!refreshToken) {
      throw new Error('没有可用的刷新令牌')
    }

    try {
      const response = await tokenApi.refreshToken(refreshToken)
      
      // 更新令牌
      this.setTokens(
        response.accessToken,
        response.refreshToken || refreshToken, // 如果服务器返回新的refreshToken则使用，否则保持原样
        response.expiresIn
      )

      return response.accessToken
    } catch (error) {
      // 刷新失败，清除所有令牌
      this.clearTokens()
      throw error
    }
  }

  /**
   * 获取有效的访问令牌（自动刷新）
   * @returns {Promise<string|null>} 有效的访问令牌
   */
  async getValidAccessToken() {
    // 如果令牌未过期，直接返回
    if (!this.isAccessTokenExpired()) {
      return this.getAccessToken()
    }

    // 如果正在刷新，等待刷新完成
    if (this.isRefreshing) {
      return new Promise((resolve, reject) => {
        this.failedQueue.push({ resolve, reject })
      })
    }

    // 开始刷新令牌
    this.isRefreshing = true

    try {
      const newAccessToken = await this.refreshAccessToken()
      
      // 处理等待队列
      this.failedQueue.forEach(({ resolve }) => {
        resolve(newAccessToken)
      })
      this.failedQueue = []

      return newAccessToken
    } catch (error) {
      // 处理等待队列中的错误
      this.failedQueue.forEach(({ reject }) => {
        reject(error)
      })
      this.failedQueue = []

      throw error
    } finally {
      this.isRefreshing = false
    }
  }

  /**
   * 验证令牌有效性
   * @returns {Promise<boolean>} 是否有效
   */
  async validateToken() {
    try {
      await tokenApi.verifyToken()
      return true
    } catch (error) {
      return false
    }
  }
}

// 创建单例实例
export const tokenManager = new TokenManager()

// 导出类以便测试
export { TokenManager }
