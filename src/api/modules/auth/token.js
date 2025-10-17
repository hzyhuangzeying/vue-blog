/**
 * Token相关API
 */
import { ResponseHandler } from '@/utils/response'
import { http } from '../../request'

export const tokenApi = {
  /**
   * 刷新token
   * @param {string} refreshToken - 刷新token
   * @returns {Promise} 刷新结果
   */
  async refreshToken(refreshToken) {
    try {
      const response = await http.post('/auth/refresh', { refreshToken })
      return ResponseHandler.handleSuccess(response, 'Token刷新成功')
    } catch (error) {
      ResponseHandler.handleError(error, 'Token刷新失败')
    }
  },

  /**
   * 验证token
   * @returns {Promise} 验证结果
   */
  async verifyToken() {
    try {
      const response = await http.get('/auth/verify')
      return ResponseHandler.handleSuccess(response)
    } catch (error) {
      ResponseHandler.handleError(error, 'Token验证失败')
    }
  }
}
