/**
 * 文章基础操作相关API (TypeScript版本)
 */
import type { Article, ArticleQueryParams, CreateArticleRequest, PageResponse, UpdateArticleRequest } from '@/types/api'
import { ResponseHandler } from '@/utils/response'
import { http } from '../../request'

export const articleBasicApi = {
  /**
   * 获取文章列表
   * @param params - 查询参数
   * @returns 文章列表
   */
  async getArticleList(params: ArticleQueryParams = {}): Promise<PageResponse<Article>> {
    try {
      return await http.get<PageResponse<Article>>('/articles', params)
    } catch (error) {
      ResponseHandler.handleError(error, '获取文章列表失败')
      throw error
    }
  },

  /**
   * 获取文章详情
   * @param id - 文章ID
   * @returns 文章详情
   */
  async getArticleDetail(id: number): Promise<Article> {
    try {
      return await http.get<Article>(`/articles/${id}`)
    } catch (error) {
      ResponseHandler.handleError(error, '获取文章详情失败')
      throw error
    }
  },

  /**
   * 创建文章
   * @param data - 文章数据
   * @returns 创建结果
   */
  async createArticle(data: CreateArticleRequest): Promise<Article> {
    try {
      return await http.post<Article>('/articles', data)
    } catch (error) {
      ResponseHandler.handleError(error, '创建文章失败')
      throw error
    }
  },

  /**
   * 更新文章
   * @param id - 文章ID
   * @param data - 更新数据
   * @returns 更新结果
   */
  async updateArticle(id: number, data: UpdateArticleRequest): Promise<Article> {
    try {
      return await http.put<Article>(`/articles/${id}`, data)
    } catch (error) {
      ResponseHandler.handleError(error, '更新文章失败')
      throw error
    }
  },

  /**
   * 删除文章
   * @param id - 文章ID
   * @returns 删除结果
   */
  async deleteArticle(id: number): Promise<void> {
    try {
      return await http.delete(`/articles/${id}`)
    } catch (error) {
      ResponseHandler.handleError(error, '删除文章失败')
      throw error
    }
  }
}