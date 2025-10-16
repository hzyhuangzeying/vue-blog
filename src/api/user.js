import { http } from './request'

// 用户相关API
export const userApi = {
  // 用户登录
  login(data) {
    return http.post('/auth/login', data)
  },
  
  // 用户注册
  register(data) {
    return http.post('/auth/register', data)
  },
  
  // 获取用户信息
  getUserInfo() {
    return http.get('/user/info')
  },
  
  // 更新用户信息
  updateUserInfo(data) {
    return http.put('/user/info', data)
  },
  
  // 修改密码
  changePassword(data) {
    return http.post('/user/change-password', data)
  },
  
  // 上传头像
  uploadAvatar(file, onProgress) {
    return http.upload('/user/avatar', file, onProgress)
  },
  
  // 获取用户列表
  getUserList(params) {
    return http.get('/user/list', params)
  },
  
  // 关注用户
  followUser(userId) {
    return http.post(`/user/follow/${userId}`)
  },
  
  // 取消关注用户
  unfollowUser(userId) {
    return http.delete(`/user/follow/${userId}`)
  },
  
  // 获取关注列表
  getFollowingList(params) {
    return http.get('/user/following', params)
  },
  
  // 获取粉丝列表
  getFollowersList(params) {
    return http.get('/user/followers', params)
  },
  
  // 获取用户统计信息
  getUserStats(userId) {
    return http.get(`/user/stats/${userId}`)
  }
}
