<script setup>
import { userRegisterService, userLoginService, uesrVerifyEmail, userUpdatePasswordService } from '@/api/user.js'
import { ElMessage } from 'element-plus'
import {  onMounted,reactive, ref, watch } from 'vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const isChecked = ref(false)
const isRegister = ref(false)
const isForget = ref(false)
const isLogin = ref(true)
const form = ref()
// 不要再继续撤回了，已经实现了一个功能。
// 整个的用于提交的form数据对象
const formModel = ref({
  username: '',
  password: '',
  school: '',
  subject:'',
  email:'',
  verifyCode:'',
  registerCode:'',
  repassword:'',
  saveToken:false
})


const sms = reactive({ //验证码
  disabled:false,
  waitTime:60,
  count:0
})


// 整个表单的校验规则
// 1. 非空校验 required: true      message消息提示，  trigger触发校验的时机 blur change
// 2. 长度校验 min:xx, max: xx
// 3. 正则校验 pattern: 正则规则    \S 非空字符
// 4. 自定义校验 => 自己写逻辑校验 (校验函数)
//    validator: (rule, value, callback)
//    (1) rule  当前校验规则相关的信息
//    (2) value 所校验的表单元素目前的表单值
//    (3) callback 无论成功还是失败，都需要 callback 回调
//        - callback() 校验成功
//        - callback(new Error(错误信息)) 校验失败
const rules = {
  username: [
    { required: true, message: '请设置用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名必须是 5-10位 的字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码' , trigger: 'blur'},
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是 6-15位 的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是 6-15位 的非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        // 判断 value 和 当前 form 中收集的 password 是否一致
        if (value !== formModel.value.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback() // 就算校验成功，也需要callback
        }
      },
      trigger: 'blur'
    }
  ],
  school:[
    { required: true, message: '请填写学校', trigger: 'blur' }
  ],
  subject:[
    { required: true, message: '请选择学科', trigger: 'blur' }
  ],
  email:[
  { required: true, message: '请填写邮箱号', trigger: 'blur' },
  { pattern:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ , message:'邮件格式有误', trigger:'blur'}
  ],
  verifyCode:[
  { required: true, message: '请填写验证码', trigger: 'blur' }
  ],
  registerCode:[
  { required: false, trigger: 'blur' }
  ],
  select:[]
}

const register = async () => {
  // 注册成功之前，先进行校验，校验成功 → 请求，校验失败 → 自动提示
  if (formModel.value.isChecked === true) {
    await form.value.validate();
    const res = await userRegisterService(formModel.value);
    ElMessage.success('注册成功');
    isChecked.value = false;
  } else {
    ElMessage.warning('请阅读并签署条款');
  }
}

const userStore = useUserStore()
const router = useRouter()
const login = async () => {
    if(formModel.value.isChecked === true){
        await form.value.validate()
         const res = await userLoginService(formModel.value)  
         userStore.setToken(res.data.data.data.tokenValue,formModel.value.saveToken,false)
        //发送请求获取用户信息

        /* const userInfo = await userGetInfoService()
        userStore.setUser(userInfo.data) */
        ElMessage.success('登录成功')
        if(formModel.value.saveToken){//30天免登录
          userStore.setToken(res.data.data.data.tokenValue,formModel.value.saveToken,true)        
        }
         router.push('/firstPage')
        }else{
            ElMessage.warning('请阅读并签署条款')}
}
const forgetlogin = async () =>{
  if(formModel.value.isChecked === true){
        await form.value.validate()
         const res = await userUpdatePasswordService(formModel.value)
        console.log(res)
        ElMessage.success('修改密码成功，请重新登录')
        isForget.value = false
        isLogin.value = true
        }else{
            ElMessage.warning('请阅读并签署条款')}
}

// 计时器处理器
const timerHandler = ()=>{
  sms.count = sms.waitTime
  sms.disabled = true

  let timer = setInterval(()=>{
    if(sms.count >1 && sms.count <= sms.waitTime){
      sms.count--
    }else{
      sms.disabled = false
      clearInterval(timer)
    }
  },1000)
}
// 推送
const sendCode = async () =>{
  console.log(formModel.value.email)
  if(formModel.value.email ==='' || formModel.value.email === undefined){
    ElMessage.error('电子邮件为空')
  }else{
    //计时器处理器
    timerHandler()
    await uesrVerifyEmail(formModel.value.email)
  }
}

