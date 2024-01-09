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
          <p class="problem-p" :id="'pQuestion' + index">{{ replaceBody(index, item.body) }}</p>
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
                <p v-for="(optsubItem,optsubIndex) in subItem.options" :key="optsubIndex" :id="'pSelect' + index + subIndex + optsubIndex">{{ optsubItem }}</p>
              </div>
            </div>
          </div>
          <!-- 选项情况2:仅有abcd选项 -->
          <div class="optionsCon" v-else>  
            <p v-for="(optItem,optIndex) in item.options" :key="optIndex" :id="'pSelect' + index + '_' + optIndex">{{ optItem }}</p>
          </div>
          <div class="item-btns">
            <el-button text class="btn1" @click="findError(index,item.subProblemList,item.options)">纠错</el-button> 
            <el-button text class="btn2" @click="addDataBase(item.problemId)">加入题库</el-button>
          </div>
          <div class="item-btns1" v-show='isError'>
            <el-button text class="btn11" @click="cancel(index)">取消</el-button> 
            <el-button text class="btn21" @click="confirm(index)">确认</el-button>
          </div>
        </div>
      </div>

      <div class="problem-analysis">
        <!-- 题目分析 -->
        <div class="split"></div>
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
import { getCheckedStore } from "@/stores";
import { ref } from "vue";
import mitter from '@/utils/eventBus'
const generateData = getCheckedStore();
const numToString = ["一", "二", "三", "四", "五"];
const tip = ref(true)
const isError=ref(false) //点击纠错按钮时候为true
const replaceBody = (index, body) => {
  return index + 1 + "." + body;
};

const editableIndexes = ref([]);
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
};
//纠错（1.显示确认取消按钮 2.实现可编辑）
const findError = (index,List,option) =>{//index:索引，List:选项分为1234和对应的abcd选项，option：选项只有abcd
  isError.value = true; //显示纠错按钮对应的确认按钮和取消按钮
  
  document.getElementById('pQuestion' + index).contentEditable = true; //大问题选项设为可编辑

  if(List){//当情况为1234和对应abcd时
    for (let subIndex = 0; subIndex < List.length; subIndex++) {
    const pElement = document.getElementById('pSelect' + index + subIndex);
    pElement.contentEditable = true  //1234那些问题选项设为可编辑
    //嵌套for循环，因为每个1234小问题中又有abcd选项
    const optionss = ['A', 'B', 'C', 'D'];
        for (let i = 0; i < optionss.length; i++) {
            const osElement = document.getElementById('pSelect' + index + subIndex + i);
            console.log('细分abcd',osElement);
            osElement.contentEditable = true //1234小问题中的abcd选项设为可编辑
        } 
    }
  }else if(option){//当情况为仅有abcd时
    for (let opt = 0; opt < option.length; opt++) {
      const oElement = document.getElementById('pSelect' + index + '_' + opt);
      oElement.contentEditable = true //仅有abcd选项设为可编辑
    }
  }else{
    console.log('都不对')
    return
  }
};
 
//取消（1.隐藏确认取消按钮2.将所有的选项设为不可编辑3.刷新视图）
const cancel = (index) =>{
  //1.
  isError.value = false;
  //2.
  document.getElementById('pQuestion' + index).contentEditable = false;//将题目和abcd选项设置为不可编辑状态
  if(List){//当情况为1234和对应abcd时
    for (let subIndex = 0; subIndex < List.length; subIndex++) {
    const pElement = document.getElementById('pSelect' + index + subIndex);
    pElement.contentEditable = false  //1234那些问题选项设为可编辑
    //嵌套for循环，因为每个1234小问题中又有abcd选项
    const optionss = ['A', 'B', 'C', 'D'];
        for (let i = 0; i < optionss.length; i++) {
            const osElement = document.getElementById('pSelect' + index + subIndex + i);
            console.log('细分abcd',osElement);
            osElement.contentEditable = false //1234小问题中的abcd选项设为可编辑
        } 
    }
  }else if(option){//当情况为仅有abcd时
    for (let opt = 0; opt < option.length; opt++) {
      const oElement = document.getElementById('pSelect' + index + '_' + opt);
      oElement.contentEditable = false //仅有abcd选项设为可编辑
    }
  }else{
    console.log('都不对')
    return
  }
  //3.

}

//确认（1.隐藏确认取消按钮2.将所有的选项设为不可编辑3.向后端发送修改数据的请求4.更新试图）
const confirm = (index) =>{
  //1.
  isError.value = false;
  document.getElementById('pQuestion' + index).contentEditable = false;
  //2.
  document.getElementById('pQuestion' + index).contentEditable = false;//将题目和abcd选项设置为不可编辑状态
  if(List){//当情况为1234和对应abcd时
    for (let subIndex = 0; subIndex < List.length; subIndex++) {
    const pElement = document.getElementById('pSelect' + index + subIndex);
    pElement.contentEditable = false  //1234那些问题选项设为可编辑
    //嵌套for循环，因为每个1234小问题中又有abcd选项
    const optionss = ['A', 'B', 'C', 'D'];
        for (let i = 0; i < optionss.length; i++) {
            const osElement = document.getElementById('pSelect' + index + subIndex + i);
            console.log('细分abcd',osElement);
            osElement.contentEditable = false //1234小问题中的abcd选项设为可编辑
        } 
    }
  }else if(option){//当情况为仅有abcd时
    for (let opt = 0; opt < option.length; opt++) {
      const oElement = document.getElementById('pSelect' + index + '_' + opt);
      oElement.contentEditable = false //仅有abcd选项设为可编辑
    }
  }else{
    console.log('都不对')
    return
  }
  //3.向后端发起请求，修改ID数组内容，需要传参数，ID为参数
  //4.刷新视图数据，实现双向绑定
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
    height: 55.5vh;
    width: 55vw;
    padding-left: 2vw;
    padding-bottom: 2vh;
    overflow-y: scroll;
  }
  .problem-analysis {
    width: 30%;
  }
  .itemCon {
    margin-top: 2.5185vh;
    width: 50vw;
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
    .split {
      position: absolute;
      left: 0;
      top: 20%;
      height: 60%;
      width: 1px;
      background-color: #c1c3ca;
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
