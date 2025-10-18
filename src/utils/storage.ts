/**
 * 本地存储工具类 (TypeScript版本)
 */
interface StorageInterface {
  /**
   * 设置值
   * @param key - 键名
   * @param value - 值，可以是对象或基本类型
   */
  set: (key: string, value: any) => void

  /**
   * 获取值
   * @param key - 键名
   * @param defaultValue - 默认值
   * @returns 存储的值，如果解析失败返回 defaultValue
   */
  get: <T = any>(key: string, defaultValue?: T) => T | string | null

  /**
   * 删除某个 key
   * @param key - 键名
   */
  remove: (key: string) => void

  /**
   * 清空所有 localStorage
   */
  clear: () => void
}

const storage: StorageInterface = {
  /**
   * 设置值
   * @param key - 键名
   * @param value - 值，可以是对象或基本类型
   */
  set: function(key: string, value: any): void {
    try {
      const data = typeof value === 'string' ? value : JSON.stringify(value)
      localStorage.setItem(key, data)
    } catch (err) {
      console.error('LocalStorage set error:', err)
    }
  },

  /**
   * 获取值
   * @param key - 键名
   * @param defaultValue - 默认值
   * @returns 存储的值，如果解析失败返回 defaultValue
   */
  get: function<T = any>(key: string, defaultValue: T | null = null): T | string | null {
    try {
      const data = localStorage.getItem(key)
      if (data === null) return defaultValue
      return JSON.parse(data)
    } catch (err) {
      return localStorage.getItem(key) || defaultValue
    }
  },

  /**
   * 删除某个 key
   * @param key - 键名
   */
  remove: function(key: string): void {
    localStorage.removeItem(key)
  },

  /**
   * 清空所有 localStorage
   */
  clear: function(): void {
    localStorage.clear()
  }
}

export default storage