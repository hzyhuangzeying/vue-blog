/**
 * 文章模块统一导出 (TypeScript版本)
 */
import { articleBasicApi } from './basic'
import { articleCommentApi } from './comment'
import { articleInteractionApi } from './interaction'
import { articlePublishApi } from './publish'
import { articleSearchApi } from './search'
import { articleUploadApi } from './upload'

// 导出各个API
export {
    articleBasicApi,
    articleCommentApi,
    articleInteractionApi,
    articlePublishApi,
    articleSearchApi,
    articleUploadApi
}

// 合并所有文章相关API
export const articleApi = {
  ...articleBasicApi,
  ...articlePublishApi,
  ...articleInteractionApi,
  ...articleCommentApi,
  ...articleSearchApi,
  ...articleUploadApi
}
