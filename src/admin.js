// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Admin from './Admin.vue'
import router from './router/admin'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios'
import store from './store/store'
import qs from 'qs';
import Cropper from "vue-cropper";

Vue.prototype.$qs = qs;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$http = axios

Vue.use(iView);
Vue.use(Cropper)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  if (to.path === '/login') {
    next();
  } else {
    let auth = localStorage.getItem('auth');
    console.log(auth)
    if (!auth) {
      next('/login')
    } else {
      next();
    }
  }

});

router.afterEach(route => {
  iView.LoadingBar.finish();
});

axios.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.getItem('auth');
  return config;
}, function (error) {
  return Promise.reject(error);
});
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        router.push('/login');
      }
    }
    return Promise.reject(error.response.data)
  });


/* eslint-disable no-new */
new Vue({
  el: '#admin',
  router,
  store,
  components: {Admin},
  template: '<Admin/>'
})
