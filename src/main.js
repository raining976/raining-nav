import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import router
// import router from './router'
// import store
import store from './store'
// import custom components
import SvgIcon from "@/components/SvgIcon.vue";

const app = createApp(App)

app.component('SvgIcon',SvgIcon)
app.use(store).mount('#app')
