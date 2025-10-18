/**
 * API响应类型定义 (TypeScript版本)
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
} as const

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
} as const

// 基础响应接口
export interface BaseResponse<T = any> {
  code: number
  message: string
  data: T
  success: boolean
  timestamp: number
}

// 分页信息接口
export interface Pagination {
  pageNum: number
  pageSize: number
  total: number
  pages: number
}

// 分页响应接口
export interface PageResponse<T> {
  list: T[]
  pagination: Pagination
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

// 登录响应接口
export interface LoginResponse {
  user: UserInfo
  token: string
  refreshToken: string
  expiresIn: number
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

// 分类信息接口
export interface Category {
  id: number
  name: string
  description: string
  icon: string
  color: string
  articleCount: number
  createdAt: string
  updatedAt: string
}

// 标签信息接口
export interface Tag {
  id: number
  name: string
  color: string
  articleCount: number
  createdAt: string
  updatedAt: string
}

// 评论信息接口
export interface Comment {
  id: number
  content: string
  author: UserInfo
  article: Article
  parentId: number | null
  replies: Comment[]
  likes: number
  createdAt: string
  updatedAt: string
}

// 文件上传响应接口
export interface UploadResponse {
  url: string
  filename: string
  size: number
  type: string
  id: string
}

// 统计信息接口
export interface StatsInfo {
  totalArticles: number
  totalViews: number
  totalLikes: number
  totalComments: number
  totalUsers: number
  todayArticles: number
  todayViews: number
}

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

// 更新用户信息请求接口
export interface UpdateUserRequest {
  nickname?: string
  email?: string
  bio?: string
  avatar?: string
}

// 修改密码请求接口
export interface ChangePasswordRequest {
  oldPassword: string
  newPassword: string
}

// 创建文章请求接口
export interface CreateArticleRequest {
  title: string
  content: string
  summary?: string
  cover?: string
  categoryId: number
  tagIds: number[]
  isPublished?: boolean
}

// 更新文章请求接口
export interface UpdateArticleRequest {
  title?: string
  content?: string
  summary?: string
  cover?: string
  categoryId?: number
  tagIds?: number[]
  isPublished?: boolean
}

// 创建分类请求接口
export interface CreateCategoryRequest {
  name: string
  description: string
  icon: string
  color: string
}

// 更新分类请求接口
export interface UpdateCategoryRequest {
  name?: string
  description?: string
  icon?: string
  color?: string
}

// 创建标签请求接口
export interface CreateTagRequest {
  name: string
  color: string
}

// 更新标签请求接口
export interface UpdateTagRequest {
  name?: string
  color?: string
}

// 添加评论请求接口
export interface AddCommentRequest {
  content: string
  parentId?: number
}

// 查询参数接口
export interface QueryParams {
  page?: number
  size?: number
  keyword?: string
}

// 文章查询参数接口
export interface ArticleQueryParams extends QueryParams {
  categoryId?: number
  tagId?: number
  authorId?: number
  isPublished?: boolean
}

// 用户查询参数接口
export interface UserQueryParams extends QueryParams {
  role?: string
  status?: string
}

// 搜索参数接口
export interface SearchParams {
  keyword: string
  type?: 'article' | 'user' | 'tag'
  page?: number
  size?: number
}

// 类型别名
export type ResponseCodeType = typeof ResponseCode[keyof typeof ResponseCode]
export type ResponseMessageType = typeof ResponseMessage[keyof typeof ResponseMessage]
