<template>
  <aside class="sidebar" :class="{ 'collapsed': collapsed }">
    <div class="sidebar-content">
      <!-- 主导航菜单 -->
      <nav class="main-nav">
        <div
          v-for="item in mainNavItems"
          :key="item.name"
          class="nav-item"
          :class="{ 
            'active': $route.name === item.route,
            'collapsed': collapsed 
          }"
          @click="handleNavClick(item)"
        >
          <el-icon class="nav-icon">
            <component :is="item.icon" />
          </el-icon>
          <span v-if="!collapsed" class="nav-text">{{ item.name }}</span>
          <el-badge 
            v-if="item.badge && !collapsed" 
            :value="item.badge" 
            class="nav-badge"
          />
        </div>
      </nav>

      <!-- 分割线 -->
      <div class="divider" v-if="!collapsed"></div>

      <!-- 个人中心菜单（未登录也展示，点击时校验） -->
      <nav class="user-nav">
        <div class="nav-section-title" v-if="!collapsed">个人中心</div>
        <div
          v-for="item in userNavItems"
          :key="item.name"
          class="nav-item"
          :class="{ 
            'active': $route.name === item.route,
            'collapsed': collapsed 
          }"
          @click="handleUserNavClick(item)"
        >
          <el-icon class="nav-icon">
            <component :is="item.icon" />
          </el-icon>
          <span v-if="!collapsed" class="nav-text">{{ item.name }}</span>
          <el-badge 
            v-if="item.badge && !collapsed" 
            :value="item.badge" 
            class="nav-badge"
          />
        </div>
      </nav>

      <!-- 分割线 -->
      <div class="divider" v-if="!collapsed"></div>

      <!-- 工具菜单 -->
      <nav class="tools-nav">
        <div class="nav-section-title" v-if="!collapsed">工具</div>
        <div
          v-for="item in toolsNavItems"
          :key="item.name"
          class="nav-item"
          :class="{ 
            'active': $route.name === item.route,
            'collapsed': collapsed 
          }"
          @click="handleNavClick(item)"
        >
          <el-icon class="nav-icon">
            <component :is="item.icon" />
          </el-icon>
          <span v-if="!collapsed" class="nav-text">{{ item.name }}</span>
        </div>
      </nav>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()
const userStore = useUserStore()

// 主导航菜单
const mainNavItems = ref([
  {
    name: '首页',
    icon: 'House',
    route: 'Home',
    path: '/home'
  },
  {
    name: '博客',
    icon: 'Document',
    route: 'Articles',
    path: '/articles'
  },
  {
    name: '下载',
    icon: 'Download',
    route: 'Download',
    path: '/download'
  },
  {
    name: '学习',
    icon: 'Reading',
    route: 'Learning',
    path: '/learning'
  },
  {
    name: '问答',
    icon: 'QuestionFilled',
    route: 'Q&A',
    path: '/qa'
  },
  {
    name: '活动',
    icon: 'Calendar',
    route: 'Events',
    path: '/events'
  }
])

// 个人中心菜单
const userNavItems = ref([
  {
    name: '历史',
    icon: 'Clock',
    route: 'History',
    path: '/history'
  },
  {
    name: '收藏',
    icon: 'Star',
    route: 'Favorites',
    path: '/favorites'
  },
  {
    name: '订阅',
    icon: 'Bell',
    route: 'Subscribe',
    path: '/subscribe'
  },
  {
    name: '关注',
    icon: 'UserFilled',
    route: 'Following',
    path: '/following'
  },
  {
    name: '会员中心',
    icon: 'Crown',
    route: 'Vip',
    path: '/vip',
    badge: 'VIP'
  },
  {
    name: '创作中心',
    icon: 'Edit',
    route: 'Create',
    path: '/create'
  }
])

// 工具菜单
const toolsNavItems = ref([
  {
    name: '代码生成',
    icon: 'MagicStick',
    route: 'CodeGen',
    path: '/codegen'
  },
  {
    name: 'AI助手',
    icon: 'ChatDotRound',
    route: 'AI',
    path: '/ai'
  },
  {
    name: '云IDE',
    icon: 'Monitor',
    route: 'IDE',
    path: '/ide'
  },
  {
    name: '开发者工具',
    icon: 'Tools',
    route: 'DevTools',
    path: '/devtools'
  }
])

// 处理主导航点击
const handleNavClick = (item) => {
  if (item.path) {
    router.push(item.path)
  } else {
    ElMessage.info(`${item.name}功能开发中...`)
  }
}

// 处理个人中心导航点击（未登录先提示并跳转登录）
const handleUserNavClick = (item) => {
  if (!userStore.isLoggedIn) {
    ElMessage.warning('请先登录后再访问该功能')
    router.push('/login')
    return
  }
  handleNavClick(item)
}
</script>

<style lang="scss" scoped>
.sidebar {
  width: 100%;
  background: transparent;
  overflow-y: auto;
  height: 100%;
}

.sidebar-content {
  padding: var(--spacing-md) 0;
}

/* 导航菜单 */
.main-nav,
.user-nav,
.tools-nav {
  margin-bottom: var(--spacing-md);
}

.nav-section-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--text-color-secondary);
  margin-bottom: var(--spacing-sm);
  padding: 0 var(--spacing-md);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  margin: 0 var(--spacing-sm);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    background-color: var(--bg-color);
    color: var(--primary-color);
  }
  
  &.active {
    background-color: rgba(24, 144, 255, 0.1);
    color: var(--primary-color);
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 20px;
      background-color: var(--primary-color);
      border-radius: 0 2px 2px 0;
    }
  }
  
  &.collapsed {
    justify-content: center;
    padding: var(--spacing-sm);
    margin: 0 var(--spacing-xs);
    
    .nav-text {
      display: none;
    }
    
    .nav-badge {
      display: none;
    }
  }
}

.nav-icon {
  font-size: var(--font-size-lg);
  flex-shrink: 0;
}

.nav-text {
  font-size: var(--font-size-sm);
  font-weight: 500;
  flex: 1;
}

.nav-badge {
  margin-left: auto;
}

/* 分割线 */
.divider {
  height: 1px;
  background-color: var(--border-color-light);
  margin: var(--spacing-md) var(--spacing-md);
}

/* 折叠状态下的样式 */
.sidebar.collapsed {
  .nav-section-title {
    display: none;
  }
  
  .divider {
    margin: var(--spacing-sm) var(--spacing-xs);
  }
  
  .nav-item {
    justify-content: center;
    padding: var(--spacing-sm);
    margin: 0 var(--spacing-xs);
    
    .nav-text {
      display: none;
    }
    
    .nav-badge {
      display: none;
    }
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}
</style>
