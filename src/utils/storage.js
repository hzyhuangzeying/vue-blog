const storage = {
    /**
     * 设置值
     * @param {string} key 键名
     * @param {any} value 值，可以是对象或基本类型
     */
    set: function(key, value) {
        try {
            const data = typeof value === 'string' ? value : JSON.stringify(value)
            localStorage.setItem(key, data)
        } catch (err) {
            console.error('LocalStorage set error:', err)
        }
    },

    /**
     * 获取值
     * @param {string} key 键名
     * @param {any} defaultValue 默认值
     * @returns 存储的值，如果解析失败返回 defaultValue
     */
    get: function(key, defaultValue = null) {
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
     * @param {string} key
     */
    remove: function(key) {
        localStorage.removeItem(key)
    },

    /**
     * 清空所有 localStorage
     */
    clear: function() {
        localStorage.clear()
    }
}
export default storage