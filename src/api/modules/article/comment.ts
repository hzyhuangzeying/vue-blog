/**
 * 文章评论相关API (TypeScript版本)
 */
import type { Comment, PageResponse, QueryParams } from '@/types/api'
import { ResponseHandler } from '@/utils/response'
import { http } from '../../request'

export const articleCommentApi = {
  /**
   * 获取文章评论列表
   * @param articleId - 文章ID
   * @param params - 查询参数
   * @returns 评论列表
   */
  async getCommentList(articleId: number, params: QueryParams = {}): Promise<PageResponse<Comment>> {
    try {
      return await http.get<PageResponse<Comment>>(`/articles/${articleId}/comments`, params)
    } catch (error) {
      ResponseHandler.handleError(error, '获取评论列表失败')
      throw error
    }
  },

  /**
   * 添加评论
   * @param articleId - 文章ID
   * @param content - 评论内容
   * @returns 评论结果
   */
  async addComment(articleId: number, content: string): Promise<Comment> {
    try {
      return await http.post<Comment>(`/articles/${articleId}/comments`, { content })
    } catch (error) {
      ResponseHandler.handleError(error, '添加评论失败')
      throw error
    }
  },

  /**
   * 删除评论
   * @param commentId - 评论ID
   * @returns 删除结果
   */
  async deleteComment(commentId: number): Promise<void> {
    try {
      return await http.delete(`/comments/${commentId}`)
    } catch (error) {
      ResponseHandler.handleError(error, '删除评论失败')
      throw error
    }
  }
}