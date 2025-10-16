<template>
  <div class="subscribe-page">
    <div class="page-header">
      <h1 class="page-title">我的订阅</h1>
      <p class="page-description">管理您订阅的博客、作者和话题</p>
    </div>

    <div class="subscribe-content">
      <!-- 订阅标签页 -->
      <el-tabs v-model="activeTab" class="subscribe-tabs">
        <!-- 订阅的博客 -->
        <el-tab-pane label="订阅博客" name="blogs">
          <div class="subscribe-section">
            <div class="section-header">
              <h3>订阅的博客</h3>
              <el-button type="primary" size="small">管理订阅</el-button>
            </div>
            <div class="blog-list">
              <div v-for="blog in subscribedBlogs" :key="blog.id" class="blog-item">
                <div class="blog-avatar">
                  <el-avatar :src="blog.avatar" :size="50">
                    {{ blog.name.charAt(0) }}
                  </el-avatar>
                </div>
                <div class="blog-info">
                  <h4 class="blog-name">{{ blog.name }}</h4>
                  <p class="blog-description">{{ blog.description }}</p>
                  <div class="blog-stats">
                    <span class="stat-item">
                      <el-icon><Document /></el-icon>
                      {{ blog.articleCount }} 篇文章
                    </span>
                    <span class="stat-item">
                      <el-icon><User /></el-icon>
                      {{ blog.followerCount }} 关注者
                    </span>
                  </div>
                </div>
                <div class="blog-actions">
                  <el-button type="text" @click="unsubscribeBlog(blog.id)">
                    取消订阅
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <!-- 订阅的作者 -->
        <el-tab-pane label="关注作者" name="authors">
          <div class="subscribe-section">
            <div class="section-header">
              <h3>关注的作者</h3>
              <el-button type="primary" size="small">管理关注</el-button>
            </div>
            <div class="author-list">
              <div v-for="author in subscribedAuthors" :key="author.id" class="author-item">
                <div class="author-avatar">
                  <el-avatar :src="author.avatar" :size="50">
                    {{ author.nickname.charAt(0) }}
                  </el-avatar>
                </div>
                <div class="author-info">
                  <h4 class="author-name">{{ author.nickname }}</h4>
                  <p class="author-title">{{ author.title }}</p>
                  <div class="author-stats">
                    <span class="stat-item">
                      <el-icon><Document /></el-icon>
                      {{ author.articleCount }} 篇文章
                    </span>
                    <span class="stat-item">
                      <el-icon><Star /></el-icon>
                      {{ author.likeCount }} 获赞
                    </span>
                  </div>
                </div>
                <div class="author-actions">
                  <el-button type="text" @click="unfollowAuthor(author.id)">
                    取消关注
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <!-- 订阅的话题 -->
        <el-tab-pane label="订阅话题" name="topics">
          <div class="subscribe-section">
            <div class="section-header">
              <h3>订阅的话题</h3>
              <el-button type="primary" size="small">管理订阅</el-button>
            </div>
            <div class="topic-list">
              <div v-for="topic in subscribedTopics" :key="topic.id" class="topic-item">
                <div class="topic-icon">
                  <el-icon><Collection /></el-icon>
                </div>
                <div class="topic-info">
                  <h4 class="topic-name">{{ topic.name }}</h4>
                  <p class="topic-description">{{ topic.description }}</p>
                  <div class="topic-stats">
                    <span class="stat-item">
                      <el-icon><Document /></el-icon>
                      {{ topic.articleCount }} 篇文章
                    </span>
                    <span class="stat-item">
                      <el-icon><User /></el-icon>
                      {{ topic.followerCount }} 关注者
                    </span>
                  </div>
                </div>
                <div class="topic-actions">
                  <el-button type="text" @click="unsubscribeTopic(topic.id)">
                    取消订阅
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
import { ElMessage } from 'element-plus'

const activeTab = ref('blogs')

