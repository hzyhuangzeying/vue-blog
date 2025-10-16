<template>
  <div class="profile-page">
    <div class="profile-container">
      <!-- 用户信息卡片 -->
      <div class="profile-card">
        <div class="profile-header">
          <div class="avatar-section">
            <el-avatar :src="userStore.user?.avatar" :size="80">
              {{ userStore.user?.nickname?.charAt(0) }}
            </el-avatar>
            <el-button type="primary" size="small" @click="showAvatarDialog = true">
              更换头像
            </el-button>
          </div>
          
          <div class="user-info">
            <h1 class="username">{{ userStore.user?.nickname }}</h1>
            <p class="user-bio">{{ userStore.user?.bio || '这个人很懒，什么都没有写...' }}</p>
            <div class="user-stats">
              <div class="stat-item">
                <span class="stat-number">{{ userStore.user?.followers || 0 }}</span>
                <span class="stat-label">关注者</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ userStore.user?.following || 0 }}</span>
                <span class="stat-label">关注中</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ userStore.user?.articles || 0 }}</span>
                <span class="stat-label">文章</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="profile-actions">
          <el-button type="primary" @click="showEditDialog = true">
            <el-icon><Edit /></el-icon>
            编辑资料
          </el-button>
          <el-button @click="handleLogout">
            <el-icon><SwitchButton /></el-icon>
            退出登录
          </el-button>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content-tabs">
        <el-tabs v-model="activeTab" @tab-change="handleTabChange">
          <el-tab-pane label="我的文章" name="articles">
            <div class="articles-section">
              <div class="section-header">
                <h3>我的文章</h3>
                <el-button type="primary" @click="$router.push('/write')">
                  <el-icon><Edit /></el-icon>
                  写文章
                </el-button>
              </div>
              
              <div v-if="myArticles.length === 0" class="empty-state">
                <el-empty description="还没有发布任何文章">
                  <el-button type="primary" @click="$router.push('/write')">
                    开始写作
                  </el-button>
                </el-empty>
              </div>
              
              <div v-else class="articles-list">
                <div
                  v-for="article in myArticles"
                  :key="article.id"
                  class="article-item"
                  @click="handleArticleClick(article)"
                >
                  <img :src="article.cover" :alt="article.title" class="article-cover" />
                  <div class="article-content">
                    <h4 class="article-title">{{ article.title }}</h4>
                    <p class="article-summary">{{ article.summary }}</p>
                    <div class="article-meta">
                      <span class="article-category">{{ article.category }}</span>
                      <span class="article-time">{{ formatTime(article.createdAt) }}</span>
                      <div class="article-stats">
                        <span><el-icon><View /></el-icon> {{ article.views }}</span>
                        <span><el-icon><Star /></el-icon> {{ article.likes }}</span>
                        <span><el-icon><ChatDotRound /></el-icon> {{ article.comments }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="article-actions">
                    <el-button type="text" size="small" @click.stop="handleEditArticle(article)">
                      编辑
                    </el-button>
                    <el-button type="text" size="small" @click.stop="handleDeleteArticle(article)">
                      删除
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          
          <el-tab-pane label="收藏" name="favorites">
            <div class="favorites-section">
              <div v-if="favoriteArticles.length === 0" class="empty-state">
                <el-empty description="还没有收藏任何文章" />
              </div>
              <div v-else class="articles-list">
                <div
                  v-for="article in favoriteArticles"
                  :key="article.id"
                  class="article-item"
                  @click="handleArticleClick(article)"
                >
                  <img :src="article.cover" :alt="article.title" class="article-cover" />
                  <div class="article-content">
                    <h4 class="article-title">{{ article.title }}</h4>
                    <p class="article-summary">{{ article.summary }}</p>
                    <div class="article-meta">
                      <span class="article-author">{{ article.author.nickname }}</span>
                      <span class="article-time">{{ formatTime(article.createdAt) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          
          <el-tab-pane label="设置" name="settings">
            <div class="settings-section">
              <el-form :model="settingsForm" label-width="120px">
                <el-form-item label="邮箱通知">
                  <el-switch v-model="settingsForm.emailNotification" />
                </el-form-item>
                <el-form-item label="评论通知">
                  <el-switch v-model="settingsForm.commentNotification" />
                </el-form-item>
                <el-form-item label="关注通知">
                  <el-switch v-model="settingsForm.followNotification" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="handleSaveSettings">
                    保存设置
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!-- 编辑资料对话框 -->
    <el-dialog v-model="showEditDialog" title="编辑资料" width="500px">
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="昵称">
          <el-input v-model="editForm.nickname" />
        </el-form-item>
        <el-form-item label="个人简介">
          <el-input
            v-model="editForm.bio"
            type="textarea"
            :rows="4"
            placeholder="介绍一下自己..."
          />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editForm.email" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showEditDialog = false">取消</el-button>
        <el-button type="primary" @click="handleSaveProfile">保存</el-button>
      </template>
    </el-dialog>

    <!-- 更换头像对话框 -->
    <el-dialog v-model="showAvatarDialog" title="更换头像" width="400px">
      <div class="avatar-upload">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :before-upload="handleAvatarUpload"
        >
          <img v-if="avatarUrl" :src="avatarUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
        <p class="upload-tip">点击上传头像，支持 JPG、PNG 格式</p>
      </div>
      <template #footer>
        <el-button @click="showAvatarDialog = false">取消</el-button>
        <el-button type="primary" @click="handleSaveAvatar">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useArticlesStore } from '@/stores/articles'
import { ElMessage, ElMessageBox } from 'element-plus'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'

const router = useRouter()
const userStore = useUserStore()
const articlesStore = useArticlesStore()

const activeTab = ref('articles')
const showEditDialog = ref(false)
const showAvatarDialog = ref(false)
const avatarUrl = ref('')

const myArticles = ref([])
const favoriteArticles = ref([])

const editForm = reactive({
  nickname: '',
  bio: '',
  email: ''
})

const settingsForm = reactive({
  emailNotification: true,
  commentNotification: true,
  followNotification: false
})

onMounted(async () => {
  await loadMyArticles()
  await loadFavoriteArticles()
  initEditForm()
})

const initEditForm = () => {
  if (userStore.user) {
    editForm.nickname = userStore.user.nickname
    editForm.bio = userStore.user.bio || ''
    editForm.email = userStore.user.email
  }
}

const loadMyArticles = async () => {
  const result = await articlesStore.fetchArticles()
  if (result.success) {
    // 模拟获取当前用户的文章
    myArticles.value = result.data.filter(article => 
      article.author.id === userStore.user?.id
    )
  }
}

const loadFavoriteArticles = async () => {
  const result = await articlesStore.fetchArticles()
  if (result.success) {
    // 模拟收藏的文章
    favoriteArticles.value = result.data.slice(0, 5)
  }
}

const handleTabChange = (tabName) => {
  activeTab.value = tabName
}

const handleArticleClick = (article) => {
  router.push({
    name: 'ArticleDetail',
    params: { id: article.id }
  })
}

const handleEditArticle = (article) => {
  router.push({
    name: 'Write',
    query: { id: article.id }
  })
}

const handleDeleteArticle = async (article) => {
  try {
    await ElMessageBox.confirm('确定要删除这篇文章吗？', '确认删除', {
      type: 'warning'
    })
    
    // 模拟删除操作
    const index = myArticles.value.findIndex(a => a.id === article.id)
    if (index > -1) {
      myArticles.value.splice(index, 1)
      ElMessage.success('删除成功')
    }
  } catch {
    // 用户取消删除
  }
}

const handleSaveProfile = async () => {
  const result = await userStore.updateProfile(editForm)
  if (result.success) {
    ElMessage.success('资料更新成功')
    showEditDialog.value = false
  } else {
    ElMessage.error(result.message || '更新失败')
  }
}

const handleAvatarUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isImage) {
    ElMessage.error('只能上传图片文件!')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('图片大小不能超过 2MB!')
    return false
  }

  // 创建预览URL
  avatarUrl.value = URL.createObjectURL(file)
  return false // 阻止自动上传
}

