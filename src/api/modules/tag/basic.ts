/**
 * 标签基础操作相关API (TypeScript版本)
 */
import type { CreateTagRequest, PageResponse, QueryParams, Tag, UpdateTagRequest } from '@/types/api'
import { ResponseHandler } from '@/utils/response'
import { http } from '../../request'

export const tagBasicApi = {
  /**
   * 获取标签列表
   * @param params - 查询参数
   * @returns 标签列表
   */
  async getTagList(params: QueryParams = {}): Promise<PageResponse<Tag>> {
    try {
      return await http.get<PageResponse<Tag>>('/tags', params)
    } catch (error) {
      ResponseHandler.handleError(error, '获取标签列表失败')
      throw error
    }
  },

  /**
   * 获取标签详情
   * @param id - 标签ID
   * @returns 标签详情
   */
  async getTagDetail(id: number): Promise<Tag> {
    try {
      return await http.get<Tag>(`/tags/${id}`)
    } catch (error) {
      ResponseHandler.handleError(error, '获取标签详情失败')
      throw error
    }
  },

  /**
   * 创建标签
   * @param data - 标签数据
   * @returns 创建结果
   */
  async createTag(data: CreateTagRequest): Promise<Tag> {
    try {
      return await http.post<Tag>('/tags', data)
    } catch (error) {
      ResponseHandler.handleError(error, '创建标签失败')
      throw error
    }
  },

  /**
   * 更新标签
   * @param id - 标签ID
   * @param data - 更新数据
   * @returns 更新结果
   */
  async updateTag(id: number, data: UpdateTagRequest): Promise<Tag> {
    try {
      return await http.put<Tag>(`/tags/${id}`, data)
    } catch (error) {
      ResponseHandler.handleError(error, '更新标签失败')
      throw error
    }
  },

  /**
   * 删除标签
   * @param id - 标签ID
   * @returns 删除结果
   */
  async deleteTag(id: number): Promise<void> {
    try {
      return await http.delete(`/tags/${id}`)
    } catch (error) {
      ResponseHandler.handleError(error, '删除标签失败')
      throw error
    }
  }
}