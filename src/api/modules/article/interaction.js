/**
 * 文章互动相关API
 */
import { ResponseHandler } from '@/utils/response'
import { http } from '../../request'

export const articleInteractionApi = {
  /**
   * 点赞文章
   * @param {number} id - 文章ID
   * @returns {Promise} 点赞结果
   */
  async likeArticle(id) {
    try {
      const response = await http.post(`/articles/${id}/like`)
      return ResponseHandler.handleSuccess(response, '点赞成功')
    } catch (error) {
      ResponseHandler.handleError(error, '点赞失败')
    }
  },

  /**
   * 取消点赞文章
   * @param {number} id - 文章ID
   * @returns {Promise} 取消点赞结果
   */
  async unlikeArticle(id) {
    try {
      const response = await http.delete(`/articles/${id}/like`)
      return ResponseHandler.handleSuccess(response, '取消点赞成功')
    } catch (error) {
      ResponseHandler.handleError(error, '取消点赞失败')
    }
  },

  /**
   * 收藏文章
   * @param {number} id - 文章ID
   * @returns {Promise} 收藏结果
   */
  async favoriteArticle(id) {
    try {
      const response = await http.post(`/articles/${id}/favorite`)
      return ResponseHandler.handleSuccess(response, '收藏成功')
    } catch (error) {
      ResponseHandler.handleError(error, '收藏失败')
    }
  },

  /**
   * 取消收藏文章
   * @param {number} id - 文章ID
   * @returns {Promise} 取消收藏结果
   */
  async unfavoriteArticle(id) {
    try {
      const response = await http.delete(`/articles/${id}/favorite`)
      return ResponseHandler.handleSuccess(response, '取消收藏成功')
    } catch (error) {
      ResponseHandler.handleError(error, '取消收藏失败')
    }
  }
}
