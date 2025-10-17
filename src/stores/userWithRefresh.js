/**
 * 使用RefreshToken的用户Store示例
 */
import { authApi, userApi } from '@/api'
import { tokenManager } from '@/utils/tokenManager'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStoreWithRefresh = defineStore('userWithRefresh', () => {
  const user = ref(null)
  const isLoggedIn = computed(() => !!tokenManager.getAccessToken() && !!user.value)

  /**
   * 用户登录
   * @param {Object} loginData - 登录数据
   * @returns {Promise} 登录结果
   */
  const login = async (loginData) => {
    try {
      // 调用登录API
      const response = await authApi.login(loginData)
      
      // 设置用户信息
      user.value = response.user
      
      // 设置令牌（包含accessToken和refreshToken）
      tokenManager.setTokens(
        response.token,           // accessToken
        response.refreshToken,    // refreshToken
        response.expiresIn        // 过期时间
      )
      
      return { success: true, user: response.user }
    } catch (error) {
      console.error('登录失败:', error)
      return { success: false, message: error.message }
    }
  }

  /**
   * 用户注册
   * @param {Object} registerData - 注册数据
   * @returns {Promise} 注册结果
   */
  const register = async (registerData) => {
    try {
      const response = await authApi.register(registerData)
      
      // 注册成功后自动登录
      user.value = response.user
      tokenManager.setTokens(
        response.token,
        response.refreshToken,
        response.expiresIn
      )
      
      return { success: true, user: response.user }
    } catch (error) {
      console.error('注册失败:', error)
      return { success: false, message: error.message }
    }
  }

  /**
   * 用户登出
   * @returns {Promise} 登出结果
   */
  const logout = async () => {
    try {
      // 调用登出API（可选）
      await authApi.logout()
    } catch (error) {
      console.error('登出API调用失败:', error)
    } finally {
      // 清除本地数据
      user.value = null
      tokenManager.clearTokens()
    }
    
    return { success: true }
  }

  /**
   * 初始化用户信息
   * 从本地存储恢复用户状态
   */
  const initUser = async () => {
    try {
      // 检查是否有有效的访问令牌
      if (tokenManager.getAccessToken()) {
        // 验证令牌有效性
        const isValid = await tokenManager.validateToken()
        if (isValid) {
          // 获取用户信息
          const userInfo = await userApi.getUserInfo()
          user.value = userInfo
        } else {
          // 令牌无效，尝试刷新
          try {
            await tokenManager.refreshAccessToken()
            const userInfo = await userApi.getUserInfo()
            user.value = userInfo
          } catch (refreshError) {
            // 刷新失败，清除所有数据
            user.value = null
            tokenManager.clearTokens()
          }
        }
      }
    } catch (error) {
      console.error('初始化用户信息失败:', error)
      user.value = null
      tokenManager.clearTokens()
    }
  }

  /**
   * 刷新用户令牌
   * @returns {Promise} 刷新结果
   */
  const refreshUserToken = async () => {
    try {
      const newAccessToken = await tokenManager.refreshAccessToken()
      return { success: true, token: newAccessToken }
    } catch (error) {
      console.error('刷新令牌失败:', error)
      // 刷新失败，清除用户数据
      user.value = null
      tokenManager.clearTokens()
      return { success: false, message: error.message }
    }
  }

  /**
   * 更新用户信息
   * @param {Object} userData - 用户数据
   * @returns {Promise} 更新结果
   */
  const updateProfile = async (userData) => {
    try {
      const response = await userApi.updateUserInfo(userData)
      user.value = { ...user.value, ...response }
      return { success: true, user: user.value }
    } catch (error) {
      console.error('更新用户信息失败:', error)
      return { success: false, message: error.message }
    }
  }

  return {
    // 状态
    user,
    isLoggedIn,
    
    // 方法
    login,
    register,
    logout,
    initUser,
    refreshUserToken,
    updateProfile
  }
})
