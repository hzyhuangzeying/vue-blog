/**
 * 文章评论相关API
 */
import { ResponseHandler } from '@/utils/response'
import { http } from '../../request'

export const articleCommentApi = {
  /**
   * 获取文章评论
   * @param {number} id - 文章ID
   * @param {Object} params - 查询参数
   * @returns {Promise} 评论列表
   */
  async getArticleComments(id, params) {
    try {
      const response = await http.get(`/articles/${id}/comments`, params)
      return ResponseHandler.handlePageResponse(response)
    } catch (error) {
      ResponseHandler.handleError(error, '获取评论失败')
    }
  },

  /**
   * 添加文章评论
   * @param {number} id - 文章ID
   * @param {Object} data - 评论数据
   * @returns {Promise} 添加结果
   */
  async addArticleComment(id, data) {
    try {
      const response = await http.post(`/articles/${id}/comments`, data)
      return ResponseHandler.handleSuccess(response, '评论添加成功')
    } catch (error) {
      ResponseHandler.handleError(error, '评论添加失败')
    }
  },

  /**
   * 删除文章评论
   * @param {number} articleId - 文章ID
   * @param {number} commentId - 评论ID
   * @returns {Promise} 删除结果
   */
  async deleteArticleComment(articleId, commentId) {
    try {
      const response = await http.delete(`/articles/${articleId}/comments/${commentId}`)
      return ResponseHandler.handleSuccess(response, '评论删除成功')
    } catch (error) {
      ResponseHandler.handleError(error, '评论删除失败')
    }
  }
}
