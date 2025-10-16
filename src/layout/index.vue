<template>
  <div class="layout">
    <div class="layout-container">
      <!-- 左侧区域 -->
      <aside class="left-panel" :class="{ 'collapsed': sidebarCollapsed }">
        <!-- 左侧头部 -->
        <div class="left-header">
          <div class="collapse-btn">
            <el-button
                type="text"
                @click="toggleSidebar"
                class="collapse-button"
            >
              <el-icon>
                <Expand v-if="sidebarCollapsed" />
                <Fold v-else />
              </el-icon>
            </el-button>
          </div>
            <div class="logo-section">
              <router-link to="/" class="logo-link">
                <!-- 使用静态图片Logo -->
                <img 
                  src="/images/logos/ByteJourney.png" 
                  alt="ByteJourney Logo" 
                  class="logo-icon"
                  @error="handleLogoError"
                />
                <span  class="logo-text">ByteJourney</span>
              </router-link>
            </div>

        </div>
        
        <!-- 左侧内容 -->
        <div class="left-content">
          <Sidebar v-show="showSidebar" :collapsed="sidebarCollapsed" />
        </div>
      </aside>

      <!-- 右侧区域 -->
      <div class="right-panel">
        <!-- 右侧头部 -->
        <header class="right-header">
          <div class="header-container">
            <!-- 搜索框 -->
            <div class="search-section">
              <el-input
                v-model="searchKeyword"
                placeholder="搜索文章、用户..."
                class="search-input"
                @keyup.enter="handleSearch"
              >
                <template #suffix>
                  <el-icon class="search-icon" @click="handleSearch">
                    <Search />
                  </el-icon>
                </template>
              </el-input>
            </div>



            <!-- 用户操作区 -->
            <div class="user-actions">
              <template v-if="userStore.isLoggedIn">
                <!-- 消息通知 -->
                <el-badge :value="12" class="notification-badge">
                  <el-icon class="action-icon"><Bell /></el-icon>
                </el-badge>
                
                <!-- 用户头像下拉菜单 -->
                <el-dropdown @command="handleUserCommand">
                  <div class="user-avatar">
                    <el-avatar :src="userStore.user?.avatar" :size="32">
                      {{ userStore.user?.nickname?.charAt(0) }}
                    </el-avatar>
                    <span class="username">{{ userStore.user?.nickname }}</span>
                    <el-icon class="dropdown-icon"><ArrowDown /></el-icon>
                  </div>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item command="profile">
                        <el-icon><User /></el-icon>
                        个人中心
                      </el-dropdown-item>
                      <el-dropdown-item command="settings">
                        <el-icon><Setting /></el-icon>
                        设置
                      </el-dropdown-item>
                      <el-dropdown-item divided command="logout">
                        <el-icon><SwitchButton /></el-icon>
                        退出登录
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </template>
              
              <template v-else>
                <el-button type="text" @click="$router.push('/login')">登录</el-button>
                <el-button type="primary" @click="$router.push('/register')">注册</el-button>
              </template>
              <!-- 创作入口 -->
              <el-dropdown @command="handleCreateCommand">
                <div class="nav-item" style="cursor: pointer;">
                  <el-icon><Edit /></el-icon>
                  <span>创作</span>
                  <el-icon style="font-size: 12px; color: var(--text-color-secondary); margin-left: 4px;"><ArrowDown /></el-icon>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="write">
                      <el-icon style="margin-right: 6px;"><Edit /></el-icon>
                      写文章
                    </el-dropdown-item>
                    <el-dropdown-item command="upload">
                      <el-icon style="margin-right: 6px;"><Upload /></el-icon>
                      传资源
                    </el-dropdown-item>
                    <el-dropdown-item command="code">
                      <el-icon style="margin-right: 6px;"><Monitor /></el-icon>
                      写代码
                    </el-dropdown-item>
                    <el-dropdown-item command="post">
                      <el-icon style="margin-right: 6px;"><ChatDotRound /></el-icon>
                      发动态
                    </el-dropdown-item>
                    <el-dropdown-item command="question">
                      <el-icon style="margin-right: 6px;"><QuestionFilled /></el-icon>
                      提问题
                    </el-dropdown-item>
                    <el-dropdown-item command="project">
                      <el-icon style="margin-right: 6px;"><Tools /></el-icon>
                      建项目
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </header>

        <!-- 右侧内容 -->
        <main class="main-content">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import Sidebar from './components/Sidebar.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const searchKeyword = ref('')
const sidebarCollapsed = ref(false)

// 根据路由决定是否显示侧边栏
const showSidebar = computed(() => {
  const hideSidebarRoutes = ['ArticleDetail', 'Write']
  return !hideSidebarRoutes.includes(route.name)
})

// 切换侧边栏折叠状态
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

// 搜索功能
const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    router.push({
      name: 'Search',
      query: { q: searchKeyword.value.trim() }
    })
  }
}

// 用户操作
const handleUserCommand = (command) => {
  switch (command) {
    case 'profile':
      router.push('/profile')
      break
    case 'settings':
      ElMessage.info('设置功能开发中...')
      break
    case 'logout':
      userStore.logout()
      ElMessage.success('已退出登录')
      router.push('/home')
      break
  }
}

