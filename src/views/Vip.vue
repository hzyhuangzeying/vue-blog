<template>
  <div class="vip-page">
    <div class="page-header">
      <h1 class="page-title">会员中心</h1>
      <p class="page-description">享受更多会员专属功能和特权</p>
    </div>

    <div class="vip-content">
      <!-- 会员状态 -->
      <div class="vip-status">
        <div class="status-card">
          <div class="status-info">
            <div class="vip-badge">
              <el-icon><Crown /></el-icon>
              <span>VIP 会员</span>
            </div>
            <h3>欢迎回来，{{ userStore.user?.nickname || '用户' }}</h3>
            <p>您的会员有效期至：2024-12-31</p>
          </div>
          <div class="status-actions">
            <el-button type="primary" size="large">续费会员</el-button>
            <el-button size="large">升级套餐</el-button>
          </div>
        </div>
      </div>

      <!-- 会员特权 -->
      <div class="vip-privileges">
        <h3>会员特权</h3>
        <div class="privileges-grid">
          <div class="privilege-card">
            <div class="privilege-icon">
              <el-icon><Document /></el-icon>
            </div>
            <h4>无限制文章</h4>
            <p>阅读所有付费文章，无限制下载资源</p>
          </div>
          <div class="privilege-card">
            <div class="privilege-icon">
              <el-icon><Star /></el-icon>
            </div>
            <h4>专属标识</h4>
            <p>显示 VIP 专属标识，彰显身份</p>
          </div>
          <div class="privilege-card">
            <div class="privilege-icon">
              <el-icon><ChatDotRound /></el-icon>
            </div>
            <h4>优先客服</h4>
            <p>享受优先客服支持，快速解决问题</p>
          </div>
          <div class="privilege-card">
            <div class="privilege-icon">
              <el-icon><Tools /></el-icon>
            </div>
            <h4>高级工具</h4>
            <p>使用所有高级开发工具和功能</p>
          </div>
        </div>
      </div>

      <!-- 使用统计 -->
      <div class="usage-stats">
        <h3>使用统计</h3>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">
              <el-icon><Document /></el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ stats.articlesRead }}</div>
              <div class="stat-label">本月阅读文章</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <el-icon><Download /></el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ stats.resourcesDownloaded }}</div>
              <div class="stat-label">本月下载资源</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <el-icon><Tools /></el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ stats.toolsUsed }}</div>
              <div class="stat-label">本月使用工具</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <el-icon><Clock /></el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ stats.totalTime }}</div>
              <div class="stat-label">总使用时长(小时)</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 会员套餐 -->
      <div class="vip-packages">
        <h3>会员套餐</h3>
        <div class="packages-grid">
          <div class="package-card">
            <div class="package-header">
              <h4>基础版</h4>
              <div class="package-price">
                <span class="price">¥29</span>
                <span class="period">/月</span>
              </div>
            </div>
            <div class="package-features">
              <div class="feature-item">
                <el-icon><Check /></el-icon>
                <span>阅读基础文章</span>
              </div>
              <div class="feature-item">
                <el-icon><Check /></el-icon>
                <span>基础工具使用</span>
              </div>
              <div class="feature-item">
                <el-icon><Check /></el-icon>
                <span>社区支持</span>
              </div>
            </div>
            <el-button type="primary" class="package-button">选择套餐</el-button>
          </div>

          <div class="package-card featured">
            <div class="featured-badge">推荐</div>
            <div class="package-header">
              <h4>专业版</h4>
              <div class="package-price">
                <span class="price">¥59</span>
                <span class="period">/月</span>
              </div>
            </div>
            <div class="package-features">
              <div class="feature-item">
                <el-icon><Check /></el-icon>
                <span>阅读所有文章</span>
              </div>
              <div class="feature-item">
                <el-icon><Check /></el-icon>
                <span>高级工具使用</span>
              </div>
              <div class="feature-item">
                <el-icon><Check /></el-icon>
                <span>优先客服支持</span>
              </div>
              <div class="feature-item">
                <el-icon><Check /></el-icon>
                <span>专属标识</span>
              </div>
            </div>
            <el-button type="primary" class="package-button">选择套餐</el-button>
          </div>

          <div class="package-card">
            <div class="package-header">
              <h4>企业版</h4>
              <div class="package-price">
                <span class="price">¥199</span>
                <span class="period">/月</span>
              </div>
            </div>
            <div class="package-features">
              <div class="feature-item">
                <el-icon><Check /></el-icon>
                <span>所有功能</span>
              </div>
              <div class="feature-item">
                <el-icon><Check /></el-icon>
                <span>团队协作</span>
              </div>
              <div class="feature-item">
                <el-icon><Check /></el-icon>
                <span>定制服务</span>
              </div>
              <div class="feature-item">
                <el-icon><Check /></el-icon>
                <span>专属客服</span>
              </div>
            </div>
            <el-button type="primary" class="package-button">联系销售</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// 使用统计数据
