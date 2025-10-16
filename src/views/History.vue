<template>
  <div class="history-page">
    <div class="page-header">
      <h1 class="page-title">浏览历史</h1>
      <p class="page-description">查看您的浏览记录和阅读历史</p>
    </div>

    <div class="history-content">
      <!-- 历史记录标签页 -->
      <el-tabs v-model="activeTab" class="history-tabs">
        <!-- 文章浏览历史 -->
        <el-tab-pane label="文章历史" name="articles">
          <div class="history-section">
            <div class="section-header">
              <h3>文章浏览历史</h3>
              <div class="header-actions">
                <el-select v-model="timeFilter" placeholder="时间筛选" size="small" style="width: 120px; margin-right: 10px;">
                  <el-option label="全部" value="all"></el-option>
                  <el-option label="今天" value="today"></el-option>
                  <el-option label="本周" value="week"></el-option>
                  <el-option label="本月" value="month"></el-option>
                </el-select>
                <el-button type="danger" size="small" @click="clearHistory">清空历史</el-button>
              </div>
            </div>
            <div class="article-history-list">
              <div v-for="item in articleHistory" :key="item.id" class="history-item">
                <div class="article-cover">
                  <img v-if="item.cover" :src="item.cover" :alt="item.title" />
                  <div v-else class="no-cover">
                    <el-icon><Document /></el-icon>
                  </div>
                </div>
                <div class="article-info">
                  <h4 class="article-title" @click="viewArticle(item.id)">
                    {{ item.title }}
                  </h4>
                  <p class="article-summary">{{ item.summary }}</p>
                  <div class="article-meta">
                    <span class="author">
                      <el-icon><User /></el-icon>
                      {{ item.author }}
                    </span>
                    <span class="publish-time">
                      <el-icon><Clock /></el-icon>
                      {{ item.publishTime }}
                    </span>
                    <span class="views">
                      <el-icon><View /></el-icon>
                      {{ item.views }} 阅读
                    </span>
                    <span class="read-time">
                      <el-icon><Timer /></el-icon>
                      {{ item.readTime }} 分钟前阅读
                    </span>
                  </div>
                </div>
                <div class="article-actions">
                  <el-button type="text" @click="removeFromHistory(item.id)">
                    删除记录
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <!-- 搜索历史 -->
        <el-tab-pane label="搜索历史" name="search">
          <div class="history-section">
            <div class="section-header">
              <h3>搜索历史</h3>
              <div class="header-actions">
                <el-button type="danger" size="small" @click="clearSearchHistory">清空搜索历史</el-button>
              </div>
            </div>
            <div class="search-history-list">
              <div v-for="(search, index) in searchHistory" :key="index" class="search-item">
                <div class="search-icon">
                  <el-icon><Search /></el-icon>
                </div>
                <div class="search-info">
                  <span class="search-keyword" @click="searchAgain(search.keyword)">
                    {{ search.keyword }}
                  </span>
                  <span class="search-time">{{ search.time }}</span>
                </div>
                <div class="search-actions">
                  <el-button type="text" @click="removeSearchHistory(index)">
                    删除
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <!-- 访问统计 -->
        <el-tab-pane label="访问统计" name="stats">
          <div class="history-section">
            <div class="section-header">
              <h3>访问统计</h3>
            </div>
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-icon">
                  <el-icon><Document /></el-icon>
                </div>
                <div class="stat-content">
                  <div class="stat-number">{{ totalArticlesRead }}</div>
                  <div class="stat-label">总阅读文章数</div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">
                  <el-icon><Clock /></el-icon>
                </div>
                <div class="stat-content">
                  <div class="stat-number">{{ totalReadTime }}</div>
                  <div class="stat-label">总阅读时长(分钟)</div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">
                  <el-icon><Calendar /></el-icon>
                </div>
                <div class="stat-content">
                  <div class="stat-number">{{ activeDays }}</div>
                  <div class="stat-label">活跃天数</div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">
                  <el-icon><Search /></el-icon>
                </div>
                <div class="stat-content">
                  <div class="stat-number">{{ totalSearches }}</div>
                  <div class="stat-label">总搜索次数</div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
const activeTab = ref('articles')
const timeFilter = ref('all')

// 文章浏览历史数据
const articleHistory = ref([
  {
    id: 1,
    title: 'Vue 3 Composition API 完全指南',
    summary: '深入理解 Vue 3 的 Composition API，包括 setup 函数、响应式 API、生命周期钩子等核心概念...',
    author: '张三',
    publishTime: '2024-01-15',
    views: 1250,
    readTime: '5',
    cover: ''
  },
  {
    id: 2,
    title: '前端性能优化最佳实践',
    summary: '从代码层面到工程化层面，全面介绍前端性能优化的各种方法和技巧...',
    author: '李四',
    publishTime: '2024-01-10',
    views: 890,
    readTime: '12',
    cover: ''
  },
  {
    id: 3,
    title: 'TypeScript 进阶技巧',
    summary: '掌握 TypeScript 的高级特性，提升代码质量和开发效率...',
    author: '王五',
    publishTime: '2024-01-08',
    views: 650,
    readTime: '8',
    cover: ''
  }
])

