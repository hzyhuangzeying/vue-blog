/**
 * 上传模块统一导出 (TypeScript版本)
 */
import { fileUploadApi } from './file'
import { imageUploadApi } from './image'

// 导出各个API
export { fileUploadApi, imageUploadApi }

// 合并所有上传相关API
export const uploadApi = {
  ...fileUploadApi,
  ...imageUploadApi
}
