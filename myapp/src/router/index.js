import Vue from 'vue'
import Router from 'vue-router'
import Public from '@/components/public'
import Login from '@/components/login'

import Home from '@/components/second/index'
import User from '@/components/second/user'
import Create from '@/components/second/create'
import CreateUser from '@/components/second/createUser'
import Borrow from '@/components/second/borrow'
import Vindicate from '@/components/second/vindicate'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/public',
      component: Public,
      children: [
        {
          path: '/index',
          component: Home
        },{
          path: '/user',
          component: User,
        },{
          path: '/create',
          component: Create,
        },{
          path: '/createUser',
          component: CreateUser,
        },{
          path: '/borrow',
          component: Borrow,
        },{
          path: '/vindicate',
          component: Vindicate
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },{
      path: '*',
      redirect: '/login'
    }
  ]
})
