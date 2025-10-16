<template>
  <div class="search-page">
    <div class="search-container">
      <div class="search-header">
        <h1 class="page-title">搜索结果</h1>
        <div class="search-info">
          <span v-if="searchKeyword">关键词：{{ searchKeyword }}</span>
          <span v-if="searchResults.length > 0">找到 {{ searchResults.length }} 个结果</span>
        </div>
      </div>

      <div class="search-filters">
        <el-select v-model="sortBy" placeholder="排序方式" @change="handleSortChange">
          <el-option label="相关度" value="relevance" />
          <el-option label="最新发布" value="latest" />
          <el-option label="最多阅读" value="views" />
          <el-option label="最多点赞" value="likes" />
        </el-select>
        
        <el-select v-model="timeFilter" placeholder="时间范围" @change="handleTimeFilterChange">
          <el-option label="全部时间" value="all" />
          <el-option label="最近一周" value="week" />
          <el-option label="最近一月" value="month" />
          <el-option label="最近一年" value="year" />
        </el-select>
      </div>

      <div v-if="loading" class="loading-container">
        <el-skeleton :rows="5" animated />
      </div>
      
      <div v-else-if="searchResults.length === 0" class="empty-container">
        <el-empty description="没有找到相关文章">
          <el-button type="primary" @click="$router.push('/articles')">
            浏览所有文章
          </el-button>
        </el-empty>
      </div>
      
      <div v-else class="search-results">
        <div
          v-for="article in searchResults"
          :key="article.id"
          class="result-item"
          @click="handleArticleClick(article)"
        >
          <div class="result-cover">
            <img :src="article.cover" :alt="article.title" />
          </div>
          
          <div class="result-content">
            <h3 class="result-title">
              <span v-html="highlightKeyword(article.title)"></span>
            </h3>
            <p class="result-summary">
              <span v-html="highlightKeyword(article.summary)"></span>
            </p>
            
            <div class="result-meta">
              <div class="author-info">
                <el-avatar :src="article.author.avatar" :size="20">
                  {{ article.author.nickname.charAt(0) }}
                </el-avatar>
                <span class="author-name">{{ article.author.nickname }}</span>
              </div>
              
              <div class="article-stats">
                <span class="stat-item">
                  <el-icon><View /></el-icon>
                  {{ article.views }}
                </span>
                <span class="stat-item">
                  <el-icon><Star /></el-icon>
                  {{ article.likes }}
                </span>
                <span class="stat-item">
                  <el-icon><ChatDotRound /></el-icon>
                  {{ article.comments }}
                </span>
              </div>
              
              <div class="article-tags">
                <el-tag
                  v-for="tag in article.tags"
                  :key="tag"
                  size="small"
                  class="tag"
                >
                  {{ tag }}
                </el-tag>
              </div>
            </div>
            
            <div class="result-time">
              {{ formatTime(article.createdAt) }}
            </div>
          </div>
        </div>
      </div>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50]"
          :total="totalResults"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useArticlesStore } from '@/stores/articles'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'

const route = useRoute()
const router = useRouter()
const articlesStore = useArticlesStore()

const searchKeyword = ref('')
const searchResults = ref([])
const loading = ref(false)
const sortBy = ref('relevance')
const timeFilter = ref('all')
const currentPage = ref(1)
const pageSize = ref(10)

const totalResults = computed(() => searchResults.value.length)

onMounted(() => {
  const query = route.query.q
  if (query) {
    searchKeyword.value = query
    performSearch()
  }
})

watch(() => route.query.q, (newQuery) => {
  if (newQuery) {
    searchKeyword.value = newQuery
    performSearch()
  }
})

const performSearch = async () => {
  if (!searchKeyword.value.trim()) return
  
  loading.value = true
  try {
    const result = await articlesStore.searchArticles(searchKeyword.value)
    if (result.success) {
      searchResults.value = result.data
      applyFilters()
    }
  } finally {
    loading.value = false
  }
}

const applyFilters = () => {
  let filtered = [...searchResults.value]
  
  // 时间筛选
  if (timeFilter.value !== 'all') {
    const now = new Date()
    const filterDate = new Date()
    
    switch (timeFilter.value) {
      case 'week':
        filterDate.setDate(now.getDate() - 7)
        break
      case 'month':
        filterDate.setMonth(now.getMonth() - 1)
        break
      case 'year':
        filterDate.setFullYear(now.getFullYear() - 1)
        break
    }
    
    filtered = filtered.filter(article => 
      new Date(article.createdAt) >= filterDate
    )
  }
  
  // 排序
  switch (sortBy.value) {
    case 'views':
      filtered.sort((a, b) => b.views - a.views)
      break
    case 'likes':
      filtered.sort((a, b) => b.likes - a.likes)
      break
    case 'latest':
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      break
    case 'relevance':
    default:
      // 简单的相关度排序，实际项目中可以使用更复杂的算法
      filtered.sort((a, b) => {
        const aScore = getRelevanceScore(a)
        const bScore = getRelevanceScore(b)
        return bScore - aScore
      })
      break
  }
  
  searchResults.value = filtered
}

