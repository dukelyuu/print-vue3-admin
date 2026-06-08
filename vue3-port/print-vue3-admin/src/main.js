import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ViewUIPlus from 'view-design-plus'
import 'view-design-plus/dist/styles/view-design-plus.css'

import App from './App.vue'
import router from './router'
import './mock'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ViewUIPlus)

app.mount('#app')
