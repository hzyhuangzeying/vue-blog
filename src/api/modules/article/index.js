/**
 * 文章模块统一导出
 */
export { articleBasicApi } from './basic'
export { articleCommentApi } from './comment'
export { articleInteractionApi } from './interaction'
export { articlePublishApi } from './publish'
export { articleSearchApi } from './search'
export { articleUploadApi } from './upload'

// 合并所有文章相关API
export const articleApi = {
  ...articleBasicApi,
  ...articlePublishApi,
  ...articleInteractionApi,
  ...articleCommentApi,
  ...articleSearchApi,
  ...articleUploadApi
}
