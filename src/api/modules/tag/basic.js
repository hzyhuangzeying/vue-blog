/**
 * 标签基础操作API
 */
import { ResponseHandler } from '@/utils/response'
import { http } from '../../request'

export const tagBasicApi = {
  /**
   * 获取标签列表
   * @param {Object} params - 查询参数
   * @param {number} params.page - 页码
   * @param {number} params.size - 每页大小
   * @param {string} params.keyword - 搜索关键词
   * @returns {Promise} 标签列表
   */
  async getTagList(params) {
    try {
      const response = await http.get('/tags', params)
      return ResponseHandler.handlePageResponse(response)
    } catch (error) {
      ResponseHandler.handleError(error, '获取标签列表失败')
    }
  },

  /**
   * 获取标签详情
   * @param {number} id - 标签ID
   * @returns {Promise} 标签详情
   */
  async getTagDetail(id) {
    try {
      const response = await http.get(`/tags/${id}`)
      return ResponseHandler.handleSuccess(response)
    } catch (error) {
      ResponseHandler.handleError(error, '获取标签详情失败')
    }
  },

  /**
   * 创建标签
   * @param {Object} data - 标签数据
   * @param {string} data.name - 标签名称
   * @param {string} data.color - 标签颜色
   * @returns {Promise} 创建结果
   */
  async createTag(data) {
    try {
      const response = await http.post('/tags', data)
      return ResponseHandler.handleSuccess(response, '标签创建成功')
    } catch (error) {
      ResponseHandler.handleError(error, '标签创建失败')
    }
  },

  /**
   * 更新标签
   * @param {number} id - 标签ID
   * @param {Object} data - 标签数据
   * @returns {Promise} 更新结果
   */
  async updateTag(id, data) {
    try {
      const response = await http.put(`/tags/${id}`, data)
      return ResponseHandler.handleSuccess(response, '标签更新成功')
    } catch (error) {
      ResponseHandler.handleError(error, '标签更新失败')
    }
  },

  /**
   * 删除标签
   * @param {number} id - 标签ID
   * @returns {Promise} 删除结果
   */
  async deleteTag(id) {
    try {
      const response = await http.delete(`/tags/${id}`)
      return ResponseHandler.handleSuccess(response, '标签删除成功')
    } catch (error) {
      ResponseHandler.handleError(error, '标签删除失败')
    }
  }
}
