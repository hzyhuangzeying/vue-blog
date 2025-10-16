<template>
  <div class="create-page">
    <div class="page-header">
      <h1 class="page-title">创作中心</h1>
      <p class="page-description">管理您的创作内容和数据统计</p>
    </div>

    <div class="create-content">
      <!-- 创作统计 -->
      <div class="creation-stats">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">
              <el-icon><Document /></el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ stats.totalArticles }}</div>
              <div class="stat-label">总文章数</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <el-icon><View /></el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ stats.totalViews }}</div>
              <div class="stat-label">总阅读量</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <el-icon><Star /></el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ stats.totalLikes }}</div>
              <div class="stat-label">总获赞数</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <el-icon><User /></el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ stats.totalFollowers }}</div>
              <div class="stat-label">总粉丝数</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 创作工具 -->
      <div class="creation-tools">
        <h3>创作工具</h3>
        <div class="tools-grid">
          <div class="tool-card" @click="createArticle">
            <div class="tool-icon">
              <el-icon><Edit /></el-icon>
            </div>
            <h4>写文章</h4>
            <p>创建新的技术文章</p>
          </div>
          <div class="tool-card" @click="createSeries">
            <div class="tool-icon">
              <el-icon><Collection /></el-icon>
            </div>
            <h4>创建专栏</h4>
            <p>创建文章系列专栏</p>
          </div>
          <div class="tool-card" @click="uploadResource">
            <div class="tool-icon">
              <el-icon><Upload /></el-icon>
            </div>
            <h4>上传资源</h4>
            <p>分享代码和文档资源</p>
          </div>
          <div class="tool-card" @click="createTopic">
            <div class="tool-icon">
              <el-icon><ChatDotRound /></el-icon>
            </div>
            <h4>发起话题</h4>
            <p>创建技术讨论话题</p>
          </div>
        </div>
      </div>

      <!-- 内容管理 -->
      <div class="content-management">
        <h3>内容管理</h3>
        <el-tabs v-model="activeTab" class="content-tabs">
          <!-- 我的文章 -->
          <el-tab-pane label="我的文章" name="articles">
            <div class="content-section">
              <div class="section-header">
                <div class="header-actions">
                  <el-input
                    v-model="searchKeyword"
                    placeholder="搜索文章"
                    size="small"
                    style="width: 200px; margin-right: 10px;"
                  >
                    <template #prefix>
                      <el-icon><Search /></el-icon>
                    </template>
                  </el-input>
                  <el-select v-model="statusFilter" placeholder="状态筛选" size="small" style="width: 120px; margin-right: 10px;">
                    <el-option label="全部" value="all"></el-option>
                    <el-option label="已发布" value="published"></el-option>
                    <el-option label="草稿" value="draft"></el-option>
                    <el-option label="审核中" value="reviewing"></el-option>
                  </el-select>
                  <el-button type="primary" size="small" @click="createArticle">写文章</el-button>
                </div>
              </div>
              <div class="article-list">
                <div v-for="article in myArticles" :key="article.id" class="article-item">
                  <div class="article-cover">
                    <img v-if="article.cover" :src="article.cover" :alt="article.title" />
                    <div v-else class="no-cover">
                      <el-icon><Document /></el-icon>
                    </div>
                  </div>
                  <div class="article-info">
                    <h4 class="article-title" @click="editArticle(article.id)">
                      {{ article.title }}
                    </h4>
                    <p class="article-summary">{{ article.summary }}</p>
                    <div class="article-meta">
                      <span class="status" :class="article.status">
                        {{ getStatusText(article.status) }}
                      </span>
                      <span class="publish-time">{{ article.publishTime }}</span>
                      <span class="views">{{ article.views }} 阅读</span>
                      <span class="likes">{{ article.likes }} 赞</span>
                    </div>
                  </div>
                  <div class="article-actions">
                    <el-button type="text" @click="editArticle(article.id)">编辑</el-button>
                    <el-button type="text" @click="viewArticle(article.id)">查看</el-button>
                    <el-button type="text" @click="deleteArticle(article.id)">删除</el-button>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>

          <!-- 我的专栏 -->
          <el-tab-pane label="我的专栏" name="series">
            <div class="content-section">
              <div class="section-header">
                <div class="header-actions">
                  <el-button type="primary" size="small" @click="createSeries">创建专栏</el-button>
                </div>
              </div>
              <div class="series-list">
                <div v-for="series in mySeries" :key="series.id" class="series-item">
                  <div class="series-cover">
                    <img v-if="series.cover" :src="series.cover" :alt="series.title" />
                    <div v-else class="no-cover">
                      <el-icon><Collection /></el-icon>
                    </div>
                  </div>
                  <div class="series-info">
                    <h4 class="series-title" @click="editSeries(series.id)">
                      {{ series.title }}
                    </h4>
                    <p class="series-description">{{ series.description }}</p>
                    <div class="series-meta">
                      <span class="article-count">{{ series.articleCount }} 篇文章</span>
                      <span class="follower-count">{{ series.followerCount }} 关注者</span>
                      <span class="create-time">{{ series.createTime }}</span>
                    </div>
                  </div>
                  <div class="series-actions">
                    <el-button type="text" @click="editSeries(series.id)">编辑</el-button>
                    <el-button type="text" @click="viewSeries(series.id)">查看</el-button>
                    <el-button type="text" @click="deleteSeries(series.id)">删除</el-button>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>

          <!-- 我的资源 -->
          <el-tab-pane label="我的资源" name="resources">
            <div class="content-section">
              <div class="section-header">
                <div class="header-actions">
                  <el-button type="primary" size="small" @click="uploadResource">上传资源</el-button>
                </div>
              </div>
              <div class="resource-list">
                <div v-for="resource in myResources" :key="resource.id" class="resource-item">
                  <div class="resource-icon">
                    <el-icon>
                      <component :is="getResourceIcon(resource.type)" />
                    </el-icon>
                  </div>
                  <div class="resource-info">
                    <h4 class="resource-name" @click="editResource(resource.id)">
                      {{ resource.name }}
                    </h4>
                    <p class="resource-description">{{ resource.description }}</p>
                    <div class="resource-meta">
                      <span class="resource-type">{{ resource.type }}</span>
                      <span class="resource-size">{{ resource.size }}</span>
                      <span class="download-count">{{ resource.downloadCount }} 下载</span>
                      <span class="upload-time">{{ resource.uploadTime }}</span>
                    </div>
                  </div>
                  <div class="resource-actions">
                    <el-button type="text" @click="editResource(resource.id)">编辑</el-button>
                    <el-button type="text" @click="viewResource(resource.id)">查看</el-button>
                    <el-button type="text" @click="deleteResource(resource.id)">删除</el-button>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const activeTab = ref('articles')
