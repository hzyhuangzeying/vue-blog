<template>
  <div class="following-page">
    <div class="page-header">
      <h1 class="page-title">我的关注</h1>
      <p class="page-description">管理您关注的作者和用户</p>
    </div>

    <div class="following-content">
      <!-- 关注标签页 -->
      <el-tabs v-model="activeTab" class="following-tabs">
        <!-- 关注的作者 -->
        <el-tab-pane label="关注作者" name="authors">
          <div class="following-section">
            <div class="section-header">
              <h3>关注的作者</h3>
              <div class="header-actions">
                <el-input
                  v-model="searchKeyword"
                  placeholder="搜索作者"
                  size="small"
                  style="width: 200px; margin-right: 10px;"
                  @input="searchAuthors"
                >
                  <template #prefix>
                    <el-icon><Search /></el-icon>
                  </template>
                </el-input>
                <el-button type="primary" size="small">发现作者</el-button>
              </div>
            </div>
            <div class="author-list">
              <div v-for="author in followingAuthors" :key="author.id" class="author-item">
                <div class="author-avatar">
                  <el-avatar :src="author.avatar" :size="60">
                    {{ author.nickname.charAt(0) }}
                  </el-avatar>
                </div>
                <div class="author-info">
                  <h4 class="author-name">{{ author.nickname }}</h4>
                  <p class="author-title">{{ author.title }}</p>
                  <p class="author-description">{{ author.description }}</p>
                  <div class="author-stats">
                    <span class="stat-item">
                      <el-icon><Document /></el-icon>
                      {{ author.articleCount }} 篇文章
                    </span>
                    <span class="stat-item">
                      <el-icon><Star /></el-icon>
                      {{ author.likeCount }} 获赞
                    </span>
                    <span class="stat-item">
                      <el-icon><User /></el-icon>
                      {{ author.followerCount }} 关注者
                    </span>
                  </div>
                </div>
                <div class="author-actions">
                  <el-button type="primary" size="small" @click="unfollowAuthor(author.id)">
                    取消关注
                  </el-button>
                  <el-button type="text" @click="viewAuthorProfile(author.id)">
                    查看主页
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <!-- 关注的用户 -->
        <el-tab-pane label="关注用户" name="users">
          <div class="following-section">
            <div class="section-header">
              <h3>关注的用户</h3>
              <div class="header-actions">
                <el-input
                  v-model="searchKeyword"
                  placeholder="搜索用户"
                  size="small"
                  style="width: 200px; margin-right: 10px;"
                  @input="searchUsers"
                >
                  <template #prefix>
                    <el-icon><Search /></el-icon>
                  </template>
                </el-input>
                <el-button type="primary" size="small">发现用户</el-button>
              </div>
            </div>
            <div class="user-list">
              <div v-for="user in followingUsers" :key="user.id" class="user-item">
                <div class="user-avatar">
                  <el-avatar :src="user.avatar" :size="50">
                    {{ user.nickname.charAt(0) }}
                  </el-avatar>
                </div>
                <div class="user-info">
                  <h4 class="user-name">{{ user.nickname }}</h4>
                  <p class="user-signature">{{ user.signature }}</p>
                  <div class="user-stats">
                    <span class="stat-item">
                      <el-icon><Document /></el-icon>
                      {{ user.articleCount }} 篇文章
                    </span>
                    <span class="stat-item">
                      <el-icon><Star /></el-icon>
                      {{ user.likeCount }} 获赞
                    </span>
                  </div>
                </div>
                <div class="user-actions">
                  <el-button type="primary" size="small" @click="unfollowUser(user.id)">
                    取消关注
                  </el-button>
                  <el-button type="text" @click="viewUserProfile(user.id)">
                    查看主页
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <!-- 关注统计 -->
        <el-tab-pane label="关注统计" name="stats">
          <div class="following-section">
            <div class="section-header">
              <h3>关注统计</h3>
            </div>
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-icon">
                  <el-icon><User /></el-icon>
                </div>
                <div class="stat-content">
                  <div class="stat-number">{{ totalFollowing }}</div>
                  <div class="stat-label">总关注数</div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">
                  <el-icon><UserFilled /></el-icon>
                </div>
                <div class="stat-content">
                  <div class="stat-number">{{ totalFollowers }}</div>
                  <div class="stat-label">总粉丝数</div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">
                  <el-icon><Document /></el-icon>
                </div>
                <div class="stat-content">
                  <div class="stat-number">{{ totalArticles }}</div>
                  <div class="stat-label">关注作者文章总数</div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">
                  <el-icon><Calendar /></el-icon>
                </div>
                <div class="stat-content">
                  <div class="stat-number">{{ activeAuthors }}</div>
                  <div class="stat-label">活跃作者数</div>
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
const activeTab = ref('authors')
const searchKeyword = ref('')

