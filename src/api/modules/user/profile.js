/**
 * 用户资料相关API
 */
import { ResponseHandler } from '@/utils/response'
import { http } from '../../request'

export const profileApi = {
  /**
   * 获取用户信息
   * @returns {Promise} 用户信息
   */
  async getUserInfo() {
    try {
      const response = await http.get('/user/info')
      return ResponseHandler.handleSuccess(response)
    } catch (error) {
      ResponseHandler.handleError(error, '获取用户信息失败')
    }
  },

  /**
   * 更新用户信息
   * @param {Object} data - 用户信息
   * @returns {Promise} 更新结果
   */
  async updateUserInfo(data) {
    try {
      const response = await http.put('/user/info', data)
      return ResponseHandler.handleSuccess(response, '更新成功')
    } catch (error) {
      ResponseHandler.handleError(error, '更新失败')
    }
  },

  /**
   * 修改密码
   * @param {Object} data - 密码数据
   * @param {string} data.oldPassword - 旧密码
   * @param {string} data.newPassword - 新密码
   * @returns {Promise} 修改结果
   */
  async changePassword(data) {
    try {
      const response = await http.post('/user/change-password', data)
      return ResponseHandler.handleSuccess(response, '密码修改成功')
    } catch (error) {
      ResponseHandler.handleError(error, '密码修改失败')
    }
  },

  /**
   * 上传头像
   * @param {File} file - 头像文件
   * @param {Function} onProgress - 进度回调
   * @returns {Promise} 上传结果
   */
  async uploadAvatar(file, onProgress) {
    try {
      const response = await http.upload('/user/avatar', file, onProgress)
      return ResponseHandler.handleSuccess(response, '头像上传成功')
    } catch (error) {
      ResponseHandler.handleError(error, '头像上传失败')
    }
  }
}
