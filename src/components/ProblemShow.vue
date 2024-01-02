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
          <p class="problem-p">{{ replaceBody(index, item.body) }}</p>
          <div
            class="subProblem"
            v-if="
              item.subProblemList
            "
          >
            <div v-for="(subItem, subIndex) in item.subProblemList">
              <p class="problem-p">{{ subItem.body }}</p>
              <div class="optionsCon">
                <p v-for="i in subItem.options" :key="i">{{ i }}</p>
              </div>
            </div>
          </div>
          <div class="optionsCon" v-else>
            <p v-for="i in item.options" :key="i">{{ i }}</p>
          </div>
          <div class="item-btns">
            <el-button text class="btn1">纠错</el-button>
            <el-button text class="btn2" @click="addDataBase(item.problemId)"
              >加入题库</el-button
            >
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
const replaceBody = (index, body) => {
  return index + 1 + "." + body;
};
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
  console.log(generateData.totalGenerationProblem);
};
// 将题目添加至题库
const addDataBase = (id) => {
  generateData.addUserProblems(id);
};
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
    &:hover {
      border: 1px solid #6666f6;
      background-color: #e6eafc;
      .item-btns {
        display: block;
      }
    }
    .item-btns {
      position: absolute;
      right: 0vw;
      top: -2.3vh;
      display: none;
      .btn1 {
        font-size: 0.835vw;
        height: 1.835vh;
        border-radius: 0;
      }
      .btn2 {
        padding: 0;
        font-size: 0.835vw;
        background-color: #6666f6;
        color: #fff;
        height: 1.835vh;
        border-radius: 0;
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
