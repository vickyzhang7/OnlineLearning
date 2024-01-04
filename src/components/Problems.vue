<template>
  <div class="container">
    <div class="select-container">
      <problem-top-select></problem-top-select>
      <div class="split-bar"></div>
    </div>
    <div class="innercon">
      <div class="problem-body">
        <!-- 试题集 -->
        <span class="title">试题集</span>
        <div
          class="itemCon"
          v-for="(item, index) in generateData.userProblemList"
          :key="item.data.problemId"
        >
          <div style="position: relative">
            <el-checkbox style="position: absolute; top: -0.2vh" v-model="item.isSelet" />
            <!-- 试题集的问题 -->
            <p style="margin-left: 1vw">{{ replaceBody(index, item.data.body) }}</p>
          </div>
          <div class="optionsCon">
            <!-- 试题集的选项 -->
            <p class="options-item" v-for="i in item.data.options" :key="i">{{ i }}</p> 

          </div>
        </div>
      </div>

      <div class="problem-list">
        <!-- 习题集 -->
        <span class="title">习题集</span>
        <div class="list-content">
          <el-button @click="addProblemSetHandle" class="newlist">新建试题集</el-button>
          <!-- <el-button @click="getList" class="newlist">查看用户题集</el-button>
          <el-button @click="printProblem" class="newlist">打印题集</el-button> -->
          <div
            class="problem-set-content"
            v-for="item in generateData.problemSetList"
            :key="item.problemSetId"
          >
            <p class="problem-set-title">题集：{{ item.problemSetId }}</p>
            <div class="problem-set-main">
              <div class="main-item" v-for="(item, index) in arrData" :key="item.id">
                <div class="item-title">{{ item.title }}</div>
                <div class="item-content">
                  (<span style="color: #6666ff">{{ item.currentNum }}</span
                  >/{{ item.maxNum }})
                </div>
              </div>
              <el-button class="main-item-btn">查看</el-button>
            </div>
          </div>
        </div>
        <div class="split"></div>
      </div>
    </div>

    <div class="control">
      <div class="btns" v-show="!isBatch">
        <el-button round class="set-other-btn2" @click="batchHandle">批量处理</el-button>
        <el-button round class="set-other-btn2" @click="textEncapsulation"
          >习题封装</el-button
        >
      </div>
      <div class="btns" v-show="isBatch">
        <el-button class="set-other-btn1" @click="deleteProblems"> 删除 </el-button>
        <el-button class="set-other-btn1" @click="isBatch = false"> 取消 </el-button>
        <el-button class="set-other-btn1" @click.stop="textEncapsulation">
          编入题集
        </el-button>
        <div class="problem-set-select" v-show="isAddSelect">
          <p
            class="select-item"
            v-for="(item, index) in generateData.problemSetList"
            :key="item"
            @click.stop="addToProblemSet(item)"
          >
            题集{{ numberToText[index + 1] }}
          </p>
        </div>
      </div>
    </div>
    <add-problem-set v-model:isShow="isAddProblemSet"></add-problem-set>
  </div>
</template>

<script setup>
import { getCheckedStore } from "@/stores";
import {
  deleteProblem,
  printUserProblemSet,
  addProblemSetContent,
} from "@/api/selectFilter";
import { ref, onMounted, computed } from "vue";
import { ElMessage } from "element-plus";
import AddProblemSet from "./AddProblemSet.vue";
import ProblemTopSelect from "./ProblemTopSelect.vue";
import { useRouter } from "vue-router";
// const seletList = ref([])
const router = useRouter();
const topValue = computed(() => {
  return "-" + generateData.problemSetList.length * 3 + "vh";
});
const isAddSelect = ref(false);
const isAddProblemSet = ref(false);
const isBatch = ref(false);
const numberToText = {
  1: "一",
  2: "二",
  3: "三",
  4: "四",
  5: "五",
};
// 整个假数据
const arrData = [
  {
    id: 1,
    title: "填空",
    currentNum: 10,
    maxNum: 15,
  },
  {
    id: 2,
    title: "写作",
    currentNum: 1,
    maxNum: 2,
  },
  {
    id: 3,
    title: "听力",
    currentNum: 10,
    maxNum: 15,
  },
  {
    id: 4,
    title: "阅读",
    currentNum: 3,
    maxNum: 4,
  },
  {
    id: 5,
    title: "完形",
    currentNum: 3,
    maxNum: 4,
  },
];
const form = ref({
  time: null,
  type: null,
  questionType: null,
  recentDay: null,
  showAnalysis: true,
});
const generateData = getCheckedStore();
let list = [];

