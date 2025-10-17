/**
 * 用户关注相关API
 */
import { ResponseHandler } from '@/utils/response'
import { http } from '../../request'

export const followApi = {
  /**
   * 关注用户
   * @param {number} userId - 用户ID
   * @returns {Promise} 关注结果
   */
  async followUser(userId) {
    try {
      const response = await http.post(`/user/follow/${userId}`)
      return ResponseHandler.handleSuccess(response, '关注成功')
    } catch (error) {
      ResponseHandler.handleError(error, '关注失败')
    }
  },

  /**
   * 取消关注用户
   * @param {number} userId - 用户ID
   * @returns {Promise} 取消关注结果
   */
  async unfollowUser(userId) {
    try {
      const response = await http.delete(`/user/follow/${userId}`)
      return ResponseHandler.handleSuccess(response, '取消关注成功')
    } catch (error) {
      ResponseHandler.handleError(error, '取消关注失败')
    }
  },

  /**
   * 获取关注列表
   * @param {Object} params - 查询参数
   * @returns {Promise} 关注列表
   */
  async getFollowingList(params) {
    try {
      const response = await http.get('/user/following', params)
      return ResponseHandler.handlePageResponse(response)
    } catch (error) {
      ResponseHandler.handleError(error, '获取关注列表失败')
    }
  },

  /**
   * 获取粉丝列表
   * @param {Object} params - 查询参数
   * @returns {Promise} 粉丝列表
   */
  async getFollowersList(params) {
    try {
      const response = await http.get('/user/followers', params)
      return ResponseHandler.handlePageResponse(response)
    } catch (error) {
      ResponseHandler.handleError(error, '获取粉丝列表失败')
    }
  }
}
