/**
 * Cookie工具类 (TypeScript版本)
 */

/**
 * 获取指定名称的cookie值
 * @param name - cookie名称
 * @returns cookie值或null
 */
export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

/**
 * 设置cookie
 * @param name - cookie名称
 * @param value - cookie值
 * @param days - 过期天数
 * @param options - 其他选项
 */
export const setCookie = (
  name: string, 
  value: string, 
  days: number = 7, 
  options: {
    path?: string
    domain?: string
    secure?: boolean
    sameSite?: 'strict' | 'lax' | 'none'
  } = {}
): void => {
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = `; expires=${date.toUTCString()}`
  }
  
  let cookieOptions = ''
  for (const key in options) {
    if (Object.prototype.hasOwnProperty.call(options, key)) {
      cookieOptions += `; ${key}`
      if (options[key as keyof typeof options] !== true) {
        cookieOptions += `=${options[key as keyof typeof options]}`
      }
    }
  }
  
  document.cookie = `${name}=${value}${expires}; path=/${cookieOptions}`
}

/**
 * 删除指定名称的cookie
 * @param name - cookie名称
 */
export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

/**
 * 检查是否存在指定名称的cookie
 * @param name - cookie名称
 * @returns 是否存在
 */
export const hasCookie = (name: string): boolean => {
  return getCookie(name) !== null
}

/**
 * 获取所有cookie
 * @returns 包含所有cookie的键值对对象
 */
export const getAllCookies = (): Record<string, string> => {
  const cookies = document.cookie.split(';')
  const result: Record<string, string> = {}
  
  cookies.forEach(cookie => {
    const parts = cookie.split('=')
    if (parts.length > 1) {
      const name = parts[0].trim()
      const value = parts.slice(1).join('=').trim()
      result[name] = value
    }
  })
  
  return result
}
