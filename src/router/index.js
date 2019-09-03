import Vue from 'vue'
import Router from 'vue-router'
import categoryArticle from '@/components/categoryArticle/index'
import tagArticle from '@/components/tagArticle/index'
import main from '@/components/main/main'
import Home from '@/components/home'
import detail from '@/components/detail/detail'
import Person from '@/components/person'

Vue.use(Router)

export default new Router({

  routes: [
    {
      path: '/',
      name: 'context',
      redirect:'/index',
    },
    {
      path: '/index',
      name: 'index',
      component: main,
    },
    {
      path: '/index/:page',
      name: 'index',
      component: main,
    },
    {
      path: '/category/:code',
      name: 'category',
      component: categoryArticle,
    },
    {
      path: '/category/:code/:page',
      name: 'category-code',
      component: categoryArticle,
    },
    {
      path: '/tag/:code',
      name: 'tag',
      component: tagArticle,
    },
    {
      path: '/tag/:code/:page',
      name: 'tag-code',
      component: tagArticle,
    },
    {
      path:'/detail/:code',
      component:detail,
      children:[
        {
          path: 'person',
          component: Person
        }
      ]
    },

  ]
})