// console.log(generateData.problems[0].options.length);
const replaceBody = (index, body) => {
  // return index + 1 + "." + body.slice(3);
  return index + 1 + "." + body; //设置题库的试题集渲染格式

};
// 批量处理
const batchHandle = () => {
  list = [];
  generateData.userProblemList.forEach((item) => {
    if (item.isSelet) {
      list.push(item.data.problemId);
    }
  });
  console.log(generateData.userProblemList);
  console.log(list);
  if (list.length) {
    isBatch.value = true;
  } else {
    ElMessage.error("请选择题目！");
  }
};

// 批量删除
const deleteProblems = () => {
  try {
    list.forEach(async (item) => {
      const res = await deleteProblem(item);
      console.log(res.data);
      ElMessage.success("删除成功！");
      generateData.getUserProblems();
    });
  } catch (error) {
    ElMessage.error("删除失败！", error);
  } finally {
    isBatch.value = false;
  }
};
// 习题封装
const textEncapsulation = () => {
  isAddSelect.value = !isAddSelect.value;
};

// 获取用户题集列表
const getList = () => {
  generateData.getUserProblemSetList(); //个人题库模块的右侧信息获取，与左侧试题集无关
};

// 打开添加用户题集
const addProblemSetHandle = () => {
  isAddProblemSet.value = !isAddProblemSet.value;
};

// 打印题集
const printProblem = async () => {
  // const res = await printUserProblemSet(8);
  // console.log(JSON.parse(localStorage.getItem("user")).token);
  // document.cookie = `satoken=${JSON.parse(localStorage.getItem("user")).token}`;
  // console.log(document.cookie);
  // window.open("http://103.231.255.140:8182/problemSet/print/8");
  // location.href = 'http://103.231.255.140:8182/problemSet/print/1'
  //   router.push('/problemSet/print/1')
};

// 将题目添加至题集
const addToProblemSet = (seqNum) => {
  try {
    list.forEach(async (item) => {
      const res = await addProblemSetContent({
        problemId: item,
        problemSetSeqNum: seqNum,
      });
      ElMessage.success("添加成功！");
    });
  } catch (error) {
    ElMessage.error("删除失败！");
  } finally {
    isAddProblemSet.value = false;
  }
};

onMounted(() => {
  getList();
});
</script>

