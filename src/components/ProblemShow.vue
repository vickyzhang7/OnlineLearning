<template>
  <div class="container">
    <div class="innercon">
      <div class="problem-body">
        <div
          class="itemCon"
          v-for="(item, index) in generateData.totalGenerationProblem[
            generateData.currentItem
          ].dataVO"
          :key="item.problemId"
          @click="analysisRight(item)"
        >
          <span>
            <svg
              width="9"
              height="10"
              viewBox="0 0 9 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="svvg"
            >
              <circle cx="4.5" cy="5" r="4.5" fill="#BDCEFC" />
            </svg>
            生成结果{{ numToString[index] }}</span
          >
          <!-- 问题 -->
          <p class="problem-p" :id="'pQuestion' + index" >{{ replaceBody(index, item.body) }}</p>
          <!-- 选项情况1:有1234问题类型➕abcd选项 -->
          <div
            class="subProblem"
            v-if="
              item.subProblemList
            "
          >
            <div v-for="(subItem, subIndex) in item.subProblemList" :key="subIndex">
              <!-- 1234选项问题 -->
              <p class="problem-p" :id="'pSelect' + index + subIndex" >{{ subItem.body }}</p>
              <!-- abcd选项 -->
              <div class="optionsCon">
                <p v-for="(optsubItem,optsubIndex) in subItem.options" :key="optsubIndex" :id="'pSelect' + index + subIndex + optsubIndex" >{{ optsubItem }}</p>
              </div>
            </div>
          </div>
          <!-- 选项情况2:仅有abcd选项 -->
          <div class="optionsCon" v-else>  
            <p v-for="(optItem,optIndex) in item.options" :key="optIndex" :id="'pSelect' + index + '_' + optIndex" >{{ optItem }}</p>
          </div>
          <div class="item-btns">
            <el-button text class="btn1" @click="findError(index,item.subProblemList,item.options)">纠错</el-button> 
            <el-button text class="btn2" @click="addDataBase(item.problemId)">加入题库</el-button>
          </div>
          <div class="item-btns1" v-show='isError'>
            <el-button text class="btn11" @click="cancel(index,item.subProblemList,item.options,item.problemId)">取消</el-button> 
            <el-button text class="btn21" @click="confirm(index,item.subProblemList,item.options,item.problemId)">确认</el-button>
          </div>
        </div>
      </div>
       <!-- 题目分析 -->
      <div class="problem-analysis">
        <!-- 中间竖立的小白条 -->
        <div class="split"></div>
        <!-- 题目分析内容 -->
        <div class="analysis-content">
          <div class="con"><span class="title-content">预计时长</span><span class="solution-content">{{ dueTime }}</span></div>
          <div class="con"><span class="title-content">正确答案</span><span class="solution-content">{{ answer }}</span></div>
          <div class="con"><span class="title-content">难度等级</span>
            <span  class="solution-content">
                <el-rate
                  style="color: red;"
                  v-model="diffType"
                  disabled
                  show-score
                  text-color="red"
                  
                />
            </span>
          </div>
          <div class="con"><span class="title-content">难点考察</span><span class="solution-content">{{ diffPoint }}</span></div>
          <div class="con"><span class="title-content">学科素养</span><span class="solution-content">{{ examine }}</span></div>
          <div class="con" style="display: flex;"><span class="title-content">能力考察</span>
            <span class="solution-content">
                      <div>课本贴合度<div id="textFit" style="width:0vw;height:0.4vw;background-image: linear-gradient(90deg, #6666FF 0%, rgba(103, 149, 253, 0.678) 50.17%, rgba(103, 155, 252, 0.6395) 56.17%, rgba(103, 176, 251, 0.496) 78.53%, rgba(104, 205, 250, 0.3) 100.00%); display: inline-block;margin-left: 1.7vw;border-radius: 1vw;"></div></div>
                      <div>语言应用能力<div id="languageApp" style="width:0vw;height:0.4vw;background-image: linear-gradient(90deg, #6666FF 0%, rgba(103, 149, 253, 0.678) 50.17%, rgba(103, 155, 252, 0.6395) 56.17%, rgba(103, 176, 251, 0.496) 78.53%, rgba(104, 205, 250, 0.3) 100.00%); display: inline-block;margin-left: 0.9vw;border-radius: 1vw;"></div></div>
                      <div>语境理解能力<div id="languageUnder" style="width:0vw;height:0.4vw;background-image: linear-gradient(90deg, #6666FF 0%, rgba(103, 149, 253, 0.678) 50.17%, rgba(103, 155, 252, 0.6395) 56.17%, rgba(103, 176, 251, 0.496) 78.53%, rgba(104, 205, 250, 0.3) 100.00%); display: inline-block;margin-left: 0.9vw;border-radius: 1vw;"></div></div>
                      <div>交际能力<div id="communication" style="width:0vw;height:0.4vw;background-image: linear-gradient(90deg, #6666FF 0%, rgba(103, 149, 253, 0.678) 50.17%, rgba(103, 155, 252, 0.6395) 56.17%, rgba(103, 176, 251, 0.496) 78.53%, rgba(104, 205, 250, 0.3) 100.00%); display: inline-block;margin-left: 2.5vw;border-radius: 1vw;"></div></div>
            </span>
          </div>
          <div class="con"><span class="title-content">答案分析</span><span class="solution-content">{{ analysis1 }}</span></div>

        </div>
      </div>
    </div>
    <div class="control">
      <div class="btns">
        <el-button round class="set-other-btn1" @click="reGenerateHandle"
          >重新生成</el-button
        >
        <el-button round class="set-other-btn2" @click="cancleHandle">取消生成</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { getCheckedStore } from "@/stores";
