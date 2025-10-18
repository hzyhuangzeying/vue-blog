/**
 * 分类模块统一导出 (TypeScript版本)
 */
import { categoryBasicApi } from './basic'
import { categoryTreeApi } from './tree'

// 导出各个API
export { categoryBasicApi, categoryTreeApi }

// 合并所有分类相关API
export const categoryApi = {
  ...categoryBasicApi,
  ...categoryTreeApi
}