// 登录判断表单
const handleFormChange = () => {
    // 判断表单是否为空
    if (formModel.value.username !== '' && formModel.value.password !== '' && formModel.value.isChecked) {
        document.querySelector('.button-login').style.backgroundColor = '#6666FF';
    } else {
        document.querySelector('.button-login').style.backgroundColor = '#BDCEFC';
    }
};
// 注册判断表单
const handleRegisterFormChange = () => {
  // 判断注册表单是否都有值
  if (formModel.value.username !== '' && formModel.value.password !== '' && formModel.value.school !== '' && formModel.value.subject !== '' && formModel.value.email !== '' && formModel.value.verifyCode !== '' && formModel.value.isChecked) {
    document.querySelector('.button-login').style.backgroundColor = '#6666FF';
  } else {
    document.querySelector('.button-login').style.backgroundColor = '#BDCEFC';
  }
};


onMounted(()=>{
  formModel.value.isChecked = false;
  watch([() => formModel.value.username, () => formModel.value.password, () => formModel.value.isChecked], () => {
        handleFormChange(); // 更新按钮样式
    });
  watch([() => formModel.value.username, () => formModel.value.password, () => formModel.value.school, () => formModel.value.subject, () => formModel.value.email, () => formModel.value.verifyCode, () => formModel.value.isChecked], () => {
        handleRegisterFormChange();
    });

  

  //1.携带token请求用户信息
  /* let usernameId = localStorage.getItem("userId");
    if(usernameId){//如果用户之前选择了30天免登陆，那就说明存储了useriId
      formModel.value.username = localStorage.getItem("userId")
      formModel.value.password = localStorage.getItem("password")
      formModel.value.saveToken = true */
      let token = userStore.getToken()//有token就30天免登录
      if(token){
      router.push("/") //跳转首页
    }
    // 监听表单变化
    handleFormChange()
    handleRegisterFormChange()
  }
)
 
//切换为登录的时候，重置表单内容
watch(isLogin, () => {
  formModel.value = {
    username:'',
    password:'',
    isChecked:Boolean,
    saveToken:Boolean
  }
})

// 切换为注册的时候，重置表单内容
watch(isRegister.value, () => {
  formModel.value = {
    username: '',
    password: '',
    school: '',
    subject:'',
    email:'',
    verifyCode:'',
    registerCode:'',
    isChecked:Boolean
  }
})
watch(isForget, () =>{
    formModel.value = {
    email:'',
    verifyCode:'',
    password:'',
    repassword:'',
    isChecked:Boolean
    }
})
/* watch(()=>formModel,()=>{
  // 判断表单是否为空
  if (isFormEmpty()) {
    // 触发相应的函数
    // document.querySelector('.button-login').style.backgroundColor = '#BDCEFC';
    console.log('有空到')
  }else{
    document.querySelector('.button-login').style.backgroundColor = '#6666FF';
    console.log('不空了')
  } //未有效触发，有bug
}) */
</script>

