<!-- 蒙版okkk -->
<!-- 11 -->
<script setup>
import { ref, onMounted, computed, nextTick } from "vue";
import LeftTopic from "../../components/LeftTopic.vue";
import RightTopTopic from "../../components/RightTopTopic.vue";
import RightUnderTopic from "../../components/RightUnderTopic.vue";
import RightGenerateTopic from "../../components/RightGenerateTopic.vue";
import ProblemShow from "../../components/ProblemShow.vue";
import { getCheckedStore } from "@/stores";
import { getTopInfo } from "../../api/selectFilter";
import BagProblemSet from "../../components/BagProblemSet.vue";
import QuestionPaperOverlay from "../../components/QuestionPaperOverlay.vue";

const value = ref("");
const value1 = ref("");
const value2 = ref("");
const value3 = ref("");
const value4 = ref("");
// 加号按钮的菜单是否显示
const isChangePageShow = ref(false);
const showOverlay = ref(false);
const showQuestionPaper = ref(false);
const questions = ref([]);
const handleOverlayToggle = (show) => {
  showOverlay.value = show;
  showQuestionPaper.value = show;
};
const infoArr = ["region", "subject", "textbook"];
const options = ref({});
const optionsGrade = [
  {
    value1: 1,
    label1: "一年级",
  },
  {
    value1: 2,
    label1: "二年级",
  },
  {
    value1: 3,
    label1: "三年级",
  },
  {
    value1: 4,
    label1: "四年级",
  },
  {
    value1: 5,
    label1: "五年级",
  },
  {
    value1: 6,
    label1: "六年级",
  },
  {
    value1: 7,
    label1: "初一",
  },
  {
    value1: 8,
    label1: "初二",
  },
  {
    value1: 9,
    label1: "初三",
  },
  {
    value1: 10,
    label1: "高一",
  },
  {
    value1: 11,
    label1: "高二",
  },
  {
    value1: 12,
    label1: "高三",
  },
];
const optionsVolume = [
  {
    value2: "上册",
    label2: "上册",
  },
  {
    value2: "下册",
    label2: "下册",
  },
];
//定义数据传递给右下
const themeData = ref([]);

const underLeft = ref();
const rightTop = ref();

const getTopChecked = getCheckedStore();
// 获取内容
const getInfo = () => {
  // const res1 = await getTopInfo("textbook");
  // optionsPosition.value = res1.data.data;
  // console.log(res1.data);
  infoArr.forEach(async (item) => {
    const res = await getTopInfo(item);
    options.value[item] = res.data.data;
    console.log("infoarr", options.value);
  });
};
// 左侧隐藏
const handleLeft = () => {
  // console.log(underLeft.value.style);
  underLeft.value.style.width = 0;
  underLeft.value.style.margin = 0;
  underLeft.value.style.overflow = "hidden";
};
// 上侧隐藏
const handleTop = () => {
  // console.log(111);
  // console.log(underLeft.value.style);
  rightTop.value.style.height = 0;
  rightTop.value.style.overflow = "hidden";
  rightTop.value.style.margin = 0;
};
// +号按钮操作
const changePage = () => {
  isChangePageShow.value = !isChangePageShow.value; //是否显示菜单
};

const isOpenBottom = ref(false);
//#修改阅读部门 选择阅读选择的时候出现替换为右下
const openBottom = () => {
  isOpenBottom.value = true;
  isSelect.value = false;
  console.log(isSelect.value, "传递值");
};
//#词汇单项选择
const isSelect = ref(false);
const openBottomTwo = () => {
  isOpenBottom.value = true;
  isSelect.value = true;
  console.log(isSelect.value, "传递值");
};
const closeBottom = () => {
  isOpenBottom.value = false;
};
// 拖拽2
const image = ref(null);
const images = ref(null);
const imgWrap = ref(null);


const time1 = ref(null)
const time2 = ref(null)

const toClick = () => {
  if (time1.value - time2.value > 500) {
    return
  }
  getTopChecked.handelBag()
}

