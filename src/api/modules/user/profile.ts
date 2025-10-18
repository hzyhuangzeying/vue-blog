/**
 * 用户资料相关API (TypeScript版本)
 */
import type {ChangePasswordRequest, UpdateUserRequest, UserInfo} from '@/types/api'
import {ResponseHandler} from '@/utils/response'
import {http} from '@/api/request'

export const profileApi = {
  /**
   * 获取用户信息
   * @returns 用户信息
   */
  async getUserInfo(): Promise<UserInfo> {
    try {
      return await http.get<UserInfo>('/user/info')
    } catch (error) {
      ResponseHandler.handleError(error, '获取用户信息失败')
      throw error
    }
  },

  /**
   * 更新用户信息
   * @param data - 用户信息
   * @returns 更新结果
   */
  async updateUserInfo(data: UpdateUserRequest): Promise<UserInfo> {
    try {
      return await http.put<UserInfo>('/user/info', data)
    } catch (error) {
      ResponseHandler.handleError(error, '更新失败')
      throw error
    }
  },

  /**
   * 修改密码
   * @param data - 密码数据
   * @returns 修改结果
   */
  async changePassword(data: ChangePasswordRequest): Promise<void> {
    try {
      return await http.post('/user/change-password', data)
    } catch (error) {
      ResponseHandler.handleError(error, '密码修改失败')
      throw error
    }
  },

  /**
   * 上传头像
   * @param file - 头像文件
   * @param onProgress - 进度回调
   * @returns 上传结果
   */
  async uploadAvatar(file: File, onProgress?: (progress: number) => void): Promise<{ url: string }> {
    try {
      return await http.upload<{ url: string }>('/user/avatar', file, onProgress)
    } catch (error) {
      ResponseHandler.handleError(error, '头像上传失败')
      throw error
    }
  }
}
