/**
 * 用户模块统一导出
 */
export { followApi } from './follow'
export { userListApi } from './list'
export { profileApi } from './profile'

// 合并所有用户相关API
export const userApi = {
  ...profileApi,
  ...followApi,
  ...userListApi
}
