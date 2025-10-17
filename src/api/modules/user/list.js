/**
 * 用户列表相关API
 */
import { ResponseHandler } from '@/utils/response'
import { http } from '../../request'

export const userListApi = {
  /**
   * 获取用户列表
   * @param {Object} params - 查询参数
   * @param {number} params.page - 页码
   * @param {number} params.size - 每页大小
   * @param {string} params.keyword - 搜索关键词
   * @returns {Promise} 用户列表
   */
  async getUserList(params) {
    try {
      const response = await http.get('/user/list', params)
      return ResponseHandler.handlePageResponse(response)
    } catch (error) {
      ResponseHandler.handleError(error, '获取用户列表失败')
    }
  },

  /**
   * 获取用户统计信息
   * @param {number} userId - 用户ID
   * @returns {Promise} 统计信息
   */
  async getUserStats(userId) {
    try {
      const response = await http.get(`/user/stats/${userId}`)
      return ResponseHandler.handleSuccess(response)
    } catch (error) {
      ResponseHandler.handleError(error, '获取统计信息失败')
    }
  }
}
