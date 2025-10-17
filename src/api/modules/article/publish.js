/**
 * 文章发布相关API
 */
import { ResponseHandler } from '@/utils/response'
import { http } from '../../request'

export const articlePublishApi = {
  /**
   * 发布文章
   * @param {number} id - 文章ID
   * @returns {Promise} 发布结果
   */
  async publishArticle(id) {
    try {
      const response = await http.post(`/articles/${id}/publish`)
      return ResponseHandler.handleSuccess(response, '文章发布成功')
    } catch (error) {
      ResponseHandler.handleError(error, '文章发布失败')
    }
  },

  /**
   * 取消发布文章
   * @param {number} id - 文章ID
   * @returns {Promise} 取消发布结果
   */
  async unpublishArticle(id) {
    try {
      const response = await http.post(`/articles/${id}/unpublish`)
      return ResponseHandler.handleSuccess(response, '文章取消发布成功')
    } catch (error) {
      ResponseHandler.handleError(error, '文章取消发布失败')
    }
  }
}
