/**
 * 图片上传相关API
 */
import { ResponseHandler } from '@/utils/response'
import { http } from '../../request'

export const imageUploadApi = {
  /**
   * 上传图片
   * @param {File} file - 图片文件
   * @param {Function} onProgress - 进度回调函数
   * @returns {Promise} 上传结果
   */
  async uploadImage(file, onProgress) {
    try {
      const response = await http.upload('/upload/image', file, onProgress)
      return ResponseHandler.handleSuccess(response, '图片上传成功')
    } catch (error) {
      ResponseHandler.handleError(error, '图片上传失败')
    }
  },

  /**
   * 上传头像
   * @param {File} file - 头像文件
   * @param {Function} onProgress - 进度回调函数
   * @returns {Promise} 上传结果
   */
  async uploadAvatar(file, onProgress) {
    try {
      const response = await http.upload('/upload/avatar', file, onProgress)
      return ResponseHandler.handleSuccess(response, '头像上传成功')
    } catch (error) {
      ResponseHandler.handleError(error, '头像上传失败')
    }
  },

  /**
   * 上传文章图片
   * @param {File} file - 图片文件
   * @param {Function} onProgress - 进度回调函数
   * @returns {Promise} 上传结果
   */
  async uploadArticleImage(file, onProgress) {
    try {
      const response = await http.upload('/upload/article-image', file, onProgress)
      return ResponseHandler.handleSuccess(response, '图片上传成功')
    } catch (error) {
      ResponseHandler.handleError(error, '图片上传失败')
    }
  }
}
