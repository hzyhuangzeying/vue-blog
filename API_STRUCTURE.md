# API 结构化管理说明

## 📁 **文件结构**

```
src/api/
├── index.js              # 统一导出入口
├── request.js            # 请求封装
└── modules/              # 按功能分类的API模块
    ├── auth.js           # 认证相关API
    ├── user.js           # 用户相关API
    ├── article.js        # 文章相关API
    ├── category.js       # 分类相关API
    ├── tag.js            # 标签相关API
    └── upload.js         # 文件上传相关API
```

## 🎯 **模块分类**

### **1. 认证模块 (auth.js)**
- `login()` - 用户登录
- `register()` - 用户注册
- `logout()` - 用户登出
- `refreshToken()` - 刷新token
- `verifyToken()` - 验证token

### **2. 用户模块 (user.js)**
- `getUserInfo()` - 获取用户信息
- `updateUserInfo()` - 更新用户信息
- `changePassword()` - 修改密码
- `uploadAvatar()` - 上传头像
- `getUserList()` - 获取用户列表
- `followUser()` - 关注用户
- `unfollowUser()` - 取消关注
- `getFollowingList()` - 获取关注列表
- `getFollowersList()` - 获取粉丝列表
- `getUserStats()` - 获取用户统计

### **3. 文章模块 (article.js)**
- `getArticleList()` - 获取文章列表
- `getArticleDetail()` - 获取文章详情
- `createArticle()` - 创建文章
- `updateArticle()` - 更新文章
- `deleteArticle()` - 删除文章
- `publishArticle()` - 发布文章
- `unpublishArticle()` - 取消发布
- `likeArticle()` - 点赞文章
- `unlikeArticle()` - 取消点赞
- `favoriteArticle()` - 收藏文章
- `unfavoriteArticle()` - 取消收藏
- `getArticleComments()` - 获取文章评论
- `addArticleComment()` - 添加评论
- `deleteArticleComment()` - 删除评论
- `searchArticles()` - 搜索文章
- `getHotArticles()` - 获取热门文章
- `getRecommendedArticles()` - 获取推荐文章
- `getArticlesByCategory()` - 获取分类文章
- `getArticlesByTag()` - 获取标签文章
- `getUserArticles()` - 获取用户文章
- `uploadArticleImage()` - 上传文章图片

### **4. 分类模块 (category.js)**
- `getCategoryList()` - 获取分类列表
- `getCategoryDetail()` - 获取分类详情
- `createCategory()` - 创建分类
- `updateCategory()` - 更新分类
- `deleteCategory()` - 删除分类
- `getCategoryTree()` - 获取分类树
- `getCategoryArticleCount()` - 获取分类文章数量

### **5. 标签模块 (tag.js)**
- `getTagList()` - 获取标签列表
- `getTagDetail()` - 获取标签详情
- `createTag()` - 创建标签
- `updateTag()` - 更新标签
- `deleteTag()` - 删除标签
- `getHotTags()` - 获取热门标签
- `searchTags()` - 搜索标签
- `getTagArticleCount()` - 获取标签文章数量

### **6. 上传模块 (upload.js)**
- `uploadFile()` - 上传单个文件
- `uploadFiles()` - 上传多个文件
- `uploadImage()` - 上传图片
- `uploadAvatar()` - 上传头像
- `uploadArticleImage()` - 上传文章图片
- `deleteFile()` - 删除文件
- `getFileInfo()` - 获取文件信息

## 🔧 **使用方式**

### **按需导入**
```javascript
// 导入特定模块
import { authApi, userApi } from '@/api'

// 使用认证API
const loginResult = await authApi.login({
  username: 'admin',
  password: '123456'
})

// 使用用户API
const userInfo = await userApi.getUserInfo()
```

### **全部导入**
```javascript
// 导入所有API
import { authApi, userApi, articleApi, categoryApi, tagApi, uploadApi } from '@/api'
```

### **在组件中使用**
```javascript
// Vue组件中
import { authApi, articleApi } from '@/api'

export default {
  async mounted() {
    try {
      // 获取文章列表
      const articles = await articleApi.getArticleList({
        page: 1,
        size: 10
      })
      console.log('文章列表:', articles)
    } catch (error) {
      console.error('获取文章列表失败:', error)
    }
  }
}
```

### **在Store中使用**
```javascript
// Pinia Store中
import { authApi, userApi } from '@/api'

export const useUserStore = defineStore('user', () => {
  const login = async (loginData) => {
    try {
      const response = await authApi.login(loginData)
      // 处理登录结果
      return response
    } catch (error) {
      // 错误处理
      throw error
    }
  }
  
  return { login }
})
```

## 📝 **API方法特点**

### **统一响应处理**
- 所有API方法都使用 `ResponseHandler` 统一处理响应
- 自动显示成功/失败消息
- 自动处理分页数据格式

### **错误处理**
- 统一的错误处理机制
- 自动显示错误提示
- 支持自定义错误消息

### **类型安全**
- 详细的JSDoc注释
- 参数类型说明
- 返回值类型说明

### **进度回调**
- 文件上传支持进度回调
- 实时显示上传进度

## 🚀 **优势**

1. **模块化管理**: 按功能分类，便于维护
2. **统一接口**: 所有API使用相同的调用方式
3. **错误处理**: 统一的错误处理机制
4. **类型安全**: 详细的参数和返回值说明
5. **易于扩展**: 新增API只需在对应模块中添加
6. **代码复用**: 避免重复的请求处理代码

## 🔄 **扩展新API**

### **添加新的API方法**
```javascript
// 在对应模块文件中添加
export const userApi = {
  // 现有方法...
  
  /**
   * 新的API方法
   * @param {Object} params - 参数
   * @returns {Promise} 结果
   */
  async newApiMethod(params) {
    try {
      const response = await http.get('/new-endpoint', params)
      return ResponseHandler.handleSuccess(response, '操作成功')
    } catch (error) {
      ResponseHandler.handleError(error, '操作失败')
    }
  }
}
```

### **创建新模块**
```javascript
// 创建新模块文件 src/api/modules/newModule.js
import { http } from '../request'
import { ResponseHandler } from '@/utils/response'

export const newModuleApi = {
  // API方法...
}

// 在 src/api/index.js 中导出
export { newModuleApi } from './modules/newModule'
```

## ⚠️ **注意事项**

1. **命名规范**: 使用驼峰命名法
2. **错误处理**: 所有API方法都要有错误处理
3. **文档注释**: 使用JSDoc格式注释
4. **参数验证**: 在API方法中进行参数验证
5. **响应格式**: 使用统一的响应处理工具
