<script setup>
import { ref } from 'vue'
  const value = ref(3)
</script>
<template>
    
        
    <el-rate
    v-model="value"
    disabled
    show-score
    text-color="#ff9900"
    score-template="{value} points"
  />
       
    
    <div style="background-image: linear-gradient(red, blue); width: 10vw;height:10vh">111</div>
</template>
<style lang="scss" scoped>

</style>

  
 