<template>
  <div class="article-card" @click="$emit('click', article)">
    <div class="article-cover">
      <img :src="article.cover" :alt="article.title" />
      <div class="article-category">{{ article.category }}</div>
    </div>
    
    <div class="article-content">
      <h3 class="article-title">{{ article.title }}</h3>
      <p class="article-summary">{{ article.summary }}</p>
      
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
      
      <div class="article-meta">
        <div class="author-info">
          <el-avatar :src="article.author.avatar" :size="24">
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
      </div>
      
      <div class="article-time">
        {{ formatTime(article.createdAt) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'

defineProps({
  article: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])

const formatTime = (dateString) => {
  const date = new Date(dateString)
  return formatDistanceToNow(date, { 
    addSuffix: true, 
    locale: zhCN 
  })
}
</script>

<style lang="scss" scoped>
.article-card {
  background: var(--bg-color-light);
  border-radius: var(--border-radius-large);
  overflow: hidden;
  box-shadow: var(--box-shadow-light);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--box-shadow);
  }
}

.article-cover {
  position: relative;
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
}

.article-category {
  position: absolute;
  top: var(--spacing-sm);
  left: var(--spacing-sm);
  background: var(--primary-color);
  color: white;
  padding: 4px 8px;
  border-radius: var(--border-radius-small);
  font-size: var(--font-size-xs);
  font-weight: 500;
}

.article-content {
  padding: var(--spacing-lg);
}

.article-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: var(--spacing-sm);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-summary {
  color: var(--text-color-secondary);
  font-size: var(--font-size-sm);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
}

.tag {
  font-size: var(--font-size-xs);
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.article-time {
  font-size: var(--font-size-xs);
  color: var(--text-color-secondary);
}

@media (max-width: 768px) {
  .article-cover {
    height: 150px;
  }
  
  .article-content {
    padding: var(--spacing-md);
  }
  
  .article-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }
  
  .article-stats {
    align-self: flex-end;
  }
}
</style>
