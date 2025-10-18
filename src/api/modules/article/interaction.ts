/**
 * 文章交互相关API (TypeScript版本)
 */
import { ResponseHandler } from '@/utils/response'
import { http } from '../../request'

export const articleInteractionApi = {
  /**
   * 点赞文章
   * @param articleId - 文章ID
   * @returns 点赞结果
   */
  async likeArticle(articleId: number): Promise<void> {
    try {
      return await http.post(`/articles/${articleId}/like`)
    } catch (error) {
      ResponseHandler.handleError(error, '点赞失败')
      throw error
    }
  },

  /**
   * 取消点赞文章
   * @param articleId - 文章ID
   * @returns 取消点赞结果
   */
  async unlikeArticle(articleId: number): Promise<void> {
    try {
      return await http.delete(`/articles/${articleId}/like`)
    } catch (error) {
      ResponseHandler.handleError(error, '取消点赞失败')
      throw error
    }
  },

  /**
   * 收藏文章
   * @param articleId - 文章ID
   * @returns 收藏结果
   */
  async favoriteArticle(articleId: number): Promise<void> {
    try {
      return await http.post(`/articles/${articleId}/favorite`)
    } catch (error) {
      ResponseHandler.handleError(error, '收藏失败')
      throw error
    }
  },

  /**
   * 取消收藏文章
   * @param articleId - 文章ID
   * @returns 取消收藏结果
   */
  async unfavoriteArticle(articleId: number): Promise<void> {
    try {
      return await http.delete(`/articles/${articleId}/favorite`)
    } catch (error) {
      ResponseHandler.handleError(error, '取消收藏失败')
      throw error
    }
  }
}