// 关注的作者数据
const followingAuthors = ref([
  {
    id: 1,
    nickname: '张三',
    title: '前端架构师',
    description: '专注于前端技术分享，Vue.js 专家，拥有丰富的项目经验',
    avatar: '',
    articleCount: 45,
    likeCount: 1200,
    followerCount: 890
  },
  {
    id: 2,
    nickname: '李四',
    title: 'Vue.js 专家',
    description: 'Vue.js 核心团队成员，开源项目贡献者',
    avatar: '',
    articleCount: 78,
    likeCount: 2100,
    followerCount: 1200
  },
  {
    id: 3,
    nickname: '王五',
    title: '全栈工程师',
    description: '前后端全栈开发，技术博客作者',
    avatar: '',
    articleCount: 32,
    likeCount: 890,
    followerCount: 650
  }
])

// 关注的用户数据
const followingUsers = ref([
  {
    id: 1,
    nickname: '小明',
    signature: '热爱技术，喜欢分享',
    avatar: '',
    articleCount: 12,
    likeCount: 156
  },
  {
    id: 2,
    nickname: '小红',
    signature: '前端开发工程师',
    avatar: '',
    articleCount: 8,
    likeCount: 89
  }
])

// 统计数据
const totalFollowing = ref(5)
const totalFollowers = ref(156)
const totalArticles = ref(175)
const activeAuthors = ref(3)

// 搜索作者
const searchAuthors = () => {
  // 实现搜索逻辑
  console.log('搜索作者:', searchKeyword.value)
}

// 搜索用户
const searchUsers = () => {
  // 实现搜索逻辑
  console.log('搜索用户:', searchKeyword.value)
}

// 取消关注作者
const unfollowAuthor = (authorId) => {
  const index = followingAuthors.value.findIndex(author => author.id === authorId)
  if (index > -1) {
    followingAuthors.value.splice(index, 1)
    ElMessage.success('已取消关注')
  }
}

// 取消关注用户
const unfollowUser = (userId) => {
  const index = followingUsers.value.findIndex(user => user.id === userId)
  if (index > -1) {
    followingUsers.value.splice(index, 1)
    ElMessage.success('已取消关注')
  }
}

// 查看作者主页
const viewAuthorProfile = (authorId) => {
  router.push(`/profile/${authorId}`)
}

// 查看用户主页
const viewUserProfile = (userId) => {
  router.push(`/profile/${userId}`)
}

onMounted(() => {
  // 加载关注数据
  console.log('加载关注数据')
})
</script>

<style lang="scss" scoped>
.following-page {
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

.following-content {
  background: var(--bg-color-light);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
}

.following-tabs {
  :deep(.el-tabs__header) {
    margin-bottom: var(--spacing-lg);
  }

  :deep(.el-tabs__item) {
    font-size: var(--font-size-md);
    font-weight: 500;
  }
}

.following-section {
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

.author-list,
.user-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.author-item,
.user-item {
  display: flex;
  align-items: flex-start;
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

.author-avatar,
.user-avatar {
  flex-shrink: 0;
}

.author-info,
.user-info {
  flex: 1;
  min-width: 0;
}

.author-name,
.user-name {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 var(--spacing-xs) 0;
}

.author-title {
  font-size: var(--font-size-sm);
  color: var(--primary-color);
  margin: 0 0 var(--spacing-xs) 0;
  font-weight: 500;
}

.author-description,
.user-signature {
  font-size: var(--font-size-sm);
  color: var(--text-color-secondary);
  margin: 0 0 var(--spacing-sm) 0;
  line-height: 1.4;
}

.author-stats,
.user-stats {
  display: flex;
  flex-wrap: wrap;
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

.author-actions,
.user-actions {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
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
  .following-page {
    padding: var(--spacing-md);
  }

  .author-item,
  .user-item {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }

  .author-actions,
  .user-actions {
    align-self: flex-end;
    flex-direction: row;
  }

  .author-stats,
  .user-stats {
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
