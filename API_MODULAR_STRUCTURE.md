# API 模块化结构说明

## 📁 **新的文件结构**

```
src/api/
├── index.js                    # 统一导出入口
├── request.js                  # 请求封装
└── modules/                    # 按功能分类的API模块
    ├── auth/                   # 认证模块
    │   ├── index.js           # 认证模块统一导出
    │   ├── login.js           # 登录注册相关
    │   └── token.js           # Token管理相关
    ├── user/                   # 用户模块
    │   ├── index.js           # 用户模块统一导出
    │   ├── profile.js         # 用户资料相关
    │   ├── follow.js          # 关注相关
    │   └── list.js            # 用户列表相关
    ├── article/                # 文章模块
    │   ├── index.js           # 文章模块统一导出
    │   ├── basic.js           # 文章基础操作
    │   ├── publish.js         # 文章发布相关
    │   ├── interaction.js     # 文章互动相关
    │   ├── comment.js         # 文章评论相关
    │   ├── search.js          # 文章搜索相关
    │   └── upload.js          # 文章上传相关
    ├── category/               # 分类模块
    │   ├── index.js           # 分类模块统一导出
    │   ├── basic.js           # 分类基础操作
    │   └── tree.js            # 分类树相关
    ├── tag/                    # 标签模块
    │   ├── index.js           # 标签模块统一导出
    │   ├── basic.js           # 标签基础操作
    │   └── search.js          # 标签搜索相关
    └── upload/                 # 上传模块
        ├── index.js           # 上传模块统一导出
        ├── file.js            # 文件上传相关
        └── image.js           # 图片上传相关
```

## 🎯 **模块细分说明**

### **1. 认证模块 (auth/)**
- **login.js**: 登录、注册、登出
- **token.js**: Token刷新、验证
- **index.js**: 统一导出

### **2. 用户模块 (user/)**
- **profile.js**: 用户信息、密码修改、头像上传
- **follow.js**: 关注、取消关注、关注列表、粉丝列表
- **list.js**: 用户列表、用户统计
- **index.js**: 统一导出

### **3. 文章模块 (article/)**
- **basic.js**: 文章CRUD操作
- **publish.js**: 文章发布、取消发布
- **interaction.js**: 点赞、收藏
- **comment.js**: 评论相关
- **search.js**: 搜索、热门、推荐、分类/标签/用户文章
- **upload.js**: 文章图片上传
- **index.js**: 统一导出

### **4. 分类模块 (category/)**
- **basic.js**: 分类CRUD操作
- **tree.js**: 分类树、文章数量统计
- **index.js**: 统一导出

### **5. 标签模块 (tag/)**
- **basic.js**: 标签CRUD操作
- **search.js**: 热门标签、搜索、文章数量统计
- **index.js**: 统一导出

### **6. 上传模块 (upload/)**
- **file.js**: 文件上传、删除、信息获取
- **image.js**: 图片上传、头像上传、文章图片上传
- **index.js**: 统一导出

## 🔧 **使用方式**

### **按模块导入**
```javascript
// 导入整个模块
import { authApi } from '@/api'

// 导入子模块
import { loginApi, tokenApi } from '@/api'

// 使用
const result = await loginApi.login({ username: 'admin', password: '123456' })
```

### **按功能导入**
```javascript
// 只导入需要的功能
import { articleBasicApi, articleSearchApi } from '@/api'

// 使用
const articles = await articleBasicApi.getArticleList({ page: 1, size: 10 })
const hotArticles = await articleSearchApi.getHotArticles({ limit: 5 })
```

### **在组件中使用**
```javascript
// Vue组件中
import { profileApi, followApi } from '@/api'

export default {
  async mounted() {
    try {
      // 获取用户信息
      const userInfo = await profileApi.getUserInfo()
      
      // 获取关注列表
      const following = await followApi.getFollowingList({ page: 1, size: 10 })
      
      console.log('用户信息:', userInfo)
      console.log('关注列表:', following)
    } catch (error) {
      console.error('获取数据失败:', error)
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
  
  const getUserInfo = async () => {
    try {
      const userInfo = await userApi.getUserInfo()
      return userInfo
    } catch (error) {
      throw error
    }
  }
  
  return { login, getUserInfo }
})
```

## 🚀 **优势**

### **1. 模块化程度更高**
- 每个文件职责单一，便于维护
- 按功能细分，查找更便捷
- 代码结构更清晰

### **2. 按需导入**
- 可以只导入需要的子模块
- 减少打包体积
- 提高代码可读性

### **3. 易于扩展**
- 新增功能只需在对应子模块中添加
- 不影响其他模块
- 便于团队协作

### **4. 维护性更好**
- 文件更小，修改影响范围小
- 功能分离，便于测试
- 代码复用性更高

## 📝 **扩展新功能**

### **添加新的API方法**
```javascript
// 在对应子模块文件中添加
export const newFeatureApi = {
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

### **创建新子模块**
```javascript
// 创建新子模块文件 src/api/modules/user/newFeature.js
import { ResponseHandler } from '@/utils/response'
import { http } from '../../request'

export const newFeatureApi = {
  // API方法...
}

// 在 src/api/modules/user/index.js 中导出
export { newFeatureApi } from './newFeature'

// 在 src/api/modules/user/index.js 中合并
export const userApi = {
  ...profileApi,
  ...followApi,
  ...userListApi,
  ...newFeatureApi  // 新增
}
```

## ⚠️ **注意事项**

1. **命名规范**: 使用驼峰命名法，子模块以`Api`结尾
2. **文件大小**: 单个文件不超过200行，保持简洁
3. **功能单一**: 每个文件只负责一个功能领域
4. **统一导出**: 每个模块都要有`index.js`统一导出
5. **错误处理**: 所有API方法都要有统一的错误处理
6. **文档注释**: 使用JSDoc格式注释，说明参数和返回值

## 🔄 **迁移指南**

### **从旧结构迁移**
```javascript
// 旧方式
import { userApi } from '@/api'
const userInfo = await userApi.getUserInfo()

// 新方式 - 可以继续使用
import { userApi } from '@/api'
const userInfo = await userApi.getUserInfo()

// 新方式 - 更精确的导入
import { profileApi } from '@/api'
const userInfo = await profileApi.getUserInfo()
```

### **逐步迁移**
1. 保持现有代码不变
2. 新功能使用新的子模块
3. 逐步重构旧代码
4. 最终统一使用新结构
