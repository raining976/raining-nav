// @/store/index.js
import { createPinia } from "pinia";

const store = createPinia()

export default store

export * from "./modules/counter"
export * from "./modules/status"
export * from "./modules/settings"