import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import store from './store'

const app = createApp(App).use(store)

app.use(createPinia())
app.use(router)

app.mount('#app')
