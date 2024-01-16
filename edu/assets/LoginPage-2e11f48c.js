import{r as V,a as A,u as R,b as Z,o as D,w as z,c as p,d as g,e as I,f as l,g as o,F as G,h as i,i as c,j as s,t as E,k as H,l as O,E as b,m as J,n as K,p as Q}from"./index-4ca38881.js";const W=i("div",{class:"title",style:{"margin-bottom":"0vh !important"}},"欢迎注册",-1),X=i("span",{style:{color:"black"}},"已有账号？",-1),Y={class:"flex1"},ee=i("div",{class:"title"},"欢迎登录VisionEdu",-1),le={class:"flex",style:{"margin-bottom":"16vh !important","margin-top":"4vh"}},ae={class:"flex1"},oe=i("div",{class:"title"},"找回密码",-1),te={class:"flex1"},se=i("div",{class:"bgfont"},[i("p",{style:{"font-size":"3.69vw","font-weight":"600",color:"black","margin-bottom":"2.4vh"}},"用科技"),i("p",{style:{"font-size":"2.4vw",color:"black"}},"助力中国教育事业")],-1),ne={__name:"LoginPage",setup(re){const _=V(!1),w=V(!1),y=V(!0),k=V(),e=V({username:"",password:"",school:"",subject:"",email:"",verifyCode:"",registerCode:"",repassword:"",isChecked:!1,saveToken:!1}),u=A({disabled:!1,waitTime:60,count:0}),x={username:[{required:!0,message:"请设置用户名",trigger:"blur"},{min:5,max:10,message:"用户名必须是 5-10位 的字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{pattern:/^\S{6,15}$/,message:"密码必须是 6-15位 的非空字符",trigger:"blur"}],repassword:[{required:!0,message:"请输入密码",trigger:"blur"},{pattern:/^\S{6,15}$/,message:"密码必须是 6-15位 的非空字符",trigger:"blur"},{validator:(n,a,v)=>{a!==e.value.password?v(new Error("两次输入密码不一致")):v()},trigger:"blur"}],school:[{required:!0,message:"请填写学校",trigger:"blur"}],subject:[{required:!0,message:"请选择学科",trigger:"blur"}],email:[{required:!0,message:"请填写邮箱号",trigger:"blur"},{pattern:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,message:"邮件格式有误",trigger:"blur"}],verifyCode:[{required:!0,message:"请填写验证码",trigger:"blur"}],registerCode:[{required:!1,trigger:"blur"}],select:[]},j=async()=>{e.value.isChecked===!0?(await k.value.validate(),await O(e.value),b.success("注册成功"),_.value=!1,w.value=!1,y.value=!0):b.warning("请阅读并签署条款")},T=R(),S=Z(),F=async()=>{if(e.value.isChecked===!0){await k.value.validate();const n=await J(e.value);T.setToken(n.data.data.data.tokenValue,e.value.saveToken,!1),b.success("登录成功"),e.value.saveToken&&T.setToken(n.data.data.data.tokenValue,e.value.saveToken,!0),S.push("/firstPage")}else b.warning("请阅读并签署条款")},L=async()=>{if(e.value.isChecked===!0){await k.value.validate();const n=await K(e.value);console.log(n),b.success("修改密码成功，请重新登录"),w.value=!1,y.value=!0}else b.warning("请阅读并签署条款")},M=()=>{u.count=u.waitTime,u.disabled=!0;let n=setInterval(()=>{u.count>1&&u.count<=u.waitTime?u.count--:(u.disabled=!1,clearInterval(n))},1e3)},$=async()=>{console.log(e.value.email),e.value.email===""||e.value.email===void 0?b.error("电子邮件为空"):(M(),await Q(e.value.email))},N=()=>Object.values(e.value).some(n=>n===""),C=()=>{N()?document.querySelector(".button-login").style.backgroundColor="#BDCEFC":document.querySelector(".button-login").style.backgroundColor="#6666FF"};return D(()=>{T.getToken()&&S.push("/"),C()}),z(y,()=>{e.value={username:"",password:"",isChecked:Boolean,saveToken:Boolean}}),z(_,()=>{e.value={username:"",password:"",school:"",subject:"",email:"",verifyCode:"",registerCode:"",isChecked:Boolean}}),z(w,()=>{e.value={email:"",verifyCode:"",password:"",repassword:"",isChecked:Boolean}}),(n,a)=>{const v=p("el-col"),f=p("el-link"),d=p("el-input"),r=p("el-form-item"),h=p("el-option"),P=p("el-select"),m=p("el-button"),B=p("el-row"),U=p("el-checkbox"),q=p("el-form");return g(),I(G,null,[l(B,{class:"login-page"},{default:o(()=>[l(v,{span:5}),l(v,{span:20},{default:o(()=>[_.value?(g(),c(q,{key:0,model:e.value,rules:x,onChange:a[9]||(a[9]=t=>C()),ref_key:"form",ref:k,size:"large",autocomplete:"off","label-position":"right","label-width":"95px"},{default:o(()=>[W,l(f,{type:"primary",underline:!1,onClick:a[0]||(a[0]=t=>{_.value=!1,y.value=!0}),class:"privacy",style:{"font-size":"0.9vw",height:"1vh"}},{default:o(()=>[X,s("登录 ")]),_:1}),l(r,{prop:"username",label:"用户名"},{default:o(()=>[l(d,{modelValue:e.value.username,"onUpdate:modelValue":a[1]||(a[1]=t=>e.value.username=t),placeholder:"请设置用户名"},null,8,["modelValue"])]),_:1}),l(r,{prop:"password",label:"设置密码"},{default:o(()=>[l(d,{modelValue:e.value.password,"onUpdate:modelValue":a[2]||(a[2]=t=>e.value.password=t),type:"password",placeholder:"请设置6位数密码，包含字母与数字"},null,8,["modelValue"])]),_:1}),l(r,{prop:"school",label:"任教学校"},{default:o(()=>[l(d,{modelValue:e.value.school,"onUpdate:modelValue":a[3]||(a[3]=t=>e.value.school=t),placeholder:"请填写学校名称"},null,8,["modelValue"])]),_:1}),l(r,{prop:"subject",label:"任教学科"},{default:o(()=>[l(P,{modelValue:e.value.subject,"onUpdate:modelValue":a[4]||(a[4]=t=>e.value.subject=t),placeholder:"请选择",style:{"font-size":"1px!important",height:"5.53vh !important",width:"100%"}},{default:o(()=>[l(h,{label:"英语",value:"English"}),l(h,{label:"语文",value:"Chinese"}),l(h,{label:"数学",value:"Math"}),l(h,{label:"地理",value:"Geography"})]),_:1},8,["modelValue"])]),_:1}),l(r,{prop:"email",label:"邮箱号"},{default:o(()=>[l(d,{modelValue:e.value.email,"onUpdate:modelValue":a[5]||(a[5]=t=>e.value.email=t),placeholder:"请填写邮箱号"},{append:o(()=>[u.disabled?(g(),c(m,{key:1,type:"default",disabled:""},{default:o(()=>[s(E(u.count)+"秒后重新发送",1)]),_:1})):(g(),c(m,{key:0,type:"default",onClick:$},{default:o(()=>[s("发送验证码")]),_:1}))]),_:1},8,["modelValue"])]),_:1}),l(B,null,{default:o(()=>[l(v,{span:12},{default:o(()=>[l(r,{inline:!0,prop:"verifyCode",label:"验证码"},{default:o(()=>[l(d,{modelValue:e.value.verifyCode,"onUpdate:modelValue":a[6]||(a[6]=t=>e.value.verifyCode=t),placeholder:"请输入验证码",prop:"registerCode"},null,8,["modelValue"])]),_:1})]),_:1}),l(v,{span:12},{default:o(()=>[l(r,{inline:!0,prop:" registerCode",label:"注册码"},{default:o(()=>[l(d,{modelValue:e.value.registerCode,"onUpdate:modelValue":a[7]||(a[7]=t=>e.value.registerCode=t),placeholder:"请输入注册码",prop:"verifyCode"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),l(m,{onClick:j,class:"button-login",type:"primary","auto-insert-space":"",style:{"margin-left":"0.5vw"}},{default:o(()=>[s(" 注册 ")]),_:1}),i("div",Y,[l(U,{class:"read",style:{"margin-top":"5vh","margin-left":"3vw"},modelValue:e.value.isChecked,"onUpdate:modelValue":a[8]||(a[8]=t=>e.value.isChecked=t)},{default:o(()=>[s("阅读并接受"),l(f,{underline:!1,href:"_blank",class:"privacy"},{default:o(()=>[s("《隐私条款》")]),_:1}),s("与"),l(f,{underline:!1,href:"_blank",class:"privacy"},{default:o(()=>[s("《隐私协议》")]),_:1})]),_:1},8,["modelValue"])])]),_:1},8,["model"])):y.value?(g(),c(q,{key:1,model:e.value,rules:x,onChange:a[16]||(a[16]=t=>C()),ref_key:"form",ref:k,size:"large",autocomplete:"off","label-position":"right","label-width":"95px"},{default:o(()=>[ee,l(r,{prop:"username",label:"用户名"},{default:o(()=>[l(d,{modelValue:e.value.username,"onUpdate:modelValue":a[10]||(a[10]=t=>e.value.username=t),placeholder:"请填写用户名"},null,8,["modelValue"])]),_:1}),l(r,{prop:"password",label:"密    码"},{default:o(()=>[l(d,{modelValue:e.value.password,"onUpdate:modelValue":a[11]||(a[11]=t=>e.value.password=t),name:"password",type:"password",placeholder:"请填写6位数密码"},null,8,["modelValue"])]),_:1}),i("div",le,[l(U,{class:"read",style:{"padding-left":"2vw"},onChange:a[12]||(a[12]=t=>e.value.saveToken=!n.saveToken)},{default:o(()=>[s("30天内免登录")]),_:1}),l(f,{underline:!1,type:"info",class:"read",onClick:a[13]||(a[13]=t=>{w.value=!0,y.value=!1})},{default:o(()=>[s("忘记密码")]),_:1})]),l(m,{onClick:F,class:"button-login","auto-insert-space":""},{default:o(()=>[s("登录")]),_:1}),l(m,{onClick:a[14]||(a[14]=t=>_.value=!0),class:"button-register","auto-insert-space":""},{default:o(()=>[s("注册新账号")]),_:1}),i("div",ae,[l(U,{class:"read",style:{"margin-top":"5vh","margin-left":"2vw"},modelValue:e.value.isChecked,"onUpdate:modelValue":a[15]||(a[15]=t=>e.value.isChecked=t)},{default:o(()=>[s("阅读并接受"),l(f,{underline:!1,href:"_blank",class:"privacy"},{default:o(()=>[s("《隐私条款》")]),_:1}),s("与"),l(f,{underline:!1,href:"_blank",class:"privacy"},{default:o(()=>[s("《隐私协议》")]),_:1})]),_:1},8,["modelValue"])])]),_:1},8,["model"])):w.value?(g(),c(q,{key:2,model:e.value,rules:x,onChange:a[23]||(a[23]=t=>C()),ref_key:"form",ref:k,size:"large",autocomplete:"off","label-position":"right","label-width":"90px"},{default:o(()=>[oe,l(r,{prop:"email",label:"邮箱号"},{default:o(()=>[l(d,{modelValue:e.value.email,"onUpdate:modelValue":a[17]||(a[17]=t=>e.value.email=t),placeholder:"请填写邮箱号"},{append:o(()=>[u.disabled?(g(),c(m,{key:1,type:"default",disabled:""},{default:o(()=>[s(E(u.count)+"秒后重新发送",1)]),_:1})):(g(),c(m,{key:0,type:"default",onClick:$},{default:o(()=>[s("发送验证码")]),_:1}))]),_:1},8,["modelValue"])]),_:1}),l(r,{inline:!0,prop:"verifyCode",label:"验证码"},{default:o(()=>[l(d,{modelValue:e.value.verifyCode,"onUpdate:modelValue":a[18]||(a[18]=t=>e.value.verifyCode=t),placeholder:"请输入验证码"},null,8,["modelValue"])]),_:1}),l(r,{inline:!0,prop:"password",label:"重置密码"},{default:o(()=>[l(d,{modelValue:e.value.password,"onUpdate:modelValue":a[19]||(a[19]=t=>e.value.password=t),type:"password",placeholder:"请输入新密码"},null,8,["modelValue"])]),_:1}),l(r,{inline:!0,prop:"repassword",label:"确认密码"},{default:o(()=>[l(d,{modelValue:e.value.repassword,"onUpdate:modelValue":a[20]||(a[20]=t=>e.value.repassword=t),type:"password",placeholder:"请确认新密码"},null,8,["modelValue"])]),_:1}),l(m,{onClick:L,class:"button-login","auto-insert-space":""},{default:o(()=>[s("登录")]),_:1}),l(m,{onClick:a[21]||(a[21]=t=>_.value=!0),class:"button-register","auto-insert-space":""},{default:o(()=>[s("注册新账号")]),_:1}),i("div",te,[l(U,{class:"read",style:{"margin-top":"5vh","margin-left":"2vw","vertical-align":"baseline"},modelValue:e.value.isChecked,"onUpdate:modelValue":a[22]||(a[22]=t=>e.value.isChecked=t)},{default:o(()=>[s("阅读并接受"),l(f,{href:"_blank",class:"privacy",style:{"vertical-align":"baseline"}},{default:o(()=>[s("《隐私条款》")]),_:1}),s("与"),l(f,{href:"_blank",class:"privacy",style:{"vertical-align":"baseline"}},{default:o(()=>[s("《隐私协议》")]),_:1})]),_:1},8,["modelValue"])])]),_:1},8,["model"])):H("",!0)]),_:1}),l(v,{span:5})]),_:1}),se],64)}}};export{ne as default};