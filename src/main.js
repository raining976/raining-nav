import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import router
// import router from './router'
// import store
import store from './store'
// import custom components
import SvgIcon from "@/components/SvgIcon.vue";
// pinia
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.component('SvgIcon',SvgIcon)
app.use(store).mount('#app')
