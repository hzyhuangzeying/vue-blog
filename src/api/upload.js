import { http } from './request'

// 文件上传相关API
export const uploadApi = {
  // 上传单个文件
  uploadFile(file, onProgress) {
    return http.upload('/upload/file', file, onProgress)
  },
  
  // 上传多个文件
  uploadFiles(files, onProgress) {
    const formData = new FormData()
    files.forEach(file => {
      formData.append('files', file)
    })
    
    return http.post('/upload/files', formData, {
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
  },
  
  // 上传图片
  uploadImage(file, onProgress) {
    return http.upload('/upload/image', file, onProgress)
  },
  
  // 上传头像
  uploadAvatar(file, onProgress) {
    return http.upload('/upload/avatar', file, onProgress)
  },
  
  // 上传文章图片
  uploadArticleImage(file, onProgress) {
    return http.upload('/upload/article-image', file, onProgress)
  },
  
  // 删除文件
  deleteFile(fileId) {
    return http.delete(`/upload/file/${fileId}`)
  },
  
  // 获取文件信息
  getFileInfo(fileId) {
    return http.get(`/upload/file/${fileId}`)
  }
}