const getRelevanceScore = (article) => {
  const keyword = searchKeyword.value.toLowerCase()
  let score = 0
  
  // 标题匹配权重最高
  if (article.title.toLowerCase().includes(keyword)) {
    score += 10
  }
  
  // 内容匹配
  if (article.summary.toLowerCase().includes(keyword)) {
    score += 5
  }
  
  // 标签匹配
  if (article.tags.some(tag => tag.toLowerCase().includes(keyword))) {
    score += 3
  }
  
  // 分类匹配
  if (article.category.toLowerCase().includes(keyword)) {
    score += 2
  }
  
  return score
}

const highlightKeyword = (text) => {
  if (!searchKeyword.value) return text
  
  const keyword = searchKeyword.value
  const regex = new RegExp(`(${keyword})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}

const handleSortChange = () => {
  applyFilters()
}

const handleTimeFilterChange = () => {
  applyFilters()
}

const handleSizeChange = (size) => {
  pageSize.value = size
  currentPage.value = 1
}

const handleCurrentChange = (page) => {
  currentPage.value = page
}

const handleArticleClick = (article) => {
  router.push({
    name: 'ArticleDetail',
    params: { id: article.id }
  })
}

const formatTime = (dateString) => {
  const date = new Date(dateString)
  return formatDistanceToNow(date, { 
    addSuffix: true, 
    locale: zhCN 
  })
}
</script>

<style lang="scss" scoped>
.search-page {
  max-width: 100%;
}

.search-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: var(--spacing-lg);
}

.search-header {
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-lg);
  background: var(--bg-color-light);
  border-radius: var(--border-radius-large);
  box-shadow: var(--box-shadow-light);
}

.page-title {
  font-size: var(--font-size-xxl);
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: var(--spacing-sm);
}

.search-info {
  color: var(--text-color-secondary);
  font-size: var(--font-size-sm);
}

.search-filters {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-lg);
  background: var(--bg-color-light);
  border-radius: var(--border-radius-large);
  box-shadow: var(--box-shadow-light);
}

.loading-container {
  padding: var(--spacing-xl);
  background: var(--bg-color-light);
  border-radius: var(--border-radius-large);
}

.empty-container {
  padding: var(--spacing-xl);
  background: var(--bg-color-light);
  border-radius: var(--border-radius-large);
  text-align: center;
}

.search-results {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.result-item {
  display: flex;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
  background: var(--bg-color-light);
  border-radius: var(--border-radius-large);
  box-shadow: var(--box-shadow-light);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--box-shadow);
  }
}

.result-cover {
  width: 200px;
  height: 120px;
  flex-shrink: 0;
  border-radius: var(--border-radius);
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.result-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.result-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-color);
  line-height: 1.4;
  margin-bottom: var(--spacing-sm);
  
  :deep(mark) {
    background: #fff3cd;
    color: var(--text-color);
    padding: 2px 4px;
    border-radius: 3px;
  }
}

.result-summary {
  color: var(--text-color-secondary);
  font-size: var(--font-size-sm);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  :deep(mark) {
    background: #fff3cd;
    color: var(--text-color);
    padding: 2px 4px;
    border-radius: 3px;
  }
}

.result-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-sm);
}

.author-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.author-name {
  font-size: var(--font-size-sm);
  color: var(--text-color);
}

.article-stats {
  display: flex;
  gap: var(--spacing-md);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: var(--font-size-xs);
  color: var(--text-color-secondary);
}

.article-tags {
  display: flex;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
}

.tag {
  font-size: var(--font-size-xs);
}

.result-time {
  font-size: var(--font-size-xs);
  color: var(--text-color-secondary);
  margin-top: auto;
}

.pagination-container {
  display: flex;
  justify-content: center;
  padding: var(--spacing-lg);
  background: var(--bg-color-light);
  border-radius: var(--border-radius-large);
  box-shadow: var(--box-shadow-light);
}

@media (max-width: 768px) {
  .search-container {
    padding: var(--spacing-sm);
  }
  
  .search-filters {
    flex-direction: column;
  }
  
  .result-item {
    flex-direction: column;
  }
  
  .result-cover {
    width: 100%;
    height: 150px;
  }
  
  .result-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }
}
</style>
