// router/index.js 
import { createRouter , createWebHistory } from "vue-router";

const files = import.meta.glob('./modules/*.js',{
    eager: true,
}) // eager 同步加载 此时就非懒加载


// 暂存路由
const routerModuleList = [] 

// 遍历路由模块
Object.keys(files).forEach(key => {
    const module = files[key].default || {}
    const moduleList = Array.isArray(module) ? [...module] : [module]
    routerModuleList.push(...moduleList) // 这里也要解构
})

// 动态路由
const asyncRouterList = [...routerModuleList]

// 存放静态路由(如果有的话)
const staticRouterList =[]

// 合并路由
const routes = [...asyncRouterList, ...staticRouterList]
    
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(){
        return {
            el:'#app',
            top:0,
            behavior:'smooth'
        }
    }
})

export default router