// 搜索历史数据
const searchHistory = ref([
  { keyword: 'Vue 3 教程', time: '2小时前' },
  { keyword: '前端性能优化', time: '1天前' },
  { keyword: 'TypeScript 类型', time: '2天前' },
  { keyword: 'React Hooks', time: '3天前' }
])

// 统计数据
const totalArticlesRead = ref(156)
const totalReadTime = ref(1240)
const activeDays = ref(45)
const totalSearches = ref(89)

// 查看文章
const viewArticle = (articleId) => {
  router.push(`/article/${articleId}`)
}

// 重新搜索
const searchAgain = (keyword) => {
  router.push({
    name: 'Search',
    query: { q: keyword }
  })
}

// 删除历史记录
const removeFromHistory = (articleId) => {
  const index = articleHistory.value.findIndex(item => item.id === articleId)
  if (index > -1) {
    articleHistory.value.splice(index, 1)
    ElMessage.success('已删除历史记录')
  }
}

// 删除搜索历史
const removeSearchHistory = (index) => {
  searchHistory.value.splice(index, 1)
  ElMessage.success('已删除搜索记录')
}

// 清空历史
const clearHistory = async () => {
  try {
    await ElMessageBox.confirm('确定要清空所有浏览历史吗？', '确认清空', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    articleHistory.value = []
    ElMessage.success('已清空浏览历史')
  } catch {
    // 用户取消
  }
}

// 清空搜索历史
const clearSearchHistory = async () => {
  try {
    await ElMessageBox.confirm('确定要清空所有搜索历史吗？', '确认清空', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    searchHistory.value = []
    ElMessage.success('已清空搜索历史')
  } catch {
    // 用户取消
  }
}

onMounted(() => {
  // 加载历史数据
  console.log('加载历史数据')
})
</script>

<style lang="scss" scoped>
.history-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-lg);
}

.page-header {
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

.page-title {
  font-size: var(--font-size-xxl);
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: var(--spacing-sm);
}

.page-description {
  font-size: var(--font-size-md);
  color: var(--text-color-secondary);
  margin: 0;
}

.history-content {
  background: var(--bg-color-light);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
}

.history-tabs {
  :deep(.el-tabs__header) {
    margin-bottom: var(--spacing-lg);
  }

  :deep(.el-tabs__item) {
    font-size: var(--font-size-md);
    font-weight: 500;
  }
}

.history-section {
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-lg);

    h3 {
      font-size: var(--font-size-lg);
      font-weight: 600;
      color: var(--text-color);
      margin: 0;
    }

    .header-actions {
      display: flex;
      align-items: center;
    }
  }
}

.article-history-list,
.search-history-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.history-item,
.search-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--bg-color);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color-light);
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--primary-color);
    box-shadow: var(--box-shadow-light);
  }
}

.article-cover {
  flex-shrink: 0;
  width: 120px;
  height: 80px;
  border-radius: var(--border-radius);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .no-cover {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-color-light);
    color: var(--text-color-secondary);
    font-size: var(--font-size-xl);
  }
}

.search-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-color);
  border-radius: 50%;
  color: white;
  font-size: var(--font-size-md);
}

.article-info,
.search-info {
  flex: 1;
  min-width: 0;
}

.article-title {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 var(--spacing-xs) 0;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: var(--primary-color);
  }
}

.article-summary {
  font-size: var(--font-size-sm);
  color: var(--text-color-secondary);
  margin: 0 0 var(--spacing-sm) 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.article-meta span {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--text-color-secondary);

  .el-icon {
    font-size: var(--font-size-sm);
  }
}

.search-keyword {
  font-size: var(--font-size-md);
  font-weight: 500;
  color: var(--text-color);
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: var(--primary-color);
  }
}

.search-time {
  font-size: var(--font-size-sm);
  color: var(--text-color-secondary);
  margin-left: var(--spacing-sm);
}

.article-actions,
.search-actions {
  flex-shrink: 0;
}

/* 统计卡片 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
}

.stat-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--bg-color);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color-light);
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--primary-color);
    box-shadow: var(--box-shadow-light);
  }
}

.stat-icon {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-color);
  border-radius: 50%;
  color: white;
  font-size: var(--font-size-lg);
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: var(--spacing-xs);
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--text-color-secondary);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .history-page {
    padding: var(--spacing-md);
  }

  .history-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .article-cover {
    width: 100%;
    height: 200px;
  }

  .article-actions {
    align-self: flex-end;
  }

  .article-meta {
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