const onMouseUp = () => {
  time1.value = new Date().getTime();
}
const moveImg = (e) => {
  let wrap = imgWrap.value;
  let img = image.value;
  let x = e.pageX - img.offsetLeft;
  let y = e.pageY - img.offsetTop;
  // 添加鼠标移动事件
  wrap.addEventListener("mousemove", move);
  function move(e) {
    img.style.right = "none";
    img.style.left = e.pageX - x + "px";
    img.style.top = e.pageY - y + "px";
  }
  // 添加鼠标抬起事件，鼠标抬起，将事件移除
  img.addEventListener("mouseup", () => {
    wrap.removeEventListener("mousemove", move);
  });
  // 鼠标离开父级元素，把事件移除
  wrap.addEventListener("mouseout", () => {
    wrap.removeEventListener("mousemove", move);
  });



};
const moveImgs = (e) => {
  time2.value = new Date().getTime();
  let wrap = imgWrap.value;
  let img = images.value;
  let x = e.pageX - img.offsetLeft;
  let y = e.pageY - img.offsetTop;
  // 添加鼠标移动事件
  wrap.addEventListener("mousemove", move);
  function move(e) {
    img.style.right = "none";
    img.style.left = e.pageX - x + "px";
    img.style.top = e.pageY - y + "px";
  }
  // 添加鼠标抬起事件，鼠标抬起，将事件移除
  img.addEventListener("mouseup", () => {
    wrap.removeEventListener("mousemove", move);
  });
  // 鼠标离开父级元素，把事件移除
  wrap.addEventListener("mouseout", () => {
    wrap.removeEventListener("mousemove", move);
  });
};
// #修改隐藏头部
const topShow = ref(true);
const hiddenTop = () => {
  topShow.value = false;
};
const showTop = () => {
  topShow.value = true;
};

// 只有一个的处理
const changeHandle = (mode) => {
  // console.log(mode);
  if (mode) {
    if (getTopChecked.isLoading) {
      getTopChecked.isLoading = false;
    }
    getTopChecked.isShow = true;
    isChangePageShow.value = false;
  } else {
    if (getTopChecked.isShow) {
      getTopChecked.isShow = false;
    }
    isChangePageShow.value = false;
    // console.log(isChangePageShow.value);
  }
};

// 有多个的处理
const mutiChangeHandle = (generateId) => {
  getTopChecked.isShow = false;
  let len = getTopChecked.totalGenerationProblem.length;
  for (let i = 0; i < len; i++) {
    if (getTopChecked.totalGenerationProblem[i].generateId === generateId) {
      getTopChecked.currentItem = i;
      break;
    }
  }
};
const saveRef = ref(null);
const submitLeft = () => {
  console.log("生成111");
  nextTick(() => {
    let tips = saveRef.value.generateHandle();
    console.log(tips, "111222");
    if (tips) {
      isOpenBottom.value = false;
    }
  });
};
// 获取组件传递的主题
const getThemeData = (event) => {
  console.log(event, "回传数据");
  themeData.value = event;
};

// #修改
const userBagList = computed(() => {
  return getTopChecked.userBagList;
});
// #修改

