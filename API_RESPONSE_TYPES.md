# API响应类型统一管理

## 🎯 **统一响应格式**

### **标准响应结构**

```typescript
interface BaseResponse<T = any> {
  code: number        // 响应状态码
  message: string     // 响应消息
  data: T            // 响应数据
  success: boolean   // 是否成功
  timestamp: number  // 时间戳
}
```

### **分页响应结构**

```typescript
interface PageResponse<T = any> {
  code: number
  message: string
  data: {
    list: T[]        // 数据列表
    total: number    // 总数
    page: number     // 当前页
    size: number     // 每页大小
    pages: number    // 总页数
  }
  success: boolean
  timestamp: number
}
```

## 🔧 **响应处理工具**

### **ResponseHandler 类**

```javascript
import { ResponseHandler } from '@/utils/response'

// 处理成功响应
const data = ResponseHandler.handleSuccess(response, '操作成功')

// 处理分页响应
const pageData = ResponseHandler.handlePageResponse(response)

// 处理列表响应
const listData = ResponseHandler.handleListResponse(response)
```

### **创建标准响应**

```javascript
import { createResponse, createPageResponse, createErrorResponse } from '@/utils/response'

// 创建成功响应
const successResponse = createResponse(data, '操作成功', 200)

// 创建分页响应
const pageResponse = createPageResponse(list, total, page, size, '获取成功')

// 创建错误响应
const errorResponse = createErrorResponse('操作失败', 500, details)
```

## 📝 **API使用示例**

### **用户API**

```javascript
// 登录
const loginResult = await userApi.login({
  username: 'admin',
  password: '123456'
})
// 返回: { user: {...}, token: '...' }

// 获取用户信息
const userInfo = await userApi.getUserInfo()
// 返回: { id: 1, username: 'admin', ... }

// 获取用户列表（分页）
const userList = await userApi.getUserList({ page: 1, size: 10 })
// 返回: { list: [...], total: 100, page: 1, size: 10, pages: 10 }
```

### **文章API**

```javascript
// 获取文章列表
const articles = await articleApi.getArticleList({ page: 1, size: 10 })
// 返回: { list: [...], total: 50, page: 1, size: 10, pages: 5 }

// 获取文章详情
const article = await articleApi.getArticleDetail(1)
// 返回: { id: 1, title: '...', content: '...', ... }
```

## 🎨 **响应状态码**

```javascript
export const ResponseCode = {
  SUCCESS: 200,           // 成功
  CREATED: 201,           // 创建成功
  BAD_REQUEST: 400,       // 请求参数错误
  UNAUTHORIZED: 401,      // 未授权
  FORBIDDEN: 403,         // 禁止访问
  NOT_FOUND: 404,         // 资源不存在
  INTERNAL_ERROR: 500,    // 服务器错误
  VALIDATION_ERROR: 422   // 数据验证失败
}
```

## 🔄 **响应拦截器**

### **自动处理**

```javascript
// 请求拦截器
request.interceptors.request.use((config) => {
  // 自动添加认证头
  const token = getCookie('Authorization')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器
request.interceptors.response.use(
  responseInterceptor.onFulfilled,  // 成功处理
  responseInterceptor.onRejected    // 错误处理
)
```

### **错误自动处理**

- **401**: 自动清除token并跳转登录页
- **403**: 显示权限不足提示
- **404**: 显示资源不存在提示
- **422**: 显示数据验证失败提示
- **500**: 显示服务器错误提示

## 📊 **数据类型定义**

### **用户类型**

```typescript
interface UserInfo {
  id: number
  username: string
  nickname: string
  email: string
  avatar: string
  bio: string
  followers: number
  following: number
  articles: number
  createdAt: string
  updatedAt: string
}
```

### **文章类型**

```typescript
interface ArticleInfo {
  id: number
  title: string
  content: string
  summary: string
  cover: string
  author: UserInfo
  category: CategoryInfo
  tags: TagInfo[]
  views: number
  likes: number
  comments: number
  isPublished: boolean
  createdAt: string
  updatedAt: string
  publishedAt?: string
}
```

## 🚀 **最佳实践**

### **1. 统一错误处理**

```javascript
// 在API方法中使用try-catch
async getUserInfo() {
  try {
    const response = await http.get('/user/info')
    return ResponseHandler.handleSuccess(response)
  } catch (error) {
    ResponseHandler.handleError(error, '获取用户信息失败')
  }
}
```

### **2. 类型安全**

```javascript
// 使用TypeScript类型定义
import type { UserInfo, ArticleInfo } from '@/types/api'

const user: UserInfo = await userApi.getUserInfo()
const article: ArticleInfo = await articleApi.getArticleDetail(1)
```

### **3. 响应验证**

```javascript
// 验证响应格式
const validateResponse = (response) => {
  return response && 
         typeof response.code === 'number' && 
         typeof response.message === 'string' &&
         response.hasOwnProperty('data')
}
```

## 🔍 **调试响应**

### **开发环境调试**

```javascript
// 在开发环境中打印响应
if (import.meta.env.DEV) {
  console.log('API Response:', response)
  console.log('Response Type:', typeof response.data)
}
```

### **响应日志**

```javascript
// 记录API调用日志
const logApiCall = (url, method, response) => {
  console.log(`[API] ${method.toUpperCase()} ${url}`, {
    status: response.code,
    message: response.message,
    dataType: Array.isArray(response.data) ? 'array' : typeof response.data
  })
}
```

## ⚠️ **注意事项**

1. **响应格式一致性**: 确保所有API返回相同格式
2. **错误处理**: 统一处理各种错误情况
3. **类型安全**: 使用TypeScript定义响应类型
4. **性能优化**: 避免重复的数据转换
5. **向后兼容**: 保持API响应格式的向后兼容性
