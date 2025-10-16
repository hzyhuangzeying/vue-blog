<template>
  <div class="not-found-page">
    <div class="not-found-container">
      <div class="error-content">
        <div class="error-image">
          <el-icon class="error-icon"><Warning /></el-icon>
        </div>
        
        <h1 class="error-title">404</h1>
        <h2 class="error-subtitle">页面未找到</h2>
        <p class="error-description">
          抱歉，您访问的页面不存在或已被删除
        </p>
        
        <div class="error-actions">
          <el-button type="primary" @click="goHome">
            <el-icon><House /></el-icon>
            返回首页
          </el-button>
          <el-button @click="goBack">
            <el-icon><ArrowLeft /></el-icon>
            返回上页
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/home')
}

const goBack = () => {
  router.go(-1)
}
</script>

<style lang="scss" scoped>
.not-found-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: var(--spacing-lg);
}

.not-found-container {
  background: var(--bg-color-light);
  border-radius: var(--border-radius-large);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: var(--spacing-xl);
  text-align: center;
  max-width: 500px;
  width: 100%;
}

.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
}

.error-image {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, var(--primary-color), #1890ff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-icon {
  font-size: 60px;
  color: white;
}

.error-title {
  font-size: 4rem;
  font-weight: 700;
  color: var(--primary-color);
  margin: 0;
  line-height: 1;
}

.error-subtitle {
  font-size: var(--font-size-xxl);
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
}

.error-description {
  color: var(--text-color-secondary);
  font-size: var(--font-size-md);
  line-height: 1.6;
  margin: 0;
}

.error-actions {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
}

@media (max-width: 768px) {
  .not-found-container {
    padding: var(--spacing-lg);
  }
  
  .error-title {
    font-size: 3rem;
  }
  
  .error-actions {
    flex-direction: column;
    width: 100%;
  }
}
</style>