const stats = ref({
  articlesRead: 156,
  resourcesDownloaded: 23,
  toolsUsed: 45,
  totalTime: 89
})

onMounted(() => {
  // 加载会员数据
  console.log('加载会员数据')
})
</script>

<style lang="scss" scoped>
.vip-page {
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

.vip-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

/* 会员状态 */
.vip-status {
  .status-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-xl);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: var(--border-radius-lg);
    color: white;
  }

  .status-info {
    flex: 1;

    h3 {
      font-size: var(--font-size-xl);
      font-weight: 600;
      margin: var(--spacing-sm) 0;
    }

    p {
      font-size: var(--font-size-md);
      opacity: 0.9;
      margin: 0;
    }
  }

  .vip-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    padding: var(--spacing-xs) var(--spacing-sm);
    background: rgba(255, 255, 255, 0.2);
    border-radius: var(--border-radius);
    font-size: var(--font-size-sm);
    font-weight: 500;

    .el-icon {
      font-size: var(--font-size-md);
    }
  }

  .status-actions {
    display: flex;
    gap: var(--spacing-md);
  }
}

/* 会员特权 */
.vip-privileges {
  h3 {
    font-size: var(--font-size-xl);
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: var(--spacing-lg);
  }

  .privileges-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-lg);
  }

  .privilege-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: var(--spacing-xl);
    background: var(--bg-color-light);
    border-radius: var(--border-radius-lg);
    border: 1px solid var(--border-color-light);
    transition: all 0.3s ease;

    &:hover {
      border-color: var(--primary-color);
      box-shadow: var(--box-shadow-light);
    }
  }

  .privilege-icon {
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

/* 使用统计 */
.usage-stats {
  h3 {
    font-size: var(--font-size-xl);
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: var(--spacing-lg);
  }

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

/* 会员套餐 */
.vip-packages {
  h3 {
    font-size: var(--font-size-xl);
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: var(--spacing-lg);
  }

  .packages-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-lg);
  }

  .package-card {
    position: relative;
    padding: var(--spacing-xl);
    background: var(--bg-color-light);
    border-radius: var(--border-radius-lg);
    border: 1px solid var(--border-color-light);
    transition: all 0.3s ease;

    &:hover {
      border-color: var(--primary-color);
      box-shadow: var(--box-shadow-light);
    }

    &.featured {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
    }
  }

  .featured-badge {
    position: absolute;
    top: -10px;
    right: 20px;
    padding: var(--spacing-xs) var(--spacing-sm);
    background: var(--primary-color);
    color: white;
    border-radius: var(--border-radius);
    font-size: var(--font-size-xs);
    font-weight: 500;
  }

  .package-header {
    text-align: center;
    margin-bottom: var(--spacing-lg);

    h4 {
      font-size: var(--font-size-lg);
      font-weight: 600;
      color: var(--text-color);
      margin: 0 0 var(--spacing-sm) 0;
    }

    .package-price {
      .price {
        font-size: var(--font-size-xxl);
        font-weight: 600;
        color: var(--primary-color);
      }

      .period {
        font-size: var(--font-size-md);
        color: var(--text-color-secondary);
      }
    }
  }

  .package-features {
    margin-bottom: var(--spacing-lg);
  }

  .feature-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-sm);

    .el-icon {
      color: var(--success-color);
      font-size: var(--font-size-md);
    }

    span {
      font-size: var(--font-size-sm);
      color: var(--text-color);
    }
  }

  .package-button {
    width: 100%;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .vip-page {
    padding: var(--spacing-md);
  }

  .vip-status .status-card {
    flex-direction: column;
    gap: var(--spacing-lg);
    text-align: center;
  }

  .status-actions {
    flex-direction: column;
    width: 100%;
  }

  .privileges-grid,
  .stats-grid,
  .packages-grid {
    grid-template-columns: 1fr;
  }
}
</style>
