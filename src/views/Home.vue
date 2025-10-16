<template>
  <div class="home">
    <!-- 轮播图 -->
    <div class="banner-section">
      <el-carousel height="300px" indicator-position="outside">
        <el-carousel-item v-for="item in banners" :key="item.id">
          <div class="banner-item" :style="{ backgroundImage: `url(${item.image})` }">
            <div class="banner-content">
              <h2 class="banner-title">{{ item.title }}</h2>
              <p class="banner-desc">{{ item.description }}</p>
              <el-button type="primary" @click="handleBannerClick(item)">
                阅读更多
              </el-button>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 内容区域 -->
    <div class="content-section">
      <!-- 最新文章 -->
      <div class="section">
        <div class="section-header">
          <h2 class="section-title">最新文章</h2>
          <router-link to="/articles" class="more-link">查看更多</router-link>
        </div>
        <div class="articles-grid">
          <article-card
            v-for="article in latestArticles"
            :key="article.id"
            :article="article"
            @click="handleArticleClick(article)"
          />
        </div>
      </div>

      <!-- 热门文章 -->
      <div class="section">
        <div class="section-header">
          <h2 class="section-title">热门文章</h2>
        </div>
        <div class="articles-grid">
          <article-card
            v-for="article in hotArticles"
            :key="article.id"
            :article="article"
            @click="handleArticleClick(article)"
          />
        </div>
      </div>

      <!-- 推荐作者 -->
      <div class="section">
        <div class="section-header">
          <h2 class="section-title">推荐作者</h2>
        </div>
        <div class="authors-grid">
          <div
            v-for="author in recommendedAuthors"
            :key="author.id"
            class="author-card"
          >
            <el-avatar :src="author.avatar" :size="60">
              {{ author.nickname.charAt(0) }}
            </el-avatar>
            <h3 class="author-name">{{ author.nickname }}</h3>
            <p class="author-bio">{{ author.bio }}</p>
            <div class="author-stats">
              <span>{{ author.followers }} 关注者</span>
              <span>{{ author.articles }} 文章</span>
            </div>
            <el-button type="primary" size="small" plain>关注</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useArticlesStore } from '@/stores/articles'
import ArticleCard from '@/components/ArticleCard.vue'

const router = useRouter()
const articlesStore = useArticlesStore()

const banners = ref([
  {
    id: 1,
    title: 'Vue 3 新特性详解',
    description: '探索 Vue 3 的组合式 API 和性能优化',
    image: 'https://picsum.photos/1200/300?random=1'
  },
  {
    id: 2,
    title: 'React 18 并发特性',
    description: '了解 React 18 的并发渲染和 Suspense',
    image: 'https://picsum.photos/1200/300?random=2'
  },
  {
    id: 3,
    title: 'TypeScript 高级技巧',
    description: '掌握 TypeScript 的高级类型和泛型',
    image: 'https://picsum.photos/1200/300?random=3'
  }
])

const latestArticles = ref([])
const hotArticles = ref([])
const recommendedAuthors = ref([
  {
    id: 1,
    nickname: '张三',
    bio: '前端开发工程师，专注于 Vue 和 React 技术栈',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    followers: 1200,
    articles: 45
  },
  {
    id: 2,
    nickname: '李四',
    bio: '全栈开发工程师，擅长 Node.js 和数据库设计',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    followers: 800,
    articles: 32
  },
  {
    id: 3,
    nickname: '王五',
    bio: '后端开发工程师，专注于微服务架构和性能优化',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    followers: 1500,
    articles: 58
  }
])

onMounted(async () => {
  const result = await articlesStore.fetchArticles()
  if (result.success) {
    latestArticles.value = result.data.slice(0, 6)
    hotArticles.value = result.data.slice(6, 12)
  }
})

const handleBannerClick = (banner) => {
  // 跳转到相关文章或专题页面
  console.log('Banner clicked:', banner)
}

const handleArticleClick = (article) => {
  router.push({
    name: 'ArticleDetail',
    params: { id: article.id }
  })
}
</script>

<style lang="scss" scoped>
.home {
  max-width: 100%;
}

.banner-section {
  margin-bottom: var(--spacing-xl);
  border-radius: var(--border-radius-large);
  overflow: hidden;
  box-shadow: var(--box-shadow);
}

.banner-item {
  height: 300px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
  }
}

.banner-content {
  text-align: center;
  color: white;
  z-index: 1;
  max-width: 600px;
  padding: 0 var(--spacing-lg);
}

.banner-title {
  font-size: var(--font-size-xxl);
  font-weight: bold;
  margin-bottom: var(--spacing-md);
}

.banner-desc {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-lg);
  opacity: 0.9;
}

.content-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.section {
  background: var(--bg-color-light);
  border-radius: var(--border-radius-large);
  padding: var(--spacing-xl);
  box-shadow: var(--box-shadow-light);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--border-color-light);
}

.section-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--text-color);
}

.more-link {
  color: var(--primary-color);
  text-decoration: none;
  font-size: var(--font-size-sm);
  
  &:hover {
    text-decoration: underline;
  }
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.authors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
}

.author-card {
  text-align: center;
  padding: var(--spacing-lg);
  border: 1px solid var(--border-color-light);
  border-radius: var(--border-radius);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--box-shadow);
  }
}

.author-name {
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin: var(--spacing-md) 0 var(--spacing-sm);
  color: var(--text-color);
}

.author-bio {
  color: var(--text-color-secondary);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-md);
  line-height: 1.5;
}

.author-stats {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-xs);
  color: var(--text-color-secondary);
}

@media (max-width: 768px) {
  .banner-title {
    font-size: var(--font-size-xl);
  }
  
  .banner-desc {
    font-size: var(--font-size-md);
  }
  
  .section {
    padding: var(--spacing-lg);
  }
  
  .articles-grid {
    grid-template-columns: 1fr;
  }
  
  .authors-grid {
    grid-template-columns: 1fr;
  }
}
</style>
