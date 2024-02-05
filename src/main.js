import {createApp} from 'vue'
import './style.css'
import Antd from 'ant-design-vue';
import App from './App.vue'
import router from './router'
import VueColor from '@ckpack/vue-color';
import * as CustomDirectives from './directives/index.js';

import { createPinia } from 'pinia'

const app = createApp(App);
const pinia = createPinia()


for (const [name, directive] of Object.entries(CustomDirectives)) {
    app.directive(name, directive);
}

app.use(pinia)
    .use(VueColor)
    .use(Antd)
    .use(router)
    .mount('#app');
