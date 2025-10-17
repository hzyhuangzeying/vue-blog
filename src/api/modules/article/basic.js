/**
 * 文章基础操作API
 */
import { ResponseHandler } from '@/utils/response'
import { http } from '../../request'

export const articleBasicApi = {
  /**
   * 获取文章列表
   * @param {Object} params - 查询参数
   * @param {number} params.page - 页码
   * @param {number} params.size - 每页大小
   * @param {string} params.keyword - 搜索关键词
   * @param {number} params.categoryId - 分类ID
   * @param {number} params.tagId - 标签ID
   * @returns {Promise} 文章列表
   */
  async getArticleList(params) {
    try {
      const response = await http.get('/articles', params)
      return ResponseHandler.handlePageResponse(response)
    } catch (error) {
      ResponseHandler.handleError(error, '获取文章列表失败')
    }
  },

  /**
   * 获取文章详情
   * @param {number} id - 文章ID
   * @returns {Promise} 文章详情
   */
  async getArticleDetail(id) {
    try {
      const response = await http.get(`/articles/${id}`)
      return ResponseHandler.handleSuccess(response)
    } catch (error) {
      ResponseHandler.handleError(error, '获取文章详情失败')
    }
  },

  /**
   * 创建文章
   * @param {Object} data - 文章数据
   * @returns {Promise} 创建结果
   */
  async createArticle(data) {
    try {
      const response = await http.post('/articles', data)
      return ResponseHandler.handleSuccess(response, '文章创建成功')
    } catch (error) {
      ResponseHandler.handleError(error, '文章创建失败')
    }
  },

  /**
   * 更新文章
   * @param {number} id - 文章ID
   * @param {Object} data - 文章数据
   * @returns {Promise} 更新结果
   */
  async updateArticle(id, data) {
    try {
      const response = await http.put(`/articles/${id}`, data)
      return ResponseHandler.handleSuccess(response, '文章更新成功')
    } catch (error) {
      ResponseHandler.handleError(error, '文章更新失败')
    }
  },

  /**
   * 删除文章
   * @param {number} id - 文章ID
   * @returns {Promise} 删除结果
   */
  async deleteArticle(id) {
    try {
      const response = await http.delete(`/articles/${id}`)
      return ResponseHandler.handleSuccess(response, '文章删除成功')
    } catch (error) {
      ResponseHandler.handleError(error, '文章删除失败')
    }
  }
}
