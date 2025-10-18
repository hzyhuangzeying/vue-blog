/**
 * 用户列表相关API (TypeScript版本)
 */
import type { PageResponse, StatsInfo, UserInfo, UserQueryParams } from '@/types/api'
import { ResponseHandler } from '@/utils/response'
import { http } from '../../request'

export const userListApi = {
  /**
   * 获取用户列表
   * @param params - 查询参数
   * @returns 用户列表
   */
  async getUserList(params: UserQueryParams = {}): Promise<PageResponse<UserInfo>> {
    try {
      return await http.get<PageResponse<UserInfo>>('/user/list', params)
    } catch (error) {
      ResponseHandler.handleError(error, '获取用户列表失败')
      throw error
    }
  },

  /**
   * 获取用户统计信息
   * @param userId - 用户ID
   * @returns 统计信息
   */
  async getUserStats(userId: number): Promise<StatsInfo> {
    try {
      return await http.get<StatsInfo>(`/user/stats/${userId}`)
    } catch (error) {
      ResponseHandler.handleError(error, '获取统计信息失败')
      throw error
    }
  }
}
