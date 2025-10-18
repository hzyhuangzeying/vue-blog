/**
 * 分类基础操作相关API (TypeScript版本)
 */
import type { Category, CreateCategoryRequest, PageResponse, QueryParams, UpdateCategoryRequest } from '@/types/api'
import { ResponseHandler } from '@/utils/response'
import { http } from '../../request'

export const categoryBasicApi = {
  /**
   * 获取分类列表
   * @param params - 查询参数
   * @returns 分类列表
   */
  async getCategoryList(params: QueryParams = {}): Promise<PageResponse<Category>> {
    try {
      return await http.get<PageResponse<Category>>('/categories', params)
    } catch (error) {
      ResponseHandler.handleError(error, '获取分类列表失败')
      throw error
    }
  },

  /**
   * 获取分类详情
   * @param id - 分类ID
   * @returns 分类详情
   */
  async getCategoryDetail(id: number): Promise<Category> {
    try {
      return await http.get<Category>(`/categories/${id}`)
    } catch (error) {
      ResponseHandler.handleError(error, '获取分类详情失败')
      throw error
    }
  },

  /**
   * 创建分类
   * @param data - 分类数据
   * @returns 创建结果
   */
  async createCategory(data: CreateCategoryRequest): Promise<Category> {
    try {
      return await http.post<Category>('/categories', data)
    } catch (error) {
      ResponseHandler.handleError(error, '创建分类失败')
      throw error
    }
  },

  /**
   * 更新分类
   * @param id - 分类ID
   * @param data - 更新数据
   * @returns 更新结果
   */
  async updateCategory(id: number, data: UpdateCategoryRequest): Promise<Category> {
    try {
      return await http.put<Category>(`/categories/${id}`, data)
    } catch (error) {
      ResponseHandler.handleError(error, '更新分类失败')
      throw error
    }
  },

  /**
   * 删除分类
   * @param id - 分类ID
   * @returns 删除结果
   */
  async deleteCategory(id: number): Promise<void> {
    try {
      return await http.delete(`/categories/${id}`)
    } catch (error) {
      ResponseHandler.handleError(error, '删除分类失败')
      throw error
    }
  }
}