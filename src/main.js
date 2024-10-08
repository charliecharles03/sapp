import { createApp } from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
import router from './router'
import axiosInstance from './axios_config'

const app = createApp(App)
app.use(createPinia())
app.config.globalProperties.$axios = axiosInstance
createApp(App).use(router).mount('#app')



