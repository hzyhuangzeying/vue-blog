/**
 * 文章发布相关API (TypeScript版本)
 */
import { ResponseHandler } from '@/utils/response'
import { http } from '../../request'

export const articlePublishApi = {
  /**
   * 发布文章
   * @param articleId - 文章ID
   * @returns 发布结果
   */
  async publishArticle(articleId: number): Promise<void> {
    try {
      return await http.post(`/articles/${articleId}/publish`)
    } catch (error) {
      ResponseHandler.handleError(error, '发布文章失败')
      throw error
    }
  },

  /**
   * 取消发布文章
   * @param articleId - 文章ID
   * @returns 取消发布结果
   */
  async unpublishArticle(articleId: number): Promise<void> {
    try {
      return await http.post(`/articles/${articleId}/unpublish`)
    } catch (error) {
      ResponseHandler.handleError(error, '取消发布失败')
      throw error
    }
  }
}