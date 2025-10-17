/**
 * 上传模块统一导出
 */
export { fileUploadApi } from './file'
export { imageUploadApi } from './image'

// 合并所有上传相关API
export const uploadApi = {
  ...fileUploadApi,
  ...imageUploadApi
}
