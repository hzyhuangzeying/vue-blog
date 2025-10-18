/**
 * 文章Store (TypeScript版本)
 */
import type { Article, Category } from '@/types/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface ApiResult<T> {
  success: boolean
  data?: T
  message?: string
}

export const useArticlesStore = defineStore('articles', () => {
  const articles = ref<Article[]>([])
  const categories = ref<Category[]>([])
  const currentArticle = ref<Article | null>(null)
  const loading = ref(false)

  // 获取文章列表
  const fetchArticles = async (_params: Record<string, any> = {}): Promise<ApiResult<Article[]>> => {
    loading.value = true
    try {
      // 模拟API调用
      const mockArticles = generateMockArticles()
      articles.value = mockArticles
      return { success: true, data: mockArticles }
    } catch (error: any) {
      return { success: false, message: error.message }
    } finally {
      loading.value = false
    }
  }

  // 获取文章详情
  const fetchArticleDetail = async (id: number): Promise<ApiResult<Article>> => {
    loading.value = true
    try {
      // 模拟API调用
      const article = generateMockArticle(id)
      currentArticle.value = article
      return { success: true, data: article }
    } catch (error: any) {
      return { success: false, message: error.message }
    } finally {
      loading.value = false
    }
  }

  // 获取分类列表
  const fetchCategories = async (): Promise<ApiResult<Category[]>> => {
    try {
      const mockCategories: Category[] = [
        { 
          id: 1, 
          name: '前端开发', 
          description: '前端技术相关文章',
          icon: 'code',
          color: '#409EFF',
          articleCount: 25,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        { 
          id: 2, 
          name: '后端开发', 
          description: '后端技术相关文章',
          icon: 'server',
          color: '#67C23A',
          articleCount: 18,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        { 
          id: 3, 
          name: '移动开发', 
          description: '移动端开发相关文章',
          icon: 'phone',
          color: '#E6A23C',
          articleCount: 12,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        { 
          id: 4, 
          name: '人工智能', 
          description: 'AI技术相关文章',
          icon: 'brain',
          color: '#F56C6C',
          articleCount: 8,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        { 
          id: 5, 
          name: '数据库', 
          description: '数据库技术相关文章',
          icon: 'database',
          color: '#909399',
          articleCount: 15,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        { 
          id: 6, 
          name: '运维', 
          description: '运维技术相关文章',
          icon: 'tools',
          color: '#9C27B0',
          articleCount: 10,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        { 
          id: 7, 
          name: '算法', 
          description: '算法相关文章',
          icon: 'calculator',
          color: '#FF9800',
          articleCount: 20,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        { 
          id: 8, 
          name: '其他', 
          description: '其他技术文章',
          icon: 'more',
          color: '#607D8B',
          articleCount: 5,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]
      categories.value = mockCategories
      return { success: true, data: mockCategories }
    } catch (error: any) {
      return { success: false, message: error.message }
    }
  }

  // 搜索文章
  const searchArticles = async (keyword: string): Promise<ApiResult<Article[]>> => {
    loading.value = true
    try {
      const mockArticles = generateMockArticles().filter(article =>
        article.title.includes(keyword) || article.content.includes(keyword)
      )
      return { success: true, data: mockArticles }
    } catch (error: any) {
      return { success: false, message: error.message }
    } finally {
      loading.value = false
    }
  }

  // 创建文章
  const createArticle = async (articleData: Partial<Article>): Promise<ApiResult<Article>> => {
    try {
      const newArticle: Article = {
        id: Date.now(),
        title: articleData.title || '',
        content: articleData.content || '',
        summary: articleData.summary || '',
        cover: articleData.cover || '',
        author: {
          id: 1,
          username: 'admin',
          nickname: '管理员',
          avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
          email: 'admin@example.com',
          bio: '这是一个管理员账号',
          followers: 1000,
          following: 500,
          articles: 50,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        category: articleData.category || {
          id: 1,
          name: '前端开发',
          description: '前端技术相关文章',
          icon: 'code',
          color: '#409EFF',
          articleCount: 25,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        tags: articleData.tags || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
        views: 0,
        likes: 0,
        comments: 0,
        isPublished: false
      }
      articles.value.unshift(newArticle)
      return { success: true, data: newArticle }
    } catch (error: any) {
      return { success: false, message: error.message }
    }
  }

  return {
    articles,
    categories,
    currentArticle,
    loading,
    fetchArticles,
    fetchArticleDetail,
    fetchCategories,
    searchArticles,
    createArticle
  }
})

// 生成模拟文章数据
const generateMockArticles = (): Article[] => {
  const categories = ['前端开发', '后端开发', '移动开发', '人工智能', '数据库', '运维', '算法']
  const titles = [
    'Vue 3 组合式API详解',
    'React Hooks 最佳实践',
    'Node.js 性能优化技巧',
    'TypeScript 高级类型',
    'Docker 容器化部署',
    'Redis 缓存策略',
    '微服务架构设计',
    'Webpack 5 配置指南',
    'CSS Grid 布局详解',
    'JavaScript 异步编程'
  ]

  return Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    title: titles[index % titles.length],
    summary: '这是一篇关于技术分享的文章，包含了详细的技术要点和实践经验...',
    content: `# ${titles[index % titles.length]}\n\n这是一篇详细的技术文章内容...`,
    category: {
      id: (index % categories.length) + 1,
      name: categories[index % categories.length],
      description: `${categories[index % categories.length]}相关文章`,
      icon: 'code',
      color: '#409EFF',
      articleCount: Math.floor(Math.random() * 50) + 10,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    tags: [
      { id: 1, name: '技术', color: '#409EFF', articleCount: 100, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 2, name: '教程', color: '#67C23A', articleCount: 80, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { id: 3, name: '最佳实践', color: '#E6A23C', articleCount: 60, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    ],
    author: {
      id: 1,
      username: 'admin',
      nickname: '管理员',
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      email: 'admin@example.com',
      bio: '这是一个管理员账号',
      followers: 1000,
      following: 500,
      articles: 50,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    createdAt: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - index * 12 * 60 * 60 * 1000).toISOString(),
    publishedAt: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString(),
    views: Math.floor(Math.random() * 1000) + 100,
    likes: Math.floor(Math.random() * 100) + 10,
    comments: Math.floor(Math.random() * 50) + 5,
    cover: `https://picsum.photos/800/400?random=${index}`,
    isPublished: true
  }))
}

const generateMockArticle = (id: number): Article => {
  const articles = generateMockArticles()
  return articles.find(article => article.id === id) || articles[0]
}
