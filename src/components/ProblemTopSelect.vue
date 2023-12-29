<template>
  <div class="container">
    <el-form :model="form" ref="formRef" @change="searchHandle">
      <div style="display: flex">
        <el-form-item prop="time" label="生成时间：">
          <div class="time-select" @click="selectHandle">
            <p class="tiem-content">
              <span>{{ timeToText[time] || time }}</span>
              <span style="position: absolute; right: 2vw"
                ><svg
                  width="14"
                  height="9"
                  viewBox="0 0 14 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M6.97125 9L0.0688964 0.333333L13.8736 0.333334L6.97125 9Z"
                    fill="#25313D"
                  />
                </svg>
              </span>
            </p>
            <div class="select-item" ref="selectItem">
              <p
                class="item-p p1"
                :class="{ active: time === 0 }"
                @click.stop="recentDayHandle(0)"
              >
                不限
              </p>
              <p
                class="item-p p2"
                :class="{ active: time === 7 }"
                @click.stop="recentDayHandle(7)"
              >
                近7天
              </p>
              <p
                class="item-p p2"
                :class="{ active: time === 15 }"
                @click.stop="recentDayHandle(15)"
              >
                近15天
              </p>
              <p class="item-p p3" @click.stop="selectTime">
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
                    d="M17.5385 5H6.46154C5.10207 5 4 6.04467 4 7.33333V16.6667C4 17.9553 5.10207 19 6.46154 19H17.5385C18.8979 19 20 17.9553 20 16.6667V7.33333C20 6.04467 18.8979 5 17.5385 5ZM12 12H13V14H12V12ZM15 12H16V14H15V12ZM18.6272 17.6653C18.8659 17.4509 19 17.1602 19 16.8571V10H5V16.8571C5 17.1602 5.13409 17.4509 5.37277 17.6653C5.61146 17.8796 5.93518 18 6.27273 18H17.7273C18.0648 18 18.3885 17.8796 18.6272 17.6653ZM19 9H5V7C5 6.73478 5.13409 6.48043 5.37277 6.29289C5.61146 6.10536 5.93518 6 6.27273 6H17.7273C18.0648 6 18.3885 6.10536 18.6272 6.29289C18.8659 6.48043 19 6.73478 19 7V9ZM8 12H9V14H8V12Z"
                    :fill="timeToText[time] ? '#A6A6A6' : '#000'"
                  />
                </svg>
                <el-date-picker
                  ref="datePicker"
                  @change="datePickerChange"
                  v-model="time"
                  type="date"
                  :disabled-date="disabledDate"
                  class="timnePickCSS"
                  value-format="YYYY-MM-DD"
                  popper-class="date_form"
                />
              </p>
            </div>
          </div>
        </el-form-item>
        <el-form-item prop="time" label="展示分析：">
          <!-- <input type="text" /> -->
          <div class="analysis-select" @click="analysisHandle">
            <p class="tiem-content">
              <span>{{ form.showAnalysis ? "是" : "否" }}</span>
              <span style="position: absolute; right: 2vw"
                ><svg
                  width="14"
                  height="9"
                  viewBox="0 0 14 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M6.97125 9L0.0688964 0.333333L13.8736 0.333334L6.97125 9Z"
                    fill="#25313D"
                  />
                </svg>
              </span>
            </p>
            <div
              v-show="isAnalysisShow"
              class="analysis-select-item"
              ref="analysisSelectItem"
            >
              <p style="cursor: pointer;" @click="analysisSelect(true)" class="a-p">是</p>
              <p style="cursor: pointer;" @click="analysisSelect(false)" class="a-p">否</p>
            </div>
          </div>
        </el-form-item>
      </div>

      <el-form-item prop="type" label="生成题型：">
        <el-radio-group v-model="form.type">
          <!-- {{ item.genre }} -->
          <el-radio v-for="item in problemTypeData" :key="item.value" :label="item.genre">
            <!-- 题目小类 -->
            <!-- <el-popover
              placement="bottom"
              trigger="click"
              width="auto"
              popper-class="popoverStyle"
            >
              <template #reference> {{ item.genre }}</template>
              <el-radio-group class="item-raido-group" v-model="form.questionType">
                <el-radio
                  v-for="i in item.typeNameList"
                  :key="i.value"
                  :label="i"
                  @change=""
                >
                  {{ i }}
                </el-radio>
              </el-radio-group>
            </el-popover> -->
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getCheckedStore } from "@/stores";
import { getProblemType } from "@/api/selectFilter";
const generateData = getCheckedStore();
const time = ref(0);
const analysisSelectItem = ref();
const isAnalysisShow = ref(false);
const problemTypeData = ref([]);

