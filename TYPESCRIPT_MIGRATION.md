# TypeScript 迁移指南

## 🎯 **迁移完成！**

项目已成功从JavaScript迁移到TypeScript，提高了代码的类型安全性和团队协作友好性。

## 📁 **新的文件结构**

```
src/
├── types/
│   └── api.ts                    # API类型定义
├── utils/
│   ├── cookie.ts                 # Cookie工具类
│   ├── response.ts               # 响应处理工具
│   └── tokenManager.ts           # Token管理工具
├── api/
│   ├── request.ts                # 请求封装
│   ├── requestWithRefresh.ts     # 带自动刷新的请求封装
│   ├── index.ts                  # API统一导出
│   └── modules/                  # API模块
│       ├── auth/
│       │   ├── index.ts
│       │   ├── login.ts
│       │   └── token.ts
│       ├── user/
│       │   ├── index.ts
│       │   ├── profile.ts
│       │   ├── follow.ts
│       │   └── list.ts
│       ├── article/
│       │   ├── index.ts
│       │   ├── basic.ts
│       │   ├── publish.ts
│       │   ├── interaction.ts
│       │   ├── comment.ts
│       │   ├── search.ts
│       │   └── upload.ts
│       ├── category/
│       │   ├── index.ts
│       │   ├── basic.ts
│       │   └── tree.ts
│       ├── tag/
│       │   ├── index.ts
│       │   ├── basic.ts
│       │   └── search.ts
│       └── upload/
│           ├── index.ts
│           ├── file.ts
│           └── image.ts
└── stores/
    └── userWithRefresh.ts        # 用户Store
```

## 🔧 **配置文件**

### **tsconfig.json**
```json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "include": ["env.d.ts", "src/**/*", "src/**/*.vue"],
  "exclude": ["src/**/__tests__/*"],
  "compilerOptions": {
    "composite": true,
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] },
    "types": ["node"],
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ESNext", "DOM", "DOM.Iterable"],
    "target": "ESNext"
  }
}
```

### **env.d.ts**
```typescript
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_ENV: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

## 📦 **依赖更新**

### **新增依赖**
```json
{
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@vue/tsconfig": "^0.5.1",
    "typescript": "^5.3.0",
    "vue-tsc": "^1.8.25"
  }
}
```

### **脚本更新**
```json
{
  "scripts": {
    "build": "vue-tsc && vite build --mode production",
    "build:test": "vue-tsc && vite build --mode test",
    "build:staging": "vue-tsc && vite build --mode staging",
    "type-check": "vue-tsc --noEmit"
  }
}
```

## 🎯 **类型定义**

### **API类型**
```typescript
// 基础响应接口
export interface BaseResponse<T = any> {
  code: number
  message: string
  data: T
  success: boolean
  timestamp: number
}

// 用户信息接口
export interface UserInfo {
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

// 文章信息接口
export interface Article {
  id: number
  title: string
  content: string
  summary: string
  cover: string
  author: UserInfo
  category: Category
  tags: Tag[]
  views: number
  likes: number
  comments: number
  isPublished: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
}
```

### **请求参数类型**
```typescript
// 登录请求接口
export interface LoginRequest {
  username: string
  password: string
}

// 注册请求接口
export interface RegisterRequest {
  username: string
  password: string
  email: string
  nickname: string
}

// 查询参数接口
export interface QueryParams {
  page?: number
  size?: number
  keyword?: string
}
```

## 💡 **使用示例**

### **API调用**
```typescript
import { authApi, userApi } from '@/api'
import type { LoginRequest, UserInfo } from '@/types/api'

// 登录
const loginData: LoginRequest = {
  username: 'admin',
  password: '123456'
}

const result = await authApi.login(loginData)
// result 自动推断为 LoginResponse 类型

// 获取用户信息
const userInfo: UserInfo = await userApi.getUserInfo()
```

### **Store使用**
```typescript
import { useUserStoreWithRefresh } from '@/stores/userWithRefresh'
import type { LoginRequest } from '@/types/api'

const userStore = useUserStoreWithRefresh()

// 登录
const loginData: LoginRequest = {
  username: 'admin',
  password: '123456'
}

const result = await userStore.login(loginData)
// result 自动推断为 { success: boolean; user?: UserInfo; message?: string }
```

### **组件中使用**
```vue
<template>
  <div>
    <div v-if="userStore.isLoggedIn">
      欢迎，{{ userStore.user?.nickname }}！
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStoreWithRefresh } from '@/stores/userWithRefresh'
import type { UserInfo } from '@/types/api'

const userStore = useUserStoreWithRefresh()

// 类型安全的用户信息
const user: UserInfo | null = userStore.user
</script>
```

## 🚀 **优势**

### **1. 类型安全**
- 编译时类型检查
- 自动补全和智能提示
- 减少运行时错误

### **2. 团队协作**
- 清晰的接口定义
- 统一的代码规范
- 更好的代码可读性

### **3. 开发体验**
- IDE支持更好
- 重构更安全
- 文档化更好

### **4. 维护性**
- 类型约束减少bug
- 接口变更更容易追踪
- 代码质量更高

## 🔧 **开发命令**

```bash
# 开发模式
npm run dev

# 类型检查
npm run type-check

# 构建项目
npm run build

# 代码检查
npm run lint
```

## ⚠️ **注意事项**

1. **严格模式**：启用了TypeScript严格模式，需要处理所有类型
2. **类型导入**：使用`import type`导入类型定义
3. **接口定义**：所有API都有对应的TypeScript接口
4. **错误处理**：所有异步操作都有正确的错误类型
5. **泛型支持**：API响应使用泛型提供类型安全

## 🔄 **迁移完成**

- ✅ 所有JavaScript文件已转换为TypeScript
- ✅ 添加了完整的类型定义
- ✅ 配置了TypeScript编译选项
- ✅ 更新了构建脚本
- ✅ 保持了原有的功能不变

现在您的项目已经完全支持TypeScript，享受更好的类型安全和开发体验！
