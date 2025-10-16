import { http } from './request'

// 文章相关API
export const articleApi = {
  // 获取文章列表
  getArticleList(params) {
    return http.get('/articles', params)
  },
  
  // 获取文章详情
  getArticleDetail(id) {
    return http.get(`/articles/${id}`)
  },
  
  // 创建文章
  createArticle(data) {
    return http.post('/articles', data)
  },
  
  // 更新文章
  updateArticle(id, data) {
    return http.put(`/articles/${id}`, data)
  },
  
  // 删除文章
  deleteArticle(id) {
    return http.delete(`/articles/${id}`)
  },
  
  // 发布文章
  publishArticle(id) {
    return http.post(`/articles/${id}/publish`)
  },
  
  // 取消发布文章
  unpublishArticle(id) {
    return http.post(`/articles/${id}/unpublish`)
  },
  
  // 点赞文章
  likeArticle(id) {
    return http.post(`/articles/${id}/like`)
  },
  
  // 取消点赞文章
  unlikeArticle(id) {
    return http.delete(`/articles/${id}/like`)
  },
  
  // 收藏文章
  favoriteArticle(id) {
    return http.post(`/articles/${id}/favorite`)
  },
  
  // 取消收藏文章
  unfavoriteArticle(id) {
    return http.delete(`/articles/${id}/favorite`)
  },
  
  // 获取文章评论
  getArticleComments(id, params) {
    return http.get(`/articles/${id}/comments`, params)
  },
  
  // 添加文章评论
  addArticleComment(id, data) {
    return http.post(`/articles/${id}/comments`, data)
  },
  
  // 删除文章评论
  deleteArticleComment(articleId, commentId) {
    return http.delete(`/articles/${articleId}/comments/${commentId}`)
  },
  
  // 搜索文章
  searchArticles(params) {
    return http.get('/articles/search', params)
  },
  
  // 获取热门文章
  getHotArticles(params) {
    return http.get('/articles/hot', params)
  },
  
  // 获取推荐文章
  getRecommendedArticles(params) {
    return http.get('/articles/recommended', params)
  },
  
  // 获取分类文章
  getArticlesByCategory(categoryId, params) {
    return http.get(`/articles/category/${categoryId}`, params)
  },
  
  // 获取标签文章
  getArticlesByTag(tagId, params) {
    return http.get(`/articles/tag/${tagId}`, params)
  },
  
  // 获取用户文章
  getUserArticles(userId, params) {
    return http.get(`/articles/user/${userId}`, params)
  },
  
  // 上传文章图片
  uploadArticleImage(file, onProgress) {
    return http.upload('/articles/upload-image', file, onProgress)
  }
}
