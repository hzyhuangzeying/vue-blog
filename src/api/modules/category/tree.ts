/**
 * 分类树相关API (TypeScript版本)
 */
import type { Category } from '@/types/api'
import { ResponseHandler } from '@/utils/response'
import { http } from '../../request'

export const categoryTreeApi = {
  /**
   * 获取分类树
   * @returns 分类树
   */
  async getCategoryTree(): Promise<Category[]> {
    try {
      return await http.get<Category[]>('/categories/tree')
    } catch (error) {
      ResponseHandler.handleError(error, '获取分类树失败')
      throw error
    }
  },

  /**
   * 获取分类下的文章数量
   * @param id - 分类ID
   * @returns 文章数量
   */
  async getCategoryArticleCount(id: number): Promise<{ count: number }> {
    try {
      return await http.get<{ count: number }>(`/categories/${id}/article-count`)
    } catch (error) {
      ResponseHandler.handleError(error, '获取文章数量失败')
      throw error
    }
  }
}