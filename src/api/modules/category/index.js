/**
 * 分类模块统一导出
 */
export { categoryBasicApi } from './basic'
export { categoryTreeApi } from './tree'

// 合并所有分类相关API
export const categoryApi = {
  ...categoryBasicApi,
  ...categoryTreeApi
}
