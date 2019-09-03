// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios'

import qs from 'qs';
Vue.prototype.$qs = qs;

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$http = axios

Vue.use(iView);
axios.interceptors.request.use(function (config) {
 //config.url = config.url.replace(/api/,'');
  return config;
}, function (error) {
  return Promise.reject(error);
});

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  if (to.matched.length ===0) {
    from.name ? next({ name:from.name }) : next('/');
  } else {
    next();    //如果匹配到正确跳转
  }
  iView.LoadingBar.finish();
});
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
