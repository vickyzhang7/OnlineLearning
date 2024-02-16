<template>
  <slot>
    <div
        style="
          margin-top: 1vh;
          display: flex;
          align-items: center;
          line-height: 1.1vh;
          font-size: 0.9vw;
        "
      >
        <div>
          <el-icon @click="handleHidden" style="margin-left: 0.42vw;color: #070707 !important;"><CaretLeft /></el-icon>
        </div>
        <div style="font-weight: 600; margin-left: 0.2vw">生成参考</div>
        <div style="margin-left: 4.4vw; color: #979797" @click="resetCheck">重置</div>
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
        <div style="margin-right: 0.8vw; color: #6666ff" @click="isKnowledge" id="know">
          知识点生成
        </div>
        |
        <div style="margin-left: 0.9vw" id="text" @click="isText">教材生成</div>
      </div>
    <el-tree
      ref="treeRef"
      :data="data"
      show-checkbox
      node-key="$treeNodeId"
      :default-expanded-keys="[2, 3]"
      :default-checked-keys="[5]"
      :props="defaultProps"
      @check-change="getLeftChecked.handleCheckChange"
    />
  </slot>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElTree } from "element-plus";
import { getCheckedStore } from "@/stores";
import { getTopic } from "@/api/selectFilter";
const defaultProps = ref({
  children: "children",
  label: "name",
  disabled:'notLeaf'
});
const emit = defineEmits();
const data = ref([]);
const treeRef = ref();
const getLeft = async () => {
  const res = await getTopic();
  data.value = res.data.data;
  //渲染筛选生成界面左侧数据
  
};
const knowledge = ref(true);
const textbook = ref(false);
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
//左侧按图标收起
const handleHidden = () =>{
  emit('hiddenEventL')
}
onMounted(() => getLeft());
const getLeftChecked = getCheckedStore(); //引入仓库，要获得选中的值
//重置左侧选项
const resetCheck = () =>{
  getLeftChecked.resetChecked();
  treeRef.value.setCheckedKeys([], false); //setup语法糖不能用this.$ref，直接用就行
//重置不生效，还是有bug，待解决
}
</script>

<style lang="scss" scoped>
.m-checkbox {
  display: inline-block;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 1;
  overflow: auto;
  .m-checkbox-wrap {
    display: inline-block;
    .m-box {
      height: 100%;
      display: inline-flex; // 设置为flex布局后，所有的子元素都会变成行内块元素
      align-items: flex-start;
      cursor: pointer;
      &:hover {
        .u-checkbox {
          border-color: white;
        }
      }
      .u-checkbox {
        position: relative;
        /*
          如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小
          如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
        */
        flex-shrink: 0; // 默认 1.即空间不足时，项目将缩小
        margin-top: 3px;
        width: 16px;
        height: 16px;
        background: transparent;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        transition: all 0.3s;
        &::after {
          box-sizing: border-box;
          position: absolute;
          top: 50%;
          inset-inline-start: 21.5%;
          display: table;
          width: 5.7142857142857135px;
          height: 9.142857142857142px;
          border: 2px solid #fff;
          border-top: 0;
          border-inline-start: 0;
          transform: rotate(45deg) scale(0) translate(-50%, -50%);
          opacity: 0;
          content: "";
          transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
        }
      }
      .u-checkbox-checked {
        background-color: white;
        border-color: white;
        &::after {
          opacity: 1;
          transform: rotate(45deg) scale(1) translate(-50%, -50%);
          transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
        }
      }
      .indeterminate {
        &::after {
          top: 50%;
          left: 50%;
          width: 8px;
          height: 8px;
          background-color: white;
          border: 0;
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
      }
      .u-label {
        word-break: break-all;
        padding: 0 8px;
        font-size: 14px;
        line-height: 22px;
      }
    }
    .disabled {
      color: rgba(0, 0, 0, 0.25);
      cursor: not-allowed;
      &:hover {
        .u-checkbox {
          border-color: #d9d9d9;
        }
      }
      .u-checkbox {
        border-color: #d9d9d9;
        background-color: rgba(0, 0, 0, 0.04);
        &::after {
          border-color: rgba(0, 0, 0, 0.25);
          animation-name: none;
        }
      }
    }
  }
  .vertical {
    display: block;
  }
}
div.el-tree {
  font-size: 0.8vw;
}
.el-checkbox {
  --el-checkbox-checked-bg-color: #bdcefc;
  --el-checkbox-input-border-color-hover: #6666ff;
}
.el-checkbox__input.is-checked .el-checkbox__inner {
  border-color: #6666ff;
}
.el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
  background-color: #6666ff;
}
.el-checkbox__input.is-checked .el-checkbox__inner::after {
  border-color: #6666ff;
}
:root {
  --el-color-primary: #6666ff;
}
.el-tree {
  --el-tree-node-content-height: 2.8vh;
}
.el-checkbox__inner {
  background-color: transparent;
  border: 1px solid #6666f6;
}
</style>
