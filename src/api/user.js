import request from '@/utils/request'

//检测是否登录
export const isLogin = () =>request.get('/user/islogin')

// 获取用户基本信息(所有用户都没有权限用)
// export const userGetInfoService = ()=> request.get('/user/list')

// 注册接口
export const userRegisterService = ({ email, password, registerCode, school,subject,username,verifyCode}) =>
  request.post('/user/register', { email, password, registerCode, school,subject,username,verificationCode:verifyCode})

// 登录接口
export const userLoginService = ({ password, username }) =>
  request.post('/user/login', { password, userName:username })

  //登出接口
export const userLogoutService = ()=> request.get('/user/logout')


// 重置密码
export const userUpdatePasswordService = ({ email, password, verifyCode }) =>
  request.post('/user/reset', { email, password, verificationCode:verifyCode })

// 发送验证码
export const uesrVerifyEmail = (email) =>
 request.post('/verificationCode/send?',{email})
