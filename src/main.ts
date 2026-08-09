import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/styles.css'
import { useAuthStore } from './stores/auth'
import { useDarkMode } from './composables/useDarkMode'

import App from './App.vue'
import router from './router'

useDarkMode()


const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(ElementPlus)

const authStore = useAuthStore(pinia)

await authStore.checkIsLogged()

app.mount('#app')
