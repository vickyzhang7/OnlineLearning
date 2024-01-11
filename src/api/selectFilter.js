import request from '@/utils/request'
//获取最上面的地点、年级、上下册、学科、教材版本
export const getTopInfo = (info) => request.get(`/generation/params/${info}`)

//获取最上面的地点、年级、上下册、学科、教材版本
// export const getTopInfo = (info) => request.get(`/generation/params/${info}`)

//添加话题
export const addTopic = ({ parentName, topicName }) =>
    request.post('/topic/add', { parentName, topicName })

//获取话题
export const getTopic = () => request.get('/topic/list')

//获取学科所有题目类型（右上布局）
export const getProblemType = (subject) =>
    request.get('/problemType/list/' + subject)

//根据参数生成题目（点击开始生成按钮）
export const getCreate = (coverRange, description, difficulty, genre, grade, region, subject, textbook, timeRange, topicList, typeName) => {
    // console.log([coverRange, difficulty, genre, grade, region, subject, textbook, timeRange, topicList, typeName]);
    return request.post('/generation/create', { coverRange, description, difficulty, genre, grade, region, subject, textbook, timeRange, topicList, typeName })
}

//根据id获取生成状态
export const getGeneration = (id) =>
    request.get('/generation/status/' + id)

//根据id获取题目
export const getProblem = (id) =>
    request.get('/generation/problems/' + id)

//根据id获取题目，题干和选项分开
export const getProblemVO = (id) =>
    request.get('/generation/problem-vos/' + id)

//根据id取消生成
export const generateCancel = (generationId) =>
    request.post('/generation/cancel', generationId, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
//根据id重新生成
export const reGenerate = (generationId) =>
    request.post('/generation/regenerate', generationId, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
// 根据id获取题目信息
export const getInformation = (problemId) =>
request.post('/problem/get/'+ problemId,{
    headers: {
        'Content-Type': 'application/json'
    }})
// 根据id修改题目
export const reSetProblem = (body,problemId) =>
    request.put('/problem/update/'+ problemId,body, {
        headers: {
            'Content-Type': 'application/json'
        }})

// 根据id将用户选择的题目加入题库
export const addUserProblem = (generationId) =>
    request.post('/userProblem/add', generationId, {
        headers: {
            'Content-Type': 'application/json'
        }})

// 获取用户题库
export const getUserProblemList = () =>
    request.get('/userProblem/list/')

// 根据条件筛选用户题库
export const searchUserProblems = (params) =>
    request.post('/userProblem/search', params)

// 根据id从用户题库中删除
export const deleteProblem = (problemId) =>
    request.post('/userProblem/delete', problemId, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

// 获取用户的题集列表
export const getProblemSetList = () =>
    request.get('/problemSet/list')

// 创建题集
export const createProblemSet = (params) =>
    request.post('/problemSet/create', params)

// 根据seqNum获取用户题集
export const getUserProblemSet = (seqNum) =>
    request.get('/problemSet/list/' + seqNum)

// 根据seqNum打印用户题集
export const printUserProblemSet = (seqNum) =>
    request.get('/problemSet/print/' + seqNum)

// 将题目添加到用户题集
export const addProblemSetContent = (params) =>
    request.post('/problemSetContent/add', params)