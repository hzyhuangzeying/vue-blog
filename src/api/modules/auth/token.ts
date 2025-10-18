/**
 * Token相关API (TypeScript版本)
 */
import { ResponseHandler } from '@/utils/response'
import { http } from '../../request'


export interface TokenRefreshResponse {
  accessToken: string
  refreshToken?: string
  expiresIn: number
}

export const tokenApi = {
  /**
   * 刷新token
   * @param refreshToken - 刷新token
   * @returns 刷新结果
   */
  async refreshToken(refreshToken: string): Promise<TokenRefreshResponse> {
    try {
      return await http.post<TokenRefreshResponse>('/auth/refresh', { refreshToken })
    } catch (error) {
      ResponseHandler.handleError(error, 'Token刷新失败')
      throw error
    }
  },

  /**
   * 验证token
   * @returns 验证结果
   */
  async verifyToken(): Promise<boolean> {
    try {
      return await http.get('/auth/verify')
    } catch (error) {
      ResponseHandler.handleError(error, 'Token验证失败')
      throw error
    }
  }
}
