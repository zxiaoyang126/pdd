import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../pages/home/Home'
import Me from '../pages/me/Me'
import Search from '../pages/search/Search'
import Chat from '../pages/chat/Chat'
import Recommend from '../pages/recommend/Recommend'

import Login from '../pages/me/login/Login'
import MeSetting from '../pages/me/MeSetting'
import MeInfo from './../pages/me/MeInfo'

//首页下面的二级路由
import children from './home-children'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/home',     
      component: Home,
      children: children,
      redirect: '/home/hot',
      meta: {
        showTabBar: true
      }
    },
    {
      path: '/me',
      component: Me,
      meta: {
        showTabBar: true
      }
    },
    {
      path: '/userInfo',
      component: MeInfo
    },
    {
      path: '/login',
      component: Login,     
    },
    {
      path: '/setting',
      component: MeSetting
    },
    {
      path: '/chat',
      component: Chat,
      meta: {
        showTabBar: true
      }
    },
    {
      path: '/recommend',
      component: Recommend,
      meta: {
        showTabBar: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showTabBar: true
      }
    },
    {
      path: '*',
      redirect: '/home',      
    }
  ]
})
