<script setup>
import { ref } from 'vue'

const activeIndex = ref('1')
</script>
<template>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#1F2940"
      text-color="#fff"
      :ellipsis="false"
    >
      <el-menu-item index="0"><img style="width: 30px" src="../../assets/edu.svg">&nbsp;&nbsp;&nbsp;大模型教育平台</el-menu-item><div class="flex-grow"></div>
      <el-menu-item index="1" @click="$router.push('/firstPage')">首页</el-menu-item>
      <el-menu-item index="2" @click="$router.push('/selectFilter')">筛选生成</el-menu-item>
      <el-menu-item index="3" @click="$router.push('/generationTopic')">以题生题</el-menu-item>
      <el-menu-item index="4" @click="$router.push('/totalGeneration')">试卷构成</el-menu-item>
      <el-menu-item index="5" @click="$router.push('/personalTopic')">个人题库</el-menu-item>
      <el-menu-item index="6" @click="$router.push('/userCenter')">用户中心</el-menu-item> 
    </el-menu>
    <router-view></router-view>
</template>
  
<style lang="scss">
 .flex-grow {
  flex-grow: 1;
}
#app{
    margin: 0;
    padding: 0;
    width: 100%;
    max-width:100%;
    grid-template-columns:auto;
    display: block;
    
}
body{
    place-items: initial;
    background-image: url(../../assets/selectP.jpg);
    background-size: cover;
}
.el-menu-item:hover {
background-color: #6666FF !important ;
}
.el-menu-item:first-child:hover {
background-color: #1F2940 !important;
}
.el-menu-item.is-active {
background-color: #6666FF !important;
}
.el-menu-item:first-child.is-active {
background-color: #1F2940 !important;
}
.el-menu--horizontal>.el-menu-item.is-active{
    color: #FFFFFF !important;
    border-bottom:#6666FF
}


</style>
  