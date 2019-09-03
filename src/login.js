// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Login from './components/admin/login/login'
import router from './router/login'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios'

// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$http = axios

Vue.use(iView);

Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
  let auth=localStorage.getItem('auth');
  if(auth){
    location.href = 'admin.html';
  }else{
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#login',
  router,
  components: { Login },
  template: '<Login/>'
})