import { ref } from "vue";
import mitter from '@/utils/eventBus'
import { reSetProblem } from "@/api/selectFilter";
const generateData = getCheckedStore();
const numToString = ["一", "二", "三", "四", "五"];
const tip = ref(true)
const isError=ref(false) //点击纠错按钮时候为true
const replaceBody = (index, body) => {
  return index + 1 + "." + body;
};
const star = ref(2)
const originalp1 = ref("")//原始题文本内容
const originalp2 = ref([])
const originalp3 = ref([])
const originalp4 = ref([])
const bodyP = ref("")//修改后的文本内容累加，用于传递给后端
const bodyP1 = ref("")//修改后的题文本内容
const bodyP2 = ref([])
const bodyP3 = ref([])
const bodyP4 = ref([])

//题目分析相关数据
const dueTime = ref('点击试题获取')       //预计时长
const answer = ref('点击试题获取')       //正确答案
const diffType = ref()       //难度等级
const diffPoint = ref('点击试题获取')   //难点考察
const examine  = ref('点击试题获取')    //学科素养
const ability = ref('点击试题获取')    //能力考查
const analysis1 = ref('点击试题获取')  //答案分析

const emit = defineEmits();
const reGenerateHandle = () => {
  generateData.regenerate();
  //添加进度条功能，用emit传值:先定义一个函数，在这个函数使用rightunderTopic传过来的函数
  mitter.emit("progress");
  
  mitter.emit('tip',tip.value)
};
const cancleHandle = () => {
  generateData.isShow = !generateData.isShow;
  generateData.totalGenerationProblem.splice(currentItem, 1);
  generateData.currentItem = 0;
  // console.log(generateData.totalGenerationProblem);
};
// 将题目添加至题库
const addDataBase = (id) => {
  generateData.addUserProblems(id);

  // #修改
  generateData.getUserProblems();//主要为了更新袋子
  // #修改
  
};
//纠错的编辑功能
const judgeTopic = (index,List,option,judge) =>{//judge为true时：可编辑。judge为false：不可编辑
  //大问题
  document.getElementById('pQuestion' + index).contentEditable = judge; //大问题选项设为可编辑
  //小问题和选项
  if(List){//当情况为1234和对应abcd时
    for (let subIndex = 0; subIndex < List.length; subIndex++) {
      document.getElementById('pSelect' + index + subIndex).contentEditable = judge  //1234那些问题选项设为可编辑
    
      if(List[subIndex].options){
          //嵌套for循环，因为每个1234小问题中又有abcd选项
          for (let i = 0; i < List[subIndex].options.length; i++) {
              document.getElementById('pSelect' + index + subIndex + i).contentEditable = judge //1234小问题中的abcd选项设为可编辑
          } 
      }
    }
  }
  if(option){//当情况为仅有abcd时
    for (let opt = 0; opt < option.length; opt++) {
      document.getElementById('pSelect' + index + '_' + opt).contentEditable = judge //仅有abcd选项设为可编辑
    }
  }
}
//纠错的获取数据功能
const getText = (index,List,option) =>{
  //大问题
  originalp1.value = document.getElementById('pQuestion' + index).innerText//获取大问题原始内容
  //小问题和选项
  if(List){//当情况为1234和对应abcd时
    for (let subIndex = 0; subIndex < List.length; subIndex++) {
    const pElement = document.getElementById('pSelect' + index + subIndex);
    originalp2.value[subIndex] = pElement.innerText  //1234那些问题选项原始内容
    
      if(List[subIndex].options){
        //嵌套for循环，因为每个1234小问题中又有abcd选项
          for (let i = 0; i < List[subIndex].options.length; i++) {
              const osElement = document.getElementById('pSelect' + index + subIndex + i);
              originalp3.value[i] = osElement.innerText //1234小问题中的abcd选项内容
          } 
      }
    }
    
  }
  if(option){//当情况为仅有abcd时
    for (let opt = 0; opt < option.length; opt++) {
      const oElement = document.getElementById('pSelect' + index + '_' + opt);
      originalp4.value[opt] = oElement.innerText //仅有abcd选项
    }
  }
}
//纠错（1.显示确认取消按钮 2.赋值获取原来数值3.实现可编辑）
const findError = (index,List,option) =>{//index:索引，List:选项分为1234和对应的abcd选项，option：选项只有abcd
  isError.value = true; //显示纠错按钮对应的确认按钮和取消按钮  
  //2.
  getText(index,List,option)
  //3.编辑功能
  judgeTopic(index,List,option,true)
};
 
