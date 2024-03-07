<template>
  <div class="big-box">
    <div class="flex-box">
      <!--  -->
      <el-form
        :class="!props.select?'':'mgt-80'"
        :model="form"
        label-width="60px"
      >
        <el-form-item
          label="主 &nbsp;&nbsp; 题"
          style="margin-top: 5px; align-items: flex-end"
        >
          <el-select
            :popper-append-to-body="false"
            v-model="form.theme"
            class="name-ipt"
            placeholder="请输入文章主题，如:碳排放"
            size="large"
            filterable
            style="width: 540px"
          >
            <el-option
              v-for="item in props.theme"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="字 &nbsp;&nbsp; 数"
          v-if="!props.select"
        >
          <el-radio-group v-model="form.wordsNum">
            <el-radio label="1">100以下</el-radio>
            <el-radio label="2">100~200</el-radio>
            <el-radio label="3">200~300</el-radio>
            <el-radio label="4">300~400</el-radio>
            <el-radio label="5">400~600</el-radio>
            <el-radio label="6">600~800</el-radio>
            <el-radio label="7">800~1000</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="题 &nbsp;&nbsp; 干"
          v-if="!props.select"
        >
          <div class="flex-ipt-num">
            <span class="stem_style1"> 推断题 </span>
            <el-input-number
              v-model="type1"
              class="ipt-num"
              size="small"
              :min="0"
              :max="10"
              controls-position="right"
              @change="handleChange"
            />
          </div>
          <div class="flex-ipt-num">
            <span class="stem_style"> 细节题 </span>
            <el-input-number
              v-model="type2"
              class="ipt-num"
              size="small"
              :min="0"
              :max="10"
              controls-position="right"
              @change="handleChange"
            />
          </div>
          <div class="flex-ipt-num">
            <span class="stem_style"> 主旨题 </span>
            <el-input-number
              v-model="type3"
              class="ipt-num"
              size="small"
              :min="0"
              :max="10"
              controls-position="right"
              @change="handleChange"
            />
          </div>
          <div class="flex-ipt-num">
            <span class="stem_style"> 态度题 </span>
            <el-input-number
              v-model="type4"
              class="ipt-num"
              size="small"
              :min="0"
              :max="10"
              controls-position="right"
              @change="handleChange"
            />
          </div>
          <div class="flex-ipt-num">
            <span class="stem_style">猜词题</span>
            <el-input-number
              v-model="type5"
              class="ipt-num"
              size="small"
              :min="0"
              :max="10"
              controls-position="right"
              @change="handleChange"
            />
          </div>
        </el-form-item>
        <el-form-item
          label="文 &nbsp;&nbsp; 体"
          v-if="!props.select"
        >
          <el-radio-group
            v-model="form.writing"
            style="width: 610px"
          >
            <el-radio
              class="round"
              label="1"
              size="small"
            >记叙文</el-radio>
            <el-radio
              class="round"
              label="2"
              size="small"
            >议论文</el-radio>
            <el-radio
              class="round"
              label="3"
              size="small"
            >说明文</el-radio>
            <el-radio
              class="round"
              label="4"
              size="small"
            >应用文</el-radio>
            <el-radio
              class="round"
              label="5"
              size="small"
            >新闻</el-radio>
            <el-radio
              class="round"
              label="6"
              size="small"
            >广告</el-radio>
            <el-radio
              class="round"
              label="7"
              size="small"
            >信件</el-radio>
            <el-radio
              class="round"
              label="8"
              size="small"
            >操作说明</el-radio>
            <el-radio
              class="round"
              style="margin-right: 0"
              label="9"
              size="small"
            >通知</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生词率">
          <el-radio-group v-model="form.wordRate">
            <el-radio
              class="round"
              label="1"
              size="small"
            >0%</el-radio>
            <el-radio
              class="round"
              label="2"
              size="small"
            >1%</el-radio>
            <el-radio
              class="round"
              label="3"
              size="small"
            >2%</el-radio>
            <el-radio
              class="round"
              label="4"
              size="small"
            >3%</el-radio>
            <el-radio
              class="round"
              label="5"
              size="small"
            >4%</el-radio>
            <el-radio
              class="round"
              label="6"
              size="small"
            >5%</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="词 &nbsp;&nbsp;  汇">
          <el-radio-group v-model="form.vocabulary">
            <el-radio
              class="round"
              label="1"
              size="small"
            >同义复现</el-radio>
            <el-radio
              class="round"
              label="2"
              size="small"
            >反义复现</el-radio>
            <el-radio
              class="round"
              label="3"
              size="small"
            >形近辨析</el-radio>
            <el-radio
              class="round"
              label="4"
              size="small"
            >暂无要求</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <div class="bottom-box">
            <el-button
              class="buttonSet"
              @click="onSubmit"
            >开始生成</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps(["theme", "select"]);
