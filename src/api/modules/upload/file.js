/**
 * 文件上传相关API
 */
import { ResponseHandler } from '@/utils/response'
import { http } from '../../request'

export const fileUploadApi = {
  /**
   * 上传单个文件
   * @param {File} file - 文件对象
   * @param {Function} onProgress - 进度回调函数
   * @returns {Promise} 上传结果
   */
  async uploadFile(file, onProgress) {
    try {
      const response = await http.upload('/upload/file', file, onProgress)
      return ResponseHandler.handleSuccess(response, '文件上传成功')
    } catch (error) {
      ResponseHandler.handleError(error, '文件上传失败')
    }
  },

  /**
   * 上传多个文件
   * @param {File[]} files - 文件数组
   * @param {Function} onProgress - 进度回调函数
   * @returns {Promise} 上传结果
   */
  async uploadFiles(files, onProgress) {
    try {
      const formData = new FormData()
      files.forEach(file => {
        formData.append('files', file)
      })
      
      const response = await http.post('/upload/files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            )
            onProgress(percentCompleted)
          }
        }
      })
      return ResponseHandler.handleSuccess(response, '文件上传成功')
    } catch (error) {
      ResponseHandler.handleError(error, '文件上传失败')
    }
  },

  /**
   * 删除文件
   * @param {string} fileId - 文件ID
   * @returns {Promise} 删除结果
   */
  async deleteFile(fileId) {
    try {
      const response = await http.delete(`/upload/file/${fileId}`)
      return ResponseHandler.handleSuccess(response, '文件删除成功')
    } catch (error) {
      ResponseHandler.handleError(error, '文件删除失败')
    }
  },

  /**
   * 获取文件信息
   * @param {string} fileId - 文件ID
   * @returns {Promise} 文件信息
   */
  async getFileInfo(fileId) {
    try {
      const response = await http.get(`/upload/file/${fileId}`)
      return ResponseHandler.handleSuccess(response)
    } catch (error) {
      ResponseHandler.handleError(error, '获取文件信息失败')
    }
  }
}