//取消（1.隐藏确认取消按钮2.将所有的选项设为不可编辑3.刷新视图）
const cancel = (index,List,option,id) =>{
    //1.
    isError.value = false;
    //2.
    judgeTopic(index,List,option,false)
    //3.
    document.getElementById('pQuestion' + index).innerText = originalp1.value
    if(List){//当情况为1234和对应abcd时
      for (let subIndex = 0; subIndex < List.length; subIndex++) {
      document.getElementById('pSelect' + index + subIndex).innerText = originalp2.value[subIndex]  //1234那些问题选项原始内容
      
        if(List[subIndex].options){
          //嵌套for循环，因为每个1234小问题中又有abcd选项
            for (let i = 0; i < List[subIndex].options.length; i++) {
                document.getElementById('pSelect' + index + subIndex + i).innerText = originalp3.value[i]  //1234小问题中的abcd选项内容
            } 
        }
      }
      
    }
    if(option){//当情况为仅有abcd时
      for (let opt = 0; opt < option.length; opt++) {
        // console.log('111',opt,originalp4.value[opt])
        document.getElementById('pSelect' + index + '_' + opt).innerText = originalp4.value[opt] //仅有abcd选项
      }
    }
   
  
}

//确认（1.隐藏确认取消按钮2.将所有的选项设为不可编辑3.向后端发送修改数据的请求4.更新试图5.纠错成功弹窗）
const confirm = async(index,List,option,problemId) =>{
  //1.
  isError.value = false;
  document.getElementById('pQuestion' + index).contentEditable = false;
  //2.
  judgeTopic(index,List,option,false)
  //3.向后端发起请求，修改ID数组内容，需要传参数，ID为参数
    //获取body信息
    
    bodyP1.value = document.getElementById('pQuestion' + index).innerText.slice(2)
    bodyP.value = bodyP1.value

    if(List){//当情况为1234和对应abcd时
      for (let subIndex = 0; subIndex < List.length; subIndex++) {
      bodyP2.value[subIndex] = document.getElementById('pSelect' + index + subIndex).innerText   //1234那些问题选项原始内容
      bodyP.value = bodyP.value + bodyP2.value[subIndex] //累加
        if(List[subIndex].options){
          //嵌套for循环，因为每个1234小问题中又有abcd选项
            for (let i = 0; i < List[subIndex].options.length; i++) {
                bodyP3.value[i]= document.getElementById('pSelect' + index + subIndex + i).innerText  //1234小问题中的abcd选项内容
                bodyP.value = bodyP.value + bodyP3.value[i]
            } 
            
        }
        
      }
    }
    if(option){//当情况为仅有abcd时
      for (let opt = 0; opt < option.length; opt++) {
        // console.log('111',opt,originalp4.value[opt])
        bodyP4.value[opt] =document.getElementById('pSelect' + index + '_' + opt).innerText//仅有abcd选项
        bodyP.value = bodyP.value + bodyP4.value[opt]
      }
      
    }
    const body = bodyP.value.replace(/\\"/g, '') //纠错后加入题库的格式，没有起到效果，依然存在引号
    console.log('body是',body)
    //发送请求
    const res = await reSetProblem(body,problemId)
    console.log('res:',res)
  //4.刷新视图数据，实现双向绑定
  document.getElementById('pQuestion' + index).innerText = index + 1 + "." + bodyP1.value
    if(List){//当情况为1234和对应abcd时
      for (let subIndex = 0; subIndex < List.length; subIndex++) {
      document.getElementById('pSelect' + index + subIndex).innerText = bodyP2.value[subIndex]  //1234那些问题选项原始内容
      
        if(List[subIndex].options){
          //嵌套for循环，因为每个1234小问题中又有abcd选项
            for (let i = 0; i < List[subIndex].options.length; i++) {
                document.getElementById('pSelect' + index + subIndex + i).innerText = bodyP3.value[i]  //1234小问题中的abcd选项内容
            } 
        }
      }
      
    }
    if(option){//当情况为仅有abcd时
      for (let opt = 0; opt < option.length; opt++) {
        // console.log('111',opt,originalp4.value[opt])
        document.getElementById('pSelect' + index + '_' + opt).innerText = bodyP4.value[opt] //仅有abcd选项
      }
    }
  //5.
  ElMessage.success(`${res.data.data}`)
}

//右侧题目分析(点击对应题目获取)
const analysisRight = (item)=>{
  dueTime.value = item.time +'分钟'
  answer.value = item.solution
  diffType.value = item.difficulty
  diffPoint.value = item.point
  examine.value = '暂无数据'
  ability.value = item.capability
  analysis1.value = item.analysis
  //设置能力考察相关内容长度显示
  const textFitLength = ability.value.课本贴合度*3
  const languageAppLength = ability.value.语言应用能力*3
  const languageUnderLength = ability.value.语境理解能力*3
  const communicationLength = ability.value.交际能力*3
  document.getElementById('textFit').style.width= `${textFitLength}vw`
  document.getElementById('languageApp').style.width = `${languageAppLength}vw`
  document.getElementById('languageUnder').style.width = `${languageUnderLength}vw`
  document.getElementById('communication').style.width = `${communicationLength}vw`


}
</script>

<style lang="scss" scoped>
.container {
  //   height: 55vh;
  font-size: 0.835vw;
  //   background-color: rgba(255, 255, 255, 0.5);
  color: #4f4f4f;
  .innercon {
    display: flex;
  }
  .problem-body {
    height: 52vh;
    width: 55vw;
    padding-left: 2vw;
    padding-bottom: 2vh;
    overflow-y: scroll;
  }
  .problem-analysis {
    width: 40%;
  }
  .itemCon {
    margin-top: 2.5185vh;
    width: 45vw;
    position: relative;
    padding: 1vh;
    box-sizing: border-box;
    .problem-p {
      width: 100%;
    }
    &:hover {//鼠标悬浮到这个题的时候，才会显示
      border: 1px solid #6666f6;
      background-color: rgba(102, 102, 255, 0.1);
      .item-btns {
        display: block;
        .btn1{
        color: #6666f6;
        }
        .btn2{
        color: #6666f6;
        }
      }
      .item-btns1{
        display: block;
        .btn11{
        color: #6666f6;
        }
        .btn21{
        color: #6666f6;
        }
      }
    }
    .item-btns {//当没有对准某个题时候，不显示这些按钮
      position: absolute;
      right: 0vw;
      top: -2.2vh;
      display: none;
      .btn1 {
        font-size: 0.835vw;
        height: 1.835vh;
        border-radius: 0;
      }
      .btn1:hover{
        background-color: #6666f6;
        color: #fff;
      }
      .btn2 {
        padding: 0;
        font-size: 0.835vw;
        height: 1.835vh;
        border-radius: 0;
      }
      .btn2:hover{
        background-color: #6666f6;
        color: #fff;
      }
    }
    .item-btns1 {
      position: absolute;
      right: 0vw;
      bottom: 0vh;
      display: none;
      .btn11 {
        font-size: 0.835vw;
        height: 1.835vh;
        border-radius: 0;
      }
      .btn11:hover{
        background-color: #6666f6;
        color: #fff;
      }
      .btn21 {
        padding: 0;
        font-size: 0.835vw;
        height: 1.835vh;
        border-radius: 0;
      }
      .btn21:hover{
        background-color: #6666f6;
        color: #fff;
      }
    }
  }
  span {
    font-size: 0.8vw;
    color: #939496;
    .svvg {
      margin-right: 0.5vw;
    }
  }
  .optionsCon {
    padding: 0;
    display: flex;
    justify-content: space-between;
    p {
      width: 25%;
    }
  }
  
  .problem-analysis {
    position: relative;
    overflow: scroll;
    .split {
      position: absolute;
      left: 0;
      top: 20%;
      height: 60%;
      width: 1px;
      background-color: #c1c3ca;
    }
    .analysis-content{
      position: absolute;
      left: 1.7vw;
      padding-right: 1vw;
      .con{
        margin-top: 4vh;
          .title-content{
          color: black;
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 500;
          margin-right: 1.5vw;
          }
          .solution-content{
            color: black;
          }
      }
      
    }
  }
  .control {
    width: 100%;
    height: 6.5vh;
    background-color: #fff;
    border-radius: 10px;
    text-align: center;
    line-height: 6.5vh;
    position: sticky;
    bottom: 0px;
    .set-other-btn1 {
      color: #fff;
      background-color: #6666ff;
      border-color: #6666ff;
      width: 10vw;
      height: 3.5vh;
    }
    .set-other-btn2 {
      color: #6666ff;
      background-color: #fff;
      border-color: #6666ff;
      width: 10vw;
      height: 3.5vh;
    }
  }
}

</style>