// 创作入口命令（未登录则提示登录）
const handleCreateCommand = (command) => {
  if (!userStore.isLoggedIn) {
    ElMessage.warning('请先登录后再进行创作')
    router.push('/login')
    return
  }

  switch (command) {
    case 'write':
      router.push('/write')
      break
    case 'upload':
      // 跳转到资源上传（占位：去创作中心）
      router.push('/create')
      ElMessage.info('上传资源：功能入口在创作中心')
      break
    case 'code':
      router.push('/ide')
      break
    case 'post':
      router.push('/create')
      ElMessage.info('发动态：功能入口在创作中心')
      break
    case 'question':
      router.push('/qa')
      break
    case 'project':
      router.push('/create')
      ElMessage.info('建项目：功能入口在创作中心')
      break
  }
}

// Logo加载错误处理
const handleLogoError = (event) => {
  // 如果Logo图片加载失败，显示默认图标
  event.target.style.display = 'none'
  const parent = event.target.parentElement
  const fallbackIcon = document.createElement('el-icon')
  fallbackIcon.className = 'logo-icon'
  fallbackIcon.innerHTML = '<Document />'
  parent.insertBefore(fallbackIcon, event.target.nextSibling)
}
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  background-color: var(--bg-color);
}

.layout-container {
  display: flex;
  min-height: 100vh;
}

/* 左侧面板 */
.left-panel {
  width: var(--sidebar-width);
  background: var(--bg-color-light);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  
  &.collapsed {
    width: var(--sidebar-width-collapsed);
  }
}

.left-header {
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--spacing-md);
  border-bottom: 1px solid var(--border-color-light);
  background: var(--bg-color-light);
  position: relative;
}


.logo-section {
  position: absolute;
  left: 60px; /* 稍微避开按钮 */
  display: flex;
  align-items: center;
  white-space: nowrap;
  top: 50%;
  transform: translateY(-50%) translateZ(0); /* GPU加速防闪 */
  gap: 8px;
  z-index: 9999; /* 永远在最上层 */
  pointer-events: none; /* 不挡到按钮点击 */
}

.logo-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  text-decoration: none;
  color: var(--primary-color);
  font-weight: bold;
  font-size: var(--font-size-lg);
}

.logo-icon {
  width: 24px;
  height: 24px;
  object-fit: cover;
  flex-shrink: 0;
}

.logo-text {
  transition: none !important;
}





.collapse-button {
  padding: var(--spacing-xs);
  
  .el-icon {
    font-size: var(--font-size-md);
  }
}

.left-content {
  flex: 1;
  overflow-y: auto;
}

/* 右侧面板 */
.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0; /* 防止flex子项溢出 */
}

.right-header {
  height: var(--header-height);
  background: var(--bg-color-light);
  border-bottom: 1px solid var(--border-color-light);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0 var(--spacing-lg);
  gap: var(--spacing-lg);
}

/* 搜索区域 */
.search-section {
  flex: 1;
  max-width: 400px;
}

.search-input {
  :deep(.el-input__wrapper) {
    border-radius: 20px;
    box-shadow: none;
    border: 1px solid var(--border-color);
    
    &:hover {
      border-color: var(--primary-color);
    }
    
    &.is-focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
  }
}

.search-icon {
  cursor: pointer;
  color: var(--text-color-secondary);
  
  &:hover {
    color: var(--primary-color);
  }
}

/* 导航菜单 */
.nav-menu {
  display: flex;
  gap: var(--spacing-md);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius);
  text-decoration: none;
  color: var(--text-color);
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--bg-color);
    color: var(--primary-color);
  }
  
  &.active {
    background-color: rgba(24, 144, 255, 0.1);
    color: var(--primary-color);
  }
}

/* 用户操作区 */
.user-actions {
  display: flex;
  align-items: center;
  position: absolute;
  right: 20px;
  gap: var(--spacing-md);
}

.notification-badge {
  cursor: pointer;
  
  .action-icon {
    font-size: var(--font-size-lg);
    color: var(--text-color-secondary);
    
    &:hover {
      color: var(--primary-color);
    }
  }
}

.user-avatar {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius);
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: var(--bg-color);
  }
}

.username {
  font-size: var(--font-size-sm);
  color: var(--text-color);
}

.dropdown-icon {
  font-size: var(--font-size-xs);
  color: var(--text-color-secondary);
}

/* 主内容区域 */
.main-content {
  flex: 1;
  padding: var(--spacing-lg);
  background-color: var(--bg-color);
  overflow-y: auto;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .layout-container {
    flex-direction: column;
  }
  
  .left-panel {
    width: 100%;
    height: auto;
    
    &.collapsed {
      width: 100%;
    }
  }
  
  .left-header {
    height: 50px;
  }
  
  .right-header {
    height: 50px;
  }
  
  .header-container {
    padding: 0 var(--spacing-md);
    gap: var(--spacing-sm);
  }
  
  .search-section {
    max-width: 200px;
  }
  
  .nav-menu {
    display: none;
  }
  
  .username {
    display: none;
  }
  
  .main-content {
    padding: var(--spacing-md);
  }
}

@media (max-width: 480px) {
  .header-container {
    padding: 0 var(--spacing-sm);
  }
  
  .search-section {
    max-width: 150px;
  }
  
  .search-input {
    :deep(.el-input__inner) {
      font-size: var(--font-size-sm);
    }
  }
}
</style>
