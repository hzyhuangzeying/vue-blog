# API 配置说明

## 环境变量配置

`VITE_API_BASE_URL` 环境变量用于配置API的基础URL。

### 配置方法

#### 方法1：创建环境文件（推荐）

在项目根目录创建以下文件：

**`.env.development`** (开发环境)
```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_TITLE=ByteJourney Blog
VITE_APP_VERSION=1.0.0
```

**`.env.production`** (生产环境)
```env
VITE_API_BASE_URL=https://api.yourapp.com/api
VITE_APP_TITLE=ByteJourney Blog
VITE_APP_VERSION=1.0.0
```

#### 方法2：直接在代码中修改

如果无法创建环境文件，可以直接修改 `src/api/request.js` 文件中的默认值：

```javascript
const request = axios.create({
  baseURL: 'http://your-api-server.com/api', // 修改这里
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})
```

### 当前配置

- **开发环境默认值**: `http://localhost:3001/api`
- **生产环境**: 需要根据实际部署情况配置

### 注意事项

1. 环境变量必须以 `VITE_` 开头才能在客户端代码中访问
2. 修改环境变量后需要重启开发服务器
3. 生产环境部署时需要确保后端API服务正常运行

### 测试API连接

您可以通过以下方式测试API连接：

```javascript
import { http } from '@/api'

// 测试连接
http.get('/health').then(res => {
  console.log('API连接正常:', res)
}).catch(err => {
  console.error('API连接失败:', err)
})
```
