import Vue from 'vue';
import Router from 'vue-router';
import progress from '@/views/Progress.vue';
// import hompage from '@/views/Hompage.vue';
// import article from '@/views/Article.vue';
// import about from '@/views/About.vue';
// import project from '@/views/Project.vue'


Vue.use(Router);
// 开发环境非懒加载，生产环境懒加载
const components = require('./_import_' + process.env.NODE_ENV).default

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'hompage',
      component: components.hompage,
    }, {
      path: '/article',
      name: 'article',
      component: components.article,
    }, {
      path: '/progress',
      name: 'progress',
      component: components.progress,
    }, {
      path: '/project',
      name: 'project',
      component: components.project,
    }, {
      path: '/about',
      name: 'about',
      component: components.about,
    }, {
      path: '/articledetail',
      name: 'articledetail',
      component: components.articleDetail
    }
  ],
});