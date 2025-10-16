<template>
  <div class="favorites-page">
    <div class="page-header">
      <h1 class="page-title">我的收藏</h1>
      <p class="page-description">管理您收藏的文章和资源</p>
    </div>

    <div class="favorites-content">
      <!-- 收藏标签页 -->
      <el-tabs v-model="activeTab" class="favorites-tabs">
        <!-- 收藏的文章 -->
        <el-tab-pane label="收藏文章" name="articles">
          <div class="favorites-section">
            <div class="section-header">
              <h3>收藏的文章</h3>
              <div class="header-actions">
                <el-select v-model="sortBy" placeholder="排序方式" size="small" style="width: 120px; margin-right: 10px;">
                  <el-option label="收藏时间" value="time"></el-option>
                  <el-option label="发布时间" value="publish"></el-option>
                  <el-option label="阅读量" value="views"></el-option>
                </el-select>
                <el-button type="primary" size="small">批量管理</el-button>
              </div>
            </div>
            <div class="article-list">
              <div v-for="article in favoriteArticles" :key="article.id" class="article-item">
                <div class="article-cover">
                  <img v-if="article.cover" :src="article.cover" :alt="article.title" />
                  <div v-else class="no-cover">
                    <el-icon><Document /></el-icon>
                  </div>
                </div>
                <div class="article-info">
                  <h4 class="article-title" @click="viewArticle(article.id)">
                    {{ article.title }}
                  </h4>
                  <p class="article-summary">{{ article.summary }}</p>
                  <div class="article-meta">
                    <span class="author">
                      <el-icon><User /></el-icon>
                      {{ article.author }}
                    </span>
                    <span class="publish-time">
                      <el-icon><Clock /></el-icon>
                      {{ article.publishTime }}
                    </span>
                    <span class="views">
                      <el-icon><View /></el-icon>
                      {{ article.views }} 阅读
                    </span>
                    <span class="favorite-time">
                      <el-icon><Star /></el-icon>
                      收藏于 {{ article.favoriteTime }}
                    </span>
                  </div>
                </div>
                <div class="article-actions">
                  <el-button type="text" @click="removeFavorite(article.id)">
                    取消收藏
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <!-- 收藏的资源 -->
        <el-tab-pane label="收藏资源" name="resources">
          <div class="favorites-section">
            <div class="section-header">
              <h3>收藏的资源</h3>
              <div class="header-actions">
                <el-select v-model="resourceType" placeholder="资源类型" size="small" style="width: 120px; margin-right: 10px;">
                  <el-option label="全部" value="all"></el-option>
                  <el-option label="代码" value="code"></el-option>
                  <el-option label="文档" value="doc"></el-option>
                  <el-option label="工具" value="tool"></el-option>
                </el-select>
                <el-button type="primary" size="small">批量管理</el-button>
              </div>
            </div>
            <div class="resource-list">
              <div v-for="resource in favoriteResources" :key="resource.id" class="resource-item">
                <div class="resource-icon">
                  <el-icon>
                    <component :is="getResourceIcon(resource.type)" />
                  </el-icon>
                </div>
                <div class="resource-info">
                  <h4 class="resource-name" @click="viewResource(resource.id)">
                    {{ resource.name }}
                  </h4>
                  <p class="resource-description">{{ resource.description }}</p>
                  <div class="resource-meta">
                    <span class="resource-type">{{ resource.type }}</span>
                    <span class="resource-size">{{ resource.size }}</span>
                    <span class="favorite-time">
                      <el-icon><Star /></el-icon>
                      收藏于 {{ resource.favoriteTime }}
                    </span>
                  </div>
                </div>
                <div class="resource-actions">
                  <el-button type="text" @click="downloadResource(resource.id)">
                    下载
                  </el-button>
                  <el-button type="text" @click="removeFavoriteResource(resource.id)">
                    取消收藏
                  </el-button>
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
import { ElMessage } from 'element-plus'

const router = useRouter()
const activeTab = ref('articles')
const sortBy = ref('time')
const resourceType = ref('all')

