import {createApp} from 'vue'
import './style.css'
import Antd from 'ant-design-vue';
import App from './App.vue'
import router from './router'
import * as CustomDirectives from './directives/index.js';


const app = createApp(App);

for (const [name, directive] of Object.entries(CustomDirectives)) {
    app.directive(name, directive);
}

app.use(Antd)
    .use(router)
    .mount('#app');
