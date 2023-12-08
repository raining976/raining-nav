# 一个简约又好用的导航页

### 一些说明
- 原作者在这里: [仓库地址](https://github.com/imsyy/Snavigation)   
- 主要是为了学习和熟悉技术才做的,基本都是**仿照原作者的思路和样式做的**,在此鸣谢

### 目前实现的功能
- [x] 切换搜索引擎
- [x] 搜索联想
- [x] 一言以及用户自定义
- [x] 天气
- [x] 对应的设置

- [ ] 直接访问网址

### 部署
- node.js >= 18
- 克隆项目到本地,进入项目目录
- 运行
    ```bash
    # 安装依赖
    npm i
    # 本地运行
    npm run dev
    # 打包构建
    npm run build
    ``` 


### 技术栈以及组件
- [vue3](https://cn.vuejs.org/)
- [vite](https://cn.vitejs.dev/)
- [pinia](https://pinia.vuejs.org/zh/)
- [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/): pinia的数据持久化插件
- [element-plus](https://element-plus.org/zh-CN/)
- [axios](https://axios-http.com/)

### api
- [hitokoto一言](https://hitokoto.cn/)


