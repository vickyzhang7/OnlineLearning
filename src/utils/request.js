import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'
// 服务器
const baseURL = 'http://103.231.255.140:8182' 
// const baseURL = 'http://2733e50a.r10.cpolar.top' 

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const token = localStorage.getItem("token")
    const useStore = useUserStore()
    if (useStore.token) {
      config.headers.satoken = useStore.token
    }else if(token != null && token.length > 0){
      config.headers.satoken = token
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // console.log('响应器成功执行了回调，响应对象是',res)
    // return res.data
    // TODO 4. 摘取核心响应数据
    if (res.data.code === 1000) {
      return res
    }
    // TODO 3. 处理业务失败
    // 处理业务失败, 给错误提示，抛出错误
    ElMessage.error(res.data.msg || '服务异常')
    return Promise.reject(res.data)
  },
  (err) => {
    // console.log('响应器失败执行了回调，响应对象是',err)
    // return Promise.reject(err)
    // TODO 5. 处理401错误
    // 错误的特殊情况 => 401 权限不足 或 token 过期 => 拦截到登录
    if (err.request?.status === 401) {
      router.push('/login')
    }

    // 错误的默认情况 => 只要给提示
    ElMessage.error(err.message || '服务异常')
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
