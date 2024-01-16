import{r as g,v as J,o as Y,c as P,x as oe,y as ne,h as l,f as c,g as i,d as r,e as m,F as T,z as V,q as _,i as z,j as b,t as U,A as W,k as te,B as M,C as N,D as se,E as O,G as ae,H as ie,b as ue,I as ve,J as le,K as ge,L as K}from"./index-4ca38881.js";import{_ as pe}from"./LeftTopic-287addc1.js";import{_ as ce}from"./_plugin-vue_export-helper-c27b6911.js";const _e="/assets/position-9a305773.svg",me="/assets/grade-cd662436.svg",fe="/assets/volume-ad3e5f7d.svg",he="/assets/subject-056a070e.svg",be="/assets/version-21a63c9f.svg",ye="/assets/addButton-e6b62d34.svg",we="/assets/addLargeButton-ef7f2ee9.svg",Ce="/assets/beforeSwitch-e17756fd.svg",ke="/assets/switch-6bf66cb9.svg",$e="/assets/lockbag-59256813.svg",Se="/assets/usebag-38c5e3ce.svg";const Ee={style:{"padding-top":"1vh","padding-bottom":"1vh",display:"flex","align-items":"center","line-height":"1.1vh","font-size":"0.9vw"}},Ie=l("div",{style:{"font-weight":"600","margin-left":"0.2vw"}},"基础筛选",-1),Be={__name:"RightTopTopic",setup(S,{emit:f}){const y=f,p=g({question:"",difficulty:"",time:"",scope:""}),I=g({questionType:""}),k={questionType:[{required:!0,message:"请选择题目具体类型",trigger:"change"}]},D=g([]),Q=g(),q={question:[{required:!0,message:"请选择题目类型",trigger:"change"}],difficulty:[{required:!0,message:"请选择难度",trigger:"change"}],time:[{required:!0,message:"请选择完成时间",trigger:"change"}],scope:[{required:!0,message:"请选择考核范围",trigger:"change"}]},L=J(),x=async()=>{await Q.value.validate(),L.getChecked(p.value.question,I.value.questionType,p.value.difficulty,p.value.time.split(",").map(u=>+u),p.value.scope)},C=async()=>{const u=await ne("range");D.value=u.data.data},F=()=>{y("hiddenEvent")};return Y(()=>{C(),L.initSubject()}),(u,B)=>{const R=P("CaretLeft"),E=P("el-icon"),$=P("el-radio"),A=P("el-radio-group"),Z=P("el-form"),H=P("el-popover"),v=P("el-form-item");return oe(u.$slots,"default",{},()=>[l("div",Ee,[l("div",null,[c(E,{onClick:F,style:{"margin-left":"0.42vw"}},{default:i(()=>[c(R)]),_:1})]),Ie]),c(Z,{model:p.value,rules:q,ref_key:"formRef",ref:Q,onChange:x},{default:i(()=>[c(v,{prop:"question",label:"题型类型："},{default:i(()=>[c(A,{modelValue:p.value.question,"onUpdate:modelValue":B[1]||(B[1]=w=>p.value.question=w)},{default:i(()=>[(r(!0),m(T,null,V(_(L).ProblemTypeData,w=>(r(),z($,{key:w.value,label:w.genre},{default:i(()=>[c(H,{placement:"bottom",trigger:"click",width:"auto","popper-class":"popoverStyle"},{reference:i(()=>[b(U(w.genre),1)]),default:i(()=>[c(Z,{model:I.value,rules:k},{default:i(()=>[c(A,{modelValue:I.value.questionType,"onUpdate:modelValue":B[0]||(B[0]=G=>I.value.questionType=G)},{default:i(()=>[(r(!0),m(T,null,V(w.typeNameList,G=>(r(),z($,{key:G.value,label:G,onChange:x},{default:i(()=>[b(U(G),1)]),_:2},1032,["label"]))),128))]),_:2},1032,["modelValue"])]),_:2},1032,["model"])]),_:2},1024)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue"])]),_:1}),c(v,{prop:"difficulty",label:"难度选择："},{default:i(()=>[c(A,{modelValue:p.value.difficulty,"onUpdate:modelValue":B[2]||(B[2]=w=>p.value.difficulty=w)},{default:i(()=>[c($,{label:"0"},{default:i(()=>[b("不限")]),_:1}),c($,{label:"1"},{default:i(()=>[b("容易")]),_:1}),c($,{label:"2"},{default:i(()=>[b("较易")]),_:1}),c($,{label:"3"},{default:i(()=>[b("适中")]),_:1}),c($,{label:"4"},{default:i(()=>[b("较难")]),_:1}),c($,{label:"5"},{default:i(()=>[b("困难")]),_:1})]),_:1},8,["modelValue"])]),_:1}),c(v,{prop:"time",label:"完成时间："},{default:i(()=>[c(A,{modelValue:p.value.time,"onUpdate:modelValue":B[3]||(B[3]=w=>p.value.time=w)},{default:i(()=>[c($,{label:"1, 3"},{default:i(()=>[b("1~3分钟")]),_:1}),c($,{label:"3, 5"},{default:i(()=>[b("3~5分钟")]),_:1}),c($,{label:"5, 10"},{default:i(()=>[b("5~10分钟")]),_:1})]),_:1},8,["modelValue"])]),_:1}),c(v,{prop:"scope",label:"考核范围："},{default:i(()=>[c(A,{modelValue:p.value.scope,"onUpdate:modelValue":B[4]||(B[4]=w=>p.value.scope=w)},{default:i(()=>[(r(!0),m(T,null,V(D.value,w=>(r(),z($,{key:w.value,label:w.value},{default:i(()=>[b(U(w.label),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["model"])])}}},Te="/assets/loaddingImg-d826fe6b.svg";function Pe(S){return{all:S=S||new Map,on:function(f,y){var p=S.get(f);p?p.push(y):S.set(f,[y])},off:function(f,y){var p=S.get(f);p&&(y?p.splice(p.indexOf(y)>>>0,1):S.set(f,[]))},emit:function(f,y){var p=S.get(f);p&&p.slice().map(function(I){I(y)}),(p=S.get("*"))&&p.slice().map(function(I){I(f,y)})}}}const X=Pe();const Ve={style:{"margin-top":"10.7vh","text-align":"center"}},xe={key:0,class:"mt-4 searchGen"},Fe={key:1,class:"loadding-img"},Ue=l("img",{src:Te,style:{width:"16.7vw",height:"17vh"}},null,-1),De=l("div",{class:"loadding-content"},[l("p",null,"生成中...")],-1),qe=[Ue,De],Le=l("div",{class:"dialog-content"},[l("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[l("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM12.3197 5C13.0378 5 13.62 5.56281 13.62 6.3003C13.62 7.05719 13.0378 7.62 12.3197 7.62C11.5822 7.62 11 7.05719 11 6.3003C11 5.56281 11.5822 5 12.3197 5ZM11.3215 18.9077V9.45629C11.3215 8.95169 11.7752 8.6994 12.2729 8.6994C12.7527 8.6994 13.2243 8.95169 13.2243 9.45629V18.9077C13.2243 19.4317 12.7527 19.684 12.2729 19.684C11.7752 19.684 11.3215 19.4317 11.3215 18.9077Z",fill:"#6666FF"})]),l("span",null,"生成中")],-1),Ge=l("p",{class:"dialog-p"},"点击右上角符号进行多项业务同步生成同时查看同步生成的所有业务",-1),Qe=l("div",{class:"bar"},null,-1),Re={class:"dialog-footer"},Ae={__name:"RightUnderTopic",setup(S){const f=J(),y=g(5);let p=g(0);const I=g(),k=g(),D=g(!0),Q=()=>{f.isLoading?(f.generateProblemCancel(),window.cancelAnimationFrame(p.value)):(f.isLarge=!0,f.generateClick(k.value),y.value=5,L())},q=()=>{f.isLarge=!1},L=()=>{p.value=window.requestAnimationFrame(function x(){y.value<32?(y.value+=.005,I.value.style.width=y.value+"vw",p.value=requestAnimationFrame(x)):(y.value=32,window.cancelAnimationFrame(p.value))})};return X.on("progress",L()),(x,C)=>{const F=P("el-tag"),u=P("el-button"),B=P("el-input"),R=P("el-dialog");return oe(x.$slots,"default",{},()=>[l("div",Ve,[(r(!0),m(T,null,V(_(f).checkedArr,E=>(r(),z(F,{key:E,class:"mx-1 tagStyle",closable:"","disable-transitions":!1,onClose:$=>_(f).handleClose(E),type:"info"},{default:i(()=>[b(U(E),1)]),_:2},1032,["onClose"]))),128)),(r(!0),m(T,null,V(_(f).tagArrTop,E=>(r(),z(F,{key:E,class:"mx-1 tagStyle",closable:"","disable-transitions":!1,onClose:$=>_(f).handleClose1(E),type:"info"},{default:i(()=>[b(U(E),1)]),_:2},1032,["onClose"]))),128))]),D.value?(r(),m("div",xe,[c(B,{modelValue:k.value,"onUpdate:modelValue":C[0]||(C[0]=E=>k.value=E),placeholder:"请输入生成题目的关键词",class:"inputGen"},{append:i(()=>[c(u,{class:"buttonSet",onClick:Q},{default:i(()=>[b(U(_(f).isLoading?"取消生成":"开始生成"),1)]),_:1}),l("div",{class:W(["loaddingCon",{hiddenf:!_(f).isLoading}])},[l("div",{ref_key:"loaddingBar",ref:I,class:"loadding"},null,512)],2)]),_:1},8,["modelValue"])])):te("",!0),_(f).isLoading?(r(),m("div",Fe,qe)):te("",!0),c(R,{modal:!1,modelValue:_(f).dialogVisible,"onUpdate:modelValue":C[3]||(C[3]=E=>_(f).dialogVisible=E),width:"20.8vw","before-close":q,top:"55vh",class:"dialogSet"},{footer:i(()=>[l("span",Re,[c(u,{class:"set-other-btn2",onClick:C[1]||(C[1]=E=>_(f).setDialogVisibleFlase())},{default:i(()=>[b("在当前生成页面等待")]),_:1}),c(u,{class:"set-other-btn1",onClick:C[2]||(C[2]=E=>_(f).setDialogVisibleFlase())},{default:i(()=>[b("同步生成")]),_:1})])]),default:i(()=>[Le,Ge,Qe]),_:1},8,["modelValue"])])}}};const de=S=>(ae("data-v-6ca5a362"),S=S(),ie(),S),He={class:"container"},Me={class:"innercon"},Ne={class:"problem-body"},Ze=de(()=>l("svg",{width:"9",height:"10",viewBox:"0 0 9 10",fill:"none",xmlns:"http://www.w3.org/2000/svg",class:"svvg"},[l("circle",{cx:"4.5",cy:"5",r:"4.5",fill:"#BDCEFC"})],-1)),ze=["id"],je={key:0,class:"subProblem"},Oe=["id"],Je={class:"optionsCon"},Ke=["id"],We={key:1,class:"optionsCon"},Xe=["id"],Ye={class:"item-btns"},et={class:"item-btns1"},tt=de(()=>l("div",{class:"problem-analysis"},[l("div",{class:"split"})],-1)),lt={class:"control"},ot={class:"btns"},nt={__name:"ProblemShow",setup(S,{emit:f}){const y=J(),p=["一","二","三","四","五"],I=g(!0),k=g(!1),D=(t,n)=>t+1+"."+n,Q=g(""),q=g([]),L=g([]),x=g([]),C=g(""),F=g(""),u=g([]),B=g([]),R=g([]);g([]);const E=()=>{y.regenerate(),X.emit("progress"),X.emit("tip",I.value)},$=()=>{y.isShow=!y.isShow,y.totalGenerationProblem.splice(currentItem,1),y.currentItem=0},A=t=>{y.addUserProblems(t),y.getUserProblems()},Z=(t,n,a,e)=>{if(document.getElementById("pQuestion"+t).contentEditable=e,n){for(let s=0;s<n.length;s++)if(document.getElementById("pSelect"+t+s).contentEditable=e,n[s].options)for(let d=0;d<n[s].options.length;d++)document.getElementById("pSelect"+t+s+d).contentEditable=e}if(a)for(let s=0;s<a.length;s++)document.getElementById("pSelect"+t+"_"+s).contentEditable=e},H=(t,n,a)=>{if(Q.value=document.getElementById("pQuestion"+t).innerText,n)for(let e=0;e<n.length;e++){const s=document.getElementById("pSelect"+t+e);if(q.value[e]=s.innerText,n[e].options)for(let d=0;d<n[e].options.length;d++){const o=document.getElementById("pSelect"+t+e+d);L.value[d]=o.innerText}}if(a)for(let e=0;e<a.length;e++){const s=document.getElementById("pSelect"+t+"_"+e);x.value[e]=s.innerText}},v=(t,n,a)=>{k.value=!0,H(t,n,a),Z(t,n,a,!0)},w=(t,n,a,e)=>{if(k.value=!1,Z(t,n,a,!1),document.getElementById("pQuestion"+t).innerText=Q.value,n){for(let s=0;s<n.length;s++)if(document.getElementById("pSelect"+t+s).innerText=q.value[s],n[s].options)for(let d=0;d<n[s].options.length;d++)document.getElementById("pSelect"+t+s+d).innerText=L.value[d]}if(a)for(let s=0;s<a.length;s++)document.getElementById("pSelect"+t+"_"+s).innerText=x.value[s]},G=async(t,n,a,e)=>{if(k.value=!1,document.getElementById("pQuestion"+t).contentEditable=!1,Z(t,n,a,!1),F.value=document.getElementById("pQuestion"+t).innerText.slice(2),C.value=F.value,n){for(let o=0;o<n.length;o++)if(u.value[o]=document.getElementById("pSelect"+t+o).innerText,C.value=C.value+u.value[o],n[o].options)for(let h=0;h<n[o].options.length;h++)B.value[h]=document.getElementById("pSelect"+t+o+h).innerText,C.value=C.value+B.value[h]}if(a)for(let o=0;o<a.length;o++)R.value[o]=document.getElementById("pSelect"+t+"_"+o).innerText,C.value=C.value+R.value[o];const s=C.value.replace(/\\"/g,"");console.log("body是",s);const d=await se(s,e);if(console.log("res:",d),document.getElementById("pQuestion"+t).innerText=t+1+"."+F.value,n){for(let o=0;o<n.length;o++)if(document.getElementById("pSelect"+t+o).innerText=u.value[o],n[o].options)for(let h=0;h<n[o].options.length;h++)document.getElementById("pSelect"+t+o+h).innerText=B.value[h]}if(a)for(let o=0;o<a.length;o++)document.getElementById("pSelect"+t+"_"+o).innerText=R.value[o];O.success(`${d.data.data}`)};return(t,n)=>{const a=P("el-button");return r(),m("div",He,[l("div",Me,[l("div",Ne,[(r(!0),m(T,null,V(_(y).totalGenerationProblem[_(y).currentItem].dataVO,(e,s)=>(r(),m("div",{class:"itemCon",key:e.problemId},[l("span",null,[Ze,b(" 生成结果"+U(p[s]),1)]),l("p",{class:"problem-p",id:"pQuestion"+s},U(D(s,e.body)),9,ze),e.subProblemList?(r(),m("div",je,[(r(!0),m(T,null,V(e.subProblemList,(d,o)=>(r(),m("div",{key:o},[l("p",{class:"problem-p",id:"pSelect"+s+o},U(d.body),9,Oe),l("div",Je,[(r(!0),m(T,null,V(d.options,(h,j)=>(r(),m("p",{key:j,id:"pSelect"+s+o+j},U(h),9,Ke))),128))])]))),128))])):(r(),m("div",We,[(r(!0),m(T,null,V(e.options,(d,o)=>(r(),m("p",{key:o,id:"pSelect"+s+"_"+o},U(d),9,Xe))),128))])),l("div",Ye,[c(a,{text:"",class:"btn1",onClick:d=>v(s,e.subProblemList,e.options)},{default:i(()=>[b("纠错")]),_:2},1032,["onClick"]),c(a,{text:"",class:"btn2",onClick:d=>A(e.problemId)},{default:i(()=>[b("加入题库")]),_:2},1032,["onClick"])]),M(l("div",et,[c(a,{text:"",class:"btn11",onClick:d=>w(s,e.subProblemList,e.options,e.problemId)},{default:i(()=>[b("取消")]),_:2},1032,["onClick"]),c(a,{text:"",class:"btn21",onClick:d=>G(s,e.subProblemList,e.options,e.problemId)},{default:i(()=>[b("确认")]),_:2},1032,["onClick"])],512),[[N,k.value]])]))),128))]),tt]),l("div",lt,[l("div",ot,[c(a,{round:"",class:"set-other-btn1",onClick:E},{default:i(()=>[b("重新生成")]),_:1}),c(a,{round:"",class:"set-other-btn2",onClick:$},{default:i(()=>[b("取消生成")]),_:1})])])])}}},st=ce(nt,[["__scopeId","data-v-6ca5a362"]]);const at=S=>(ae("data-v-3c2f8a33"),S=S(),ie(),S),it={class:"bagProblemSet"},ct=at(()=>l("svg",{width:"14",height:"9",viewBox:"0 0 14 9",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[l("path",{d:"M6.94618 8.72168L0.0660894 0.055015L13.8263 0.0550137L6.94618 8.72168Z",fill:"#6666FF"})],-1)),dt={class:"problemSet"},rt={style:{position:"relative"}},ut=["id"],vt={key:0,class:"subProblem"},gt=["id"],pt={class:"optionsCon"},_t=["id"],mt={key:1,class:"optionsCon"},ft=["id"],ht={class:"item-btns"},bt={class:"item-btns1"},yt=ve('<div style="position:absolute;top:4.4vh;right:1vw;display:flex;" data-v-3c2f8a33><div class="iconSet" data-v-3c2f8a33><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-3c2f8a33><circle cx="9" cy="9" r="8.5" fill="#D9D9D9" stroke="#6666FF" data-v-3c2f8a33></circle><circle cx="12" cy="9" r="4" fill="#6666FF" data-v-3c2f8a33></circle></svg></div><div class="iconSet" data-v-3c2f8a33><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-3c2f8a33><rect width="8" height="18" rx="2" fill="#D9D9D9" data-v-3c2f8a33></rect><rect x="10" width="8" height="18" rx="2" fill="#6666FF" data-v-3c2f8a33></rect></svg></div><div class="iconSet" data-v-3c2f8a33><svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-3c2f8a33><rect x="2.00391" width="18" height="18" fill="#D9D9D9" data-v-3c2f8a33></rect><path d="M11.7786 8.04835L14.4971 1.50146L19.001 9.11892L11.7786 8.04835Z" fill="#6666FF" data-v-3c2f8a33></path><path d="M9.22922 9.45263L6.51073 15.9995L2.00686 8.38206L9.22922 9.45263Z" fill="#6666FF" data-v-3c2f8a33></path></svg></div></div>',1),wt={class:"control"},Ct={class:"btns"},kt={__name:"BagProblemSet",setup(S){const f=g(""),y=g([]),p=g([]),I=g([]),k=g(""),D=g(""),Q=g([]),q=g([]),L=g([]),x=J(),C=g(!1);let F=[];const u=(t,n)=>t+1+"."+n;Y(()=>{x.getUserProblems()});const B=(t,n,a)=>{if(f.value=document.getElementById("pQuestion"+t).innerText,n)for(let e=0;e<n.length;e++){const s=document.getElementById("pSelect"+t+e);if(y.value[e]=s.innerText,n[e].options)for(let d=0;d<n[e].options.length;d++){const o=document.getElementById("pSelect"+t+e+d);p.value[d]=o.innerText}}if(a)for(let e=0;e<a.length;e++){const s=document.getElementById("pSelect"+t+"_"+e);I.value[e]=s.innerText}},R=(t,n,a,e)=>{if(document.getElementById("pQuestion"+t).contentEditable=e,n){for(let s=0;s<n.length;s++)if(document.getElementById("pSelect"+t+s).contentEditable=e,n[s].options)for(let d=0;d<n[s].options.length;d++)document.getElementById("pSelect"+t+s+d).contentEditable=e}if(a)for(let s=0;s<a.length;s++)document.getElementById("pSelect"+t+"_"+s).contentEditable=e},E=(t,n,a)=>{C.value=!0,B(t,n,a),R(t,n,a,!0)},$=(t,n,a)=>{if(C.value=!1,R(t,n,a,!1),document.getElementById("pQuestion"+t).innerText=f.value,n){for(let e=0;e<n.length;e++)if(document.getElementById("pSelect"+t+e).innerText=y.value[e],n[e].options)for(let s=0;s<n[e].options.length;s++)document.getElementById("pSelect"+t+e+s).innerText=p.value[s]}if(a)for(let e=0;e<a.length;e++)document.getElementById("pSelect"+t+"_"+e).innerText=I.value[e]},A=async(t,n,a,e)=>{if(C.value=!1,document.getElementById("pQuestion"+t).contentEditable=!1,R(t,n,a,!1),D.value=document.getElementById("pQuestion"+t).innerText.slice(2),k.value=D.value,n){for(let o=0;o<n.length;o++)if(Q.value[o]=document.getElementById("pSelect"+t+o).innerText,k.value=k.value+Q.value[o],n[o].options)for(let h=0;h<n[o].options.length;h++)q.value[h]=document.getElementById("pSelect"+t+o+h).innerText,k.value=k.value+q.value[h]}if(a)for(let o=0;o<a.length;o++)L.value[o]=document.getElementById("pSelect"+t+"_"+o).innerText,k.value=k.value+L.value[o];const s=k.value.replace(/\\"/g,""),d=await se(s,e);if(document.getElementById("pQuestion"+t).innerText=t+1+"."+D.value,n){for(let o=0;o<n.length;o++)if(document.getElementById("pSelect"+t+o).innerText=Q.value[o],n[o].options)for(let h=0;h<n[o].options.length;h++)document.getElementById("pSelect"+t+o+h).innerText=q.value[h]}if(a)for(let o=0;o<a.length;o++)document.getElementById("pSelect"+t+"_"+o).innerText=L.value[o];O.success(`${d.data.data}`)},Z=ue(),H=()=>{Z.push("/personalTopic")},v=()=>{try{F=[],x.userProblemList.forEach(t=>{F.push(t.data.problemId)}),F.length>0?(F.forEach(async t=>{const n=await le(t);x.getUserProblems()}),O.success("删除成功！")):O.error("无可删除内容！")}catch(t){O.error("删除失败！",t)}},w=async()=>{const n=(await ge()).data.data;let a="";n.forEach((s,d)=>{let o=d+1;a=a+o+"."+s.body,s.subProblemList?s.subProblemList.forEach(h=>{a=a+h.body+h.options}):s.options&&(a=a+s.options)});const e=document.createElement("textarea");e.style.position="fixed",e.style.top=0,e.style.left=0,e.style.width="2vw",e.style.height="2vw",e.style.padding=0,e.style.border="none",e.style.outline="none",e.style.boxShadow="none",e.style.background="transparent",e.value=a,document.body.appendChild(e),e.focus(),e.select(),document.execCommand("copy"),document.body.removeChild(e),O.success("复制成功！")},G=async t=>{try{const n=await le(t);console.log(n.data),O.success("删除成功！"),x.getUserProblems()}catch(n){O.error("删除失败！",n)}};return(t,n)=>{const a=P("el-button"),e=P("el-tab-pane"),s=P("el-tabs");return r(),m("div",it,[c(a,{class:"problemTitle",onClick:n[0]||(n[0]=d=>_(x).handelBag())},{default:i(()=>[ct,b(" 我的题库 ")]),_:1}),l("div",dt,[c(s,{class:"demo-tabs"},{default:i(()=>[c(e,{label:"已有题目"},{default:i(()=>[l("div",null,[(r(!0),m(T,null,V(_(x).userProblemList,(d,o)=>(r(),m("div",{class:"itemCon",key:d.data.problemId},[l("div",rt,[l("p",{style:{"margin-left":"1vw","margin-bottom":"1vh"},id:"pQuestion"+o},U(u(o,d.data.body)),9,ut)]),d.data.subProblemList?(r(),m("div",vt,[(r(!0),m(T,null,V(d.data.subProblemList,(h,j)=>(r(),m("div",{key:j},[l("p",{class:"problem-p",style:{"margin-left":"1vw"},id:"pSelect"+o+j},U(h.body),9,gt),l("div",pt,[(r(!0),m(T,null,V(h.options,(re,ee)=>(r(),m("p",{key:ee,style:{"margin-left":"1vw"},id:"pSelect"+o+j+ee},U(re),9,_t))),128))])]))),128))])):(r(),m("div",mt,[(r(!0),m(T,null,V(d.data.options,(h,j)=>(r(),m("p",{style:{"margin-left":"1vw"},class:"options-item",key:j,id:"pSelect"+o+"_"+j},U(h),9,ft))),128))])),l("div",ht,[c(a,{text:"",class:"btn1",onClick:h=>E(o,d.data.subProblemList,d.data.options)},{default:i(()=>[b("纠错")]),_:2},1032,["onClick"]),c(a,{text:"",class:"btn2",onClick:h=>G(d.data.problemId)},{default:i(()=>[b("删除")]),_:2},1032,["onClick"])]),M(l("div",bt,[c(a,{text:"",class:"btn11",onClick:h=>$(o,d.data.subProblemList,d.data.options)},{default:i(()=>[b("取消")]),_:2},1032,["onClick"]),c(a,{text:"",class:"btn21",onClick:h=>A(o,d.data.subProblemList,d.data.options,d.data.problemId)},{default:i(()=>[b("确认")]),_:2},1032,["onClick"])],512),[[N,C.value]])]))),128))])]),_:1}),c(e,{label:"组成标准试卷"},{default:i(()=>[b("组成标准试卷")]),_:1})]),_:1}),yt,l("div",wt,[l("div",Ct,[c(a,{round:"",class:"set-other-btn1",onClick:t.reGenerateHandle},{default:i(()=>[b("直接封装")]),_:1},8,["onClick"]),c(a,{round:"",class:"set-other-btn2",onClick:n[1]||(n[1]=d=>w())},{default:i(()=>[b("复制全部")]),_:1}),c(a,{round:"",class:"set-other-btn2",onClick:H},{default:i(()=>[b("进入题库")]),_:1}),c(a,{round:"",class:"set-other-btn2",onClick:v},{default:i(()=>[b("删除所有")]),_:1})])])])])}}},$t=ce(kt,[["__scopeId","data-v-3c2f8a33"]]);const St={class:"selectAll"},Et={class:"content"},It=l("img",{src:_e,style:{width:"1.93vw",height:"2.92vh"}},null,-1),Bt={class:"content"},Tt=l("img",{src:me,style:{width:"2.07vw",height:"2.93vh"}},null,-1),Pt={class:"content"},Vt=l("img",{src:fe,style:{width:"1.84vw",height:"2.89vh"}},null,-1),xt={class:"content"},Ft=l("img",{src:he,style:{width:"1.92vw",height:"3vh"}},null,-1),Ut={class:"content"},Dt=l("img",{src:be,style:{width:"1.92vw",height:"2.79vh"}},null,-1),qt={class:"addButton"},Lt=l("img",{src:we,style:{width:"5.2vw",height:"9.2vh"}},null,-1),Gt=[Lt],Qt={class:"first-show"},Rt={class:"else-show"},At=["onClick"],Ht={class:"under"},Mt={class:"underRight"},Nt={class:"underRight2"},Zt={style:{"padding-top":"1vh",display:"flex","align-items":"center","line-height":"1.1vh","font-size":"0.9vw"}},zt=l("div",{style:{"font-weight":"600","margin-left":"0.2vw"}},"生成题目",-1),jt=l("img",{src:ke,style:{position:"absolute",right:"1vw",top:"1vh"}},null,-1),Ot=[jt],Jt={key:0,style:{position:"absolute",display:"inline-block",right:"0"},draggable:"true"},Kt=l("img",{class:"dragImg",src:$e,alt:""},null,-1),Wt=[Kt],Xt=l("img",{class:"dragImg",src:Se,alt:""},null,-1),ll={__name:"selectFilter",setup(S){const f=g(""),y=g(""),p=g(""),I=g(""),k=g(""),D=g(!1),Q=["region","subject","textbook"],q=g({}),L=[{value1:1,label1:"一年级"},{value1:2,label1:"二年级"},{value1:3,label1:"三年级"},{value1:4,label1:"四年级"},{value1:5,label1:"五年级"},{value1:6,label1:"六年级"},{value1:7,label1:"初一"},{value1:8,label1:"初二"},{value1:9,label1:"初三"},{value1:10,label1:"高一"},{value1:11,label1:"高二"},{value1:12,label1:"高三"}],x=[{value2:"上册",label2:"上册"},{value2:"下册",label2:"下册"}],C=g(),F=g(),u=J(),B=()=>{Q.forEach(async H=>{const v=await ne(H);q.value[H]=v.data.data})},R=()=>{C.value.style.width=0,C.value.style.margin=0,C.value.style.overflow="hidden"},E=()=>{F.value.style.height=0,F.value.style.overflow="hidden",F.value.style.margin=0},$=()=>{D.value=!D.value},A=H=>{H?(u.isLoading&&(u.isLoading=!1),u.isShow=!0,D.value=!1):(u.isShow&&(u.isShow=!1),D.value=!1)},Z=H=>{u.isShow=!1;let v=u.totalGenerationProblem.length;for(let w=0;w<v;w++)if(u.totalGenerationProblem[w].generateId===H){u.currentItem=w;break}};return Y(()=>{B()}),(H,v)=>{var a;const w=P("el-option"),G=P("el-select"),t=P("CaretLeft"),n=P("el-icon");return r(),m(T,null,[l("div",St,[l("div",Et,[It,c(G,{modelValue:f.value,"onUpdate:modelValue":v[0]||(v[0]=e=>f.value=e),onChange:v[1]||(v[1]=e=>_(u).getRegion(f.value)),class:"m-2 select1",placeholder:"请选择地点"},{default:i(()=>[(r(!0),m(T,null,V(q.value.region,e=>(r(),z(w,{key:e.value,label:e.label,value:e.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),l("div",Bt,[Tt,c(G,{modelValue:y.value,"onUpdate:modelValue":v[2]||(v[2]=e=>y.value=e),onChange:v[3]||(v[3]=e=>_(u).getGrade(y.value)),class:"m-2 select1",placeholder:"请选择年级"},{default:i(()=>[(r(),m(T,null,V(L,e=>c(w,{key:e.value1,label:e.label1,value:e.value1},null,8,["label","value"])),64))]),_:1},8,["modelValue"])]),l("div",Pt,[Vt,c(G,{modelValue:p.value,"onUpdate:modelValue":v[4]||(v[4]=e=>p.value=e),class:"m-2 select1",placeholder:"请选择上下册",onChange:v[5]||(v[5]=e=>_(u).getGenre(p.value))},{default:i(()=>[(r(),m(T,null,V(x,e=>c(w,{key:e.value2,label:e.label2,value:e.value2},null,8,["label","value"])),64))]),_:1},8,["modelValue"])]),l("div",xt,[Ft,c(G,{modelValue:I.value,"onUpdate:modelValue":v[6]||(v[6]=e=>I.value=e),onChange:v[7]||(v[7]=e=>_(u).getSubject(I.value)),class:"m-2 select1",placeholder:"请选择学科"},{default:i(()=>[(r(!0),m(T,null,V(q.value.subject,e=>(r(),z(w,{key:e.value,label:e.label,value:e.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),l("div",Ut,[Dt,c(G,{modelValue:k.value,"onUpdate:modelValue":v[8]||(v[8]=e=>k.value=e),onChange:v[9]||(v[9]=e=>_(u).getTextbook(k.value)),class:"m-2 select1",placeholder:"请选择教材版本"},{default:i(()=>[(r(!0),m(T,null,V(q.value.textbook,e=>(r(),z(w,{key:e.value,label:e.label,value:e.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),l("div",qt,[M(l("img",{onClick:$,src:ye,style:{width:"2.08vw",height:"3.7vh"}},null,512),[[N,!_(u).isLoading]]),M(l("div",{class:"addLarge",onClick:$},Gt,512),[[N,_(u).isLoading]]),l("div",null,[M(l("div",Qt,[l("p",{class:"first-show-item active",onClick:v[10]||(v[10]=K(e=>A(""),["stop"]))},U((a=_(u).totalGenerationProblem[0])==null?void 0:a.title),1),l("p",{class:"first-show-item",onClick:v[11]||(v[11]=K(e=>A("add"),["stop"]))},"新增生成页面")],512),[[N,D.value&&_(u).totalGenerationProblem.length===1]]),M(l("div",Rt,[(r(!0),m(T,null,V(_(u).totalGenerationProblem,e=>(r(),m("p",{class:W(["else-show-item",{active:_(u).totalGenerationProblem[_(u).currentItem].generateId===e.generateId}]),key:e.generateId,onClick:s=>Z(e.generateId)},U(e.title),11,At))),128)),M(l("p",{class:"else-show-item",onClick:v[12]||(v[12]=K(e=>A("add"),["stop"]))},"新增生成页面",512),[[N,_(u).totalGenerationProblem.length<5]])],512),[[N,D.value&&_(u).totalGenerationProblem.length>1]])])])]),l("div",Ht,[l("div",{class:"underLeft",ref_key:"underLeft",ref:C},[c(pe,{onHiddenEventL:R})],512),l("div",Mt,[l("div",{class:"underRight1",ref_key:"rightTop",ref:F},[c(Be,{onHiddenEvent:E})],512),l("div",Nt,[l("div",Zt,[l("div",null,[c(n,{style:{"margin-left":"0.42vw"}},{default:i(()=>[c(t)]),_:1})]),zt,l("div",null,[M(l("img",{src:Ce,onClick:$,style:{position:"absolute",right:"1vw",top:"1vh"}},null,512),[[N,!_(u).isLoading]]),M(l("div",{class:"addLarge",onClick:$},Ot,512),[[N,_(u).isLoading]])])]),_(u).isShow?(r(),z(Ae,{key:0})):(r(),z(st,{key:1}))]),_(u).isBag?(r(),m("div",Jt,Wt)):(r(),m("div",{key:1,style:{position:"absolute",display:"inline-block",right:"0"},draggable:"true",onClick:v[13]||(v[13]=e=>_(u).handelBag())},[Xt,M(l("div",{class:W(["fz",[_(u).userProblemList.length>9?"rectangle":"circle"]])},U(_(u).userProblemList.length),3),[[N,_(u).userProblemList.length]])]))])]),M(c($t,null,null,512),[[N,_(u).isBagProblemSet]])],64)}}};export{ll as default};
