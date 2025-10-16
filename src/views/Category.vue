<template>
  <div class="category-page">
    <div class="category-container">
      <div class="category-header">
        <h1 class="page-title">{{ categoryName }}</h1>
        <p class="page-subtitle">共 {{ categoryArticles.length }} 篇文章</p>
      </div>

      <div class="category-filters">
        <el-select v-model="sortBy" placeholder="排序方式" @change="handleSortChange">
          <el-option label="最新发布" value="latest" />
          <el-option label="最多阅读" value="views" />
          <el-option label="最多点赞" value="likes" />
          <el-option label="最多评论" value="comments" />
        </el-select>
      </div>

      <div v-if="loading" class="loading-container">
        <el-skeleton :rows="5" animated />
      </div>
      
      <div v-else-if="categoryArticles.length === 0" class="empty-container">
        <el-empty description="该分类下暂无文章">
          <el-button type="primary" @click="$router.push('/articles')">
            浏览所有文章
          </el-button>
        </el-empty>
      </div>
      
      <div v-else class="articles-grid">
        <article-card
          v-for="article in sortedArticles"
          :key="article.id"
          :article="article"
          @click="handleArticleClick(article)"
        />
      </div>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[12, 24, 48]"
          :total="categoryArticles.length"
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
import ArticleCard from '@/components/ArticleCard.vue'

const route = useRoute()
const router = useRouter()
const articlesStore = useArticlesStore()

const categoryArticles = ref([])
const loading = ref(false)
const sortBy = ref('latest')
const currentPage = ref(1)
const pageSize = ref(12)

const categoryName = computed(() => {
  const categoryId = route.params.id
  const category = articlesStore.categories.find(c => c.id === parseInt(categoryId))
  return category ? category.name : '未知分类'
})

const sortedArticles = computed(() => {
  let sorted = [...categoryArticles.value]
  
  switch (sortBy.value) {
    case 'views':
      sorted.sort((a, b) => b.views - a.views)
      break
    case 'likes':
      sorted.sort((a, b) => b.likes - a.likes)
      break
    case 'comments':
      sorted.sort((a, b) => b.comments - a.comments)
      break
    case 'latest':
    default:
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      break
  }
  
  // 分页
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return sorted.slice(start, end)
})

onMounted(async () => {
  await loadCategoryArticles()
})

watch(() => route.params.id, async () => {
  await loadCategoryArticles()
})

const loadCategoryArticles = async () => {
  loading.value = true
  try {
    const [articlesResult, categoriesResult] = await Promise.all([
      articlesStore.fetchArticles(),
      articlesStore.fetchCategories()
    ])
    
    if (articlesResult.success && categoriesResult.success) {
      const categoryId = route.params.id
      const category = categoriesResult.data.find(c => c.id === parseInt(categoryId))
      
      if (category) {
        categoryArticles.value = articlesResult.data.filter(article => 
          article.category === category.name
        )
      } else {
        categoryArticles.value = []
      }
    }
  } finally {
    loading.value = false
  }
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
</script>

<style lang="scss" scoped>
.category-page {
  max-width: 100%;
}

.category-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-lg);
}

.category-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-xl);
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

.page-subtitle {
  color: var(--text-color-secondary);
  font-size: var(--font-size-md);
}

.category-filters {
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

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
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
  .category-container {
    padding: var(--spacing-sm);
  }
  
  .articles-grid {
    grid-template-columns: 1fr;
  }
}
</style>
