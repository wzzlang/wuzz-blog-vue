import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/components/admin/layout/layout'

Vue.use(Router)

export default new Router({

  routes: [
    {
      path:'',
      component:Layout,
      redirect:'/main',
      children:[{
        path: 'main',
        component: () => import('@/components/admin/context/home/index'),
        name: 'main',
        meta:'主页',
      }]
    },
    {
      path: '/article',
      component:Layout,
      redirect:'/article',
      meta:'文章管理',
      children:[
        {
        path:'article',
        component: () => import('@/components/admin/context/article/index'),
        name: 'article',
        meta:'文章管理',
      },
      {
        path:'edit/:id',
        component: () => import('@/components/admin/context/article/edit'),
        name: 'edit',
        meta:'文章编辑',
        hidden:true,
      },
      ]
    },
    {
      path: '/login',
      component: ()=>import('@/components/admin/login/login'),
      hidden: true,
    },
    {
      path: '/user',
      component: Layout,
      children:[{
        path:'user',
        component: () => import('@/components/admin/context/user/index'),
        name: 'user',
        meta:'用户管理',
      }]
    },
    {
      path: '/about',component:()=>import ('@/components/admin/context/article/index'),
      hidden: true,
    }

  ]
})
