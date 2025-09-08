import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import authPlugin from './plugins/auth.js';

const app = createApp(App);
app.use(router);
app.use(authPlugin);
app.mount("#app");