// 订阅的博客数据
const subscribedBlogs = ref([
  {
    id: 1,
    name: 'Vue.js 官方博客',
    description: 'Vue.js 官方技术博客，分享最新的 Vue 技术动态和最佳实践',
    avatar: '',
    articleCount: 156,
    followerCount: 12500
  },
  {
    id: 2,
    name: '前端技术分享',
    description: '专注于前端技术分享，包括 React、Vue、Angular 等框架',
    avatar: '',
    articleCount: 89,
    followerCount: 8900
  }
])

// 关注的作者数据
const subscribedAuthors = ref([
  {
    id: 1,
    nickname: '张三',
    title: '前端架构师',
    avatar: '',
    articleCount: 45,
    likeCount: 1200
  },
  {
    id: 2,
    nickname: '李四',
    title: 'Vue.js 专家',
    avatar: '',
    articleCount: 78,
    likeCount: 2100
  }
])

// 订阅的话题数据
const subscribedTopics = ref([
  {
    id: 1,
    name: 'Vue.js',
    description: 'Vue.js 相关技术讨论和分享',
    articleCount: 1250,
    followerCount: 15600
  },
  {
    id: 2,
    name: '前端开发',
    description: '前端开发技术交流',
    articleCount: 890,
    followerCount: 12300
  }
])

// 取消订阅博客
const unsubscribeBlog = (blogId) => {
  const index = subscribedBlogs.value.findIndex(blog => blog.id === blogId)
  if (index > -1) {
    subscribedBlogs.value.splice(index, 1)
    ElMessage.success('已取消订阅')
  }
}

// 取消关注作者
const unfollowAuthor = (authorId) => {
  const index = subscribedAuthors.value.findIndex(author => author.id === authorId)
  if (index > -1) {
    subscribedAuthors.value.splice(index, 1)
    ElMessage.success('已取消关注')
  }
}

// 取消订阅话题
const unsubscribeTopic = (topicId) => {
  const index = subscribedTopics.value.findIndex(topic => topic.id === topicId)
  if (index > -1) {
    subscribedTopics.value.splice(index, 1)
    ElMessage.success('已取消订阅')
  }
}

onMounted(() => {
  // 加载订阅数据
  console.log('加载订阅数据')
})
</script>

<style lang="scss" scoped>
.subscribe-page {
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

.subscribe-content {
  background: var(--bg-color-light);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
}

.subscribe-tabs {
  :deep(.el-tabs__header) {
    margin-bottom: var(--spacing-lg);
  }

  :deep(.el-tabs__item) {
    font-size: var(--font-size-md);
    font-weight: 500;
  }
}

.subscribe-section {
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
  }
}

.blog-list,
.author-list,
.topic-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.blog-item,
.author-item,
.topic-item {
  display: flex;
  align-items: center;
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

.blog-avatar,
.author-avatar {
  flex-shrink: 0;
}

.topic-icon {
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

.blog-info,
.author-info,
.topic-info {
  flex: 1;
  min-width: 0;
}

.blog-name,
.author-name,
.topic-name {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 var(--spacing-xs) 0;
}

.blog-description,
.author-title,
.topic-description {
  font-size: var(--font-size-sm);
  color: var(--text-color-secondary);
  margin: 0 0 var(--spacing-sm) 0;
  line-height: 1.4;
}

.blog-stats,
.author-stats,
.topic-stats {
  display: flex;
  gap: var(--spacing-md);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--text-color-secondary);

  .el-icon {
    font-size: var(--font-size-sm);
  }
}

.blog-actions,
.author-actions,
.topic-actions {
  flex-shrink: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .subscribe-page {
    padding: var(--spacing-md);
  }

  .blog-item,
  .author-item,
  .topic-item {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }

  .blog-actions,
  .author-actions,
  .topic-actions {
    align-self: flex-end;
  }

  .blog-stats,
  .author-stats,
  .topic-stats {
    flex-wrap: wrap;
    gap: var(--spacing-sm);
  }
}
</style>
