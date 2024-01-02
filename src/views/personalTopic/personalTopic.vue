<script setup>
import { ref, onMounted } from "vue";
import LeftTopic from "../../components/LeftTopic.vue";
import Problems from "../../components/Problems.vue";
import ProblemsTest from "../../components/ProblemsTest.vue";
import { getCheckedStore } from "@/stores";
const problemsHandle = getCheckedStore();
// 切换页面
const isShow = ref("problems");
const knowledge = ref(true);
const textbook = ref(false);
const underLeft = ref();
const isKnowledge = () => {
  knowledge.value = true;
  textbook.value = false;
  const know = document.getElementById("know");
  const text = document.getElementById("text");
  know.style.color = "#6666FF";
  text.style.color = "#000000";
  //后面需要添加逻辑：点击它应该显示对应的页面
};
const isText = () => {
  knowledge.value = false;
  textbook.value = true;
  const know = document.getElementById("know");
  const text = document.getElementById("text");
  know.style.color = "#000000";
  text.style.color = "#6666FF";
};

// 左侧隐藏
const handleLeft = () => {
  // console.log(underLeft.value.style);
  underLeft.value.style.width = 0;
  underLeft.value.style.margin = 0;
  underLeft.value.style.overflow = "hidden";
};

const handleCom = (mode) => {
  isShow.value = mode;
};

onMounted(() => {
  problemsHandle.getUserProblems(); //获取试题集
});
</script>

<template>
  <div class="under">
    <div class="underLeft" ref="underLeft">
      <div
        style="
          margin-top: 1vh;
          display: flex;
          align-items: center;
          line-height: 1.1vh;
          font-size: 0.9vw;
        "
      >
        <!-- <div>
          <el-icon @click="handleLeft" style="margin-left: 0.42vw"><CaretLeft /></el-icon>
        </div>
        <div style="font-weight: 600; margin-left: 0.2vw">生成参考</div>
        <div style="margin-left: 4.4vw; color: #979797" @click="resetChecked">重置</div> -->
      </div>
      <div
        style="
          display: flex;
          margin-left: 1.52vw;
          margin-top: 1vh;
          margin-bottom: 1vh;
          font-weight: 600;
          font-size: 0.9vw;
        "
      >
       <!--  <div style="margin-right: 0.8vw; color: #6666ff" @click="isKnowledge" id="know">
          知识点生成
        </div>
        |
        <div style="margin-left: 0.9vw" id="text" @click="isText">教材生成</div> -->
      </div>
      <left-topic></left-topic>
      <!-- 左侧插槽 -->
    </div>
    <div class="underRight">
      <div class="change-com">
        <div class="btns">
          <div class="btn1">
            <el-button @click="handleCom('problems')" text class="b1"
              >已生成题目</el-button
            >
            <div v-show="isShow === 'problems'"></div>
          </div>
          <div class="btn2">
            <el-button @click="handleCom('test')" text class="b2">组成试卷</el-button>
            <div v-show="isShow === 'test'"></div>
          </div>
        </div>
      </div>
      <div class="content">
        <component :is="isShow === 'problems' ? Problems : ProblemsTest" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.under {
  display: flex;
  //   justify-content: space-between;
  width: 98%;
  height: 85.46vh;
  margin: auto;
  margin-top: 2.96vh;
  border-radius: 1vw 1vw 1vw 1vw;
}
.underLeft {
  height: 85.46vh;
  width: 13.33vw;
  background-color: white;
  border-radius: 1vw 1vw 1vw 1vw;
  color: black;
}
.underRight {
  height: 100%;
  border-radius: 1vw 1vw 1vw 1vw;
  background-color: rgba($color: #fff, $alpha: 0.8);
  width: 82.29vw;
  flex: 1;
  margin-bottom: 1vw;
  margin-left: 1vw;
  margin-right: 1vw;
  .change-com {
    padding: 1vw;
    height: 10%;
    .btns {
      display: flex;
      .btn1 {
        position: relative;
        .b1 {
          width: 5vw;
          padding: 0;
          font-size: 1.05vw;
          color: #4f4f4f;
        }
        div {
          position: absolute;
          background-color: #6666ff;
          width: 5vw;
          height: 5px;
          top: 3vh;
          left: 0vw;
          border-radius: 100vw;
        }
      }
      .btn2 {
        margin-left: 2vw;
        position: relative;
        .b2 {
          width: 3vw;
          padding: 0;
          font-size: 1.05vw;
          color: #4f4f4f;
        }
        div {
          position: absolute;
          background-color: #6666ff;
          width: 4vw;
          height: 5px;
          top: 3vh;
          left: -0.5vw;
          border-radius: 100vw;
        }
      }
    }
  }
  .content {
    height: 90%;
    width: 100%;
  }
}
.el-button.is-text:not(.is-disabled):focus,
.el-button.is-text:not(.is-disabled):hover {
  background-color: transparent;
}
</style>
