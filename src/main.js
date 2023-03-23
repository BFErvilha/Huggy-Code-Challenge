import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueResource from 'vue-resource';
import '@/assets/scss/style.scss';

Vue.use(VueResource);

Vue.http.options.root = 'http://localhost:3000';

Vue.http.headers.common['Access-Control-Allow-Origin'] = '*';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
