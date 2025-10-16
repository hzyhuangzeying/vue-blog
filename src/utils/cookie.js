/**
 * Cookie操作工具类
 */

/**
 * 获取cookie值
 * @param {string} name - cookie名称
 * @returns {string|null} cookie值
 */
export const getCookie = (name) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return null
}

/**
 * 设置cookie
 * @param {string} name - cookie名称
 * @param {string} value - cookie值
 * @param {number} days - 过期天数，默认7天
 * @param {object} options - 其他选项
 */
export const setCookie = (name, value, days = 7, options = {}) => {
  const {
    path = '/',
    domain = '',
    secure = false,
    sameSite = 'Lax'
  } = options

  const expires = new Date()
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000))
  
  let cookieString = `${name}=${value};expires=${expires.toUTCString()};path=${path}`
  
  if (domain) {
    cookieString += `;domain=${domain}`
  }
  
  if (secure) {
    cookieString += ';secure'
  }
  
  if (sameSite) {
    cookieString += `;samesite=${sameSite}`
  }
  
  document.cookie = cookieString
}

/**
 * 删除cookie
 * @param {string} name - cookie名称
 * @param {string} path - cookie路径，默认'/'
 * @param {string} domain - cookie域名
 */
export const deleteCookie = (name, path = '/', domain = '') => {
  let cookieString = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=${path}`
  
  if (domain) {
    cookieString += `;domain=${domain}`
  }
  
  document.cookie = cookieString
}

/**
 * 获取所有cookie
 * @returns {object} 所有cookie的键值对
 */
export const getAllCookies = () => {
  const cookies = {}
  document.cookie.split(';').forEach(cookie => {
    const [name, value] = cookie.trim().split('=')
    if (name && value) {
      cookies[name] = decodeURIComponent(value)
    }
  })
  return cookies
}

/**
 * 检查cookie是否存在
 * @param {string} name - cookie名称
 * @returns {boolean} 是否存在
 */
export const hasCookie = (name) => {
  return getCookie(name) !== null
}

/**
 * 清除所有cookie
 * @param {string} path - cookie路径，默认'/'
 * @param {string} domain - cookie域名
 */
export const clearAllCookies = (path = '/', domain = '') => {
  const cookies = getAllCookies()
  Object.keys(cookies).forEach(name => {
    deleteCookie(name, path, domain)
  })
}

/**
 * 设置带过期时间的cookie
 * @param {string} name - cookie名称
 * @param {string} value - cookie值
 * @param {Date} expires - 过期时间
 * @param {object} options - 其他选项
 */
export const setCookieWithExpires = (name, value, expires, options = {}) => {
  const {
    path = '/',
    domain = '',
    secure = false,
    sameSite = 'Lax'
  } = options

  let cookieString = `${name}=${value};expires=${expires.toUTCString()};path=${path}`
  
  if (domain) {
    cookieString += `;domain=${domain}`
  }
  
  if (secure) {
    cookieString += ';secure'
  }
  
  if (sameSite) {
    cookieString += `;samesite=${sameSite}`
  }
  
  document.cookie = cookieString
}

/**
 * 设置会话cookie（浏览器关闭时删除）
 * @param {string} name - cookie名称
 * @param {string} value - cookie值
 * @param {object} options - 其他选项
 */
export const setSessionCookie = (name, value, options = {}) => {
  const {
    path = '/',
    domain = '',
    secure = false,
    sameSite = 'Lax'
  } = options

  let cookieString = `${name}=${value};path=${path}`
  
  if (domain) {
    cookieString += `;domain=${domain}`
  }
  
  if (secure) {
    cookieString += ';secure'
  }
  
  if (sameSite) {
    cookieString += `;samesite=${sameSite}`
  }
  
  document.cookie = cookieString
}
