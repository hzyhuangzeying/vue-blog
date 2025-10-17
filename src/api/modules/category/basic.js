/**
 * 分类基础操作API
 */
import { ResponseHandler } from '@/utils/response'
import { http } from '../../request'

export const categoryBasicApi = {
  /**
   * 获取分类列表
   * @param {Object} params - 查询参数
   * @param {number} params.page - 页码
   * @param {number} params.size - 每页大小
   * @param {string} params.keyword - 搜索关键词
   * @returns {Promise} 分类列表
   */
  async getCategoryList(params) {
    try {
      const response = await http.get('/categories', params)
      return ResponseHandler.handlePageResponse(response)
    } catch (error) {
      ResponseHandler.handleError(error, '获取分类列表失败')
    }
  },

  /**
   * 获取分类详情
   * @param {number} id - 分类ID
   * @returns {Promise} 分类详情
   */
  async getCategoryDetail(id) {
    try {
      const response = await http.get(`/categories/${id}`)
      return ResponseHandler.handleSuccess(response)
    } catch (error) {
      ResponseHandler.handleError(error, '获取分类详情失败')
    }
  },

  /**
   * 创建分类
   * @param {Object} data - 分类数据
   * @param {string} data.name - 分类名称
   * @param {string} data.description - 分类描述
   * @param {string} data.icon - 分类图标
   * @param {string} data.color - 分类颜色
   * @returns {Promise} 创建结果
   */
  async createCategory(data) {
    try {
      const response = await http.post('/categories', data)
      return ResponseHandler.handleSuccess(response, '分类创建成功')
    } catch (error) {
      ResponseHandler.handleError(error, '分类创建失败')
    }
  },

  /**
   * 更新分类
   * @param {number} id - 分类ID
   * @param {Object} data - 分类数据
   * @returns {Promise} 更新结果
   */
  async updateCategory(id, data) {
    try {
      const response = await http.put(`/categories/${id}`, data)
      return ResponseHandler.handleSuccess(response, '分类更新成功')
    } catch (error) {
      ResponseHandler.handleError(error, '分类更新失败')
    }
  },

  /**
   * 删除分类
   * @param {number} id - 分类ID
   * @returns {Promise} 删除结果
   */
  async deleteCategory(id) {
    try {
      const response = await http.delete(`/categories/${id}`)
      return ResponseHandler.handleSuccess(response, '分类删除成功')
    } catch (error) {
      ResponseHandler.handleError(error, '分类删除失败')
    }
  }
}
