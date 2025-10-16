<template>
  <div class="article-detail">
    <div v-if="loading" class="loading-container">
      <el-skeleton :rows="10" animated />
    </div>
    
    <div v-else-if="article" class="article-content">
      <!-- 文章头部 -->
      <header class="article-header">
        <div class="article-meta">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>
              <router-link to="/home">首页</router-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
              <router-link to="/articles">文章</router-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item>{{ article.category }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        
        <h1 class="article-title">{{ article.title }}</h1>
        
        <div class="article-info">
          <div class="author-section">
            <el-avatar :src="article.author.avatar" :size="40">
              {{ article.author.nickname.charAt(0) }}
            </el-avatar>
            <div class="author-details">
              <div class="author-name">{{ article.author.nickname }}</div>
              <div class="publish-time">{{ formatTime(article.createdAt) }}</div>
            </div>
          </div>
          
          <div class="article-stats">
            <span class="stat-item">
              <el-icon><View /></el-icon>
              {{ article.views }} 阅读
            </span>
            <span class="stat-item">
              <el-icon><Star /></el-icon>
              {{ article.likes }} 点赞
            </span>
            <span class="stat-item">
              <el-icon><ChatDotRound /></el-icon>
              {{ article.comments }} 评论
            </span>
          </div>
        </div>
        
        <div class="article-tags">
          <el-tag
            v-for="tag in article.tags"
            :key="tag"
            class="tag"
          >
            {{ tag }}
          </el-tag>
        </div>
      </header>

      <!-- 文章封面 -->
      <div v-if="article.cover" class="article-cover">
        <img :src="article.cover" :alt="article.title" />
      </div>

      <!-- 文章正文 -->
      <div class="article-body">
        <div class="markdown-content" v-html="renderedContent"></div>
      </div>

      <!-- 文章操作 -->
      <div class="article-actions">
        <el-button type="primary" @click="handleLike">
          <el-icon><Star /></el-icon>
          点赞 {{ article.likes }}
        </el-button>
        <el-button @click="handleShare">
          <el-icon><Share /></el-icon>
          分享
        </el-button>
        <el-button @click="handleCollect">
          <el-icon><Collection /></el-icon>
          收藏
        </el-button>
      </div>

      <!-- 相关文章 -->
      <div class="related-articles">
        <h3 class="section-title">相关文章</h3>
        <div class="related-list">
          <div
            v-for="relatedArticle in relatedArticles"
            :key="relatedArticle.id"
            class="related-item"
            @click="handleRelatedClick(relatedArticle)"
          >
            <img :src="relatedArticle.cover" :alt="relatedArticle.title" />
            <div class="related-content">
              <h4 class="related-title">{{ relatedArticle.title }}</h4>
              <div class="related-meta">
                <span>{{ relatedArticle.views }} 阅读</span>
                <span>{{ formatTime(relatedArticle.createdAt) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 评论区 -->
      <div class="comments-section">
        <h3 class="section-title">评论 ({{ article.comments }})</h3>
        
        <div class="comment-form">
          <el-input
            v-model="commentText"
            type="textarea"
            :rows="4"
            placeholder="写下你的评论..."
            maxlength="500"
            show-word-limit
          />
          <div class="comment-actions">
            <el-button type="primary" @click="handleSubmitComment">
              发表评论
            </el-button>
          </div>
        </div>
        
        <div class="comments-list">
          <div
            v-for="comment in comments"
            :key="comment.id"
            class="comment-item"
          >
            <el-avatar :src="comment.author.avatar" :size="32">
              {{ comment.author.nickname.charAt(0) }}
            </el-avatar>
            <div class="comment-content">
              <div class="comment-header">
                <span class="comment-author">{{ comment.author.nickname }}</span>
                <span class="comment-time">{{ formatTime(comment.createdAt) }}</span>
              </div>
              <div class="comment-text">{{ comment.content }}</div>
              <div class="comment-actions">
                <el-button type="text" size="small">回复</el-button>
                <el-button type="text" size="small">点赞</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="error-container">
      <el-result
        icon="error"
        title="文章不存在"
        sub-title="抱歉，您访问的文章不存在或已被删除"
      >
        <template #extra>
          <el-button type="primary" @click="$router.push('/home')">
            返回首页
          </el-button>
        </template>
      </el-result>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useArticlesStore } from '@/stores/articles'
import { ElMessage } from 'element-plus'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'

const route = useRoute()
const router = useRouter()
const articlesStore = useArticlesStore()

const article = ref(null)
const loading = ref(false)
const commentText = ref('')
const comments = ref([])
const relatedArticles = ref([])

const renderedContent = computed(() => {
  if (!article.value) return ''
  // 简单的 markdown 渲染，实际项目中可以使用 marked 等库
  return article.value.content
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/\n/gim, '<br>')
})

onMounted(async () => {
  await loadArticle()
  await loadRelatedArticles()
  await loadComments()
})

const loadArticle = async () => {
  loading.value = true
  try {
    const result = await articlesStore.fetchArticleDetail(route.params.id)
    if (result.success) {
      article.value = result.data
    }
  } finally {
    loading.value = false
  }
}

const loadRelatedArticles = async () => {
  const result = await articlesStore.fetchArticles()
  if (result.success) {
    relatedArticles.value = result.data
      .filter(a => a.id !== article.value?.id)
      .slice(0, 4)
  }
}

const loadComments = () => {
  // 模拟评论数据
  comments.value = [
    {
      id: 1,
      content: '这篇文章写得很好，学到了很多！',
      author: {
        nickname: '用户1',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      },
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 2,
      content: '感谢分享，期待更多这样的好文章。',
      author: {
        nickname: '用户2',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      },
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
    }
  ]
}

const formatTime = (dateString) => {
  const date = new Date(dateString)
  return formatDistanceToNow(date, { 
    addSuffix: true, 
    locale: zhCN 
  })
}

const handleLike = () => {
  ElMessage.success('点赞成功！')
  article.value.likes++
}

const handleShare = () => {
  ElMessage.info('分享功能开发中...')
}

const handleCollect = () => {
  ElMessage.success('收藏成功！')
}

const handleRelatedClick = (relatedArticle) => {
  router.push({
    name: 'ArticleDetail',
    params: { id: relatedArticle.id }
  })
}

const handleSubmitComment = () => {
  if (!commentText.value.trim()) {
    ElMessage.warning('请输入评论内容')
    return
  }
  
  const newComment = {
    id: Date.now(),
    content: commentText.value,
    author: {
      nickname: '当前用户',
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    },
    createdAt: new Date().toISOString()
  }
  
  comments.value.unshift(newComment)
  commentText.value = ''
  article.value.comments++
  ElMessage.success('评论发表成功！')
}
</script>

<style lang="scss" scoped>
.article-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-lg);
}

