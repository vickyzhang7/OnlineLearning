
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 用户模块 token setToken removeToken
export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const setToken = (newToken, saveToken) => {
      token.value = newToken
      if (saveToken) {
        localStorage.setItem("token", newToken)
      }
    }


    const removeToken = () => {
      token.value = ''
      localStorage.removeItem("token")
    }

    const user = ref({})
    /*  const getUser = async () => {
       const res = await userGetInfoService() // 请求获取数据
       user.value = res.data.data
     } */
    const setUser = (obj) => {
      user.value = obj
    }

    return {
      token,
      setToken,
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
