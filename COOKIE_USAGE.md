# Cookie 存储使用说明

## 🍪 **Cookie vs localStorage 对比**

### **Cookie 优势**
- ✅ **自动发送到服务器**（适合token）
- ✅ 支持过期时间设置
- ✅ 支持域名和路径限制
- ✅ 支持安全选项（secure, sameSite）
- ✅ 服务器端可读取
- ✅ 无需手动处理Authorization头

### **localStorage 特点**
- ❌ 不会自动发送到服务器
- ✅ 存储容量更大（5-10MB）
- ✅ 不会过期（除非手动删除）
- ❌ 仅客户端可访问
- ❌ 需要手动添加到请求头

## 🔧 **Cookie 工具函数**

### **基础操作**

```javascript
import { getCookie, setCookie, deleteCookie } from '@/utils/cookie'

// 获取cookie
const token = getCookie('token')

// 设置cookie（7天过期）
setCookie('token', 'your-token-value', 7)

// 删除cookie
deleteCookie('token')
```

### **高级操作**

```javascript
import { 
  setCookieWithExpires, 
  setSessionCookie, 
  getAllCookies,
  hasCookie,
  clearAllCookies 
} from '@/utils/cookie'

// 设置指定过期时间的cookie
const expires = new Date('2024-12-31')
setCookieWithExpires('token', 'value', expires)

// 设置会话cookie（浏览器关闭时删除）
setSessionCookie('sessionId', 'session-value')

// 获取所有cookie
const allCookies = getAllCookies()

// 检查cookie是否存在
if (hasCookie('token')) {
  console.log('用户已登录')
}

// 清除所有cookie
clearAllCookies()
```

### **安全选项**

```javascript
// 设置安全的cookie
setCookie('token', 'value', 7, {
  secure: true,        // 仅HTTPS传输
  sameSite: 'Strict',  // 防止CSRF攻击
  domain: '.yourapp.com' // 域名限制
})
```

## 🔄 **在项目中的使用**

### **1. API请求自动携带cookie**

```javascript
// src/api/request.js
// 配置axios自动携带cookie
const request = axios.create({
  baseURL: 'http://localhost:3001/api',
  withCredentials: true // 自动携带cookie
})

// 不需要手动获取token，cookie会自动发送到服务器
```

### **2. 用户登录时设置token**

```javascript
// src/stores/user.js
const login = async (loginData) => {
  const response = await userApi.login(loginData)
  setCookie('token', response.token, 7) // 7天过期
  setCookie('user', JSON.stringify(response.user), 7)
}
```

### **3. 用户登出时清除token**

```javascript
// src/stores/user.js
const logout = () => {
  deleteCookie('token')
  deleteCookie('user')
}
```

### **4. 401错误自动清除token**

```javascript
// src/api/request.js
// 响应拦截器处理401错误
case 401:
  deleteCookie('token')
  deleteCookie('user')
  ElMessage.error('登录已过期，请重新登录')
  window.location.href = '/login'
  break
```

## ⚙️ **Cookie 配置选项**

### **过期时间**
```javascript
setCookie('token', 'value', 7)  // 7天后过期
setCookie('token', 'value', 30) // 30天后过期
setCookie('token', 'value', 0)  // 会话cookie
```

### **安全选项**
```javascript
setCookie('token', 'value', 7, {
  secure: true,           // 仅HTTPS
  sameSite: 'Strict',     // 严格同站策略
  domain: '.yourapp.com', // 域名限制
  path: '/admin'          // 路径限制
})
```

### **SameSite 选项**
- `'Strict'`: 最严格，仅同站请求
- `'Lax'`: 默认，允许导航请求
- `'None'`: 允许跨站请求（需要secure）

## 🔍 **调试Cookie**

### **浏览器开发者工具**
1. 打开开发者工具 (F12)
2. 切换到 Application/存储 标签
3. 查看 Cookies 部分
4. 可以看到所有cookie的详细信息

### **代码中调试**
```javascript
// 获取所有cookie
console.log('所有cookie:', getAllCookies())

// 检查特定cookie
console.log('token存在:', hasCookie('token'))
console.log('token值:', getCookie('token'))
```

## ⚠️ **注意事项**

1. **Cookie大小限制**: 单个cookie最大4KB
2. **域名限制**: cookie只能被设置它的域名访问
3. **安全传输**: 生产环境建议使用HTTPS和secure选项
4. **过期时间**: 合理设置过期时间，避免token长期有效
5. **敏感信息**: 不要在cookie中存储敏感信息
6. **CORS配置**: 服务器需要配置CORS允许credentials
7. **自动携带**: 设置`withCredentials: true`后，所有请求都会自动携带cookie

## 🚀 **最佳实践**

1. **Token存储**: 使用cookie存储认证token
2. **过期时间**: 设置合理的过期时间（如7天）
3. **安全选项**: 生产环境启用secure和sameSite
4. **自动清理**: 401错误时自动清除过期token
5. **调试工具**: 使用浏览器开发者工具调试cookie

## 🔧 **服务器端配置**

### **CORS配置示例**

```javascript
// Express.js
app.use(cors({
  origin: 'http://localhost:3000', // 前端地址
  credentials: true // 允许携带cookie
}))

// 或者
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})
```

### **读取Cookie**

```javascript
// Express.js
app.get('/api/user', (req, res) => {
  const token = req.cookies.token // 自动解析cookie
  // 验证token...
})
```
