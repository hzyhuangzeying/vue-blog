import { http } from './request'

// 标签相关API
export const tagApi = {
  // 获取标签列表
  getTagList(params) {
    return http.get('/tags', params)
  },
  
  // 获取标签详情
  getTagDetail(id) {
    return http.get(`/tags/${id}`)
  },
  
  // 创建标签
  createTag(data) {
    return http.post('/tags', data)
  },
  
  // 更新标签
  updateTag(id, data) {
    return http.put(`/tags/${id}`, data)
  },
  
  // 删除标签
  deleteTag(id) {
    return http.delete(`/tags/${id}`)
  },
  
  // 获取热门标签
  getHotTags(params) {
    return http.get('/tags/hot', params)
  },
  
  // 搜索标签
  searchTags(params) {
    return http.get('/tags/search', params)
  },
  
  // 获取标签下的文章数量
  getTagArticleCount(id) {
    return http.get(`/tags/${id}/article-count`)
  }
}
