<template>
    <div class="bagProblemSet">
        <!-- 袋子题库标签 -->
        <el-button class="problemTitle" @click="generateData.handelBag()">
            <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M6.94618 8.72168L0.0660894 0.055015L13.8263 0.0550137L6.94618 8.72168Z" fill="#6666FF"/>
            </svg>
                 我的题库
        </el-button>
        <!-- 袋子题库 -->
        <div class="problemSet">
            <el-tabs  class="demo-tabs">
                <!-- 已有题目菜单对应的界面 -->
                <el-tab-pane label="已有题目" >
                    <div
                        class="itemCon"
                        v-for="(item, index) in generateData.userProblemList"
                        :key="item.data.problemId"
                        >
                        <div style="position: relative">
                            <!-- <el-checkbox style="position: absolute; top: -0.2vh" v-model="item.isSelet" /> -->
                            <!-- 试题集的问题 -->
                            <p style="margin-left: 1vw;">{{ replaceBody(index, item.data.body) }}</p>
                        </div>
                        <div class="optionsCon">
                            <!-- 试题集的选项 -->
                            <p style="margin-left: 1vw;" class="options-item" v-for="i in item.data.options" :key="i">{{ i }}</p> 

                        </div>
                        <div class="item-btns">
                            <el-button text class="btn1" @click="findError(index,item.subProblemList,item.options)">纠错</el-button> 
                            <el-button text class="btn2" @click="deleteProblems(item.data.problemId)">删除</el-button>
                        </div>
                        <div class="item-btns1" v-show='isError'>
                            <el-button text class="btn11" @click="cancel(index,item.subProblemList,item.options,item.problemId)">取消</el-button> 
                            <el-button text class="btn21" @click="confirm(index,item.subProblemList,item.options,item.problemId)">确认</el-button>
                        </div>
                    </div>

                </el-tab-pane>
                <el-tab-pane label="组成标准试卷">组成标准试卷</el-tab-pane>
                
            </el-tabs>
            <!-- 三个图标 -->
            <div style="position: absolute;top: 4.4vh;right: 1vw;display: flex;"> 
                <div class="iconSet">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="9" cy="9" r="8.5" fill="#D9D9D9" stroke="#6666FF"/>
                        <circle cx="12" cy="9" r="4" fill="#6666FF"/>
                    </svg>

                </div>
                <div class="iconSet">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="8" height="18" rx="2" fill="#D9D9D9"/>
                        <rect x="10" width="8" height="18" rx="2" fill="#6666FF"/>
                    </svg>

                </div>
                <div class="iconSet">
                    <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2.00391" width="18" height="18" fill="#D9D9D9"/>
                        <path d="M11.7786 8.04835L14.4971 1.50146L19.001 9.11892L11.7786 8.04835Z" fill="#6666FF"/>
                        <path d="M9.22922 9.45263L6.51073 15.9995L2.00686 8.38206L9.22922 9.45263Z" fill="#6666FF"/>
                    </svg>

                </div>
            </div>
            <div class="control">
                <div class="btns">
                    <el-button round class="set-other-btn2" @click="reGenerateHandle">直接封装</el-button>
                    <el-button round class="set-other-btn2" @click="goToPersonalTopic">进入题库</el-button>
                    <el-button round class="set-other-btn2" @click="cancleHandle">删除所有</el-button>
                </div>
            </div>
        </div>  
    </div>
    
</template>

