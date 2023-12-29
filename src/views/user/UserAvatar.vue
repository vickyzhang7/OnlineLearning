<template>
  <div>
    u1
    <el-button @click="logoutHandle">登出</el-button>
    <el-button @click="isLoginHandle">检测是否登录成功</el-button>
  </div>
</template>

<script setup>
import { isLogin, userLogoutService } from "../../api/user.js";
import { useUserStore } from "@/stores";
const p = useUserStore();
const logoutHandle = async () => {
  await userLogoutService();
  p.removeToken();
};
const isLoginHandle = async () => {
  const res = await isLogin();
  console.log(res.data);
};
</script>

<style lang="scss" scoped></style>
