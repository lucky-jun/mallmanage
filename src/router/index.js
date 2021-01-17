import Vue from 'vue'
import VueRouter from 'vue-router'

const Menu = ()=>import('../components/Menu')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect:'/menu'
  },
  {
    path: '/menu',
    // name: 'Home',
    component: Menu
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
