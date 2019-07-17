import Vue from 'vue';
import App from './App.vue';
import store from './vuex';
import router from './router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');

Vue.use(Vuetify);

// import Button from './components/Button.vue';

// export default Button;