onMounted(() => {
  getInfo();
  //#修改
  setTimeout(() => {
    console.log(userBagList);
  }, 2000);
});
</script>
<template>
  <div class="selectAll">
    <div class="content">
      <img
        src="../../assets/position.svg"
        style="width: 1.93vw; height: 2.92vh"
      />
      <el-select
        v-model="value"
        @change="getTopChecked.getRegion(value)"
        class="m-2 select1"
        placeholder="请选择地点"
      >
        <el-option
          v-for="item in options.region"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        /></el-select>
    </div>

    <div class="content">
      <img
        src="../../assets/grade.svg"
        style="width: 2.07vw; height: 2.93vh"
      />
      <el-select
        v-model="value1"
        @change="getTopChecked.getGrade(value1)"
        class="m-2 select1"
        placeholder="请选择年级"
      >
        <el-option
          v-for="item in optionsGrade"
          :key="item.value1"
          :label="item.label1"
          :value="item.value1"
        /></el-select>
    </div>

    <div class="content">
      <img
        src="../../assets/volume.svg"
        style="width: 1.84vw; height: 2.89vh"
      />
      <el-select
        v-model="value2"
        class="m-2 select1"
        placeholder="请选择上下册"
        @change="getTopChecked.getGenre(value2)"
      >
        <el-option
          v-for="item in optionsVolume"
          :key="item.value2"
          :label="item.label2"
          :value="item.value2"
        /></el-select>
    </div>

    <div class="content">
      <img
        src="../../assets/subject.svg"
        style="width: 1.92vw; height: 3vh"
      />
      <el-select
        v-model="value3"
        @change="getTopChecked.getSubject(value3)"
        class="m-2 select1"
        placeholder="请选择学科"
      >
        <el-option
          v-for="item in options.subject"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        /></el-select>
    </div>

    <div class="content">
      <img
        src="../../assets/version.svg"
        style="width: 1.92vw; height: 2.79vh"
      />
      <el-select
        v-model="value4"
        @change="getTopChecked.getTextbook(value4)"
        class="m-2 select1"
        placeholder="请选择教材版本"
      >
        <el-option
          v-for="item in options.textbook"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        /></el-select>
    </div>
    <!-- 加号按钮 -->
    <div class="addButton">
      <img
        @click="changePage"
        v-show="!getTopChecked.isLoading"
        src="../../assets/addButton.svg"
        style="width: 2.08vw; height: 3.7vh"
      />
      <div
        class="addLarge"
        v-show="getTopChecked.isLoading"
        @click="changePage"
      >
        <img
          src="../../assets/addLargeButton.svg"
          style="width: 5.2vw; height: 9.2vh"
        />
      </div>
      <div>
        <!-- 加号按钮点击后的菜单：仅有当前生成界面 -->
        <div
          class="first-show"
          v-show="
            isChangePageShow &&
            getTopChecked.totalGenerationProblem.length === 1
          "
        >
          <p
            class="first-show-item active"
            @click.stop="changeHandle('')"
          >
            {{ getTopChecked.totalGenerationProblem[0]?.title }}
          </p>
          <p
            class="first-show-item"
            @click.stop="changeHandle('add')"
          >
            新增生成页面
          </p>
        </div>
        <!-- 加号按钮点击后的菜单：有多个生成界面 -->
        <div
          class="else-show"
          v-show="
            isChangePageShow && getTopChecked.totalGenerationProblem.length > 1
          "
        >
          <p
            class="else-show-item"
            v-for="item in getTopChecked.totalGenerationProblem"
            :key="item.generateId"
            @click="mutiChangeHandle(item.generateId)"
            :class="{
              active:
                getTopChecked.totalGenerationProblem[getTopChecked.currentItem]
                  .generateId === item.generateId,
            }"
          >
            {{ item.title }}
          </p>
          <p
            class="else-show-item"
            v-show="getTopChecked.totalGenerationProblem.length < 5"
            @click.stop="changeHandle('add')"
          >
            新增生成页面
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="under">
    <div
      class="underLeft"
      v-if="topShow"
      ref="underLeft"
    >
      <left-topic
        @hiddenEventL="handleLeft"
        @transfer="getThemeData"
        :isOpenBottom="isOpenBottom"
      ></left-topic>
      <!-- 插槽 -->
    </div>
    <div
      class="underRight"
      ref="imgWrap"
    >
      <div
        class="underRight1"
        ref="rightTop"
        v-if="topShow"
      >
        <!-- #修改阅读部门 -->
        <right-top-topic
          @hiddenEvent="handleTop"
          @openBottom="openBottom"
          @openBottomTwo="openBottomTwo"
          @closeBottom="closeBottom"
        ></right-top-topic>
        <!-- 插槽 -->
      </div>
      <div class="underRight2">
        <div style="
            padding-top: 1vh;
            display: flex;
            align-items: center;
            line-height: 1.1vh;
            font-size: 0.9vw;
          ">
          <div>
            <el-icon style="margin-left: 0.42vw">
              <CaretLeft />
            </el-icon>
          </div>
          <div style="
              font-weight: 600;
              margin-left: 0.2vw;
              width: 49vw;
              color: black;
            ">
            生成题目
          </div>
          <div
            style="font-weight: 600; margin-left: 0.2vw; color: black"
            v-show="!getTopChecked.isShow"
          >
            题目分析
          </div>
          <!-- 右下模块的切换按钮 -->
          <div>
            <img
              src="../../assets/beforeSwitch.svg"
              @click="changePage"
              v-show="!getTopChecked.isLoading"
              style="position: absolute; right: 1vw; top: 1vh"
            />
            <div
              class="addLarge"
              v-show="getTopChecked.isLoading"
              @click="changePage"
            >
              <img
                src="../../assets/switch.svg"
                style="position: absolute; right: 1vw; top: 1vh"
              />
            </div>
          </div>
        </div>
        <!-- #修改阅读部门  -->
        <!-- #修改隐藏头部 -->
        <template v-if="getTopChecked.isShow">
          <right-under-topic
            @hiddenTop="hiddenTop"
            @showTop="showTop"
            ref="saveRef"
            :class="!isOpenBottom ? '' : 'top999'"
          ></right-under-topic>
          <right-generate-topic
            :theme="themeData"
            :select="isSelect"
            @submit="submitLeft"
            v-if="isOpenBottom"
          ></right-generate-topic>
        </template>
        <ProblemShow v-else></ProblemShow>
        <!-- 插槽 -->
        <!-- <el-button @click="change">ff</el-button> -->
      </div>
      <!-- 锁购物袋设计：拖拽悬浮 拖拽1 -->
      <div
        ref="image"
        @mousedown.prevent="moveImg"
        style="position: absolute; display: inline-block; left: 96%"
        draggable="true"
        v-if="getTopChecked.isBag"
      >
        <img
          class="dragImg"
          src="../../assets/lockbag.svg"
          alt=""
        />
      </div>
      <div
        ref="images"
        @mousedown.prevent="moveImgs"
        @mouseup.prevent="onMouseUp"
        style="position: absolute; display: inline-block; left: 96%"
        draggable="true"
        @click="toClick"
        v-else
      >
        <img
          class="dragImg"
          src="../../assets/usebag.svg"
          alt=""
        />
        <!-- 购物袋小红点 -->
        <!-- #修改 -->
        <div
          v-show="userBagList.length"
          class="fz"
          :class="[userBagList.length > 9 ? 'rectangle' : 'circle']"
        >
          {{ userBagList.length }}
        </div>
      </div>
    </div>
  </div>
  <!-- 袋子题库 -->
  <div
    class="overlay"
    v-show="showOverlay"
  ></div>
  <!-- 蒙版元素 -->
  <question-paper-overlay
    v-if="showQuestionPaper"
    :questions="questions"
    @toggle-overlay="handleOverlayToggle"
  />
  <bag-problem-set
    v-show="getTopChecked.isBagProblemSet"
    @toggle-overlay="handleOverlayToggle"
  ></bag-problem-set>

  <div
    v-if="showModal"
    class="modal"
  >
    <div class="modal-content">
      <p>{{ errorMessage }}</p>
      <button @click="showModal = false">确定</button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.top999 {
  position: fixed;
  top: 9999px;
}
.right-div {
  // right: 0;
}
.selectAll {
  display: flex;
  justify-content: space-around;
  margin-top: 3.43vh;
  .addButton {
    position: relative;
    width: 2.08vw;
    height: 3.7vh;
    position: relative;
    .addLarge {
      position: absolute;
      left: -1.8vw;
      top: -3vh;
    }
    .first-show {
      z-index: 9999;
      color: #4f4f4f;
      font-size: 0.73vw;
      width: 8.5vw;
      position: absolute;
      right: -3vw;
      bottom: -10vh;
      .active {
        color: #3c6ff1;
      }
      .first-show-item {
        cursor: pointer;
        background-color: #fff;
        height: 3.8vh;
        line-height: 3.8vh;
        text-align: center;
        &:hover {
          background-color: #ebefff;
        }
      }
    }
    .else-show {
      z-index: 9999;
      color: #4f4f4f;
      font-size: 0.73vw;
      width: 8.5vw;
      position: absolute;
      right: -3vw;
      bottom: -18vh;
      .active {
        color: #3c6ff1;
      }
      .else-show-item {
        cursor: pointer;
        background-color: #fff;
        height: 3.8vh;
        line-height: 3.8vh;
        text-align: center;
        &:hover {
          background-color: #ebefff;
        }
      }
    }
  }
}
.content {
  display: flex;
}
.select1 {
  margin-left: 0.3vw;
}
.el-select :deep(.el-input__wrapper) {
  border-radius: 50px;
  border: 1px solid #6666ff;
}