const emit = defineEmits();
const form = ref({
  theme: null,
  wordsNum: null,
  writing: null,
  wordRate: null,
  vocabulary: true,
});
const type1 = ref("");
const type2 = ref("");
const type3 = ref("");
const type4 = ref("");
const type5 = ref("");
const onSubmit = () => {
  emit("submit");
};
</script>

<style lang="scss" scoped>
.stem_style {
  margin-left: 10px;
  margin-right: 5px;
  color: #4f4f4f;
  font-family: PingFang SC;
  font-size: 12px;
}

.stem_style1 {
  margin-right: 5px;
  color: #4f4f4f;
  font-family: PingFang SC;
  font-size: 12px;
}

:deep(.el-form) {
  border-radius: 16px;
  border: 1px solid #6666ff;
  padding: 4px 20px;
  .el-form-item__label {
  color: rgb(0, 0, 0) !important;
  margin-right: 15px !important;
  display: flex;
  justify-content: space-between  !important;
  font-weight: bold;
  }
  // 其他内部元素样式也要修改为 :deep()
  :deep(.el-form-item__label) {
    font-weight: bold;
    margin-right: 15px;
  }
  :deep(.el-form-item) {
    color: black;
    font-size: 12px;
    line-height: 16px;
    word-wrap: break-word;
    margin-right: 10px;
    /* Additional properties here */
    align-items: center; /* Retaining the original align-items property */
  }
}

// 修改其他样式的 ::v-deep 为 :deep()
:deep(.el-select) {
  --el-select-input-focus-border-color: none;
}
:deep(.el-input__wrapper) {
  box-shadow: none;
  background-color: rgba($color: #000000, $alpha: 0);
  border-radius: 0 !important;
}
:deep(.el-input__inner) {
  background-color: rgba($color: #000000, $alpha: 0);
}
:deep(.el-radio__input) {
  display: none;
}
:deep(.el-input-number.is-controls-right .el-input-number__decrease) {
  background: transparent;
  border: none;
  right: 1px;
  z-index: 1;
  bottom: 4px;
}
:deep(.el-input-number.is-controls-right .el-input-number__increase) {
  background: transparent;
  border: none;
  right: 1px;
  z-index: 1;
  top: 2px;
}
:deep(
    .el-input-number__decrease:hover
      ~ .el-input:not(.is-disabled)
      .el-input__wrapper
  ) {
  box-shadow: none !important;
}
:deep(.el-select:hover:not(.el-select--disabled) .el-input__wrapper) {
  box-shadow: none !important;
}
:deep(
    .el-input-number__increase:hover
      ~ .el-input:not(.is-disabled)
      .el-input__wrapper
  ) {
  box-shadow: none !important;
}
:deep(.el-radio__label) {
  padding-left: 0;
}
.big-box {
  margin-top: 50px; /* 与顶部的距离为10像素 */
  margin-left: 150px; /* 与左侧的距离为50像素 */
  width: 80%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  .name-ipt {
    background-color: none !important;
    border-bottom: 1px solid #000000 !important;
  }
  .flex-ipt-num {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 4px;
    font-size: 12px;
    height: 5px;
  }
  .round {
    min-width: 64px;
    height: 28px;
    font-size: 12px;
    border-radius: 15px;
    border: 0.5px solid #404040;
    display: flex;
    justify-content: center;
    margin-right: 4px;
    height: 25px;
  }
  .el-radio.el-radio--small .el-radio__label {
    font-size: 14px;
  }
  .ipt-num {
    border: 0.5px solid #404040;
    border-radius: 14px;
    width: 65px;
    height: 25px;
  }
  .mgt-80{
    margin-top: -80px;
  }
  .bottom-box {
    margin-top: -10px;
    margin-bottom: -10px;
    width: 100%;
    display: flex;
    justify-content: center;
    .buttonSet {
      background-color: #6666ff;
      color: #ffffff;
      height: 40px;
      width: 200px;
      border-radius: 16px;
    }
  }
}
</style>