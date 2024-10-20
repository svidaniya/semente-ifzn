// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/main.css';
import 'animate.css/animate.css';
//import './assets/nodestyles/sementenode.css';
import './assets/nodestyles/classic.css';
//import './assets/nodestyles/dracula.css'
//import './assets/nodestyles/hacker.css';
import Notifications from '@kyvg/vue3-notification'




const app = createApp(App);

app.use(router);
app.use(Notifications);

app.mount('#app');

