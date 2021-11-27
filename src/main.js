// Main.js is the main vue app startup script
import { createApp } from 'vue'
import state from './state.js'
import App from './App.vue'
import './index.css'

createApp(App).use(state).mount('#app')
