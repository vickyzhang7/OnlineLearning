<template>
  <div>
    <slot>
      <div style="margin-top: 10.7vh; text-align: center">
        <!-- 左侧选择框获得的数据 -->
        <el-tag
          v-for="tag in getRightUnderChecked.checkedArr"
          :key="tag"
          class="mx-1 tagStyle"
          closable
          :disable-transitions="false"
          @close="getRightUnderChecked.handleClose(tag)"
          type="info"
        >
          {{ tag }}
        </el-tag>
        <!-- 右上基础筛选 -->
        <el-tag
          v-for="tag in getRightUnderChecked.tagArrTop"
          :key="tag"
          class="mx-1 tagStyle"
          closable
          :disable-transitions="false"
          @close="getRightUnderChecked.handleClose1(tag)"
          type="info"
        >
          {{ tag }}
        </el-tag>
      </div>

      <div
        class="mt-4 searchGen"
        v-if="isShow"
      >
        <el-input
          v-model="input2"
          placeholder="请输入生成题目的关键词"
          class="inputGen"
        >
          <template #append>
            <el-button
              class="buttonSet"
              @click="generateHandle"
            >{{
              getRightUnderChecked.isLoading ? "取消生成" : "开始生成"
            }}</el-button>
            <div
              class="loaddingCon"
              :class="{ hiddenf: !getRightUnderChecked.isLoading }"
            >
              <div
                ref="loaddingBar"
                class="loadding"
              ></div>
            </div>
          </template>
        </el-input>
        <!-- <div class="loadding"></div> -->
      </div>
      <!-- 图片居中 -->
      <div
        class="loadding-img"
        v-if="getRightUnderChecked.isLoading"
      >
        <img
          src="../assets/loaddingImg.svg"
          style="width: 25vw; height: 25.5vh"
        />
        <div class="loadding-content">
          <p>生成中...</p>
          <!--   <p style="
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        width: 100px;
      "></p>
     -->
        </div>
      </div>
      <!-- 下面是生成提示弹窗 -->
      <el-dialog
        :modal="false"
        v-model="getRightUnderChecked.dialogVisible"
        width="20.8vw"
        :before-close="handleClose"
        top="55vh"
        class="dialogSet"
      >
        <div class="dialog-content">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM12.3197 5C13.0378 5 13.62 5.56281 13.62 6.3003C13.62 7.05719 13.0378 7.62 12.3197 7.62C11.5822 7.62 11 7.05719 11 6.3003C11 5.56281 11.5822 5 12.3197 5ZM11.3215 18.9077V9.45629C11.3215 8.95169 11.7752 8.6994 12.2729 8.6994C12.7527 8.6994 13.2243 8.95169 13.2243 9.45629V18.9077C13.2243 19.4317 12.7527 19.684 12.2729 19.684C11.7752 19.684 11.3215 19.4317 11.3215 18.9077Z"
              fill="#6666FF"
            />
          </svg>

          <span>生成中</span>
        </div>
        <p class="dialog-p">
          点击右上角符号进行多项业务同步生成同时查看同步生成的所有业务
        </p>
        <div class="bar"></div>
        <template #footer>
          <span class="dialog-footer">
            <el-button
              class="set-other-btn2"
              @click="getRightUnderChecked.setDialogVisibleFlase()"
            >在当前生成页面等待</el-button>
            <el-button
              class="set-other-btn1"
              @click="getRightUnderChecked.setDialogVisibleFlase()"
            >同步生成</el-button>
          </span>
        </template>
      </el-dialog>
    </slot>
  </div>
</template>

<script setup>
import { getCheckedStore } from "@/stores";
import { ref } from "vue";
import mitter from "@/utils/eventBus";
import { onMounted } from "vue";
// #修改隐藏头部
const emit = defineEmits();
const getRightUnderChecked = getCheckedStore();
const step = ref(5); //进度条
let timer = ref(0);
const loaddingBar = ref();
const input2 = ref();
const isShow = ref(true);

const generateHandle = async () => {
  if (!getRightUnderChecked.isLoading) {
    // #修改隐藏头部
    getRightUnderChecked.isLarge = true;
    const tips = getRightUnderChecked.generateClick(input2.value); //生成题目
    let isReturn = false
    await tips.then(res => {
      console.log(res);
      if (res != false) {
        emit("hiddenTop");
        step.value = 5;
        startLoading();
        isReturn = true;
      }
    })
    console.log(isReturn);
    return isReturn
  } else {
    // emit("showTop");
    getRightUnderChecked.generateProblemCancel();
    window.cancelAnimationFrame(timer.value);
  }
};

const handleClose = () => {
  getRightUnderChecked.isLarge = false;
};

