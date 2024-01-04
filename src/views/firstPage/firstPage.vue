<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
const input = ref('')
const router = useRouter()
const goToSelectFilter = ()=>{
    router.push('/selectFilter')
}
const goToGenerationTopic = ()=>{
    router.push('/generationTopic')
}
const goToTotalGeneration = ()=>{
    router.push('/totalGeneration')
}
const goToPersonalTopic = ()=>{
    router.push('/personalTopic')
}
</script>
<template>
     <div class="title">欢迎使用VisionEdu大模型教育平台</div>
     <div class="search1"><el-input
      v-model="input"
      class="w-50 m-2 search"
      size="large"
      placeholder="Please Input"
      :prefix-icon="Search"
    /></div>
    
    <div style="display: relative;">
    <div class="imgbox">
        <div class="imgbox1" @click="goToSelectFilter"><div class="imgbox2"><img style="width:13.89vw;height: 20.21vh;" src="../../assets/selectFilter.svg"></div><div class="imgbox3">筛选生成</div></div>
        <div class="imgbox1" @click="goToGenerationTopic"><div class="imgbox2"><img style="width:12.11vw;height: 25.98vh;" src="../../assets/generationTopic.svg"></div><div class="imgbox3">以题生题</div></div>
        <div class="imgbox1" @click="goToTotalGeneration"><div class="imgbox2"><img style="width:12.22vw;height: 31.64vh;" src="../../assets/totalGeneration.svg"></div><div class="imgbox3">整卷生成</div></div>
        <div class="imgbox1" @click="goToPersonalTopic"><div class="imgbox2"><img style="width:6.26vw;height: 15.09vh;margin-top: 4.5vh;" src="../../assets/personalTopic1.svg"><img style="width:6.26vw;height: 15.09vh;margin-bottom: 4.5vh;" src="../../assets/personalTopic2.svg"></div><div class="imgbox3">个人题库</div></div>
    </div></div>
</template>
<style lang="scss">
body{
     background-image: url(../../assets/selectP.jpg);
    // background-image: url("../../assets/Group 2876.svg");
    background-size: cover;
}
div.title{
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 2.5vw;
    color: #000000;
    position: relative;
    margin-top: 8.98vh;
    margin-bottom: 0vh;
    text-align: center;
    height: 6.3vh;
    // left:50%;
    // margin-left: -21vw;
}
.el-icon{
    color: #000000;
}
.search1{
  position: relative;  
  height:5.9vh;
  margin-top: 3.33vh;
  margin-bottom: 11.48vh;
}
.search{
    width:40.21vw;
    height:5.19vh;
    left:50%;
    margin-left: -21vw;
}
.el-input__wrapper{ border-radius: 4.63vh}
.imgbox{
    display: flex;
    justify-content: space-around;
}
.imgbox1{
    display: block;
    width:19.11vw;
    height: 42.68vh;
    box-shadow:10px 10px 28px rgba(0,0,0,0.3) ;
    margin-top:10px;
    border-radius:0.52vw 0.52vw 0.52vw 0.52vw !important;
}
.imgbox2{
    display: flex;
    width: 100%;
    height: 35.26vh;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius:0.52vw 0.52vw 0vw 0vw !important;
}
.imgbox1:hover, .imgbox1:active{
    cursor: pointer;
    color: #6666FF !important;
    border: 4px solid #BDCEFC;
    .imgbox3{
        background-color:#BDCEFC;
        color: #6666FF !important;
    }

}
.imgbox3{
    width: 100%;
    height: 7.42vh;
    line-height: 7.42vh;
    // background-color: #6666FF;
    background-color: #FFFFFF;
    text-align: center;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 1.67vw;
    border-radius:0vw 0vw 0.52vw 0.52vw !important;
    color: #000000;
}
#app{
    display: block;
}
</style>