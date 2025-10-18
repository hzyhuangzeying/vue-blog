/**
 * 认证模块统一导出 (TypeScript版本)
 */
import { loginApi } from './login'
import { tokenApi } from './token'

// 导出各个API
export { loginApi, tokenApi }

// 合并所有认证相关API
export const authApi = {
  ...loginApi,
  ...tokenApi
}
