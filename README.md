# Vue Blog - CSDN风格的技术博客平台

一个基于 Vue 3 + Element Plus 构建的现代化技术博客平台，具有类似CSDN的功能和界面设计。

## ✨ 功能特性

### 🏠 核心功能
- **首页展示** - 轮播图、最新文章、热门文章、推荐作者
- **文章系统** - 文章列表、详情页、分类浏览、标签系统
- **用户系统** - 登录注册、个人中心、用户资料管理
- **内容创作** - Markdown编辑器、文章发布、草稿保存
- **搜索功能** - 全文搜索、关键词高亮、筛选排序

### 🎨 界面设计
- **响应式布局** - 完美适配桌面端和移动端
- **现代化UI** - 基于Element Plus的优雅界面
- **全屏体验** - 页面填充满整个浏览器，无左右留白
- **暗色主题** - 支持主题切换（可扩展）

### 🔧 技术栈
- **前端框架**: Vue 3 (Composition API)
- **UI组件库**: Element Plus
- **状态管理**: Pinia
- **路由管理**: Vue Router 4
- **构建工具**: Vite
- **样式预处理**: Sass/SCSS
- **图标库**: Element Plus Icons
- **日期处理**: date-fns

## 🚀 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 📁 项目结构

```
vue-blog/
├── public/                 # 静态资源
├── src/
│   ├── components/         # 公共组件
│   │   └── ArticleCard.vue # 文章卡片组件
│   ├── layout/            # 布局组件
│   │   ├── index.vue      # 主布局
│   │   └── components/    # 布局子组件
│   │       ├── Header.vue # 头部导航
│   │       └── Sidebar.vue # 侧边栏
│   ├── router/            # 路由配置
│   │   └── index.js
│   ├── stores/            # 状态管理
│   │   ├── user.js        # 用户状态
│   │   └── articles.js    # 文章状态
│   ├── styles/            # 样式文件
│   │   ├── variables.scss # SCSS变量
│   │   └── index.scss     # 全局样式
│   ├── views/             # 页面组件
│   │   ├── Home.vue       # 首页
│   │   ├── Articles.vue   # 文章列表
│   │   ├── ArticleDetail.vue # 文章详情
│   │   ├── Login.vue      # 登录页
│   │   ├── Register.vue   # 注册页
│   │   ├── Profile.vue    # 个人中心
│   │   ├── Write.vue      # 写文章
│   │   ├── Search.vue     # 搜索页
│   │   ├── Category.vue   # 分类页
│   │   └── NotFound.vue   # 404页面
│   ├── App.vue            # 根组件
│   └── main.js            # 入口文件
├── index.html             # HTML模板
├── package.json           # 项目配置
├── vite.config.js         # Vite配置
└── README.md              # 项目说明
```

## 🎯 主要页面

### 首页 (/)
- 轮播图展示热门内容
- 最新文章网格布局
- 热门文章推荐
- 推荐作者展示

### 文章列表 (/articles)
- 文章卡片网格布局
- 分类筛选
- 排序功能（最新、最多阅读、最多点赞）
- 分页导航

### 文章详情 (/article/:id)
- 文章内容展示
- 作者信息
- 相关文章推荐
- 评论区
- 点赞、分享、收藏功能

### 写文章 (/write)
- Markdown编辑器
- 实时预览
- 文章信息设置（标题、摘要、分类、标签、封面）
- 草稿保存
- 文章发布

### 个人中心 (/profile)
- 用户信息展示
- 我的文章管理
- 收藏文章
- 个人设置

### 搜索 (/search)
- 关键词搜索
- 搜索结果高亮
- 多种排序方式
- 时间筛选

## 🔐 用户系统

### 登录信息
- 用户名: `admin`
- 密码: `123456`

### 功能特性
- 用户注册/登录
- 个人资料管理
- 头像上传
- 文章管理
- 收藏功能

## 📱 响应式设计

项目采用移动优先的响应式设计：

- **桌面端** (>1024px): 完整布局，包含侧边栏
- **平板端** (768px-1024px): 自适应布局
- **移动端** (<768px): 单列布局，隐藏侧边栏

## 🎨 样式系统

### 设计变量
- 统一的颜色系统
- 一致的间距规范
- 标准化的字体大小
- 统一的圆角和阴影

### 主题支持
- 支持CSS变量
- 易于扩展暗色主题
- 组件级别的样式隔离

## 🔧 开发说明

### 代码规范
- 使用ESLint进行代码检查
- 遵循Vue 3 Composition API最佳实践
- 组件化开发，提高代码复用性

### 状态管理
- 使用Pinia进行状态管理
- 模块化的store设计
- 响应式数据更新

### 路由设计
- 嵌套路由结构
- 路由守卫保护
- 动态路由参数

## 🚀 部署说明

### 构建生产版本
```bash
npm run build
```

构建完成后，`dist` 目录包含所有静态文件，可以部署到任何静态文件服务器。

### 推荐部署平台
- Vercel
- Netlify
- GitHub Pages
- 阿里云OSS
- 腾讯云COS

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- 提交 GitHub Issue
- 发送邮件至项目维护者

---

**享受编码的乐趣！** 🎉
