import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import router
import router from './router'
// import store
import store from './store'
// import icon and icon styles
import {install} from '@icon-park/vue-next/es/all';
import '@icon-park/vue-next/styles/index.css';
// import custom components
import SvgIcon from "@/components/SvgIcon.vue";

const app = createApp(App)
install(app,'i'); // use custom prefix ,usage: i-iconName
app.component('SvgIcon',SvgIcon)
app.use(store).mount('#app')
