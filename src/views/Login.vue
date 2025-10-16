<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-form-wrapper">
        <div class="form-header">
          <h1 class="form-title">登录</h1>
          <p class="form-subtitle">欢迎回来，请登录您的账号</p>
        </div>
        
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          @submit.prevent="handleLogin"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              size="large"
              prefix-icon="User"
            />
          </el-form-item>
          
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              size="large"
              prefix-icon="Lock"
              show-password
            />
          </el-form-item>
          
          <el-form-item>
            <div class="form-options">
              <el-checkbox v-model="rememberMe">记住我</el-checkbox>
              <el-link type="primary" :underline="false">忘记密码？</el-link>
            </div>
          </el-form-item>
          
          <el-form-item>
            <el-button
              type="primary"
              size="large"
              class="login-button"
              :loading="loading"
              @click="handleLogin"
            >
              {{ loading ? '登录中...' : '登录' }}
            </el-button>
          </el-form-item>
        </el-form>
        
        <div class="form-footer">
          <p class="register-tip">
            还没有账号？
            <router-link to="/register" class="register-link">立即注册</router-link>
          </p>
        </div>
      </div>
      
      <div class="login-banner">
        <div class="banner-content">
          <h2 class="banner-title">Vue Blog</h2>
          <p class="banner-subtitle">分享技术，记录成长</p>
          <div class="banner-features">
            <div class="feature-item">
              <el-icon class="feature-icon"><Document /></el-icon>
              <span>技术文章分享</span>
            </div>
            <div class="feature-item">
              <el-icon class="feature-icon"><User /></el-icon>
              <span>个人成长记录</span>
            </div>
            <div class="feature-item">
              <el-icon class="feature-icon"><Star /></el-icon>
              <span>知识交流社区</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()

const loginFormRef = ref()
const loading = ref(false)
const rememberMe = ref(false)

const loginForm = reactive({
  username: '',
  password: ''
})

const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ]
}

const handleLogin = async () => {
  if (!loginFormRef.value) return
  
  try {
    const valid = await loginFormRef.value.validate()
    if (!valid) return
    
    loading.value = true
    const result = await userStore.login(loginForm)
    
    if (result.success) {
      ElMessage.success('登录成功！')
      const redirect = router.currentRoute.value.query.redirect || '/home'
      router.push(redirect)
    } else {
      ElMessage.error(result.message || '登录失败')
    }
  } catch (error) {
    ElMessage.error('登录失败，请重试')
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
}

.login-container {
  background: var(--bg-color-light);
  border-radius: var(--border-radius-large);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  max-width: 900px;
  width: 100%;
  min-height: 500px;
}

.login-form-wrapper {
  flex: 1;
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.form-title {
  font-size: var(--font-size-xxl);
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: var(--spacing-sm);
}

.form-subtitle {
  color: var(--text-color-secondary);
  font-size: var(--font-size-md);
}

.login-form {
  .el-form-item {
    margin-bottom: var(--spacing-lg);
  }
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.login-button {
  width: 100%;
  height: 48px;
  font-size: var(--font-size-md);
  font-weight: 500;
}

.form-footer {
  text-align: center;
  margin-top: var(--spacing-xl);
}

.register-tip {
  color: var(--text-color-secondary);
  font-size: var(--font-size-sm);
}

.register-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
}

.login-banner {
  flex: 1;
  background: linear-gradient(135deg, var(--primary-color) 0%, #1890ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
  color: white;
}

.banner-content {
  text-align: center;
}

.banner-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: var(--spacing-md);
}

.banner-subtitle {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-xl);
  opacity: 0.9;
}

.banner-features {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.feature-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  font-size: var(--font-size-md);
}

.feature-icon {
  font-size: var(--font-size-xl);
}

@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
    max-width: 400px;
  }
  
  .login-banner {
    display: none;
  }
  
  .login-form-wrapper {
    padding: var(--spacing-lg);
  }
}
</style>