<template>
  <!-- 
    1. 结构相关
      el-row表示一行，一行分成24份 
       el-col表示列  
       (1) :span="12"  代表在一行中，占12份 (50%)
       (2) :span="6"   表示在一行中，占6份  (25%)
       (3) :offset="3" 代表在一行中，左侧margin份数

       el-form 整个表单组件
       el-form-item 表单的一行 （一个表单域）
       el-input 表单元素（输入框）
    2. 校验相关
       (1) el-form => :model="ruleForm"      绑定的整个form的数据对象 { xxx, xxx, xxx }
       (2) el-form => :rules="rules"         绑定的整个rules规则对象  { xxx, xxx, xxx }
       (3) 表单元素 => v-model="ruleForm.xxx" 给表单元素，绑定form的子属性
       (4) el-form-item => prop配置生效的是哪个校验规则 (和rules中的字段要对应)!!!!一定不要忘记prop
  -->
  <el-row class="login-page">
    <el-col :span="5"></el-col>
      <!-- 注册相关表单 -->
    <el-col :span="20">
      <el-form
        :model="formModel"
        :rules="rules"
        @change="handleRegisterFormChange"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
        label-position="right"
        label-width="95px"
      >
            <div class="title" style="margin-bottom: 0vh !important;">欢迎注册</div>
        
          <el-link type="primary" :underline="false" @click="isRegister = false;isLogin=true;" class="privacy" style="font-size: 0.9vw;height: 1vh;">
            <span style="color: black;">已有账号？</span>登录
          </el-link>
        <el-form-item prop="username"  label="用户名">
          <el-input
            v-model="formModel.username"
            placeholder="请设置用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="设置密码">
          <el-input
            v-model="formModel.password"
            type="password"
            placeholder="请设置6位数密码，包含字母与数字"
          ></el-input>
        </el-form-item>
        <el-form-item prop="school" label="任教学校">
          <el-input
            v-model="formModel.school"
            placeholder="请填写学校名称"
          ></el-input>
        </el-form-item>
        <el-form-item prop="subject" label="任教学科" >
          <el-select
            v-model="formModel.subject"
            placeholder="请选择"
            style="font-size: 1px!important;height: 5.53vh !important;width: 100%;"
          >
            <el-option label="英语" value="English" />
            <el-option label="语文" value="Chinese" />
            <el-option label="数学" value="Math" />
            <el-option label="地理" value="Geography" />
          </el-select></el-form-item>
          <el-form-item prop="email" label="邮箱号">
          <el-input
            v-model="formModel.email"
            placeholder="请填写邮箱号"
          ><template #append>
            <el-button v-if="!sms.disabled" type="default" @click="sendCode">发送验证码</el-button>
            <el-button v-else type="default" disabled>{{ sms.count }}秒后重新发送</el-button>
          </template></el-input></el-form-item>
          <el-row>
            <el-col :span="12">
                <el-form-item :inline="true" prop="verifyCode" label="验证码">
                    <el-input
                        v-model="formModel.verifyCode"
                        placeholder="请输入验证码" 
                        prop="registerCode"></el-input></el-form-item></el-col>
            <el-col :span="12" >
          <el-form-item :inline="true" prop=" registerCode" label="注册码">
            <el-input
                v-model="formModel. registerCode"
                placeholder="请输入注册码"
                prop="verifyCode"></el-input></el-form-item></el-col>
        </el-row>
          <el-button
            @click="register"
            class="button-login"
            type="primary"
            auto-insert-space
            style="margin-left:0.5vw"
          >
            注册
          </el-button>
            <div class="flex1">
              <el-checkbox class="read" style="margin-top: 5vh;margin-left:2vw" v-model="formModel.isChecked">阅读并接受<el-link :underline="false" href="_blank" class="privacy">《隐私条款》</el-link>与<el-link :underline="false" href="_blank" class="privacy">《隐私协议》</el-link></el-checkbox>
            </div>
      </el-form>

      <!-- 登录相关表单 -->
      <el-form
        :model="formModel"
        :rules="rules"
        @change="handleFormChange()"
        ref="form"
        size="large"
        autocomplete="off"
        label-position="right"
        label-width="95px"
        v-else-if="isLogin"
      >
      <div class="title">欢迎登录VisionEdu</div>
          
        <el-form-item prop="username"  label="用户名">
          <el-input
            v-model="formModel.username"
            placeholder="请填写用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密&nbsp&nbsp&nbsp&nbsp码">
          <el-input
            v-model="formModel.password"
            name="password"
            type="password"
            placeholder="请填写6位数密码"
          ></el-input>
        </el-form-item>
          <div class="flex" style="margin-bottom: 16vh !important; margin-top: 4vh;">
            <el-checkbox class="read" style="padding-left: 2vw;" @change="formModel.saveToken=!saveToken">30天内免登录</el-checkbox>
            <el-link :underline="false" type="info" class="read" @click="isForget = true;isLogin=false">忘记密码</el-link>
          </div>
          <el-button
            @click="login"
            class="button-login"
            auto-insert-space
            >登录</el-button>
          <!-- <el-link type="info" :underline="false" @click="isRegister = true">
            注册新账号
          </el-link> -->
          <el-button
            @click="isRegister = true"
            class="button-register"
            auto-insert-space
            >注册新账号</el-button>
            <div class="flex1">
            <el-checkbox class="read" style="margin-top: 5vh;margin-left:2vw" v-model="formModel.isChecked">阅读并接受<el-link :underline="false" href="_blank" class="privacy">《隐私条款》</el-link>与<el-link :underline="false" href="_blank" class="privacy">《隐私协议》</el-link></el-checkbox>
            </div>
      </el-form>

      <!-- 忘记密码相关表单 -->
      <el-form
      :model="formModel"
        :rules="rules"
        @change="handleFormChange()"
        ref="form"
        size="large"
        autocomplete="off"
        v-else-if="isForget"
        label-position="right"
        label-width="90px"
      >
      <div class="title">找回密码</div>
      <el-form-item prop="email" label="邮箱号">
          <el-input
            v-model="formModel.email"
            placeholder="请填写邮箱号">
            <template #append>
            <el-button v-if="!sms.disabled" type="default" @click="sendCode">发送验证码</el-button>
            <el-button v-else type="default" disabled>{{ sms.count }}秒后重新发送</el-button>
          </template>
          </el-input></el-form-item>
      <el-form-item :inline="true" prop="verifyCode" label="验证码">
            <el-input
            v-model="formModel.verifyCode"
            placeholder="请输入验证码" >
          </el-input></el-form-item>    
      <el-form-item :inline="true" prop="password" label="重置密码">
            <el-input
            v-model="formModel.password"
            type="password"
            placeholder="请输入新密码" 
            ></el-input></el-form-item> 
      <el-form-item :inline="true" prop="repassword" label="确认密码">
            <el-input
            v-model="formModel.repassword"
            type="password"
            placeholder="请确认新密码" 
            ></el-input></el-form-item>
            <el-button
            @click="forgetlogin"
            class="button-login"
            auto-insert-space
            >登录</el-button>
          <!-- <el-link type="info" :underline="false" @click="isRegister = true">
            注册新账号
          </el-link> -->
          <el-button
            @click="isRegister = true"
            class="button-register"
            auto-insert-space
            >注册新账号</el-button>
            <div class="flex1">
            <el-checkbox class="read" style="margin-top: 5vh;margin-left:2vw;vertical-align:baseline" v-model="formModel.isChecked">阅读并接受<el-link href="_blank" class="privacy" style="vertical-align: baseline;">《隐私条款》</el-link>与<el-link href="_blank" class="privacy" style="vertical-align: baseline;">《隐私协议》</el-link></el-checkbox>
            </div> 
    </el-form>
    </el-col>
    <el-col :span="5"></el-col>
  </el-row>
  <div class="bgfont">
    <p style="font-size: 3.69vw;font-weight: 600;color: black;margin-bottom: 2.4vh;">用科技</p>
    <p style="font-size: 2.4vw;color: black;">助力中国教育事业</p>
  </div>
