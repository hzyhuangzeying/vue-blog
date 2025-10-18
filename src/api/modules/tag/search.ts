/**
 * 标签搜索相关API (TypeScript版本)
 */
import type { Tag } from '@/types/api'
import { ResponseHandler } from '@/utils/response'
import { http } from '../../request'

export const tagSearchApi = {
  /**
   * 搜索标签
   * @param keyword - 搜索关键词
   * @returns 搜索结果
   */
  async searchTags(keyword: string): Promise<Tag[]> {
    try {
      return await http.get<Tag[]>('/tags/search', { keyword })
    } catch (error) {
      ResponseHandler.handleError(error, '搜索标签失败')
      throw error
    }
  },

  /**
   * 获取热门标签
   * @param limit - 数量限制
   * @returns 热门标签列表
   */
  async getHotTags(limit: number = 20): Promise<Tag[]> {
    try {
      return await http.get<Tag[]>('/tags/hot', { limit })
    } catch (error) {
      ResponseHandler.handleError(error, '获取热门标签失败')
      throw error
    }
  }
}