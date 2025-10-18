/**
 * 文件上传相关API (TypeScript版本)
 */
import type {UploadResponse} from '@/types/api'
import {ResponseHandler} from '@/utils/response'
import {http} from '../../request'

export const fileUploadApi = {
  /**
   * 上传单个文件
   * @param file - 文件对象
   * @param onProgress - 进度回调函数
   * @returns 上传结果
   */
  async uploadFile(file: File, onProgress?: (progress: number) => void): Promise<UploadResponse> {
    try {
      return await http.upload<UploadResponse>('/upload/file', file, onProgress)
    } catch (error) {
      ResponseHandler.handleError(error, '文件上传失败')
      throw error
    }
  },

  /**
   * 上传多个文件
   * @param files - 文件数组
   * @param onProgress - 进度回调函数
   * @returns 上传结果
   */
  async uploadFiles(files: File[], onProgress?: (progress: number) => void): Promise<UploadResponse[]> {
    try {
      const formData = new FormData()
      files.forEach(file => {
        formData.append('files', file)
      })

      return await http.post<UploadResponse[]>('/upload/files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
            )
            onProgress(percentCompleted)
          }
        }
      })
    } catch (error) {
      ResponseHandler.handleError(error, '文件上传失败')
      throw error
    }
  },

  /**
   * 删除文件
   * @param fileId - 文件ID
   * @returns 删除结果
   */
  async deleteFile(fileId: string): Promise<void> {
    try {
      return await http.delete(`/upload/file/${fileId}`)
    } catch (error) {
      ResponseHandler.handleError(error, '文件删除失败')
      throw error
    }
  },

  /**
   * 获取文件信息
   * @param fileId - 文件ID
   * @returns 文件信息
   */
  async getFileInfo(fileId: string): Promise<UploadResponse> {
    try {
      return await http.get<UploadResponse>(`/upload/file/${fileId}`)
    } catch (error) {
      ResponseHandler.handleError(error, '获取文件信息失败')
      throw error
    }
  }
}
