import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'
import { isLogin } from '../api/user'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect:'/firstPage',
      children:[
        { path: '/firstPage', component: () => import('@/views/firstPage/firstPage.vue')},
        { path: '/selectFilter', component: () => import('@/views/selectFilter/selectFilter.vue')},
        { path: '/generationTopic', component: () => import('@/views/generationTopic/generationTopic.vue')},
        { path: '/totalGeneration', component: () => import('@/views/totalGeneration/totalGeneration.vue')},
        { path: '/personalTopic', component: () => import('@/views/personalTopic/personalTopic.vue')},
        { path: '/userCenter', component: () => import('@/views/user/UserAvatar.vue')}
      ]
    }
  ]
})
router.beforeEach(async(to) => {
  // 如果没有token, 且访问的是非登录页，拦截到登录，其他情况正常放行(路由守卫)
  /* const useStore = useUserStore()
  if (!useStore.token && to.path !== '/login') return '/login'
  return true */
  
    const res = await isLogin()
    const loginRes = res.data.data
    if(!loginRes && to.path !== '/login'){
      // alert('未登录，无权限查看,即将跳转至登录界面')
      return '/login'
    } 
    return true
  //改用是否登录判断是否跳转到首页
 
  
})
export default router
