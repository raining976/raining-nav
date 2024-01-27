import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // ele-plus 自动按需导入
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    port: 3000,
    base: "./ ", //生产环境路径
    proxy: {
      // 跨域配置
      '^/getIp': {
        target: "https://whois.pconline.com.cn/ipJson.jsp?json=true", //跨域地址
        changeOrigin: true, //支持跨域
        rewrite: (path) => path.replace(/^\/getIp/, "")//重写路径,替换 /getIp
      },
      '^/getYiyan': {
        target: "https://v1.hitokoto.cn",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/getYiyan/, "")
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // 配置项目根路径 实际上就是将dirname和src拼接
    },
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        // 引入 mixin.scss 这样就可以在全局中使用 mixin.scss中预定义的变量了
        // 给导入的路径最后加上 ; 
        additionalData: '@import "@/style/global.scss";'
      }
    }
  }


})
