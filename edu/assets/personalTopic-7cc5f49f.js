import{v as F,r as i,J as O,c as y,d as u,i as J,G as D,H as A,h as e,f as t,B as Z,g as c,j as m,I as N,T as se,K as le,E as I,C as R,D as q,o as K,e as v,t as P,F as U,A as B,y as oe,L as ne,b as ae,q as j,M as ie,N as ce,O as de}from"./index-f73d2c15.js";import{_ as re}from"./LeftTopic-dda1f9f8.js";import{_ as z}from"./_plugin-vue_export-helper-c27b6911.js";const k=a=>(R("data-v-58feef75"),a=a(),q(),a),ue=["onClick"],_e={class:"content"},pe=k(()=>e("p",{class:"title"},"新建试题卷",-1)),me={class:"item1"},ve=k(()=>e("p",{class:"item-title"},"试卷类型",-1)),he={class:"item1-container"},fe=k(()=>e("p",null,"类型一期末考试",-1)),be={class:"item1-item item1-item1"},ye=k(()=>e("span",null,null,-1)),ge=k(()=>e("div",null,[e("p",null,"类型二期中考试"),e("div",{class:"item1-item item1-item2"})],-1)),$e=k(()=>e("div",null,[e("p",null,"类型三自定义"),e("div",{class:"item1-item item1-item3"})],-1)),we={class:"item2"},Ce=k(()=>e("p",{class:"item-title"},"试卷抬头设置",-1)),Se={class:"item3"},ke=k(()=>e("p",{class:"item-title"},"抬头样式",-1)),xe={class:"item3-container"},Ve=k(()=>e("p",null,"居中",-1)),Pe=[Ve],Le=k(()=>e("p",null,"左对齐",-1)),Te=[Le],He={__name:"AddProblemSet",props:["isShow"],setup(a,{emit:w}){const s=F(),h=i(),d=a,f=i(1),_=i(""),l=i("");O(()=>f.value+"");const b=w,E=()=>{b("update:isShow",!1)},C=S=>{l.value=S},x=async()=>{try{const S=await le({format:l.value,title:_.value});I.success("添加题集成功！")}catch(S){I.error("添加题集失败！",S.msg)}finally{s.getUserProblemSetList(),b("update:isShow",!1)}};return(S,g)=>{const M=y("el-slider"),T=y("el-input"),p=y("el-button");return u(),J(se,{to:"body"},[D(e("div",{class:"container",onClick:N(E,["self"])},[e("div",_e,[pe,e("div",me,[ve,e("div",he,[e("div",null,[fe,e("div",be,[e("div",null,[ye,t(M,{ref_key:"silder",ref:h,modelValue:f.value,"onUpdate:modelValue":g[0]||(g[0]=r=>f.value=r)},null,8,["modelValue"])])])]),ge,$e])]),e("div",we,[Ce,t(T,{modelValue:_.value,"onUpdate:modelValue":g[1]||(g[1]=r=>_.value=r),placeholder:"例：成都七中初二年级期中考试"},null,8,["modelValue"])]),e("div",Se,[ke,e("div",xe,[e("div",{class:Z(["item3-item",{active:l.value==="CENTER"}]),onClick:g[2]||(g[2]=r=>C("CENTER"))},Pe,2),e("div",{class:Z(["item3-item",{active:l.value==="LEFT_ALIGN"}]),onClick:g[3]||(g[3]=r=>C("LEFT_ALIGN"))},Te,2)])]),t(p,{onClick:x,class:"btn"},{default:c(()=>[m("确认")]),_:1})])],8,ue),[[A,d.isShow]])])}}},Ie=z(He,[["__scopeId","data-v-58feef75"]]);const Q=a=>(R("data-v-0b53b4c7"),a=a(),q(),a),Ne={class:"container"},De={style:{display:"flex"}},Ae={class:"tiem-content"},Ee=Q(()=>e("span",{style:{position:"absolute",right:"2vw"}},[e("svg",{width:"14",height:"9",viewBox:"0 0 14 9",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[e("path",{opacity:"0.4",d:"M6.97125 9L0.0688964 0.333333L13.8736 0.333334L6.97125 9Z",fill:"#25313D"})])],-1)),Me=["onClick"],Ue={width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},Be=["fill"],Ze={class:"tiem-content"},Fe=Q(()=>e("span",{style:{position:"absolute",right:"2vw"}},[e("svg",{width:"14",height:"9",viewBox:"0 0 14 9",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[e("path",{opacity:"0.4",d:"M6.97125 9L0.0688964 0.333333L13.8736 0.333334L6.97125 9Z",fill:"#25313D"})])],-1)),Re={__name:"ProblemTopSelect",setup(a){const w=F(),s=i(0),h=i(),d=i(!1),f=i([]),_={0:"不限",7:"近7天",15:"近十五天"},l=i({time:null,type:null,questionType:null,recentDay:null,showAnalysis:!0}),b=o=>o.getTime()>Date.now(),E=i(),C=i(),x=i(!1),S=()=>{x.value?(C.value.style.display="none",x.value=!1):(C.value.style.display="flex",x.value=!0)},g=()=>{d.value=!d.value},M=o=>{l.value.showAnalysis=o,H()},T=o=>{s.value=o,H(),C.value.style.display="none",x.value=!1,console.log(s.value)},p=()=>{E.value.focus()},r=()=>{H(),C.value.style.display="none",x.value=!1},H=()=>{w.getSearchUserProblems({genre:l.value.type,recentDays:_[s.value]?s.value:null,date:_[s.value]?null:s.value,showAnalysis:l.value.showAnalysis,topicList:null})},V=async()=>{const o=await oe("English");f.value=o.data.data};return K(()=>{V()}),(o,n)=>{const L=y("el-date-picker"),G=y("el-form-item"),X=y("el-radio"),ee=y("el-radio-group"),te=y("el-form");return u(),v("div",Ne,[t(te,{model:l.value,ref:"formRef",onChange:H},{default:c(()=>[e("div",De,[t(G,{prop:"time",label:"生成时间："},{default:c(()=>[e("div",{class:"time-select",onClick:S},[e("p",Ae,[e("span",null,P(_[s.value]||s.value),1),Ee]),e("div",{class:"select-item",ref_key:"selectItem",ref:C},[e("p",{class:Z(["item-p p1",{active:s.value===0}]),onClick:n[0]||(n[0]=N($=>T(0),["stop"]))}," 不限 ",2),e("p",{class:Z(["item-p p2",{active:s.value===7}]),onClick:n[1]||(n[1]=N($=>T(7),["stop"]))}," 近7天 ",2),e("p",{class:Z(["item-p p2",{active:s.value===15}]),onClick:n[2]||(n[2]=N($=>T(15),["stop"]))}," 近15天 ",2),e("p",{class:"item-p p3",onClick:N(p,["stop"])},[(u(),v("svg",Ue,[e("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M17.5385 5H6.46154C5.10207 5 4 6.04467 4 7.33333V16.6667C4 17.9553 5.10207 19 6.46154 19H17.5385C18.8979 19 20 17.9553 20 16.6667V7.33333C20 6.04467 18.8979 5 17.5385 5ZM12 12H13V14H12V12ZM15 12H16V14H15V12ZM18.6272 17.6653C18.8659 17.4509 19 17.1602 19 16.8571V10H5V16.8571C5 17.1602 5.13409 17.4509 5.37277 17.6653C5.61146 17.8796 5.93518 18 6.27273 18H17.7273C18.0648 18 18.3885 17.8796 18.6272 17.6653ZM19 9H5V7C5 6.73478 5.13409 6.48043 5.37277 6.29289C5.61146 6.10536 5.93518 6 6.27273 6H17.7273C18.0648 6 18.3885 6.10536 18.6272 6.29289C18.8659 6.48043 19 6.73478 19 7V9ZM8 12H9V14H8V12Z",fill:_[s.value]?"#A6A6A6":"#000"},null,8,Be)])),t(L,{ref_key:"datePicker",ref:E,onChange:r,modelValue:s.value,"onUpdate:modelValue":n[3]||(n[3]=$=>s.value=$),type:"date","disabled-date":b,class:"timnePickCSS","value-format":"YYYY-MM-DD","popper-class":"date_form"},null,8,["modelValue"])],8,Me)],512)])]),_:1}),t(G,{prop:"time",label:"展示分析："},{default:c(()=>[e("div",{class:"analysis-select",onClick:g},[e("p",Ze,[e("span",null,P(l.value.showAnalysis?"是":"否"),1),Fe]),D(e("div",{class:"analysis-select-item",ref_key:"analysisSelectItem",ref:h},[e("p",{style:{cursor:"pointer"},onClick:n[4]||(n[4]=$=>M(!0)),class:"a-p"},"是"),e("p",{style:{cursor:"pointer"},onClick:n[5]||(n[5]=$=>M(!1)),class:"a-p"},"否")],512),[[A,d.value]])])]),_:1})]),t(G,{prop:"type",label:"生成题型："},{default:c(()=>[t(ee,{modelValue:l.value.type,"onUpdate:modelValue":n[6]||(n[6]=$=>l.value.type=$)},{default:c(()=>[(u(!0),v(U,null,B(f.value,$=>(u(),J(X,{key:$.value,label:$.genre},null,8,["label"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["model"])])}}},qe=z(Re,[["__scopeId","data-v-0b53b4c7"]]);const Y=a=>(R("data-v-e61d2616"),a=a(),q(),a),ze={class:"container"},Ye={class:"select-container"},Ge=Y(()=>e("div",{class:"split-bar"},null,-1)),je={class:"innercon"},Je={class:"problem-body"},Ke=Y(()=>e("span",{class:"title"},"试题集",-1)),Oe={style:{position:"relative"}},Qe={style:{"margin-left":"1vw"}},We={class:"optionsCon"},Xe={class:"problem-list"},et=Y(()=>e("span",{class:"title"},"习题集",-1)),tt={class:"list-content"},st={class:"problem-set-title"},lt={class:"problem-set-main"},ot={class:"item-title"},nt={class:"item-content"},at={style:{color:"#6666ff"}},it=Y(()=>e("div",{class:"split"},null,-1)),ct={class:"control"},dt={class:"btns"},rt={class:"btns"},ut={class:"problem-set-select"},_t=["onClick"],pt={__name:"Problems",setup(a){ne(p=>({"7f3573ff":w.value})),ae();const w=O(()=>"-"+l.problemSetList.length*3+"vh"),s=i(!1),h=i(!1),d=i(!1),f={1:"一",2:"二",3:"三",4:"四",5:"五"},_=[{id:1,title:"填空",currentNum:10,maxNum:15},{id:2,title:"写作",currentNum:1,maxNum:2},{id:3,title:"听力",currentNum:10,maxNum:15},{id:4,title:"阅读",currentNum:3,maxNum:4},{id:5,title:"完形",currentNum:3,maxNum:4}];i({time:null,type:null,questionType:null,recentDay:null,showAnalysis:!0});const l=F();let b=[];const E=(p,r)=>p+1+"."+r.slice(3),C=()=>{b=[],l.userProblemList.forEach(p=>{p.isSelet&&b.push(p.data.problemId)}),console.log(l.userProblemList),console.log(b),b.length?d.value=!0:I.error("请选择题目！")},x=()=>{try{b.forEach(async p=>{const r=await ie(p);console.log(r.data),I.success("删除成功！"),l.getUserProblems()})}catch(p){I.error("删除失败！",p)}finally{d.value=!1}},S=()=>{s.value=!s.value},g=()=>{l.getUserProblemSetList()},M=()=>{h.value=!h.value},T=p=>{try{b.forEach(async r=>{const H=await ce({problemId:r,problemSetSeqNum:p});I.success("添加成功！")})}catch{I.error("删除失败！")}finally{h.value=!1}};return K(()=>{g()}),(p,r)=>{const H=y("el-checkbox"),V=y("el-button");return u(),v("div",ze,[e("div",Ye,[t(qe),Ge]),e("div",je,[e("div",Je,[Ke,(u(!0),v(U,null,B(j(l).userProblemList,(o,n)=>(u(),v("div",{class:"itemCon",key:o.data.problemId},[e("div",Oe,[t(H,{style:{position:"absolute",top:"-0.2vh"},modelValue:o.isSelet,"onUpdate:modelValue":L=>o.isSelet=L},null,8,["modelValue","onUpdate:modelValue"]),e("p",Qe,P(E(n,o.data.body)),1)]),e("div",We,[(u(!0),v(U,null,B(o.data.options,L=>(u(),v("p",{class:"options-item",key:L},P(L),1))),128))])]))),128))]),e("div",Xe,[et,e("div",tt,[t(V,{onClick:M,class:"newlist"},{default:c(()=>[m("新建试题集")]),_:1}),(u(!0),v(U,null,B(j(l).problemSetList,o=>(u(),v("div",{class:"problem-set-content",key:o.problemSetId},[e("p",st,"题集："+P(o.problemSetId),1),e("div",lt,[(u(),v(U,null,B(_,(n,L)=>e("div",{class:"main-item",key:n.id},[e("div",ot,P(n.title),1),e("div",nt,[m(" ("),e("span",at,P(n.currentNum),1),m("/"+P(n.maxNum)+") ",1)])])),64)),t(V,{class:"main-item-btn"},{default:c(()=>[m("查看")]),_:1})])]))),128))]),it])]),e("div",ct,[D(e("div",dt,[t(V,{round:"",class:"set-other-btn2",onClick:C},{default:c(()=>[m("批量处理")]),_:1}),t(V,{round:"",class:"set-other-btn2",onClick:S},{default:c(()=>[m("习题封装")]),_:1})],512),[[A,!d.value]]),D(e("div",rt,[t(V,{class:"set-other-btn1",onClick:x},{default:c(()=>[m(" 删除 ")]),_:1}),t(V,{class:"set-other-btn1",onClick:r[0]||(r[0]=o=>d.value=!1)},{default:c(()=>[m(" 取消 ")]),_:1}),t(V,{class:"set-other-btn1",onClick:N(S,["stop"])},{default:c(()=>[m(" 编入题集 ")]),_:1},8,["onClick"]),D(e("div",ut,[(u(!0),v(U,null,B(j(l).problemSetList,(o,n)=>(u(),v("p",{class:"select-item",key:o,onClick:N(L=>T(o),["stop"])}," 题集"+P(f[n+1]),9,_t))),128))],512),[[A,s.value]])],512),[[A,d.value]])]),t(Ie,{isShow:h.value,"onUpdate:isShow":r[1]||(r[1]=o=>h.value=o)},null,8,["isShow"])])}}},mt=z(pt,[["__scopeId","data-v-e61d2616"]]),vt={__name:"ProblemsTest",setup(a){const w=i();return(s,h)=>{const d=y("el-option"),f=y("el-select");return u(),v("div",null,[t(f,{modelValue:w.value,"onUpdate:modelValue":h[0]||(h[0]=_=>w.value=_),class:"m-2",placeholder:"Select",size:"small"},{default:c(()=>[t(d,null,{default:c(()=>[m("1")]),_:1}),t(d,null,{default:c(()=>[m("1")]),_:1}),t(d,null,{default:c(()=>[m("1")]),_:1}),t(d,null,{default:c(()=>[m("1")]),_:1})]),_:1},8,["modelValue"])])}}};const W=a=>(R("data-v-460ed856"),a=a(),q(),a),ht={class:"under"},ft=W(()=>e("div",{style:{"margin-top":"1vh",display:"flex","align-items":"center","line-height":"1.1vh","font-size":"0.9vw"}},null,-1)),bt=W(()=>e("div",{style:{display:"flex","margin-left":"1.52vw","margin-top":"1vh","margin-bottom":"1vh","font-weight":"600","font-size":"0.9vw"}},null,-1)),yt={class:"underRight"},gt={class:"change-com"},$t={class:"btns"},wt={class:"btn1"},Ct={class:"btn2"},St={class:"content"},kt={__name:"personalTopic",setup(a){const w=F(),s=i("problems");i(!0),i(!1);const h=i(),d=f=>{s.value=f};return K(()=>{w.getUserProblems()}),(f,_)=>{const l=y("el-button");return u(),v("div",ht,[e("div",{class:"underLeft",ref_key:"underLeft",ref:h},[ft,bt,t(re)],512),e("div",yt,[e("div",gt,[e("div",$t,[e("div",wt,[t(l,{onClick:_[0]||(_[0]=b=>d("problems")),text:"",class:"b1"},{default:c(()=>[m("已生成题目")]),_:1}),D(e("div",null,null,512),[[A,s.value==="problems"]])]),e("div",Ct,[t(l,{onClick:_[1]||(_[1]=b=>d("test")),text:"",class:"b2"},{default:c(()=>[m("组成试卷")]),_:1}),D(e("div",null,null,512),[[A,s.value==="test"]])])])]),e("div",St,[(u(),J(de(s.value==="problems"?mt:vt)))])])])}}},Lt=z(kt,[["__scopeId","data-v-460ed856"]]);export{Lt as default};
