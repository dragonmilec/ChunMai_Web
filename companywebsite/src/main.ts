import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import './styles.css'
import './visuals.css'
import './readability.css'
import 'lenis/dist/lenis.css'

createApp(App).use(router).mount('#app')