<style lang="scss" scoped>
.container {
  //   height: 55vh;
  width: 100%;
  height: 100%;
  font-size: 0.835vw;
  //   background-color: rgba(255, 255, 255, 0.5);
  color: #4f4f4f;
  .select-container {
    width: 100%;
    height: 10%;
    position: relative;
  }
  .innercon {
    display: flex;
    width: 100%;
    height: 80%;
  }
  .problem-body {
    height: 100%;
    width: 70%;
    padding-left: 2vw;
    padding-bottom: 2vh;
    overflow-y: hidden;
    &:hover {
      overflow-y: auto;
    }
    .title {
      font-size: 0.833vw;
      color: #4f4f4f;
    }
  }
  .problem-analysis {
    width: 30%;
  }
  .itemCon {
    margin-top: 2.5185vh;
    // width: 50vw;
    width: 100%;
    position: relative;
    padding: 1vh;
    box-sizing: border-box;
    &:hover {
      border: 1px solid #6666f6;
      background-color: #e6eafc;
    }
  }
  .number {
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
    .options-item {
      width: 25%;
    }
  }
  .problem-list {
    position: relative;
    width: 30%;
    .split {
      position: absolute;
      left: 0;
      top: 20%;
      height: 60%;
      width: 1px;
      background-color: #c1c3ca;
    }
    .list-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .newlist {
        width: 80.5%;
        height: 5.55vh;
        font-size: 0.82vw;
        background-color: #d4defa;
        color: #6666ff;
        border-radius: 1vh;
      }
      .problem-set-content {
        width: 20.35vw;
        height: 7.6vh;
        background-color: transparent;
        .problem-set-title {
          font-size: 0.73vw;
          color: #4f4f4f;
        }
        .problem-set-main {
          width: 100%;
          height: 5.2vh;
          border: 1px solid #6666ff;
          border-radius: 1vh;
          display: flex;
          position: relative;
          transition: all 0.1s;
          &:hover {
            background-color: #dde8ff;
            border: 3px solid #6666ff;
          }
          .main-item {
            width: 2.45vw;
            height: 3.7vh;
            margin-top: 1vh;
            // margin-left: .5vw;
            &:first-child {
              margin-left: 1.5vw;
            }
            .item-title {
              font-size: 0.63vw;
            }
            .item-content {
              font-size: 0.525vw;
            }
          }
          .main-item-btn {
            position: absolute;
            right: 1vw;
            top: 1vh;
            font-size: 0.82vw;
            width: 3.13vw;
            height: 2.8vh;
            color: #6666ff;
            background-color: #fff;
            border-color: #6666ff;
          }
        }
      }
    }
  }
  .control {
    width: 100%;
    height: 10%;
    background-color: #fff;
    border-radius: 10px;
    text-align: center;
    line-height: 6.5vh;
    .set-other-btn1 {
      color: #6666ff;
      background-color: #fff;
      border-color: #6666ff;
      width: 5vw;
      height: 3.5vh;
    }
    .set-other-btn2 {
      color: #6666ff;
      background-color: #fff;
      border-color: #6666ff;
      width: 10vw;
      height: 3.5vh;
    }
    .btns {
      position: relative;
      .problem-set-select {
        position: absolute;
        // width: 6.8vw;
        // height: 14.9vh;
        top: v-bind(topValue);
        background-color: #fff;
        right: 32.4vw;
        border-radius: 1vh;
        box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
        .select-item {
          width: 6.8vw;
          height: 3vh;
          line-height: 3vh;
          text-align: center;
          cursor: pointer;
          &:hover {
            background-color: #ebefff;
          }
        }
        .active {
          background-color: #ebefff;
        }
      }
    }
  }
}

:deep(.el-radio__inner) {
  display: none;
}
:deep(.el-form-item) {
  margin-bottom: 0px;
  margin-left: 1.52vw;
}
:deep(.el-form-item__label) {
  font-size: 0.9vw;
  color: #000000;
}
:deep(.el-radio__label) {
  font-size: 0.9vw;
  color: #4f4f4f;
}
:deep(.el-form-item__error) {
  top: 80%;
}
:deep(.el-popover.popoverStyle) {
  //   height: 1vh;
  padding-top: 0;
  padding-bottom: 0;
  margin: 0;
}
:deep(.el-checkbox__label) {
  color: #4f4f4f;
  font-size: 0.833vw;
  white-space: normal;
  word-break: break-all;
}
:deep(.el-radio-group) {
  //   background-color: #fff;
}
:deep(.el-checkbox__inner) {
  background-color: transparent;
  border: 1px solid #6666f6;
}

:deep(.el-input__wrapper) {
  position: fixed;
  left: -100vw;
  top: 0vh;
}

:deep(.el-popper) {
  width: 0;
  height: 0;
}
:deep(.el-popper__arrow::before) {
  width: 0;
  height: 0;
}
:deep(.item-raido-group) {
  background-color: #fff;
}
</style>
