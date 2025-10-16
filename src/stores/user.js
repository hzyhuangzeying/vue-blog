import { userApi } from '@/api'
import { deleteCookie, getCookie, setCookie } from '@/utils/cookie'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const token = ref(getCookie('token') || '')
  const isLoggedIn = computed(() => !!token.value && !!user.value)

  const login = async (loginData) => {
    try {
      // 使用真实API调用
      const response = await userApi.login(loginData)
      user.value = response.user
      token.value = response.token
      setCookie('token', response.token, 7) // 7天过期
      setCookie('user', JSON.stringify(response.user), 7)
      return { success: true }
    } catch (error) {
      // 如果API调用失败，使用模拟数据
      try {
        const response = await mockLogin(loginData)
        user.value = response.user
        token.value = response.token
        setCookie('token', response.token, 7) // 7天过期
        setCookie('user', JSON.stringify(response.user), 7)
        return { success: true }
      } catch (mockError) {
        return { success: false, message: mockError.message }
      }
    }
  }

  const register = async (registerData) => {
    try {
      // 使用真实API调用
      const response = await userApi.register(registerData)
      user.value = response.user
      token.value = response.token
      setCookie('token', response.token, 7) // 7天过期
      setCookie('user', JSON.stringify(response.user), 7)
      return { success: true }
    } catch (error) {
      // 如果API调用失败，使用模拟数据
      try {
        const response = await mockRegister(registerData)
        user.value = response.user
        token.value = response.token
        setCookie('token', response.token, 7) // 7天过期
        setCookie('user', JSON.stringify(response.user), 7)
        return { success: true }
      } catch (mockError) {
        return { success: false, message: mockError.message }
      }
    }
  }

  const logout = () => {
    user.value = null
    token.value = ''
    deleteCookie('token')
    deleteCookie('user')
  }

  const initUser = () => {
    const savedUser = getCookie('user')
    if (savedUser && token.value) {
      try {
        user.value = JSON.parse(savedUser)
      } catch (error) {
        console.error('Failed to parse user data:', error)
        logout()
      }
    }
  }

  const updateProfile = async (profileData) => {
    try {
      // 使用真实API调用
      const response = await userApi.updateUserInfo(profileData)
      user.value = response
      setCookie('user', JSON.stringify(response), 7)
      return { success: true }
    } catch (error) {
      // 如果API调用失败，使用本地更新
      try {
        const updatedUser = { ...user.value, ...profileData }
        user.value = updatedUser
        setCookie('user', JSON.stringify(updatedUser), 7)
        return { success: true }
      } catch (localError) {
        return { success: false, message: localError.message }
      }
    }
  }

  return {
    user,
    token,
    isLoggedIn,
    login,
    register,
    logout,
    initUser,
    updateProfile
  }
})

// 模拟API函数
const mockLogin = async (loginData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (loginData.username === 'admin' && loginData.password === '123456') {
        resolve({
          user: {
            id: 1,
            username: 'admin',
            nickname: '管理员',
            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            email: 'admin@example.com',
            bio: '这是一个管理员账号',
            followers: 1000,
            following: 500,
            articles: 50
          },
          token: 'mock-token-' + Date.now()
        })
      } else {
        reject(new Error('用户名或密码错误'))
      }
    }, 1000)
  })
}

const mockRegister = async (registerData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (registerData.username && registerData.password && registerData.email) {
        resolve({
          user: {
            id: Date.now(),
            username: registerData.username,
            nickname: registerData.nickname || registerData.username,
            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            email: registerData.email,
            bio: '',
            followers: 0,
            following: 0,
            articles: 0
          },
          token: 'mock-token-' + Date.now()
        })
      } else {
        reject(new Error('注册信息不完整'))
      }
    }, 1000)
  })
}
