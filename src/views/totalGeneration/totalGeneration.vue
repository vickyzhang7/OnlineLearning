<script setup>
import { ref } from 'vue'
  
  const value = ref(2)
</script>
<template>
    
         <el-rate
      v-model="value"
      disabled
      show-score
      text-color="#ff9900"
      score-template="{value} points"
    />
   
       
    
    <div>111</div>
</template>
<style lang="scss" scoped>

</style>

  
 