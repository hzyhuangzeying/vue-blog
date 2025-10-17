// API统一导出文件
import { http, default as request } from './request'

// 认证相关API
export { authApi, loginApi, tokenApi } from './modules/auth'

// 用户相关API
export { followApi, profileApi, userApi, userListApi } from './modules/user'

// 文章相关API
export {
    articleApi,
    articleBasicApi, articleCommentApi, articleInteractionApi, articlePublishApi, articleSearchApi,
    articleUploadApi
} from './modules/article'

// 分类相关API
export { categoryApi, categoryBasicApi, categoryTreeApi } from './modules/category'

// 标签相关API
export { tagApi, tagBasicApi, tagSearchApi } from './modules/tag'

// 文件上传相关API
export { fileUploadApi, imageUploadApi, uploadApi } from './modules/upload'

// 请求工具
export { http, request }

// 按模块导出
export * from './modules/article'
export * from './modules/auth'
export * from './modules/category'
export * from './modules/tag'
export * from './modules/upload'
export * from './modules/user'

