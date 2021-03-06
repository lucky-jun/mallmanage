import Vue from 'vue'
import VueRouter from 'vue-router'

const Index =()=>import('views/index/index')
const Menu = ()=>import('components/Menu')
//订单管理
const Orders = ()=>import('views/orders/orders')
const HistoryOrders = () =>import('views/orders/historyOrders')
//员工管理
const EmployeeManage = ()=>import('views/EmployeeManage/InformationManage/employeeManage')
//用户管理
const UserManage = ()=>import('views/UserManage/userManage')
//商品管理
const GoodsAll = ()=>import('views/goods/goodsAll')
const AddNewGoods = ()=>import('views/goods/addNewGoods')

//提示
//网络有问题
const NetWorkError = ()=>import('views/Tips/NetWorkError')
//请求超时
const TimeOut = ()=>import('views/Tips/Timeout')

//测试
const Test = ()=>import('../views/test/test')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect:'/index'
  },
  {
    path: '/menu',
    // name: 'Home',
    component: Menu,
    children:[
      {
        path: '/order',
        // name: 'Home',
        component: Orders
      },
      {
        path: '/index',
        component:Index
      },
      {
        path: '/historyOrders',
        component:HistoryOrders
      },
      {
        path: '/employeeManage',
        component:EmployeeManage
      },
      {
        path: '/goodsAll',
        component:GoodsAll
      },
      {
        path: '/addNewGoods',
        component:AddNewGoods
      },
      {
        path: '/userManage',
        component:UserManage
      },
      {
        path: '/test',
        component:Test
      },
    ]
  },
  {
    path: '/netWorkError',
    component:NetWorkError
  },
  {
    path: '/timeout',
    component:TimeOut
  },

]

const router = new VueRouter({
  mode: 'history',
  // mode: 'hash',//打包时使用，但会有#符号
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  console.log("beforeEach")
  console.log(to)
  console.log(from)
  next()
})
router.afterEach((to, from) => {
  console.log("-----------------------------------")
  // next()
})

export default router
