/**
 * 文章上传相关API
 */
import { ResponseHandler } from '@/utils/response'
import { http } from '../../request'

export const articleUploadApi = {
  /**
   * 上传文章图片
   * @param {File} file - 图片文件
   * @param {Function} onProgress - 进度回调
   * @returns {Promise} 上传结果
   */
  async uploadArticleImage(file, onProgress) {
    try {
      const response = await http.upload('/articles/upload-image', file, onProgress)
      return ResponseHandler.handleSuccess(response, '图片上传成功')
    } catch (error) {
      ResponseHandler.handleError(error, '图片上传失败')
    }
  }
}
