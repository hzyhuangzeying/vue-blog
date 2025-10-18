/**
 * 用户关注相关API (TypeScript版本)
 */
import type { PageResponse, QueryParams, UserInfo } from '@/types/api'
import { ResponseHandler } from '@/utils/response'
import { http } from '../../request'

export const followApi = {
  /**
   * 关注用户
   * @param userId - 用户ID
   * @returns 关注结果
   */
  async followUser(userId: number): Promise<void> {
    try {
      return await http.post(`/user/follow/${userId}`)
    } catch (error) {
      ResponseHandler.handleError(error, '关注失败')
      throw error
    }
  },

  /**
   * 取消关注用户
   * @param userId - 用户ID
   * @returns 取消关注结果
   */
  async unfollowUser(userId: number): Promise<void> {
    try {
      return await http.delete(`/user/follow/${userId}`)
    } catch (error) {
      ResponseHandler.handleError(error, '取消关注失败')
      throw error
    }
  },

  /**
   * 获取关注列表
   * @param params - 查询参数
   * @returns 关注列表
   */
  async getFollowingList(params: QueryParams = {}): Promise<PageResponse<UserInfo>> {
    try {
      return await http.get<PageResponse<UserInfo>>('/user/following', params)
    } catch (error) {
      ResponseHandler.handleError(error, '获取关注列表失败')
      throw error
    }
  },

  /**
   * 获取粉丝列表
   * @param params - 查询参数
   * @returns 粉丝列表
   */
  async getFollowersList(params: QueryParams = {}): Promise<PageResponse<UserInfo>> {
    try {
      return await http.get<PageResponse<UserInfo>>('/user/followers', params)
    } catch (error) {
      ResponseHandler.handleError(error, '获取粉丝列表失败')
      throw error
    }
  }
}
