<script setup>
import { ref, onMounted } from "vue";
import { getProblemType, getTopInfo } from "@/api/selectFilter";
import { getCheckedStore } from "@/stores";

const emit = defineEmits();
const form = ref({
  question: "",
  difficulty: "",
  time: "",
  scope: "",
});
const form2 = ref({
  questionType: "",
});
const rules2 = {
  questionType: [{ required: true, message: "请选择题目具体类型", trigger: "change" }],
};
// 考核范围
const rangeData = ref([]);
const formRef = ref();
const ProblemTypeData = ref();
const rules = {
  question: [{ required: true, message: "请选择题目类型", trigger: "change" }],
  difficulty: [{ required: true, message: "请选择难度", trigger: "change" }],
  time: [{ required: true, message: "请选择完成时间", trigger: "change" }],
  scope: [{ required: true, message: "请选择考核范围", trigger: "change" }],
};
const getRightChecked = getCheckedStore();
const getCheckedL = async () => {
  // console.log(form.value.time.split(",").map((i) => +i));
  await formRef.value.validate();
  // console.log(checkedArr11.value);
  getRightChecked.getChecked(
    form.value.question,
    form2.value.questionType,
    form.value.difficulty,
    form.value.time.split(",").map((i) => +i),
    form.value.scope
  );
};

const getSubject = async () => {
  const res = await getProblemType("English"); //目前只有英语选项，等后面有其他学科了再获取subject值
  const res1 = await getTopInfo("range");
  // console.log(res1.data.data);
  rangeData.value = res1.data.data;
  ProblemTypeData.value = res.data.data;
  // console.log(ProblemTypeData.value);
};
const handleHidden = () => {
  emit("hiddenEvent");
};
onMounted(() => getSubject());
</script>

<template>
  <slot>
    <div
      style="
        padding-top: 1vh;
        padding-bottom: 1vh;
        display: flex;
        align-items: center;
        line-height: 1.1vh;
        font-size: 0.9vw;
      "
    >
      <div>
        <el-icon @click="handleHidden" style="margin-left: 0.42vw"><CaretLeft /></el-icon>
      </div>
      <div style="font-weight: 600; margin-left: 0.2vw">基础筛选</div>
    </div>
    <el-form :model="form" :rules="rules" ref="formRef" @change="getCheckedL">
      <el-form-item prop="question" label="题型类型：">
        <el-radio-group v-model="form.question">
          <!-- {{ item.genre }} -->
          <el-radio v-for="item in ProblemTypeData" :key="item.value" :label="item.genre">
            <el-popover
              placement="bottom"
              trigger="click"
              width="auto"
              popper-class="popoverStyle"
            >
              <template #reference> {{ item.genre }}</template>
              <el-form :model="form2" :rules="rules2">
                <el-radio-group v-model="form2.questionType">
                  <el-radio
                    v-for="i in item.typeNameList"
                    :key="i.value"
                    :label="i"
                    @change="getCheckedL"
                  >
                    {{ i }}
                  </el-radio>
                </el-radio-group></el-form
              >
            </el-popover>
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="difficulty" label="难度选择：">
        <el-radio-group v-model="form.difficulty">
          <el-radio-group label="0">不限</el-radio-group>
          <el-radio label="1">容易</el-radio>
          <el-radio label="2">较易</el-radio>
          <el-radio label="3">适中</el-radio>
          <el-radio label="4">较难</el-radio>
          <el-radio label="5">困难</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="time" label="完成时间：">
        <el-radio-group v-model="form.time">
          <el-radio :label="'1, 3'">1~3分钟</el-radio>
          <el-radio :label="'3, 5'">3~5分钟</el-radio>
          <el-radio :label="'5, 10'">5~10分钟</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="scope" label="考核范围：">
        <el-radio-group v-model="form.scope">
          <el-radio v-for="item in rangeData" :key="item.value" :label="item.value">{{
            item.label
          }}</el-radio>
          <!-- <el-radio label="期末考核" />
          <el-radio label="期中考核" />
          <el-radio label="课堂检测" />
          <el-radio label="单元测试" />
          <el-radio label="小升初考试" />
          <el-radio label="中考" />
          <el-radio label="高考" />
          <el-radio label="一模" />
          <el-radio label="二模" />
          <el-radio label="三模" /> -->
        </el-radio-group>
      </el-form-item>
    </el-form>
  </slot>
</template>

<style lang="scss">
.el-radio__inner {
  display: none;
}
.el-form-item {
  margin-bottom: 0px;
  margin-left: 1.52vw;
}
.el-form-item__label {
  font-size: 0.9vw;
  color: #000000;
}
.el-radio__label {
  font-size: 0.9vw;
  color: #000000;
}
.el-form-item__error {
  top: 80%;
}
.el-popover.popoverStyle {
  //   height: 1vh;
  padding-top: 0;
  padding-bottom: 0;
  margin: 0;
}
</style>