// 进度条开始
const startLoading = () => {
  // 使用requestAnimationFrame来进行进度条的绘制
  timer.value = window.requestAnimationFrame(function fn() {
    // console.log(stepLength.value);
    if (step.value < 32) {
      step.value += 0.005;
      loaddingBar.value.style.width = step.value + "vw";
      // 递归调用requestAnimationFrame，达到动画效果
      timer.value = requestAnimationFrame(fn);
    } else {
      step.value = 32;
      // endLoading()
      // 动画完成，清除requestAnimationFrame
      window.cancelAnimationFrame(timer.value);

      // #修改隐藏头部
      // emit("showTop");
    }
  });
};
mitter.on("progress", startLoading()); //兄弟传值

// #修改阅读部门
defineExpose({ generateHandle });
// const res = mapDiffValue(getRightUnderChecked.checkedArr1[3])
/* setInterval(()=>
{
  console.log('输出的值',getRightUnderChecked.checkedArr1[2])
  const diff = mapDiffValue(getRightUnderChecked.checkedArr1[2])
  console.log('难度标签是',diff)
  const time = mapTimeValue(getRightUnderChecked.checkedArr1[3])
  
}
,1000) */
</script>

<style lang="scss" scoped>
.tagStyle {
  margin-left: 1.04vw;
}
.searchGen {
  padding-top: 3.15vh;
  display: flex;
  justify-content: center;
  .inputGen {
    width: 41.88vw;
    height: 4.7vh;
  }
}
.searchGen :deep(.el-input-group__append) {
  border-radius: 1.83vw;

  /* buttonSet 样式应该是同级的选择器 */
  .buttonSet {
    background-color: #6666ff;
    color: #ffffff;
    height: 4.7vh;
    width: 10.42vw;
    border-radius: 1.83vw;
  }
}

.inputGen :deep(.el-input__wrapper) {
  /* :deep用来穿透组件，防scoped的 */
  border-radius: 1.83vw 0vw 0vw 1.83vw;
}

.el-input.el-input-group.el-input-group--append.inputGen {
  border: 1.5px solid #6666ff;
  border-radius: 1.83vw;
}

.el-input__inner::placeholder {
  color: #a6a6a6;
}
.el-input__inner {
  color: #000;
}

.searchGen .el-input__wrapper {
  border: none !important;
  --el-input-focus-border-color: none;
  --el-input-border-color: none;
}

.problem {
  background-color: #000;
}
.loaddingCon {
  position: absolute;
  width: 31.5vw;
  height: 4.5vh;
  overflow: hidden;
  left: -31.5vw;
  .loadding {
    // width: 32vw;
    // width: v-bind(stepLength);
    height: 4.5vh;
    position: absolute;
    background: linear-gradient(
      to right,
      rgba(106, 109, 246, 0.5) 0%,
      rgba(137, 163, 246, 0.5) 50%,
      rgba(180, 222, 246, 0.5) 100%
    );
    left: 0;
    border-top-left-radius: 1.5vw;
    border-bottom-left-radius: 1.5vw;
    &::after {
      content: "";
      position: absolute;
      width: 4vw;
      height: 4.5vh;
      background-color: #fff;
      right: -1vw;
      transform: skew(-45deg, 0deg);
    }
  }
}
.hiddenf {
  display: none;
}
.dialog-content {
  margin-left: 3vw;
  font-size: 0.835vw;
  height: 5vh;
  line-height: 5vh;
  position: relative;
  span {
    position: absolute;
    bottom: 0.5vh;
    left: 2vw;
    font-weight: 700;
  }
}
.el-icon svg {
  display: none;
}
.dialogSet {
  //弹窗
  position: absolute;
  left: 46vw;
  top: 4vh;
}
.el-dialog__body {
  padding: 0;
}
.dialog-p {
  margin-left: 3vw;
  margin-right: 3vw;
}
.set-other-btn1 {
  color: #fff;
  background-color: #6666ff;
  border-color: #6666ff;
  font-size: 1vh;
  height: 1.5vh;
}
.set-other-btn2 {
  color: #6666ff;
  background-color: #fff;
  border-color: #6666ff;
  font-size: 1vh;
  height: 1.5vh;
}
.bar {
  margin-top: 1.5vh;
  width: 100%;
  height: 1px;
  background-color: #ebebeb;
}
.loadding-img {
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: 0vw;
  top: 26vh;
  .loadding-content {
    position: absolute;
    // left: 6vw;
    top: 20.5vh;
    display: flex;
    width: 100%;
    justify-content: center;

    p {
      font-size: 0.5vw;
      // margin-left: 3vw;
      width: 100%;
      text-align: center;
      color: #737373;
    }
  }
}
</style>
