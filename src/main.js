// Import Vue.js
import { createApp } from 'vue';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import Api from './api';

// Import main application component
import App from './App.vue';
import RouterInstance from './router';

// Create a new Vue application instance
const app = createApp(App);

/**
 * MITT: Tiny 200b functional event emitter / pubsub.
 */
// Import event emitter for cross-component communication
import mitt from 'mitt';
// Create a global event emitter and attach it to the application's config
const emitter = mitt();
app.config.globalProperties.emitter = emitter;

// Import confirm dialog component for Vue 3
import Vue3ConfirmDialog from 'vue3-confirm-dialog';
import 'vue3-confirm-dialog/style';

// Install Vue3ConfirmDialog plugin
app.use(Vue3ConfirmDialog);
// Register Vue3ConfirmDialog component globally
app.component('vue3-confirm-dialog', Vue3ConfirmDialog.default);

app.config.globalProperties.$toast = new Notyf();

const routerInstance = new RouterInstance();
app.config.globalProperties.$api = new Api();

// Install router
app.use(routerInstance.router);

// Mount the Vue application to the DOM
app.mount('#app');