// 收藏的文章数据
const favoriteArticles = ref([
  {
    id: 1,
    title: 'Vue 3 Composition API 完全指南',
    summary: '深入理解 Vue 3 的 Composition API，包括 setup 函数、响应式 API、生命周期钩子等核心概念...',
    author: '张三',
    publishTime: '2024-01-15',
    views: 1250,
    favoriteTime: '2024-01-20',
    cover: ''
  },
  {
    id: 2,
    title: '前端性能优化最佳实践',
    summary: '从代码层面到工程化层面，全面介绍前端性能优化的各种方法和技巧...',
    author: '李四',
    publishTime: '2024-01-10',
    views: 890,
    favoriteTime: '2024-01-18',
    cover: ''
  }
])

// 收藏的资源数据
const favoriteResources = ref([
  {
    id: 1,
    name: 'Vue 3 项目模板',
    description: '基于 Vite + Vue 3 + TypeScript 的现代化项目模板',
    type: 'code',
    size: '2.5MB',
    favoriteTime: '2024-01-20'
  },
  {
    id: 2,
    name: '前端开发规范文档',
    description: '团队前端开发规范和最佳实践指南',
    type: 'doc',
    size: '1.2MB',
    favoriteTime: '2024-01-18'
  }
])

// 获取资源图标
const getResourceIcon = (type) => {
  const iconMap = {
    code: 'Document',
    doc: 'Document',
    tool: 'Tools',
    image: 'Picture'
  }
  return iconMap[type] || 'Document'
}

// 查看文章
const viewArticle = (articleId) => {
  router.push(`/article/${articleId}`)
}

// 查看资源
const viewResource = (resourceId) => {
  ElMessage.info('查看资源功能开发中...')
}

// 下载资源
const downloadResource = (resourceId) => {
  ElMessage.success('开始下载资源...')
}

// 取消收藏文章
const removeFavorite = (articleId) => {
  const index = favoriteArticles.value.findIndex(article => article.id === articleId)
  if (index > -1) {
    favoriteArticles.value.splice(index, 1)
    ElMessage.success('已取消收藏')
  }
}

// 取消收藏资源
const removeFavoriteResource = (resourceId) => {
  const index = favoriteResources.value.findIndex(resource => resource.id === resourceId)
  if (index > -1) {
    favoriteResources.value.splice(index, 1)
    ElMessage.success('已取消收藏')
  }
}

onMounted(() => {
  // 加载收藏数据
  console.log('加载收藏数据')
})
</script>

<style lang="scss" scoped>
.favorites-page {
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

.favorites-content {
  background: var(--bg-color-light);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
}

.favorites-tabs {
  :deep(.el-tabs__header) {
    margin-bottom: var(--spacing-lg);
  }

  :deep(.el-tabs__item) {
    font-size: var(--font-size-md);
    font-weight: 500;
  }
}

.favorites-section {
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

.article-list,
.resource-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.article-item,
.resource-item {
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

.resource-icon {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-color);
  border-radius: var(--border-radius);
  color: white;
  font-size: var(--font-size-lg);
}

.article-info,
.resource-info {
  flex: 1;
  min-width: 0;
}

.article-title,
.resource-name {
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

.article-summary,
.resource-description {
  font-size: var(--font-size-sm);
  color: var(--text-color-secondary);
  margin: 0 0 var(--spacing-sm) 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-meta,
.resource-meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.article-meta span,
.resource-meta span {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--text-color-secondary);

  .el-icon {
    font-size: var(--font-size-sm);
  }
}

.resource-type {
  background: var(--primary-color);
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: var(--font-size-xs);
}

.article-actions,
.resource-actions {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .favorites-page {
    padding: var(--spacing-md);
  }

  .article-item,
  .resource-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .article-cover {
    width: 100%;
    height: 200px;
  }

  .article-actions,
  .resource-actions {
    align-self: flex-end;
    flex-direction: row;
  }

  .article-meta,
  .resource-meta {
    flex-direction: column;
    gap: var(--spacing-sm);
  }
}
</style>
