import { createApp } from 'vue'
import state from './state.js'
import App from './App.vue'
import './index.css'

createApp(App).use(state).mount('#app')
