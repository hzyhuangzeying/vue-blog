/**
 * 图片上传相关API (TypeScript版本)
 */
import type { UploadResponse } from '@/types/api'
import { ResponseHandler } from '@/utils/response'
import { http } from '../../request'

export const imageUploadApi = {
  /**
   * 上传图片
   * @param file - 图片文件
   * @param onProgress - 进度回调函数
   * @returns 上传结果
   */
  async uploadImage(file: File, onProgress?: (progress: number) => void): Promise<UploadResponse> {
    try {
      return await http.upload<UploadResponse>('/upload/image', file, onProgress)
    } catch (error) {
      ResponseHandler.handleError(error, '图片上传失败')
      throw error
    }
  },

  /**
   * 上传头像
   * @param file - 头像文件
   * @param onProgress - 进度回调函数
   * @returns 上传结果
   */
  async uploadAvatar(file: File, onProgress?: (progress: number) => void): Promise<UploadResponse> {
    try {
      return await http.upload<UploadResponse>('/upload/avatar', file, onProgress)
    } catch (error) {
      ResponseHandler.handleError(error, '头像上传失败')
      throw error
    }
  },

  /**
   * 上传文章图片
   * @param file - 图片文件
   * @param onProgress - 进度回调函数
   * @returns 上传结果
   */
  async uploadArticleImage(file: File, onProgress?: (progress: number) => void): Promise<UploadResponse> {
    try {
      return await http.upload<UploadResponse>('/upload/article-image', file, onProgress)
    } catch (error) {
      ResponseHandler.handleError(error, '图片上传失败')
      throw error
    }
  }
}