.el-select {
  --el-select-input-focus-border-color: #6666ff;
}
.el-input {
  --el-input-placeholder-color: #6666ff;
  --el-input-text-color: #6666ff;
}
.el-select .el-input__inner {
  text-align: center;
}
.under {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 80.46vh;
  // margin: auto;
  margin-top: 2.96vh;
  border-radius: 1vw 1vw 1vw 1vw;
  .underLeft {
    height: 100%;
    width: 20%;
    background-color: white;
    border-radius: 1vw 1vw 1vw 1vw;
    margin-left: 1vw;
    margin-right: 0.5vw;
    overflow: auto;
  }
  .underRight {
    height: 100%;
    width: 70%;
    border-radius: 1vw 1vw 1vw 1vw;
    flex: 1;
    margin-right: 1vw;
    margin-left: 0.5vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // align-items: center;
    .underRight1 {
      background-color: white;
      // width: 82.29vw;
      height: 24vh;
      border-radius: 1vw 1vw 1vw 1vw;
      margin-bottom: 1.77vh;
      overflow: scroll;
    }
    .underRight2 {
      position: relative;
      background-color: rgba(255, 255, 255, 0.5);
      // margin-top: 1.77vh;
      // width: 82.29vw;
      height: 100%;
      border-radius: 1vw 1vw 1vw 1vw;
      flex: 1;
      // overflow: auto;
    }
    .dragImg {
      position: absolute;
      right: 0;
    }
    .fz {
      position: relative;
      display: inline-block;
      right: 19px;
      width: 35px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      color: #ffffff;
      background: #fe3a46;
      &.rectangle {
        padding: 8px;
        border-radius: 16px;
      }
      &.circle {
        border-radius: 50%;
      }
    }
  }
}
body {
  color: #4f4f4f;
}
</style>
