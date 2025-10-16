import { http } from './request'

// 分类相关API
export const categoryApi = {
  // 获取分类列表
  getCategoryList(params) {
    return http.get('/categories', params)
  },
  
  // 获取分类详情
  getCategoryDetail(id) {
    return http.get(`/categories/${id}`)
  },
  
  // 创建分类
  createCategory(data) {
    return http.post('/categories', data)
  },
  
  // 更新分类
  updateCategory(id, data) {
    return http.put(`/categories/${id}`, data)
  },
  
  // 删除分类
  deleteCategory(id) {
    return http.delete(`/categories/${id}`)
  },
  
  // 获取分类树
  getCategoryTree() {
    return http.get('/categories/tree')
  },
  
  // 获取分类下的文章数量
  getCategoryArticleCount(id) {
    return http.get(`/categories/${id}/article-count`)
  }
}