<script setup>
import { useRouter } from 'vue-router';
import { getCheckedStore } from "@/stores";
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { deleteProblem } from "@/api/selectFilter";
const generateData = getCheckedStore();
const isError=ref(false)
const replaceBody = (index, body) => {
  // return index + 1 + "." + body.slice(3);
  return index + 1 + "." + body; //设置题库的试题集渲染格式

};
// 获取用户题集列表
const getList = () => {
  generateData.getUserProblems(); 
  //个人题库模块的右侧信息获取，与左侧试题集无关
};
onMounted(() => {
  getList();
  
});
//纠错（1.显示确认取消按钮 2.赋值获取原来数值3.实现可编辑）
const findError = (index,List,option) =>{//index:索引，List:选项分为1234和对应的abcd选项，option：选项只有abcd
  isError.value = true; //显示纠错按钮对应的确认按钮和取消按钮  
  //2.
  getText(index,List,option)
  //3.编辑功能
  judgeTopic(index,List,option,true)
};
//取消（1.隐藏确认取消按钮2.将所有的选项设为不可编辑3.刷新视图）
const cancel = (index,List,option,id) =>{
    //1.
    isError.value = false;
    //2.
    judgeTopic(index,List,option,false)
    //3.
    document.getElementById('pQuestion' + index).innerText = originalp1.value
    if(List){//当情况为1234和对应abcd时
      for (let subIndex = 0; subIndex < List.length; subIndex++) {
      document.getElementById('pSelect' + index + subIndex).innerText = originalp2.value[subIndex]  //1234那些问题选项原始内容
      
        if(List[subIndex].options){
          //嵌套for循环，因为每个1234小问题中又有abcd选项
            for (let i = 0; i < List[subIndex].options.length; i++) {
                document.getElementById('pSelect' + index + subIndex + i).innerText = originalp3.value[i]  //1234小问题中的abcd选项内容
            } 
        }
      }
      
    }
    if(option){//当情况为仅有abcd时
      for (let opt = 0; opt < option.length; opt++) {
        // console.log('111',opt,originalp4.value[opt])
        document.getElementById('pSelect' + index + '_' + opt).innerText = originalp4.value[opt] //仅有abcd选项
      }
    }
}
//确认（1.隐藏确认取消按钮2.将所有的选项设为不可编辑3.向后端发送修改数据的请求4.更新试图5.纠错成功弹窗）
const confirm = async(index,List,option,problemId) =>{
  //1.
  isError.value = false;
  document.getElementById('pQuestion' + index).contentEditable = false;
  //2.
  judgeTopic(index,List,option,false)
  //3.向后端发起请求，修改ID数组内容，需要传参数，ID为参数
    //获取body信息
    
    bodyP1.value = document.getElementById('pQuestion' + index).innerText.slice(2)
    bodyP.value = bodyP1.value

    if(List){//当情况为1234和对应abcd时
      for (let subIndex = 0; subIndex < List.length; subIndex++) {
      bodyP2.value[subIndex] = document.getElementById('pSelect' + index + subIndex).innerText   //1234那些问题选项原始内容
      bodyP.value = bodyP.value + bodyP2.value[subIndex]+'\n' //累加
        if(List[subIndex].options){
          //嵌套for循环，因为每个1234小问题中又有abcd选项
            for (let i = 0; i < List[subIndex].options.length; i++) {
                bodyP3.value[i]= document.getElementById('pSelect' + index + subIndex + i).innerText  //1234小问题中的abcd选项内容
                bodyP.value = bodyP.value + bodyP3.value[i]
            } 
            
        }
        
      }
    }
    if(option){//当情况为仅有abcd时
      for (let opt = 0; opt < option.length; opt++) {
        // console.log('111',opt,originalp4.value[opt])
        bodyP4.value[opt] =document.getElementById('pSelect' + index + '_' + opt).innerText//仅有abcd选项
        bodyP.value = bodyP.value + bodyP4.value[opt]
      }
      
    }
    const body = bodyP.value.replace(/\\"/g, '') //纠错后加入题库的格式，没有起到效果，依然存在引号
    console.log('body是',body)
    //发送请求
    const res = await reSetProblem(body,problemId)
    console.log('res:',res)
  //4.刷新视图数据，实现双向绑定
  document.getElementById('pQuestion' + index).innerText = index + 1 + "." + bodyP1.value
    if(List){//当情况为1234和对应abcd时
      for (let subIndex = 0; subIndex < List.length; subIndex++) {
      document.getElementById('pSelect' + index + subIndex).innerText = bodyP2.value[subIndex]  //1234那些问题选项原始内容
      
        if(List[subIndex].options){
          //嵌套for循环，因为每个1234小问题中又有abcd选项
            for (let i = 0; i < List[subIndex].options.length; i++) {
                document.getElementById('pSelect' + index + subIndex + i).innerText = bodyP3.value[i]  //1234小问题中的abcd选项内容
            } 
        }
      }
      
    }
    if(option){//当情况为仅有abcd时
      for (let opt = 0; opt < option.length; opt++) {
        // console.log('111',opt,originalp4.value[opt])
        document.getElementById('pSelect' + index + '_' + opt).innerText = bodyP4.value[opt] //仅有abcd选项
      }
    }
  //5.
  ElMessage.success(`${res.data.data}`)
}
const router = useRouter()
const goToPersonalTopic = ()=>{
    router.push('/personalTopic')// 进入题库
}
// 批量删除
const deleteProblems = async(index) => {
  try {
      const res = await deleteProblem(index);
      console.log(res.data);
      ElMessage.success("删除成功！");
      generateData.getUserProblems();
    
  } catch (error) {
    ElMessage.error("删除失败！", error);
  } 
};
</script>

<style lang="scss" scoped>
.bagProblemSet {
    position: fixed;
    right: 1vw;    
    width: 33vw;
    height: 80.46vh;
    top: 13vh;
    .problemTitle{
        
        background-color: white;
        width: 6.25vw;
        border-radius: 0.3vw 0.3vw 0vw 0vw;
    }
    .problemSet{
        background-color: white;
        height: 100%;
        border-radius: 0vw 1vw 1vw 1vw;
        .itemCon {
            margin-top: 2.5185vh;    
            margin-bottom: 2vh;       
            position: relative;
            // padding: 1vh;
            box-sizing: border-box;
            width: 30vw;
            &:hover {//鼠标悬浮到这个题的时候，才会显示
            border: 1px solid #6666f6;
            background-color: rgba(102, 102, 255, 0.1);
            .item-btns {
                display: block;
                .btn1{
                color: #6666f6;
                }
                .btn2{
                color: #6666f6;
                }
            }
            .item-btns1{
                display: block;
                .btn11{
                color: #6666f6;
                }
                .btn21{
                color: #6666f6;
                }
            }
            }
        .item-btns {//当没有对准某个题时候，不显示这些按钮
        position: absolute;
        right: 0vw;
        top: -2.2vh;
        display: none;
        .btn1 {
            font-size: 0.835vw;
            height: 1.835vh;
            border-radius: 0;
        }
        .btn1:hover{
            background-color: #6666f6;
            color: #fff;
        }
        .btn2 {
            padding: 0;
            font-size: 0.835vw;
            height: 1.835vh;
            border-radius: 0;
        }
        .btn2:hover{
            background-color: #6666f6;
            color: #fff;
        }
        }
        .item-btns1 {
        position: absolute;
        right: 0vw;
        bottom: 0vh;
        display: none;
        .btn11 {
            font-size: 0.835vw;
            height: 1.835vh;
            border-radius: 0;
        }
        .btn11:hover{
            background-color: #6666f6;
            color: #fff;
        }
        .btn21 {
            padding: 0;
            font-size: 0.835vw;
            height: 1.835vh;
            border-radius: 0;
        }
        .btn21:hover{
            background-color: #6666f6;
            color: #fff;
        }
        }
    }
       .iconSet{
        margin-right: 0.5vw;
       }
       .control {
            width: 100%;
            height: 4vh;
            background-color: #fff;
            border-radius: 10px;
            text-align: center;
            line-height: 6.5vh;
            position: absolute;
            bottom: 0vh;
            margin-bottom: 0;
            padding-bottom: 0;
            right:0vw;
            .set-other-btn2 {
            color: #6666ff;
            background-color: #fff;
            border-color: #6666ff;
            width: 10vw;
            height: 3.5vh;
            }
        }
    }
}
</style>