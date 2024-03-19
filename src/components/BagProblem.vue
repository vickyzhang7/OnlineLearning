<template>
    <div class="itemCon" :key="item.data.problemId">
      <div style="position: relative">
        <p style="margin-left: 1vw;margin-bottom: 1vh;" :id="'pQuestion' + index">{{ replaceBody(index, item.data.body) }}</p>
      </div>
      <div class="subProblem" v-if="item.data.subProblemList">
        <div v-for="(subItem, subIndex) in item.data.subProblemList" :key="subIndex">
          <p class="problem-p" style="margin-left: 1vw;" :id="'pSelect' + index + subIndex">{{ subItem.body }}</p>
          <div class="optionsCon">
            <p v-for="(optsubItem, optsubIndex) in subItem.options" :key="optsubIndex" style="margin-left: 1vw;" :id="'pSelect' + index + subIndex + optsubIndex">{{ optsubItem }}</p>
          </div>
        </div>
      </div>
      <div class="optionsCon" v-else>
        <p style="margin-left: 1vw;" class="options-item" v-for="(optItem, optIndex) in item.data.options" :key="optIndex" :id="'pSelect' + index + '_' + optIndex">{{ optItem }}</p>
      </div>
      <div class="item-btns">
        <el-button text class="btn1" @click="findError(index, item.data.subProblemList, item.data.options)">纠错</el-button>
        <el-button text class="btn2" @click="deleteProblems(item.data.problemId)">删除</el-button>
      </div>
      <div class="item-btns1" v-show='isError'>
        <el-button text class="btn11" @click="cancel(index, item.data.subProblemList, item.data.options)">取消</el-button>
        <el-button text class="btn21" @click="confirm(index, item.data.subProblemList, item.data.options, item.data.problemId)">确认</el-button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      item: Object,
      index: Number,
      isError: Boolean,
      replaceBody: Function,
      findError: Function,
      deleteProblems: Function,
      cancel: Function,
      confirm: Function
    }
  }
  </script>
  
  <style lang="scss" scoped>
.bagProblemSet {
  position: fixed;
  right: 1vw;
  width: 33vw;
  height: 80.46vh;
  top: 13vh;

  .problemTitle {
    background-color: white;
    width: 6.25vw;
    border-radius: 0.3vw 0.3vw 0vw 0vw;
  }

  .problemSet {
    background-color: white;
    height: 100%;
    border-radius: 0vw 1vw 1vw 1vw;
    overflow: scroll;
    padding: 0.5vw;

    .itemCon {
      color: black;
      margin-top: 2.5185vh;
      margin-bottom: 2vh;
      position: relative;
      // padding: 1vh;
      box-sizing: border-box;
      width: 30vw;

      &:hover {
        //鼠标悬浮到这个题的时候，才会显示
        border: 1px solid #6666f6;
        background-color: rgba(102, 102, 255, 0.1);

        .item-btns {
          display: block;

          .btn1 {
            color: #6666f6;
          }

          .btn2 {
            color: #6666f6;
          }
        }

        .item-btns1 {
          display: block;

          .btn11 {
            color: #6666f6;
          }

          .btn21 {
            color: #6666f6;
          }
        }
      }

      .item-btns {
        //当没有对准某个题时候，不显示这些按钮
        position: absolute;
        right: 0vw;
        top: -2.2vh;
        display: none;

        .btn1 {
          font-size: 0.835vw;
          height: 1.835vh;
          border-radius: 0;
        }

        .btn1:hover {
          background-color: #6666f6;
          color: #fff;
        }

        .btn2 {
          padding: 0;
          font-size: 0.835vw;
          height: 1.835vh;
          border-radius: 0;
        }

        .btn2:hover {
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

        .btn11:hover {
          background-color: #6666f6;
          color: #fff;
        }

        .btn21 {
          padding: 0;
          font-size: 0.835vw;
          height: 1.835vh;
          border-radius: 0;
        }

        .btn21:hover {
          background-color: #6666f6;
          color: #fff;
        }
      }
    }

    .iconSet {
      margin-right: 0.5vw;
    }

    .control {
      width: 100%;
      height: 4vh;
      background-color: #fff;
      border-radius: 10px;
      text-align: center;
      line-height: 4vh;
      position: sticky;
      bottom: 0vh;
      top: 79vh;

      right: 0vw;

      .set-other-btn1 {
        color: #fff;
        background-color: #6666ff;
        border-color: #6666ff;
        width: 7vw;
        height: 3.5vh;
      }

      .set-other-btn2 {
        color: #6666ff;
        background-color: #fff;
        border-color: #6666ff;
        width: 7vw;
        height: 3.5vh;
      }
    }
  }
}

.bagProblemSet :deep(.el-tabs__item.is-active) {
  color: #6666f6;
}

.bagProblemSet :deep(.el-tabs__item:hover) {
  color: #6666f6;
}

.bagProblemSet :deep(.el-tabs__active-bar) {
  background-color: #6666f6;
}


/* 111111111111111111111111111111111 */
/* 111111111111111111111111111111111 */
</style>
  