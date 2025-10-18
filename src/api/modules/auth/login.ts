/**
 * 登录相关API (TypeScript版本)
 */
import type { LoginRequest, LoginResponse, RegisterRequest } from '@/types/api'
import { ResponseHandler } from '@/utils/response'
import { http } from '../../request'

export const loginApi = {
  /**
   * 用户登录
   * @param data - 登录数据
   * @returns 登录结果
   */
  async login(data: LoginRequest): Promise<LoginResponse> {
    try {
      return await http.post<LoginResponse>('/auth/login', data)
    } catch (error) {
      ResponseHandler.handleError(error, '登录失败')
      throw error
    }
  },

  /**
   * 用户注册
   * @param data - 注册数据
   * @returns 注册结果
   */
  async register(data: RegisterRequest): Promise<LoginResponse> {
    try {
      return await http.post<LoginResponse>('/auth/register', data)
    } catch (error) {
      ResponseHandler.handleError(error, '注册失败')
      throw error
    }
  },

  /**
   * 用户登出
   * @returns 登出结果
   */
  async logout(): Promise<void> {
    try {
      return await http.post('/auth/logout')
    } catch (error) {
      ResponseHandler.handleError(error, '退出失败')
      throw error
    }
  }
}