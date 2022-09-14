import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mixins from "@/mixins";
import store from "@/store";
import VueSweetalert2 from "vue-sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const cors = require('cors');
let corsOption = {
    origin: 'http://211.53.209.103:8080',    // 허용 주소
    credentials: true                   // true시 설정 내용을 응답헤더에 추가해 줌
}

createApp(App).use(router).mixin(mixins)
    .use(VueSweetalert2)
    .use(store)
    .use(cors(corsOption))
    .mount('#app')