.loading-container {
  background: var(--bg-color-light);
  border-radius: var(--border-radius-large);
  padding: var(--spacing-xl);
}

.article-content {
  background: var(--bg-color-light);
  border-radius: var(--border-radius-large);
  overflow: hidden;
  box-shadow: var(--box-shadow);
}

.article-header {
  padding: var(--spacing-xl);
  border-bottom: 1px solid var(--border-color-light);
}

.article-meta {
  margin-bottom: var(--spacing-md);
}

.article-title {
  font-size: var(--font-size-xxl);
  font-weight: 600;
  color: var(--text-color);
  line-height: 1.4;
  margin-bottom: var(--spacing-lg);
}

.article-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.author-section {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.author-details {
  .author-name {
    font-weight: 500;
    color: var(--text-color);
    margin-bottom: 2px;
  }
  
  .publish-time {
    font-size: var(--font-size-sm);
    color: var(--text-color-secondary);
  }
}

.article-stats {
  display: flex;
  gap: var(--spacing-lg);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--text-color-secondary);
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.tag {
  font-size: var(--font-size-sm);
}

.article-cover {
  width: 100%;
  height: 300px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.article-body {
  padding: var(--spacing-xl);
}

.markdown-content {
  line-height: 1.8;
  color: var(--text-color);
  
  :deep(h1), :deep(h2), :deep(h3) {
    margin: var(--spacing-lg) 0 var(--spacing-md);
    color: var(--text-color);
  }
  
  :deep(p) {
    margin-bottom: var(--spacing-md);
  }
  
  :deep(strong) {
    font-weight: 600;
  }
  
  :deep(em) {
    font-style: italic;
  }
}

.article-actions {
  padding: var(--spacing-lg) var(--spacing-xl);
  border-top: 1px solid var(--border-color-light);
  display: flex;
  gap: var(--spacing-md);
}

.related-articles {
  padding: var(--spacing-xl);
  border-top: 1px solid var(--border-color-light);
}

.section-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: var(--spacing-lg);
}

.related-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-md);
}

.related-item {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  border: 1px solid var(--border-color-light);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: var(--box-shadow-light);
  }
  
  img {
    width: 80px;
    height: 60px;
    object-fit: cover;
    border-radius: var(--border-radius-small);
  }
}

.related-content {
  flex: 1;
}

.related-title {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: var(--spacing-xs);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-meta {
  display: flex;
  gap: var(--spacing-md);
  font-size: var(--font-size-xs);
  color: var(--text-color-secondary);
}

.comments-section {
  padding: var(--spacing-xl);
  border-top: 1px solid var(--border-color-light);
}

.comment-form {
  margin-bottom: var(--spacing-xl);
}

.comment-actions {
  margin-top: var(--spacing-md);
  text-align: right;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.comment-item {
  display: flex;
  gap: var(--spacing-md);
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xs);
}

.comment-author {
  font-weight: 500;
  color: var(--text-color);
}

.comment-time {
  font-size: var(--font-size-sm);
  color: var(--text-color-secondary);
}

.comment-text {
  color: var(--text-color);
  line-height: 1.6;
  margin-bottom: var(--spacing-sm);
}

.comment-actions {
  display: flex;
  gap: var(--spacing-md);
}

.error-container {
  padding: var(--spacing-xl);
  background: var(--bg-color-light);
  border-radius: var(--border-radius-large);
}

@media (max-width: 768px) {
  .article-detail {
    padding: var(--spacing-sm);
  }
  
  .article-header {
    padding: var(--spacing-lg);
  }
  
  .article-info {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-md);
  }
  
  .article-stats {
    align-self: flex-end;
  }
  
  .article-body {
    padding: var(--spacing-lg);
  }
  
  .related-list {
    grid-template-columns: 1fr;
  }
  
  .related-item {
    flex-direction: column;
  }
  
  .related-item img {
    width: 100%;
    height: 120px;
  }
}
</style>
