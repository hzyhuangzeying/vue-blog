/**
 * 文章搜索相关API (TypeScript版本)
 */
import type { Article, PageResponse, QueryParams } from '@/types/api'
import { ResponseHandler } from '@/utils/response'
import { http } from '../../request'

export const articleSearchApi = {
  /**
   * 搜索文章
   * @param keyword - 搜索关键词
   * @param params - 查询参数
   * @returns 搜索结果
   */
  async searchArticles(keyword: string, params: QueryParams = {}): Promise<PageResponse<Article>> {
    try {
      return await http.get<PageResponse<Article>>('/articles/search', { keyword, ...params })
    } catch (error) {
      ResponseHandler.handleError(error, '搜索文章失败')
      throw error
    }
  },

  /**
   * 获取热门文章
   * @param limit - 数量限制
   * @returns 热门文章列表
   */
  async getHotArticles(limit: number = 10): Promise<Article[]> {
    try {
      return await http.get<Article[]>('/articles/hot', { limit })
    } catch (error) {
      ResponseHandler.handleError(error, '获取热门文章失败')
      throw error
    }
  },

  /**
   * 获取推荐文章
   * @param limit - 数量限制
   * @returns 推荐文章列表
   */
  async getRecommendedArticles(limit: number = 10): Promise<Article[]> {
    try {
      return await http.get<Article[]>('/articles/recommended', { limit })
    } catch (error) {
      ResponseHandler.handleError(error, '获取推荐文章失败')
      throw error
    }
  }
}