const handleSaveAvatar = () => {
  if (avatarUrl.value) {
    // 模拟保存头像
    ElMessage.success('头像更新成功')
    showAvatarDialog.value = false
  }
}

const handleSaveSettings = () => {
  ElMessage.success('设置保存成功')
}

const handleLogout = async () => {
  try {
    await ElMessageBox.confirm('确定要退出登录吗？', '确认退出', {
      type: 'warning'
    })
    
    userStore.logout()
    ElMessage.success('已退出登录')
    router.push('/home')
  } catch {
    // 用户取消退出
  }
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
.profile-page {
  max-width: 100%;
}

.profile-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.profile-card {
  background: var(--bg-color-light);
  border-radius: var(--border-radius-large);
  padding: var(--spacing-xl);
  box-shadow: var(--box-shadow);
}

.profile-header {
  display: flex;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
}

.user-info {
  flex: 1;
}

.username {
  font-size: var(--font-size-xxl);
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: var(--spacing-sm);
}

.user-bio {
  color: var(--text-color-secondary);
  font-size: var(--font-size-md);
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
}

.user-stats {
  display: flex;
  gap: var(--spacing-xl);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--primary-color);
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--text-color-secondary);
}

.profile-actions {
  display: flex;
  gap: var(--spacing-md);
}

.content-tabs {
  background: var(--bg-color-light);
  border-radius: var(--border-radius-large);
  padding: var(--spacing-xl);
  box-shadow: var(--box-shadow);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--border-color-light);
}

.section-header h3 {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-color);
}

.empty-state {
  text-align: center;
  padding: var(--spacing-xl);
}

.articles-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.article-item {
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
}

.article-cover {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: var(--border-radius-small);
  flex-shrink: 0;
}

.article-content {
  flex: 1;
}

.article-title {
  font-size: var(--font-size-md);
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: var(--spacing-xs);
  line-height: 1.4;
}

.article-summary {
  color: var(--text-color-secondary);
  font-size: var(--font-size-sm);
  line-height: 1.5;
  margin-bottom: var(--spacing-sm);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  font-size: var(--font-size-xs);
  color: var(--text-color-secondary);
}

.article-category {
  background: var(--primary-color);
  color: white;
  padding: 2px 6px;
  border-radius: var(--border-radius-small);
}

.article-stats {
  display: flex;
  gap: var(--spacing-sm);
  margin-left: auto;
}

.article-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  align-self: flex-start;
}

.avatar-upload {
  text-align: center;
}

.avatar-uploader {
  :deep(.el-upload) {
    border: 1px dashed var(--border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    
    &:hover {
      border-color: var(--primary-color);
    }
  }
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
  object-fit: cover;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: var(--text-color-secondary);
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.upload-tip {
  color: var(--text-color-secondary);
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-md);
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
  }
  
  .user-stats {
    justify-content: center;
  }
  
  .article-item {
    flex-direction: column;
  }
  
  .article-cover {
    width: 100%;
    height: 150px;
  }
  
  .article-actions {
    flex-direction: row;
    justify-content: flex-end;
  }
}
</style>
