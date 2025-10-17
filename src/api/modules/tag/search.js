/**
 * 标签搜索相关API
 */
import { ResponseHandler } from '@/utils/response'
import { http } from '../../request'

export const tagSearchApi = {
  /**
   * 获取热门标签
   * @param {Object} params - 查询参数
   * @param {number} params.limit - 限制数量
   * @returns {Promise} 热门标签列表
   */
  async getHotTags(params) {
    try {
      const response = await http.get('/tags/hot', params)
      return ResponseHandler.handleListResponse(response)
    } catch (error) {
      ResponseHandler.handleError(error, '获取热门标签失败')
    }
  },

  /**
   * 搜索标签
   * @param {Object} params - 搜索参数
   * @param {string} params.keyword - 搜索关键词
   * @returns {Promise} 搜索结果
   */
  async searchTags(params) {
    try {
      const response = await http.get('/tags/search', params)
      return ResponseHandler.handleListResponse(response)
    } catch (error) {
      ResponseHandler.handleError(error, '搜索标签失败')
    }
  },

  /**
   * 获取标签下的文章数量
   * @param {number} id - 标签ID
   * @returns {Promise} 文章数量
   */
  async getTagArticleCount(id) {
    try {
      const response = await http.get(`/tags/${id}/article-count`)
      return ResponseHandler.handleSuccess(response)
    } catch (error) {
      ResponseHandler.handleError(error, '获取文章数量失败')
    }
  }
}
