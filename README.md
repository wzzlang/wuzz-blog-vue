# len-blog

> lenos  博客 vue ui
> 采用 vue iview ui

## Build 项目
wzzlang 博客模块  
1、采用 vue iview 后端数据储存采用wzzlang 前后分离
模块分为 App展示单页 和Admin 管理单页
admin管理页功能简单
``` bash
管理单页权限采用jwt token 权限验证：
路由拦截(admin.js)
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  if (to.path === '/login') {
    next();
  } else {
    let auth = localStorage.getItem('auth');
    if (!auth) {
      next('/login')
    } else {
      next();
    }
  }

});
axios 对请求过滤
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
```
## 启动
```
后端支撑
  启动lenosp 开源地址：https://gitee.com/bweird/lenosp
  启动lenosp
ui启动
修改 /config/index.js 映射端口配置
proxyTable: {
      '/api': {
        target: 'http://localhost:8089',
        changeOrigin: true,
        pathRewrite: {
          '^/api' : ''
      }
    }
  },
  
npm install
npm run dev
```

 <table>
      <tr>
          <td><img src="http://chuantu.xyz/t6/702/1557929094x1033347913.png"/></td>
      <tr>
      <tr>
          <td><img src="http://chuantu.xyz/t6/702/1557929147x1709417317.png"/></td>
      </tr>
      <tr>
          <td><img src="http://chuantu.xyz/t6/702/1557929117x1709417317.png"/></td>
      </tr>
   </table>
