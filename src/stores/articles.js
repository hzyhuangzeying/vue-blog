import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useArticlesStore = defineStore('articles', () => {
  const articles = ref([])
  const categories = ref([])
  const currentArticle = ref(null)
  const loading = ref(false)

  // 获取文章列表
  const fetchArticles = async (params = {}) => {
    loading.value = true
    try {
      // 模拟API调用
      const mockArticles = generateMockArticles()
      articles.value = mockArticles
      return { success: true, data: mockArticles }
    } catch (error) {
      return { success: false, message: error.message }
    } finally {
      loading.value = false
    }
  }

  // 获取文章详情
  const fetchArticleDetail = async (id) => {
    loading.value = true
    try {
      // 模拟API调用
      const article = generateMockArticle(id)
      currentArticle.value = article
      return { success: true, data: article }
    } catch (error) {
      return { success: false, message: error.message }
    } finally {
      loading.value = false
    }
  }

  // 获取分类列表
  const fetchCategories = async () => {
    try {
      const mockCategories = [
        { id: 1, name: '前端开发', count: 25 },
        { id: 2, name: '后端开发', count: 18 },
        { id: 3, name: '移动开发', count: 12 },
        { id: 4, name: '人工智能', count: 8 },
        { id: 5, name: '数据库', count: 15 },
        { id: 6, name: '运维', count: 10 },
        { id: 7, name: '算法', count: 20 },
        { id: 8, name: '其他', count: 5 }
      ]
      categories.value = mockCategories
      return { success: true, data: mockCategories }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  // 搜索文章
  const searchArticles = async (keyword) => {
    loading.value = true
    try {
      const mockArticles = generateMockArticles().filter(article =>
        article.title.includes(keyword) || article.content.includes(keyword)
      )
      return { success: true, data: mockArticles }
    } catch (error) {
      return { success: false, message: error.message }
    } finally {
      loading.value = false
    }
  }

  // 创建文章
  const createArticle = async (articleData) => {
    try {
      const newArticle = {
        id: Date.now(),
        ...articleData,
        author: {
          id: 1,
          username: 'admin',
          nickname: '管理员',
          avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0,
        likes: 0,
        comments: 0
      }
      articles.value.unshift(newArticle)
      return { success: true, data: newArticle }
    } catch (error) {
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
const generateMockArticles = () => {
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
    category: categories[index % categories.length],
    tags: ['技术', '教程', '最佳实践'],
    author: {
      id: 1,
      username: 'admin',
      nickname: '管理员',
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    },
    createdAt: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - index * 12 * 60 * 60 * 1000).toISOString(),
    views: Math.floor(Math.random() * 1000) + 100,
    likes: Math.floor(Math.random() * 100) + 10,
    comments: Math.floor(Math.random() * 50) + 5,
    cover: `https://picsum.photos/800/400?random=${index}`
  }))
}

const generateMockArticle = (id) => {
  const articles = generateMockArticles()
  return articles.find(article => article.id === parseInt(id)) || articles[0]
}
