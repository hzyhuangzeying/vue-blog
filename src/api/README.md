# API 请求封装使用说明

## 目录结构
```
src/api/
├── request.js      # axios 请求封装
├── user.js         # 用户相关API
├── article.js      # 文章相关API
├── category.js     # 分类相关API
├── tag.js          # 标签相关API
├── upload.js       # 文件上传API
├── index.js        # 统一导出
└── README.md       # 使用说明
```

## 环境配置

在项目根目录创建 `.env.development` 文件：
```env
# 开发环境配置
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_TITLE=ByteJourney Blog
VITE_APP_VERSION=1.0.0
```

## 使用方法

### 1. 基础请求方法

```javascript
import { http } from '@/api'

// GET 请求
const data = await http.get('/users', { page: 1, size: 10 })

// POST 请求
const result = await http.post('/users', { name: 'John', email: 'john@example.com' })

// PUT 请求
const updated = await http.put('/users/1', { name: 'Jane' })

// DELETE 请求
await http.delete('/users/1')
```

### 2. 模块化API使用

```javascript
import { userApi, articleApi } from '@/api'

// 用户相关
const userInfo = await userApi.getUserInfo()
await userApi.updateUserInfo({ nickname: '新昵称' })

// 文章相关
const articles = await articleApi.getArticleList({ page: 1 })
const article = await articleApi.getArticleDetail(1)
```

### 3. 文件上传

```javascript
import { uploadApi } from '@/api'

// 上传文件
const file = document.getElementById('fileInput').files[0]
const result = await uploadApi.uploadFile(file, (progress) => {
  console.log(`上传进度: ${progress}%`)
})
```

### 4. 在组件中使用

```vue
<template>
  <div>
    <button @click="loadUsers">加载用户</button>
    <button @click="createUser">创建用户</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { userApi } from '@/api'

const users = ref([])

const loadUsers = async () => {
  try {
    users.value = await userApi.getUserList({ page: 1, size: 10 })
  } catch (error) {
    console.error('加载用户失败:', error)
  }
}

const createUser = async () => {
  try {
    await userApi.register({
      username: 'test',
      email: 'test@example.com',
      password: '123456'
    })
    console.log('用户创建成功')
  } catch (error) {
    console.error('创建用户失败:', error)
  }
}
</script>
```

### 5. 在Store中使用

```javascript
// stores/user.js
import { defineStore } from 'pinia'
import { userApi } from '@/api'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token')
  }),
  
  actions: {
    async login(credentials) {
      try {
        const result = await userApi.login(credentials)
        this.token = result.token
        this.user = result.user
        localStorage.setItem('token', result.token)
        return result
      } catch (error) {
        throw error
      }
    },
    
    async getUserInfo() {
      try {
        const userInfo = await userApi.getUserInfo()
        this.user = userInfo
        return userInfo
      } catch (error) {
        throw error
      }
    }
  }
})
```

## 特性

- ✅ 自动添加 Authorization 头
- ✅ 请求/响应拦截器
- ✅ 错误统一处理
- ✅ 请求超时处理
- ✅ 文件上传进度回调
- ✅ 文件下载功能
- ✅ TypeScript 支持（可选）
- ✅ 环境变量配置

## 错误处理

所有API请求都会自动处理常见错误：
- 401: 自动清除token并跳转登录页
- 403: 权限不足提示
- 404: 资源不存在提示
- 500: 服务器错误提示
- 网络错误: 网络连接提示

## 注意事项

1. 所有API请求都返回Promise，需要使用async/await或.then()处理
2. 文件上传需要传入File对象和可选的进度回调函数
3. 请求会自动添加时间戳防止GET请求缓存
4. 支持自定义请求配置，如headers、timeout等
