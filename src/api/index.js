// API统一导出文件
export { articleApi } from './article'
export { categoryApi } from './category'
export { http, default as request } from './request'
export { tagApi } from './tag'
export { uploadApi } from './upload'
export { userApi } from './user'

// 也可以按模块导出
export * from './article'
export * from './category'
export * from './tag'
export * from './upload'
export * from './user'

