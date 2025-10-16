# 静态图片资源说明

## 目录结构
```
public/
├── images/
│   ├── icons/          # 图标文件
│   ├── logos/          # Logo文件
│   └── README.md       # 说明文件
```

## 使用方法

### 1. 放置图片文件
将您的静态图片文件放在对应的目录中：
- **Logo文件** → `public/images/logos/`
- **图标文件** → `public/images/icons/`

### 2. 在代码中引用
由于文件放在 `public` 目录下，可以直接通过根路径访问：

```vue
<template>
  <!-- 使用Logo -->
  <img src="/images/logos/logo.png" alt="ByteJourney Logo" />
  
  <!-- 使用图标 -->
  <img src="/images/icons/home.png" alt="首页图标" />
</template>
```

### 3. 在CSS中引用
```scss
.logo {
  background-image: url('/images/logos/logo.png');
}

.icon {
  background-image: url('/images/icons/icon.png');
}
```

### 4. 在JavaScript中引用
```javascript
const logoUrl = '/images/logos/logo.png'
const iconUrl = '/images/icons/icon.png'
```

## 注意事项
- 所有放在 `public` 目录下的文件都会被打包到最终构建的根目录
- 使用绝对路径 `/images/...` 来引用，不要使用相对路径
- 建议使用 PNG、SVG、JPG 等常见格式
- 文件名建议使用小写字母和连字符，如 `logo-main.png`

## 推荐的文件命名
- Logo: `logo.png`, `logo-dark.png`, `logo-light.png`
- 图标: `home.png`, `user.png`, `search.png`, `menu.png`
