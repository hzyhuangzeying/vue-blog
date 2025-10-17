/**
 * 标签模块统一导出
 */
export { tagBasicApi } from './basic'
export { tagSearchApi } from './search'

// 合并所有标签相关API
export const tagApi = {
  ...tagBasicApi,
  ...tagSearchApi
}
