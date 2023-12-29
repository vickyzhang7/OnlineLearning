<template>
  <Teleport to="body">
    <!-- 遮罩层 -->
    <div v-show="props.isShow" class="container" @click.self="closeHandle">
      <!-- 内容区域 -->
      <div class="content">
        <p class="title">新建试题卷</p>
        <div class="item1">
          <p class="item-title">试卷类型</p>
          <div class="item1-container">
            <div>
              <p>类型一期末考试</p>
              <div class="item1-item item1-item1">
                <div>
                  <span></span>
                  <el-slider ref="silder" v-model="value1" />
                </div>
              </div>
            </div>
            <div>
              <p>类型二期中考试</p>
              <div class="item1-item item1-item2"></div>
            </div>
            <div>
              <p>类型三自定义</p>
              <div class="item1-item item1-item3"></div>
            </div>
          </div>
        </div>
        <div class="item2">
          <p class="item-title">试卷抬头设置</p>
          <el-input v-model="title" placeholder="例：成都七中初二年级期中考试"></el-input>
        </div>
        <div class="item3">
          <p class="item-title">抬头样式</p>
          <div class="item3-container">
            <div
              class="item3-item"
              :class="{ active: problemSetFormat === 'CENTER' }"
              @click="formatHandle('CENTER')"
            >
              <p>居中</p>
            </div>
            <div
              class="item3-item"
              :class="{ active: problemSetFormat === 'LEFT_ALIGN' }"
              @click="formatHandle('LEFT_ALIGN')"
            >
              <p>左对齐</p>
            </div>
          </div>
        </div>
        <el-button @click="addProblemHandle" class="btn">确认</el-button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed } from "vue";
import { createProblemSet } from "../api/selectFilter";
import { ElMessage } from 'element-plus'
import { getCheckedStore } from "@/stores";

const generateData = getCheckedStore();
const silder = ref();
const props = defineProps(["isShow"]);
const value1 = ref(1);
const title = ref("");
const problemSetFormat = ref("");
const content = computed(() => {
  return value1.value + "";
});
const emit = defineEmits();
const closeHandle = () => {
  //   console.log(props.isShow);
  emit("update:isShow", false);
};
const formatHandle = (format) => {
  problemSetFormat.value = format;
};

// 创建用户题集
const addProblemHandle = async () => {
  try {
    const res = await createProblemSet({
      format: problemSetFormat.value,
      title: title.value,
    });
    ElMessage.success('添加题集成功！')
  } catch (error) {
    ElMessage.error('添加题集失败！', error.msg)
  } finally {
    generateData.getUserProblemSetList()
    emit("update:isShow", false);
  }

};
</script>

<style lang="scss" scoped>
.container {
  //   width: 100%;
  //   height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba($color: #1f2940, $alpha: 0.3);
  .content {
    position: absolute;
    top: 8vh;
    right: 2.5vw;
    width: 30%;
    height: 85%;
    background-color: #fff;
    padding: 2vw;
    .btn {
      position: absolute;
      right: 3vw;
      bottom: 3vh;
      color: #fff;
      background-color: #6666ff;
      border-color: #6666ff;
      width: 8.35vw;
      border-radius: 100vw;
    }
    .title {
      font-size: 0.94vw;
      color: #000;
    }
    .item-title {
      font-size: 0.84vw;
      color: #4f4f4f;
    }
    .item1 {
      margin-top: 2vh;
      .item1-container {
        margin-top: 2vh;
        display: flex;
        p {
          font-size: 0.73vw;
          color: #4f4f4f;
          margin-bottom: 0.8vh;
        }
        .item1-item {
          width: 6.8vw;
          height: 13vh;
          background-color: #e1e1e5;
          margin-right: 1vh;
          border-radius: 1vh;
          border: 1px solid #6666ff;
        }
      }
    }
    .item2 {
      margin-top: 4vh;
    }
    .item3 {
      margin-top: 2vh;
      .item3-container {
        display: flex;
        .item3-item {
          // width: 1vw;
          height: 4.7vh;
          font-size: 0.94vw;
          background-color: #e1e1e5;
          margin-right: 1vw;
          color: #4f4f4f;
          border-radius: 1vh;
          p {
            line-height: 4.7vh;
            padding-left: 1vw;
            padding-right: 1vw;
          }
        }
        .active {
          border: 1px solid #6666ff;
          background-color: rgba($color: #dde8ff, $alpha: 0.6);
        }
      }
    }
  }
}

::v-deep .el-slider__stop {
  // 进度条上间断点的样式
  border: 1px solid var(--el-color-primary);
  box-sizing: border-box;
}

::v-deep .el-slider__button {
  // 拖动的滑块的样式
  width: 1.05vw;
  height: 1.05vw;
  border: 1px solid #6666ff;
  border-radius: 50%;
  position: relative;
  //   left: 4px;
}
</style>
