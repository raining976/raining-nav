import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// import router
import router from './router'
// import store
import store from './store'

const app = createApp(App)
app.use(router).use(store).mount('#app')
