/**
 * API响应类型定义 (JavaScript版本)
 */

// 响应状态码常量
export const ResponseCode = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
  VALIDATION_ERROR: 422
}

// 响应消息常量
export const ResponseMessage = {
  SUCCESS: '操作成功',
  CREATED: '创建成功',
  UPDATED: '更新成功',
  DELETED: '删除成功',
  LOGIN_SUCCESS: '登录成功',
  LOGOUT_SUCCESS: '退出成功',
  REGISTER_SUCCESS: '注册成功',
  UPLOAD_SUCCESS: '上传成功',
  BAD_REQUEST: '请求参数错误',
  UNAUTHORIZED: '未授权访问',
  FORBIDDEN: '禁止访问',
  NOT_FOUND: '资源不存在',
  INTERNAL_ERROR: '服务器内部错误',
  VALIDATION_ERROR: '数据验证失败'
}

// 用户相关类型定义
export const UserTypes = {
  // 用户信息结构
  USER_INFO: {
    id: 'number',
    username: 'string',
    nickname: 'string',
    email: 'string',
    avatar: 'string',
    bio: 'string',
    followers: 'number',
    following: 'number',
    articles: 'number',
    createdAt: 'string',
    updatedAt: 'string'
  },
  
  // 登录响应结构
  LOGIN_RESPONSE: {
    user: 'object',
    token: 'string',
    refreshToken: 'string',
    expiresIn: 'number'
  }
}

// 文章相关类型定义
export const ArticleTypes = {
  // 文章信息结构
  ARTICLE_INFO: {
    id: 'number',
    title: 'string',
    content: 'string',
    summary: 'string',
    cover: 'string',
    author: 'object',
    category: 'object',
    tags: 'array',
    views: 'number',
    likes: 'number',
    comments: 'number',
    isPublished: 'boolean',
    createdAt: 'string',
    updatedAt: 'string',
    publishedAt: 'string'
  }
}

// 分类相关类型定义
export const CategoryTypes = {
  // 分类信息结构
  CATEGORY_INFO: {
    id: 'number',
    name: 'string',
    description: 'string',
    icon: 'string',
    color: 'string',
    articleCount: 'number',
    createdAt: 'string',
    updatedAt: 'string'
  }
}

// 标签相关类型定义
export const TagTypes = {
  // 标签信息结构
  TAG_INFO: {
    id: 'number',
    name: 'string',
    color: 'string',
    articleCount: 'number',
    createdAt: 'string',
    updatedAt: 'string'
  }
}

// 评论相关类型定义
export const CommentTypes = {
  // 评论信息结构
  COMMENT_INFO: {
    id: 'number',
    content: 'string',
    author: 'object',
    article: 'object',
    parentId: 'number',
    replies: 'array',
    likes: 'number',
    createdAt: 'string',
    updatedAt: 'string'
  }
}

// 文件上传相关类型定义
export const UploadTypes = {
  // 上传响应结构
  UPLOAD_RESPONSE: {
    url: 'string',
    filename: 'string',
    size: 'number',
    type: 'string',
    id: 'string'
  }
}

// 统计信息相关类型定义
export const StatsTypes = {
  // 统计信息结构
  STATS_INFO: {
    totalArticles: 'number',
    totalViews: 'number',
    totalLikes: 'number',
    totalComments: 'number',
    totalUsers: 'number',
    todayArticles: 'number',
    todayViews: 'number'
  }
}

// 分页相关类型定义
export const PageTypes = {
  // 分页参数结构
  PAGE_PARAMS: {
    page: 'number',
    size: 'number',
    total: 'number'
  },
  
  // 分页响应结构
  PAGE_RESPONSE: {
    list: 'array',
    total: 'number',
    page: 'number',
    size: 'number',
    pages: 'number'
  }
}
