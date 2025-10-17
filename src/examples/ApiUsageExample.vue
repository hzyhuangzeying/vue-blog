<template>
  <div class="api-usage-example">
    <h2>API响应类型使用示例</h2>
    
    <!-- 用户信息 -->
    <div class="user-section">
      <h3>用户信息</h3>
      <div v-if="userInfo">
        <p>用户名: {{ userInfo.username }}</p>
        <p>昵称: {{ userInfo.nickname }}</p>
        <p>邮箱: {{ userInfo.email }}</p>
      </div>
      <el-button @click="loadUserInfo" :loading="loading">获取用户信息</el-button>
    </div>

    <!-- 文章列表 -->
    <div class="articles-section">
      <h3>文章列表</h3>
      <div v-if="articles.list.length > 0">
        <div v-for="article in articles.list" :key="article.id" class="article-item">
          <h4>{{ article.title }}</h4>
          <p>{{ article.summary }}</p>
          <span>作者: {{ article.author.nickname }}</span>
        </div>
      </div>
      <el-button @click="loadArticles" :loading="loading">获取文章列表</el-button>
    </div>

    <!-- 统计信息 -->
    <div class="stats-section">
      <h3>统计信息</h3>
      <div v-if="stats">
        <p>总文章数: {{ stats.totalArticles }}</p>
        <p>总浏览量: {{ stats.totalViews }}</p>
        <p>总点赞数: {{ stats.totalLikes }}</p>
      </div>
      <el-button @click="loadStats" :loading="loading">获取统计信息</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { userApi, articleApi } from '@/api'
import { ElMessage } from 'element-plus'

// 响应式数据
const userInfo = ref(null)
const articles = ref({ list: [], total: 0, page: 1, size: 10, pages: 0 })
const stats = ref(null)
const loading = ref(false)

// 获取用户信息
const loadUserInfo = async () => {
  loading.value = true
  try {
    // 使用统一的API调用
    const result = await userApi.getUserInfo()
    userInfo.value = result
    console.log('用户信息:', result)
  } catch (error) {
    console.error('获取用户信息失败:', error)
  } finally {
    loading.value = false
  }
}

// 获取文章列表
const loadArticles = async () => {
  loading.value = true
  try {
    // 使用分页API
    const result = await articleApi.getArticleList({ 
      page: 1, 
      size: 10 
    })
    articles.value = result
    console.log('文章列表:', result)
  } catch (error) {
    console.error('获取文章列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 获取统计信息
const loadStats = async () => {
  loading.value = true
  try {
    // 使用统计API
    const result = await userApi.getUserStats()
    stats.value = result
    console.log('统计信息:', result)
  } catch (error) {
    console.error('获取统计信息失败:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.api-usage-example {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.user-section,
.articles-section,
.stats-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
}

.article-item {
  margin-bottom: 15px;
  padding: 10px;
  background: #f5f7fa;
  border-radius: 4px;
}

.article-item h4 {
  margin: 0 0 8px 0;
  color: #303133;
}

.article-item p {
  margin: 0 0 8px 0;
  color: #606266;
  font-size: 14px;
}

.article-item span {
  color: #909399;
  font-size: 12px;
}
</style>
