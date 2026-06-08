import { createRouter, createWebHashHistory } from 'vue-router'

import Login from '@/pages/Login.vue'
import NotFound from '@/pages/404.vue'
import Home from '@/pages/Home.vue'
import Main from '@/pages/Main.vue'
import TablePage from '@/pages/nav1/Table.vue'
import FormPage from '@/pages/nav1/Form.vue'
import UserPage from '@/pages/nav1/user.vue'
import EChartsPage from '@/pages/charts/echarts.vue'
import PrintIndex from '@/pages/print/index.vue'
import FirstPage from '@/pages/print/firstpage.vue'
import ThirdPage from '@/pages/print/thirdpage.vue'
import FourthPage from '@/pages/print/fourthpage.vue'

const routes = [
  {
    path: '/login',
    component: Login,
    name: 'Login',
    hidden: true
  },
  {
    path: '/404',
    component: NotFound,
    name: 'NotFound',
    hidden: true
  },
  {
    path: '/',
    component: Home,
    name: '工作台',
    iconCls: 'ios-home',
    children: [
      { path: '/main', component: Main, name: '主页', hidden: true },
      {
        path: '/print',
        component: PrintIndex,
        name: '打印证书',
        children: [
          { path: 'page0', name: '打印首页', component: FirstPage },
          { path: 'page1', name: '打印第2页', component: ThirdPage },
          { path: 'page2', name: '打印第3页', component: FourthPage }
        ]
      }
    ]
  },
  { path: '/:pathMatch(.*)*', hidden: true, redirect: '/print' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    sessionStorage.removeItem('user')
  }
  const user = JSON.parse(sessionStorage.getItem('user') || 'null')
  if (!user && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

export default router
