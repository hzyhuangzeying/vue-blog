<template>
  <div class="articles-page">
    <div class="page-header">
      <h1 class="page-title">文章列表</h1>
      <div class="page-actions">
        <el-select v-model="selectedCategory" placeholder="选择分类" @change="handleCategoryChange">
          <el-option label="全部分类" value="" />
          <el-option
            v-for="category in categories"
            :key="category.id"
            :label="category.name"
            :value="category.id"
          />
        </el-select>
        <el-select v-model="sortBy" placeholder="排序方式" @change="handleSortChange">
          <el-option label="最新发布" value="latest" />
          <el-option label="最多阅读" value="views" />
          <el-option label="最多点赞" value="likes" />
        </el-select>
      </div>
    </div>

    <div class="articles-container">
      <div v-if="loading" class="loading-container">
        <el-skeleton :rows="5" animated />
      </div>
      
      <div v-else-if="filteredArticles.length === 0" class="empty-container">
        <el-empty description="暂无文章" />
      </div>
      
      <div v-else class="articles-list">
        <article-card
          v-for="article in filteredArticles"
          :key="article.id"
          :article="article"
          @click="handleArticleClick(article)"
        />
      </div>
    </div>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[6, 12, 24, 48]"
        :total="totalArticles"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useArticlesStore } from '@/stores/articles'
import ArticleCard from '@/components/ArticleCard.vue'

const router = useRouter()
const articlesStore = useArticlesStore()

const articles = ref([])
const categories = ref([])
const loading = ref(false)
const selectedCategory = ref('')
const sortBy = ref('latest')
const currentPage = ref(1)
const pageSize = ref(12)

const filteredArticles = computed(() => {
  let filtered = [...articles.value]
  
  // 按分类筛选
  if (selectedCategory.value) {
    const category = categories.value.find(c => c.id === selectedCategory.value)
    if (category) {
      filtered = filtered.filter(article => article.category === category.name)
    }
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
    default:
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      break
  }
  
  // 分页
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filtered.slice(start, end)
})

const totalArticles = computed(() => {
  if (selectedCategory.value) {
    const category = categories.value.find(c => c.id === selectedCategory.value)
    if (category) {
      return articles.value.filter(article => article.category === category.name).length
    }
  }
  return articles.value.length
})

onMounted(async () => {
  await loadData()
})

const loadData = async () => {
  loading.value = true
  try {
    const [articlesResult, categoriesResult] = await Promise.all([
      articlesStore.fetchArticles(),
      articlesStore.fetchCategories()
    ])
    
    if (articlesResult.success) {
      articles.value = articlesResult.data
    }
    
    if (categoriesResult.success) {
      categories.value = categoriesResult.data
    }
  } finally {
    loading.value = false
  }
}

const handleCategoryChange = () => {
  currentPage.value = 1
}

const handleSortChange = () => {
  currentPage.value = 1
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

// 监听路由参数变化
watch(() => router.currentRoute.value.query, (newQuery) => {
  if (newQuery.category) {
    selectedCategory.value = parseInt(newQuery.category)
  }
  if (newQuery.sort) {
    sortBy.value = newQuery.sort
  }
}, { immediate: true })
</script>

<style lang="scss" scoped>
.articles-page {
  max-width: 100%;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
}

.page-actions {
  display: flex;
  gap: var(--spacing-md);
}

.articles-container {
  margin-bottom: var(--spacing-xl);
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

.articles-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--spacing-lg);
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
  .page-header {
    flex-direction: column;
    gap: var(--spacing-md);
    align-items: stretch;
  }
  
  .page-actions {
    flex-direction: column;
  }
  
  .articles-list {
    grid-template-columns: 1fr;
  }
}
</style>
