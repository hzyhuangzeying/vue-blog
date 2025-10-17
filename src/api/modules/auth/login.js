/**
 * 登录相关API
 */
import { ResponseHandler } from '@/utils/response'
import { http } from '../../request'

export const loginApi = {
  /**
   * 用户登录
   * @param {Object} data - 登录数据
   * @param {string} data.username - 用户名
   * @param {string} data.password - 密码
   * @returns {Promise} 登录结果
   */
  async login(data) {
    try {
      const response = await http.post('/auth/login', data)
      return ResponseHandler.handleSuccess(response, '登录成功')
    } catch (error) {
      ResponseHandler.handleError(error, '登录失败')
    }
  },

  /**
   * 用户注册
   * @param {Object} data - 注册数据
   * @param {string} data.username - 用户名
   * @param {string} data.password - 密码
   * @param {string} data.email - 邮箱
   * @param {string} data.nickname - 昵称
   * @returns {Promise} 注册结果
   */
  async register(data) {
    try {
      const response = await http.post('/auth/register', data)
      return ResponseHandler.handleSuccess(response, '注册成功')
    } catch (error) {
      ResponseHandler.handleError(error, '注册失败')
    }
  },

  /**
   * 用户登出
   * @returns {Promise} 登出结果
   */
  async logout() {
    try {
      const response = await http.post('/auth/logout')
      return ResponseHandler.handleSuccess(response, '退出成功')
    } catch (error) {
      ResponseHandler.handleError(error, '退出失败')
    }
  }
}
