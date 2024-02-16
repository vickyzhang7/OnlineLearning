<script setup>
import { ref, onMounted } from "vue";
import LeftTopic from "../../components/LeftTopic.vue";
import RightTopTopic from "../../components/RightTopTopic.vue";
import RightUnderTopic from "../../components/RightUnderTopic.vue";
import ProblemShow from "../../components/ProblemShow.vue";
import { getCheckedStore } from "@/stores";
import { getTopInfo } from "../../api/selectFilter";
import BagProblemSet from "../../components/BagProblemSet.vue";

const value = ref("");
const value1 = ref("");
const value2 = ref("");
const value3 = ref("");
const value4 = ref("");
// 加号按钮的菜单是否显示
const isChangePageShow = ref(false);
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
    console.log('infoarr',options.value);
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
  rightTop.value.style.margin=0;
};
// +号按钮操作
const changePage = () => {
  isChangePageShow.value = !isChangePageShow.value; //是否显示菜单
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
  let len = getTopChecked.totalGenerationProblem.length
  for(let i = 0; i < len; i++) {
    if(getTopChecked.totalGenerationProblem[i].generateId === generateId) {
      getTopChecked.currentItem = i
      break
    }
  }
}


onMounted(() => {
  getInfo();
});
</script>
<template>
  <div class="selectAll">
    <div class="content">
      <img src="../../assets/position.svg" style="width: 1.93vw; height: 2.92vh" />
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
      <img src="../../assets/grade.svg" style="width: 2.07vw; height: 2.93vh" />
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
      <img src="../../assets/volume.svg" style="width: 1.84vw; height: 2.89vh" />
      <el-select 
      v-model="value2" 
      class="m-2 select1" 
      placeholder="请选择上下册"
      @change = "getTopChecked.getGenre(value2)">
        <el-option
          v-for="item in optionsVolume"
          :key="item.value2"
          :label="item.label2"
          :value="item.value2"
      /></el-select>
    </div>

    <div class="content">
      <img src="../../assets/subject.svg" style="width: 1.92vw; height: 3vh" />
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
      <img src="../../assets/version.svg" style="width: 1.92vw; height: 2.79vh" />
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
      <div class="addLarge" v-show="getTopChecked.isLoading" @click="changePage">
        <img src="../../assets/addLargeButton.svg" style="width: 5.2vw; height: 9.2vh" />
      </div>
    <div>
      <!-- 加号按钮点击后的菜单：仅有当前生成界面 -->
        <div
          class="first-show"
          v-show="isChangePageShow && getTopChecked.totalGenerationProblem.length === 1"
        >
          <p class="first-show-item active" @click.stop="changeHandle('')">
            {{ getTopChecked.totalGenerationProblem[0]?.title }}
          </p>
          <p class="first-show-item" @click.stop="changeHandle('add')">新增生成页面</p>  
        </div>  
      <!-- 加号按钮点击后的菜单：有多个生成界面 -->
        <div
          class="else-show"
          v-show="isChangePageShow && getTopChecked.totalGenerationProblem.length > 1"
        >
          <p
            class="else-show-item"
            v-for="item in getTopChecked.totalGenerationProblem"
            :key="item.generateId"
            @click="mutiChangeHandle(item.generateId)"
            :class="{'active': getTopChecked.totalGenerationProblem[getTopChecked.currentItem].generateId === item.generateId}"
          >
            {{ item.title }}
          </p>
          <p class="else-show-item" v-show="getTopChecked.totalGenerationProblem.length < 5" @click.stop="changeHandle('add')">新增生成页面</p>
        </div>
      </div>
    </div>
  </div>
  <div class="under">
    <div class="underLeft" ref="underLeft">
     
      <left-topic @hiddenEventL = "handleLeft"></left-topic>
      <!-- 插槽 -->
    </div>
    <div class="underRight">
      <div class="underRight1" ref="rightTop">
        <right-top-topic @hiddenEvent="handleTop"></right-top-topic>
        <!-- 插槽 -->
      </div>
      <div class="underRight2">
        <div
          style="
            padding-top: 1vh;
            display: flex;
            align-items: center;
            line-height: 1.1vh;
            font-size: 0.9vw;
          "
        >
          <div>
            <el-icon style="margin-left: 0.42vw"><CaretLeft /></el-icon>
          </div>
          <div style="font-weight: 600; margin-left: 0.2vw">生成题目</div>
          <!-- 右下模块的切换按钮 -->
          <div>
            <img
              src="../../assets/beforeSwitch.svg"
              @click="changePage"
               v-show="!getTopChecked.isLoading"
              style="position: absolute; right: 1vw; top: 1vh"
            />
            <div class="addLarge" v-show="getTopChecked.isLoading" @click="changePage">
              <img src="../../assets/switch.svg" style="position: absolute; right: 1vw; top: 1vh"/>
            </div>
          </div>
        </div>
        <right-under-topic v-if="getTopChecked.isShow"></right-under-topic>
        <ProblemShow v-else></ProblemShow>
        <!-- 插槽 -->
        <!-- <el-button @click="change">ff</el-button> -->
      </div>
      <!-- 锁购物袋设计：拖拽悬浮 -->
      <div style="position: absolute;display: inline-block;right: 0;" draggable='true' v-if="getTopChecked.isBag">
         <img
          class="dragImg"
          src="../../assets/lockbag.svg"
          alt=""
      />
      </div>
      <div style="position: absolute;display: inline-block;right: 0;" draggable='true' @click="getTopChecked.handelBag()" v-else>
         <img
          class="dragImg"
          src="../../assets/usebag.svg"
          alt=""
      />
      <!-- 购物袋小红点 -->
      <div
						v-show="getTopChecked.userProblemList.length"
						class="fz"
						:class="[getTopChecked.userProblemList.length > 9 ? 'rectangle' : 'circle']"
					>
						{{ getTopChecked.userProblemList.length }}
      </div>
      </div>
       
    </div>
  </div>
  <!-- 袋子题库 -->
  <bag-problem-set  v-show="getTopChecked.isBagProblemSet"></bag-problem-set>  
</template>
<style lang="scss" scoped>
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
      color: #000;
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
      color: #000;
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
.el-input__wrapper {
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
  overflow:auto;
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
  height: 23%;
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
position:absolute;
right:0;
}
.fz {
    position: relative;
    display: inline-block;
      right: 19px;
      width: 35px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      color: #FFFFFF;
      background: #FE3A46;
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
body{
  color: #000;
}
</style>
