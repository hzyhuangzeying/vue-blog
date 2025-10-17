/**
 * 分类树相关API
 */
import { ResponseHandler } from '@/utils/response'
import { http } from '../../request'

export const categoryTreeApi = {
  /**
   * 获取分类树
   * @returns {Promise} 分类树
   */
  async getCategoryTree() {
    try {
      const response = await http.get('/categories/tree')
      return ResponseHandler.handleSuccess(response)
    } catch (error) {
      ResponseHandler.handleError(error, '获取分类树失败')
    }
  },

  /**
   * 获取分类下的文章数量
   * @param {number} id - 分类ID
   * @returns {Promise} 文章数量
   */
  async getCategoryArticleCount(id) {
    try {
      const response = await http.get(`/categories/${id}/article-count`)
      return ResponseHandler.handleSuccess(response)
    } catch (error) {
      ResponseHandler.handleError(error, '获取文章数量失败')
    }
  }
}