const timeToText = {
  0: "不限",
  7: "近7天",
  15: "近十五天",
};
const form = ref({
  time: null,
  type: null,
  questionType: null,
  recentDay: null,
  showAnalysis: true,
});

const disabledDate = (time) => {
  return time.getTime() > Date.now();
};

const datePicker = ref();
const selectItem = ref();
// 判断select是否被下拉了
const isSelet = ref(false);

// 时间选择下拉选择框
const selectHandle = () => {
  if (!isSelet.value) {
    selectItem.value.style.display = "flex";
    isSelet.value = true;
  } else {
    selectItem.value.style.display = "none";
    isSelet.value = false;
  }
};
// 分析下拉框
const analysisHandle = () => {
  isAnalysisShow.value = !isAnalysisShow.value;
};
// 分析下拉框选中
const analysisSelect = (flag) => {
  form.value.showAnalysis = flag;
  searchHandle();
};
// recentday处理
const recentDayHandle = (day) => {
  time.value = day;
  searchHandle();
  selectItem.value.style.display = "none";
  isSelet.value = false;
  console.log(time.value);
};

const selectTime = () => {
  //   datePicker.value.tiemPick.focus();
  datePicker.value.focus();
};

// 日期选择器change
const datePickerChange = () => {
  //   console.log(time.value);
  searchHandle();
  selectItem.value.style.display = "none";
  isSelet.value = false;
};
// 条件搜索
const searchHandle = () => {
  generateData.getSearchUserProblems({
    genre: form.value.type,
    recentDays: timeToText[time.value] ? time.value : null,
    date: timeToText[time.value] ? null : time.value,
    showAnalysis: form.value.showAnalysis,
    topicList: null,
  });
};

const getSubject = async () => {
  const res = await getProblemType("English"); //目前只有英语选项，等后面有其他学科了再获取subject值
  problemTypeData.value = res.data.data;
  // console.log(ProblemTypeData.value);
};
onMounted(() => {
  getSubject();
});
</script>

<style lang="scss" scoped>
.split-bar {
  position: absolute;
  width: 95%;
  height: 1px;
  background-color: #c1c3ca;
  bottom: 0;
  left: 2vw;
}
.time-select {
  width: 13.75vw;
  height: 2.22vh;
  background-color: transparent;
  border: 1px solid #6666ff;
  border-radius: 100vw;
  position: relative;

  .tiem-content {
    font-size: 0.9vw;
    position: relative;
    width: 100%;
    text-align: center;
    line-height: 2.22vh;
  }
  .select-item {
    z-index: 999999;
    position: absolute;
    bottom: -3vh;
    width: 100%;
    background-color: #fff;
    border-radius: 1vh;
    display: flex;
    display: none;
    height: 2.22vh;
    .item-p {
      width: 25%;
      text-align: center;
      line-height: 2.22vh;
      color: #a6a6a6;
      cursor: pointer;
    }
    .active {
      color: #000000;
    }
    .p2 {
      border-left: 1px solid #939496;
      border-right: 1px solid #939496;
    }
    .p3 {
      position: relative !important;
    }
  }
}
.analysis-select {
  width: 13.75vw;
  height: 2.22vh;
  background-color: transparent;
  border: 1px solid #6666ff;
  border-radius: 100vw;
  position: relative;
  .tiem-content {
    font-size: 0.9vw;
    position: relative;
    width: 100%;
    text-align: center;
    line-height: 2.22vh;
  }
  .analysis-select-item {
    z-index: 999999;
    position: absolute;
    bottom: -6vh;
    width: 100%;
    background-color: #fff;
    border-radius: 1vh;
    height: 5.22vh;
    .a-p {
      text-align: center;
      line-height: 2.61vh;
      color: #a6a6a6;
      &:hover {
        background-color: #f2f0f0;
      }
    }
  }
}
.date_form {
    position: absolute;
    right: 10vw;
    top: 1vh;
    background-color: red;
}
:deep(.el-date-picker.has-sidebar) {
  width: 18vw;
  .el-picker-panel__sidebar {
    // top: auto;
    bottom: auto;
    width: 100%;
    border: 0;
    display: flex;
    .el-picker-panel__shortcut {
      border-bottom: 1px solid #4f4f4f;
      text-align: center;
    }
  }
  .el-picker-panel__body {
    margin: 0;
    .el-picker-panel__content {
      width: auto;
      margin-bottom: 40px;
    }
  }
}
:deep(.el-radio__inner) {
  display: none;
}

:deep(.el-picker-panel__body) {
  position: absolute;
  left: -17vw;
  top: -3vh;
  background-color: #fff;
}
:deep(.el-picker-panel .el-date-picker) {
    position: absolute;
    right: -7.5vw;
    top: -3vh;
}
</style>