const searchKeyword = ref('')
const statusFilter = ref('all')

// 统计数据
const stats = ref({
  totalArticles: 25,
  totalViews: 12500,
  totalLikes: 890,
  totalFollowers: 156
})

// 我的文章数据
const myArticles = ref([
  {
    id: 1,
    title: 'Vue 3 Composition API 完全指南',
    summary: '深入理解 Vue 3 的 Composition API，包括 setup 函数、响应式 API、生命周期钩子等核心概念...',
    status: 'published',
    publishTime: '2024-01-15',
    views: 1250,
    likes: 89,
    cover: ''
  },
  {
    id: 2,
    title: '前端性能优化最佳实践',
    summary: '从代码层面到工程化层面，全面介绍前端性能优化的各种方法和技巧...',
    status: 'draft',
    publishTime: '2024-01-10',
    views: 0,
    likes: 0,
    cover: ''
  }
])

// 我的专栏数据
const mySeries = ref([
  {
    id: 1,
    title: 'Vue.js 从入门到精通',
    description: '系统学习 Vue.js 框架，从基础语法到高级特性',
    articleCount: 12,
    followerCount: 156,
    createTime: '2024-01-01',
    cover: ''
  }
])

// 我的资源数据
const myResources = ref([
  {
    id: 1,
    name: 'Vue 3 项目模板',
    description: '基于 Vite + Vue 3 + TypeScript 的现代化项目模板',
    type: 'code',
    size: '2.5MB',
    downloadCount: 45,
    uploadTime: '2024-01-20'
  }
])

// 获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    published: '已发布',
    draft: '草稿',
    reviewing: '审核中'
  }
  return statusMap[status] || '未知'
}

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

// 创作工具操作
const createArticle = () => {
  router.push('/write')
}

const createSeries = () => {
  ElMessage.info('创建专栏功能开发中...')
}

const uploadResource = () => {
  ElMessage.info('上传资源功能开发中...')
}

const createTopic = () => {
  ElMessage.info('发起话题功能开发中...')
}

