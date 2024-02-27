
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 用户模块 token setToken removeToken
export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')

    const setToken = (newToken, isSave) => {
      token.value = newToken //存储token到pinia
    
      if (isSave) {
        localStorage.setItem("token", newToken)
      }else{
        localStorage.removeItem("token")
      }
    }

    const getToken = () => {
      let token_value = null;
      if(token.value != null){
        //1. 优先从pinia中得到token
        token_value = token.value;
      }else{
       //2. 若pinia中不存在token，则尝试从localstorage中获取
            if((token_value = localStorage.getItem("token") )!= null){
              //将token存储到pinia中
              token.value = token_value;
            }
      }
        return token.value;
     
    }

    const removeToken = () => {
      token.value = ''
      localStorage.removeItem("token")
      // #修改
      localStorage.removeItem("userBagList")
      // #修改
    }

    const user = ref({})
    /*  const getUser = async () => {
       const res = await userGetInfoService() // 请求获取数据
       user.value = res.data.data
     } */
    const setUser = (obj) => { // 获取用户信息
      user.value = obj  
    }

    return {
      token,
      setToken,
      getToken,
      removeToken,
      user,
      // getUser,
      setUser
    }
  },
  {
    persist: true
  }
)
