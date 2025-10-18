/**
 * 用户模块统一导出 (TypeScript版本)
 */
import { followApi } from './follow'
import { userListApi } from './list'
import { profileApi } from './profile'

// 导出各个API
export { followApi, profileApi, userListApi }

// 合并所有用户相关API
export const userApi = {
  ...profileApi,
  ...followApi,
  ...userListApi
}