// 文章操作
const editArticle = (articleId) => {
  router.push(`/write?id=${articleId}`)
}

const viewArticle = (articleId) => {
  router.push(`/article/${articleId}`)
}

const deleteArticle = (articleId) => {
  const index = myArticles.value.findIndex(article => article.id === articleId)
  if (index > -1) {
    myArticles.value.splice(index, 1)
    ElMessage.success('已删除文章')
  }
}

// 专栏操作
const editSeries = (seriesId) => {
  ElMessage.info('编辑专栏功能开发中...')
}

const viewSeries = (seriesId) => {
  ElMessage.info('查看专栏功能开发中...')
}

const deleteSeries = (seriesId) => {
  const index = mySeries.value.findIndex(series => series.id === seriesId)
  if (index > -1) {
    mySeries.value.splice(index, 1)
    ElMessage.success('已删除专栏')
  }
}

// 资源操作
const editResource = (resourceId) => {
  ElMessage.info('编辑资源功能开发中...')
}

const viewResource = (resourceId) => {
  ElMessage.info('查看资源功能开发中...')
}

const deleteResource = (resourceId) => {
  const index = myResources.value.findIndex(resource => resource.id === resourceId)
  if (index > -1) {
    myResources.value.splice(index, 1)
    ElMessage.success('已删除资源')
  }
}

onMounted(() => {
  // 加载创作数据
  console.log('加载创作数据')
})
</script>

<style lang="scss" scoped>
.create-page {
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

.create-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

/* 创作统计 */
.creation-stats {
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
    background: var(--bg-color-light);
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
}

/* 创作工具 */
.creation-tools {
  h3 {
    font-size: var(--font-size-xl);
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: var(--spacing-lg);
  }

  .tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-lg);
  }

  .tool-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: var(--spacing-xl);
    background: var(--bg-color-light);
    border-radius: var(--border-radius-lg);
    border: 1px solid var(--border-color-light);
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      border-color: var(--primary-color);
      box-shadow: var(--box-shadow-light);
      transform: translateY(-2px);
    }
  }

  .tool-icon {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary-color);
    border-radius: 50%;
    color: white;
    font-size: var(--font-size-xl);
    margin-bottom: var(--spacing-md);
  }

  h4 {
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--text-color);
    margin: 0 0 var(--spacing-sm) 0;
  }

  p {
    font-size: var(--font-size-sm);
    color: var(--text-color-secondary);
    margin: 0;
    line-height: 1.4;
  }
}

/* 内容管理 */
.content-management {
  h3 {
    font-size: var(--font-size-xl);
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: var(--spacing-lg);
  }

  .content-tabs {
    :deep(.el-tabs__header) {
      margin-bottom: var(--spacing-lg);
    }

    :deep(.el-tabs__item) {
      font-size: var(--font-size-md);
      font-weight: 500;
    }
  }

  .content-section {
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-lg);

      .header-actions {
        display: flex;
        align-items: center;
      }
    }
  }
}

.article-list,
.series-list,
.resource-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.article-item,
.series-item,
.resource-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--bg-color-light);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color-light);
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--primary-color);
    box-shadow: var(--box-shadow-light);
  }
}

.article-cover,
.series-cover {
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
    background: var(--bg-color);
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
.series-info,
.resource-info {
  flex: 1;
  min-width: 0;
}

.article-title,
.series-title,
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
.series-description,
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
.series-meta,
.resource-meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.article-meta span,
.series-meta span,
.resource-meta span {
  font-size: var(--font-size-sm);
  color: var(--text-color-secondary);
}

.status {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: var(--font-size-xs);
  font-weight: 500;

  &.published {
    background: var(--success-color);
    color: white;
  }

  &.draft {
    background: var(--warning-color);
    color: white;
  }

  &.reviewing {
    background: var(--info-color);
    color: white;
  }
}

.article-actions,
.series-actions,
.resource-actions {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .create-page {
    padding: var(--spacing-md);
  }

  .stats-grid,
  .tools-grid {
    grid-template-columns: 1fr;
  }

  .article-item,
  .series-item,
  .resource-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .article-cover,
  .series-cover {
    width: 100%;
    height: 200px;
  }

  .article-actions,
  .series-actions,
  .resource-actions {
    align-self: flex-end;
    flex-direction: row;
  }

  .article-meta,
  .series-meta,
  .resource-meta {
    flex-direction: column;
    gap: var(--spacing-sm);
  }
}
</style>
