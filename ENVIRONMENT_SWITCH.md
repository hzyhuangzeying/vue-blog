# 环境切换控制说明

## 🔄 **环境切换方式**

### 1. **通过启动命令切换**

在项目根目录运行不同的命令来切换环境：

```bash
# 开发环境 (默认)
npm run dev
# 或
npm run dev --mode development

# 测试环境
npm run dev:test
# 或
npm run dev --mode test

# 预发布环境
npm run dev:staging
# 或
npm run dev --mode staging

# 生产环境构建
npm run build
# 或
npm run build --mode production
```

### 2. **环境文件对应关系**

| 环境 | 启动命令 | 环境文件 | 端口 | API地址 |
|------|----------|----------|------|---------|
| 开发环境 | `npm run dev` | `env.development` | 3000 | `http://localhost:3001/api` |
| 测试环境 | `npm run dev:test` | `env.test` | 3001 | `http://test-api.yourapp.com/api` |
| 预发布环境 | `npm run dev:staging` | `env.staging` | 3002 | `http://staging-api.yourapp.com/api` |
| 生产环境 | `npm run build` | `env.production` | - | `https://api.yourapp.com/api` |

### 3. **环境文件内容**

#### **开发环境** (`env.development`)
```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_TITLE=ByteJourney Blog
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=development
```

#### **测试环境** (`env.test`)
```env
VITE_API_BASE_URL=http://test-api.yourapp.com/api
VITE_APP_TITLE=ByteJourney Blog (Test)
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=test
```

#### **预发布环境** (`env.staging`)
```env
VITE_API_BASE_URL=http://staging-api.yourapp.com/api
VITE_APP_TITLE=ByteJourney Blog (Staging)
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=staging
```

#### **生产环境** (`env.production`)
```env
VITE_API_BASE_URL=https://api.yourapp.com/api
VITE_APP_TITLE=ByteJourney Blog
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=production
```

### 4. **在代码中获取当前环境**

```javascript
// 获取当前环境
const currentEnv = import.meta.env.VITE_APP_ENV
console.log('当前环境:', currentEnv)

// 获取API地址
const apiUrl = import.meta.env.VITE_API_BASE_URL
console.log('API地址:', apiUrl)

// 判断环境
if (import.meta.env.VITE_APP_ENV === 'development') {
  console.log('开发环境')
} else if (import.meta.env.VITE_APP_ENV === 'production') {
  console.log('生产环境')
}
```

### 5. **环境切换流程**

1. **修改环境文件**：根据需要修改对应环境的配置文件
2. **重启服务器**：修改环境变量后需要重启开发服务器
3. **验证配置**：在浏览器控制台检查环境变量是否正确加载

### 6. **常用操作**

```bash
# 启动开发环境
npm run dev

# 启动测试环境
npm run dev:test

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

### 7. **注意事项**

- 环境变量必须以 `VITE_` 开头才能在客户端代码中访问
- 修改环境文件后需要重启开发服务器
- 生产环境构建时会自动使用 `env.production` 文件
- 不同环境使用不同的端口，避免冲突

### 8. **环境变量优先级**

1. 命令行参数 `--mode`
2. 环境文件 (`.env.{mode}`)
3. 默认值 (代码中的 fallback)
