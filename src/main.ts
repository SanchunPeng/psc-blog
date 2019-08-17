import Vue from 'vue';
import App from './App.vue';
import store from './vuex';
import router from './router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './theme/element-variables.scss'
import './theme/github-markdown.css'
import './theme/code_highlight.scss'


Vue.use(ElementUI) 

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h: any) => h(App),
}).$mount('#app');

Vue.use(Vuetify);

// import Button from './components/Button.vue';

// export default Button;
