import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '')
  
  // 根据环境设置不同的端口
  const getPort = () => {
    switch (mode) {
      case 'development': return 3000
      case 'test': return 3001
      case 'staging': return 3002
      case 'production': return 3000
      default: return 3000
    }
  }
  
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    server: {
      port: getPort(),
      open: true
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`
        }
      }
    },
    // 定义全局常量替换
    define: {
      __VITE_API_BASE_URL__: JSON.stringify(env.VITE_API_BASE_URL || 'http://localhost:3001/api'),
      __VITE_APP_ENV__: JSON.stringify(env.VITE_APP_ENV || mode)
    }
  }
})