</template>

<style lang="scss">
.login-page {
  height: 79.63vh;
  width:38.60vw;
  background-color: #fff;
  /* .bg {
    background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  } */
  
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
        display: block;
        width: 13.72vw;
        // height: 3.9vh !important;
        // margin-top: 1.33vh !important;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 700;
        font-size: 1.5vw;
        color: #000000;
        margin-bottom: 3vh;
        // padding-top: 1vh !important;
    }
    .button-login {
      width: 100%;
      background-color: #BDCEFC;
      color:#FFFFFF;
      border-radius: 50px;
    }
    .button-register {
      width: 100%;
      border-color: #6666FF;
      color:#6666FF;
      border-radius: 50px;
      margin-top: 3vh;
      padding:0;
      margin-left: 0;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
      color: #000000;
      height: 1.83vh !important;
    }
    
    
    .flex1{
        margin: 0 auto;
        justify-content: center;

    }
    .privacy{
        color: #6666FF;
    }

    .read{
        font-size: 1vw;
    }
    
    .read:hover{
        color: #6666FF;
    }
    .el-form-item {
        margin-bottom: 1.5vh; /* 设置底部间距，根据需要调整值 */
        margin-top: 0vh;
    }
    /* 自定义 el-input 大小 */
    .el-input {
        font-size: 0.9vw; /* 根据需要调整字体大小 */
        height: 5.53vh; /* 根据需要调整高度 */
        /* 其他样式调整 */
    }
    .el-select {
        font-size: 0.9vw; /* 根据需要调整字体大小 */
        height: 5.53vh; /* 根据需要调整高度 */
        /* 其他样式调整 */
    }
    .el-button{
        height: 6.13vh;
    }
    .el-checkbox{
        height: 0.1vh;
        font-size: 1vw;
    }
    

    .el-link{
        vertical-align: baseline;
        font-size: 1.3vw;
    }
    .el-checkbox.el-checkbox--large .el-checkbox__label{
        font-size: 1.3vw;
    }
    .el-form-item--large{
      font-size: 16px !important;
    }
 }
  body{
      // background-image: url(../../assets/loginP.jpg);
      background-image: url("../../assets/Group 2875.svg");

      background-size: cover;
  }

  .bgfont{
    position: fixed;
    right: 21.3vw;
    top:33.33vh;
  }



</style>
