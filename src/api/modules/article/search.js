/**
 * 文章搜索相关API
 */
import { ResponseHandler } from '@/utils/response'
import { http } from '../../request'

export const articleSearchApi = {
  /**
   * 搜索文章
   * @param {Object} params - 搜索参数
   * @returns {Promise} 搜索结果
   */
  async searchArticles(params) {
    try {
      const response = await http.get('/articles/search', params)
      return ResponseHandler.handlePageResponse(response)
    } catch (error) {
      ResponseHandler.handleError(error, '搜索失败')
    }
  },

  /**
   * 获取热门文章
   * @param {Object} params - 查询参数
   * @returns {Promise} 热门文章列表
   */
  async getHotArticles(params) {
    try {
      const response = await http.get('/articles/hot', params)
      return ResponseHandler.handleListResponse(response)
    } catch (error) {
      ResponseHandler.handleError(error, '获取热门文章失败')
    }
  },

  /**
   * 获取推荐文章
   * @param {Object} params - 查询参数
   * @returns {Promise} 推荐文章列表
   */
  async getRecommendedArticles(params) {
    try {
      const response = await http.get('/articles/recommended', params)
      return ResponseHandler.handleListResponse(response)
    } catch (error) {
      ResponseHandler.handleError(error, '获取推荐文章失败')
    }
  },

  /**
   * 获取分类文章
   * @param {number} categoryId - 分类ID
   * @param {Object} params - 查询参数
   * @returns {Promise} 分类文章列表
   */
  async getArticlesByCategory(categoryId, params) {
    try {
      const response = await http.get(`/articles/category/${categoryId}`, params)
      return ResponseHandler.handlePageResponse(response)
    } catch (error) {
      ResponseHandler.handleError(error, '获取分类文章失败')
    }
  },

  /**
   * 获取标签文章
   * @param {number} tagId - 标签ID
   * @param {Object} params - 查询参数
   * @returns {Promise} 标签文章列表
   */
  async getArticlesByTag(tagId, params) {
    try {
      const response = await http.get(`/articles/tag/${tagId}`, params)
      return ResponseHandler.handlePageResponse(response)
    } catch (error) {
      ResponseHandler.handleError(error, '获取标签文章失败')
    }
  },

  /**
   * 获取用户文章
   * @param {number} userId - 用户ID
   * @param {Object} params - 查询参数
   * @returns {Promise} 用户文章列表
   */
  async getUserArticles(userId, params) {
    try {
      const response = await http.get(`/articles/user/${userId}`, params)
      return ResponseHandler.handlePageResponse(response)
    } catch (error) {
      ResponseHandler.handleError(error, '获取用户文章失败')
    }
  }
}
