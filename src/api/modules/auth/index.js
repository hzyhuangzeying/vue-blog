/**
 * 认证模块统一导出
 */
export { loginApi } from './login'
export { tokenApi } from './token'

// 合并所有认证相关API
export const authApi = {
  ...loginApi,
  ...tokenApi
}
