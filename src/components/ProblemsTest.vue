<template>
  <div>
    <el-select v-model="value" class="m-2" placeholder="Select" size="small">
      <el-option>1</el-option>
      <el-option>1</el-option>
      <el-option>1</el-option>
      <el-option>1</el-option>
    </el-select>
  </div>
</template>

<script setup>
import { ref } from "vue";
const value = ref();
</script>

<style lang="scss" scoped></style>
