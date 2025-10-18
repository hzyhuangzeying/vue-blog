/**
 * 标签模块统一导出 (TypeScript版本)
 */
import { tagBasicApi } from './basic'
import { tagSearchApi } from './search'

// 导出各个API
export { tagBasicApi, tagSearchApi }

// 合并所有标签相关API
export const tagApi = {
  ...tagBasicApi,
  ...tagSearchApi
}
