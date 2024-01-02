import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { getCreate, getGeneration, getProblem, generateCancel, getProblemVO, reGenerate, addUserProblem, getUserProblemList, getProblemSetList, searchUserProblems, getUserProblemSet, printUserProblemSet } from '@/api/selectFilter.js'

export const getCheckedStore = defineStore('getChecked', () => {
  const checkedArr = ref([])//左侧选中的数组  对应接口参数topicList
  const checkedArr1 = ref([])//右上侧选中的数组
  const checkedArrTotal = ref([])//左侧和右上合并后的总数据
  const problems = ref([])
  const problemsAnalysis = ref([])
  const isShow = ref(true)
  const isLoading = ref(false)
  const dialogVisible = ref(false)
  // 所有生成题目的集合，数据结构:
  // [
  //   {
  //     title: 生成的页面名字（根据题型来定）,
  //     generateId, 生成的id,通过这个id来查询状态,也可以根据这个id来判定是哪个页面
  //     status, 状态，通过generateId来查的 
  //     interval, 存放的短轮训器的值，取消的话直接可以remove
  //     data:[] 存放返回来的数据，如果失败就是null，初始化为null吧（暂时这样）
  //   }
  // ]
  const totalGenerationProblem = ref([])
  // 计数当前同步生成的页面
  let count = 0
  // 当前应该显示的生成页面
  const currentItem = ref(0)
  // 用户题集
  const problemSet = ref([])
  // 用户题集列表
  const problemSetList = ref([])
  // 用户题库
  const userProblemList = ref([])
  // 当前生成的id
  const generateId = ref()
  //最上排的参数获取
  const checkedTop = ref({
    region: '',
    grade: 0,
    genre: '',
    subject: '',
    textbook: ''
  })
  //筛选界面左侧布局的仓库(获得选中的数组)
  const handleCheckChange = (node, checkedNodes) => {
    // console.log(node, checkedNodes); 获得左侧选择了的值，并装入checkedArr数组（node是选择项信息，checkedNodes是是否选中的意思）
    if (checkedNodes === true) {
      checkedArr.value.push(node.name)
    } else {
      if (checkedArr.value.includes(node.name)) {
        const index = checkedArr.value.indexOf(node.name)
        if (index !== -1) {
          checkedArr.value.splice(index, 1);
        }
      }
      return
    }
  }
  //重置左侧选项
  const resetChecked = () => {
    checkedArr.value = []
  }
  //筛选界面右上侧布局的仓库（获得选中的数组）
  //右下需要再搜索按钮设置一个点击事件触发一个函数 
  const getChecked = async (question, questionType, difficulty, time, scope) => {
    /*  await refValue.validate()
     checkedArr1.value.push(formValue)
     console.log(checkedArr1.value) */
    /* if(checkedArr1.value){
      for(var key in checkedArr1.value){
        delete checkedArr1.value[key]
        console.log(key)
      }
    }
       checkedArr1.value = form
       console.log(checkedArr1.value)
     */
    checkedArr1.value[0] = question ? question : null //题型大类
    checkedArr1.value[1] = questionType ? questionType : null //具体题型
    checkedArr1.value[2] = difficulty ? difficulty : null
    checkedArr1.value[3] = time ? time : null
    checkedArr1.value[4] = scope ? scope : null
    console.log(checkedArr1.value)

  }

  //筛选界面右下侧布局的仓库（将左侧和右上侧数组连成一个）

  //获取最上面的地点、年级、上下册、学科、教材版本
  const getRegion = (regionV) => {//地区
    checkedTop.value.region = regionV
  }
  const getGrade = (gradeV) => {//年级[1,12]
    checkedTop.value.grade = gradeV
  }
  const getGenre = (genreV) => {//上下册
    checkedTop.value.genre = genreV
  }
  const getSubject = (subjectV) => {//学科
    checkedTop.value.subject = subjectV
  }
  const getTextbook = (textbookV) => {//教材版本
    checkedTop.value.textbook = textbookV
  }
  //生成按钮后的弹窗是否显示设置
  const setDialogVisibleFlase = () => {
    dialogVisible.value = false
  }

  const handleClose = (tag) => {
    checkedArr.value.splice(checkedArr.value.indexOf(tag), 1)
    //再加个重新渲染左侧选项的代码 
    //针对tag和左侧数据的操作
  }
  const handleClose1 = (tag) => {
    checkedArr.value.splice(checkedArr.value.indexOf(tag), 1)
    //再加个重新渲染左侧选项的代码 
    //针对tag和左侧数据的操作
  }
  const getTotal = () => {
    checkedArrTotal.value = checkedArr.value.concat(checkedArr1.value)
    console.log(checkedArrTotal.value)
  }
  // 生成
  const generateClick = async (description) => {
    if (checkedArr1.value[1] === null ||checkedArr1.value.length === 0 || checkedTop.value.region === '' || checkedTop.value.grade === 0 || checkedTop.value.genre === '' || checkedTop.value.subject === '' || checkedTop.value.textbook === '') {
      //去校验top表单
      // console.log('打印：',checkedTop.value.region ==='',checkedTop.value.grade === 0,checkedTop.value.genre,checkedTop.value.subject === '',checkedTop.value.textbook === '')
      ElMessage.warning('请完成上侧基础筛选')
    } else {//发起请求，开始生成
      if (count >= 5) {
        ElMessage.warning('最多同时生成五个页面！')
        return
      }
      count++
      isLoading.value = true
      // console.log("教材版本" + checkedTop.value.textbook)
      const arr = checkedArr1.value;
      let item
      // console.log('arr:', arr);
      // console.log([arr[4], description, arr[2], arr[0], checkedTop.value.grade, checkedTop.value.region, checkedTop.value.subject, checkedTop.value.textbook, arr[2], checkedArr.value, arr[1]]);
      try {
        const res = await getCreate(arr[4], description, arr[2], arr[0], checkedTop.value.grade, checkedTop.value.region, checkedTop.value.subject, checkedTop.value.textbook, arr[3], checkedArr.value ? checkedArr.value : null, arr[1])
        item = count - 1
        totalGenerationProblem.value[item] = {
          generateId: res.data.data,
          status: 'ACTIVE',
          title: `${arr[1]}页面`,
          // 先初始化为空吧
          dataVO: null,
          dataAnalysis: null,
          interval: null
        }
        setTimeout(() => {
          dialogVisible.value = true;
        }, 3000)
      } catch (error) {
        isLoading.value = false
        ElMessage.error('生成题目失败！')
        count--
      }// console.log(res.data.data)

      currentItem.value = item
      totalGenerationProblem.value[item].interval = setInterval(async () => {
        try {
          const r = await getGeneration(totalGenerationProblem.value[item].generateId)
          totalGenerationProblem.value[item].status = r.data.data

          if (r.data.data === 'FINISHED') {
            clearInterval(totalGenerationProblem.value[item].interval)
            const problem = await getProblemVO(totalGenerationProblem.value[item].generateId)
            const analysis = await getProblem(totalGenerationProblem.value[item].generateId)

            // 测试，用后即删
            // const problem = await getProblemVO(68)
            // const analysis = await getProblem(68)
            // console.log('这是problem', problem.data.data);
            // console.log('这是analysis', problem.data.data);

            totalGenerationProblem.value[item].dataVO = problem.data.data
            totalGenerationProblem.value[item].dataAnalysis = analysis.data.data
            console.log(totalGenerationProblem.value[item]);
            
            isShow.value = false
            isLoading.value = false
          } else if (r.data.data === 'FAILED') {
            // 失败了
            isLoading.value = false
            clearInterval(totalGenerationProblem.value[0].interval)
          }
        } catch (error) {
          clearInterval(totalGenerationProblem.value[0].interval)
          ElMessage.error('获取题目生成状态失败！')
        }

      }, 10000);
    }

  }
  // 取消生成
  const generateProblemCancel = async () => {
    clearInterval(totalGenerationProblem.value[currentItem.value].interval)
    const res = await generateCancel(totalGenerationProblem.value[currentItem.value].generateId)
    ElMessage.success('取消生成成功！')
    console.log(res);
    isLoading.value = false
    isShow.value = true
    count--
  }

  // 重新生成
  const regenerate = async () => {
    isLoading.value = true
    isShow.value = true
    try {
      const res = await reGenerate(totalGenerationProblem.value[currentItem.value].generateId)
      console.log('重新生成结果:', res)

      const interval = setInterval(async () => {
        try {
          const r = await getGeneration(totalGenerationProblem.value[currentItem.value].generateId)
          console.log(r.data.data);
          if (r.data.data === 'FINISHED') {
            clearInterval(interval)

            const problem = await getProblemVO(totalGenerationProblem.value[currentItem.value].generateId)
            const analysis = await getProblem(totalGenerationProblem.value[currentItem.value].generateId)
            problems.value = problem.data.data
            problemsAnalysis.value = analysis.data.data
            isLoading.value = false
            isShow.value = false
          } else if (r.data.data === 'FAILED') {
            // 失败了
            ElMessage.error('生成题目失败！')
            isLoading.value = false
            clearInterval(interval)
          }
        } catch (error) {
          clearInterval(interval)
          ElMessage.error('获取题目生成状态失败！')
        }

      }, 10000);
    } catch (error) {
      ElMessage.error('重新生成失败！')
      isLoading.value = false
      isShow.value = false
    }
    // console.log(res);
  }

  // 将用户选中的题目加入题库
  const addUserProblems = async (id) => {
    try {
      const res = await addUserProblem(id)
      if (res.data.data === '添加成功') {
        ElMessage.success('添加题库成功！')
      }
    } catch (error) {
      ElMessage.error('添加题库失败！')
    }
  }

  // 获取用户题库
  const getUserProblems = async () => {
    try {
      const res = await getUserProblemList()
      userProblemList.value = res.data.data
      // 处理数据，将数据改为 [{isSelet: false, data: xxx}, {isSelet: false, data: xxx},...]
      let len = userProblemList.value.length
      for (let i = 0; i < len; i++) {
        userProblemList.value[i] = { isSelet: false, data: userProblemList.value[i] }
      }

    } catch (error) {
      ElMessage.error('获取题库失败！')
    }
  }

  // 根据条件筛选用户题库
  const getSearchUserProblems = async (params) => {
    const res = await searchUserProblems(params)
    userProblemList.value = res.data.data
    let len = userProblemList.value.length
    for (let i = 0; i < len; i++) {
      userProblemList.value[i] = { isSelet: false, data: userProblemList.value[i] }
    }
    console.log(userProblemList.value);
  }

  // 获取用户的题集列表,并且获取题集（个人题库的右侧题集，与左侧试题集没有关系）
  const getUserProblemSetList = async () => {
    const res = await getProblemSetList()
    problemSetList.value = res.data.data
    problemSet.value = []
    problemSetList.value.forEach(async (item) => {
      // console.log(item);
      const r = await getUserProblemSet(item.seqNum)
      problemSet.value.push(r.data.data)
      console.log('用户题集', r.data);
    })
    console.log('用户的题集列表:', problemSetList.value);
    console.log('用户题集:', problemSet.value);
  }



  return {
    checkedArr,
    checkedArr1,
    checkedArrTotal,
    checkedTop,
    problems,
    problemsAnalysis,
    isShow,
    isLoading,
    userProblemList,
    problemSetList,
    searchUserProblems,
    problemSet,
    totalGenerationProblem,
    currentItem,
    dialogVisible,
    getUserProblemSetList,
    getSearchUserProblems,
    regenerate,
    getRegion,
    getGrade,
    getGenre,
    getSubject,
    getTextbook,
    handleCheckChange,
    getChecked,
    handleClose,
    handleClose1,
    getTotal,
    generateClick,
    generateProblemCancel,
    addUserProblems,
    getUserProblems,
    setDialogVisibleFlase,
    resetChecked
  }
})
