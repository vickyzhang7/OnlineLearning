import{r as o,o as C,v as x,c as i,x as L,R as E,h as t,f as s,g as T,j as b,q as f,S as B}from"./index-36b308b0.js";const I={style:{"margin-top":"1vh",display:"flex","align-items":"center","line-height":"1.1vh","font-size":"0.9vw"}},F=t("div",{style:{"font-weight":"600","margin-left":"0.2vw"}},"生成参考",-1),S={__name:"LeftTopic",setup(N,{emit:h}){const v=o({children:"children",label:"name",disabled:"notLeaf"}),m=h,a=o([]),l=o(),g=async()=>{const e=await E();a.value=e.data.data},c=o(!0),d=o(!1),u=()=>{c.value=!0,d.value=!1;const e=document.getElementById("know"),n=document.getElementById("text");e.style.color="#6666FF",n.style.color="#000000"},_=()=>{c.value=!1,d.value=!0;const e=document.getElementById("know"),n=document.getElementById("text");e.style.color="#000000",n.style.color="#6666FF"},k=()=>{m("hiddenEventL")};C(()=>g());const r=x(),y=()=>{r.resetChecked(),l.value.setCheckedKeys([],!1)};return(e,n)=>{const p=i("CaretLeft"),w=i("el-icon");return L(e.$slots,"default",{},()=>[t("div",I,[t("div",null,[s(w,{onClick:k,style:{"margin-left":"0.42vw",color:"#070707 !important"}},{default:T(()=>[s(p)]),_:1})]),F,t("div",{style:{"margin-left":"4.4vw",color:"#979797"},onClick:y},"重置")]),t("div",{style:{display:"flex","margin-left":"1.52vw","margin-top":"1vh","margin-bottom":"1vh","font-weight":"600","font-size":"0.9vw"}},[t("div",{style:{"margin-right":"0.8vw",color:"#6666ff"},onClick:u,id:"know"}," 知识点生成 "),b(" | "),t("div",{style:{"margin-left":"0.9vw"},id:"text",onClick:_},"教材生成")]),s(f(B),{ref_key:"treeRef",ref:l,data:a.value,"show-checkbox":"","node-key":"$treeNodeId","default-expanded-keys":[2,3],"default-checked-keys":[5],props:v.value,onCheckChange:f(r).handleCheckChange},null,8,["data","props","onCheckChange"])])}}};export{S as _};
