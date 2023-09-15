import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './router';

import ElementPlus from 'element-plus';
const  app=createApp(App)

app.use(router);
// app.use(ElementPlus, { locale });
app.use(createPinia());
// app.config.warnHandler = () => null;
app.mount('#app');

