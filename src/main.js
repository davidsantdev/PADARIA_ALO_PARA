import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { applyStructuredData } from './utils/seo'

applyStructuredData()

createApp(App).use(router).mount('#app')
