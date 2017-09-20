/**
 * Created by zhxg on 2017/7/28.
 */
import axios from 'axios'
// import {STATES} from '@/vuex/state'
// 基础接口地址
// dev版URL
// const URL = 'https://devnfh.nfapp.southcn.com/nfplus-vote-api/'
// 外网可访问的测试版URL
// const URL = 'https://testdangfei.nfapp.southcn.com/nfplus-vote-api/'
const URL = 'https://vote.nfapp.southcn.com/nfplus-vote-api/'
// https://vote.nfapp.southcn.com/nfplus-vote-api/vote/details?voteId=1
// 投票详情接口【城市】voteId=2
const DETAILS = 'vote/details'
const getDetails = (voteId = 2) => axios.get(URL + DETAILS, {
  params: {
    voteId: voteId
  }
}).then(res => {
  return res
})

// 选手搜索接口 【选手列表】无名次
// voteId=2 roundId=2 searchText=李四16 cityId=1
// type post
// 参数
// voteId 投票id
// roundId 回合id
// searchText 搜索的关键字
// cityId 城市id
const LIST = 'vote/option/list'
const getList = (pageNum, pageSize, voteId = 2, roundId = 2, searchText, cityId) => axios.get(URL + LIST,
  {
    params: {
      voteId: voteId,
      roundId: roundId,
      searchText: searchText,
      cityId: cityId,
      pageNum: pageNum,
      pageSize: pageSize
    }
  }).then(res => {
    return res
  })

const preList = 'vote/option/preList'
const getPreList = (pageNum, pageSize, voteId = 2, roundId = 2, searchText, cityId) => axios.get(URL + preList,
  {
    params: {
      voteId: voteId,
      roundId: roundId,
      searchText: searchText,
      cityId: cityId,
      pageNum: pageNum,
      pageSize: pageSize
    }
  }).then(res => {
    return res
  })
// const getList = (voteId = 2, roundId = 2, searchText, cityId) => axios.post(URL + LIST,
//   {
//     voteId: voteId,
//     roundId: roundId,
//     searchText: searchText,
//     cityId: cityId
//   },
//   {
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//   }).then(res => {
//     return res
//   })
// 选手前三名接口 【选手前三】顺序即是名次
// voteId=2 roundId=2
const TOP = 'vote/option/top3'
const getTop = (voteId = 2, roundId = 2) => axios.get(URL + TOP,
  {
    params: {
      voteId: voteId,
      roundId: roundId
    }
  }).then(res => {
    return res
  })

// 诗歌详情接口
const OPTIONDETAIL = 'vote/option/details'
// optionId=51 roundId=2
const getOption = (optionId = 51, roundId = 2) => axios.get(URL + OPTIONDETAIL,
  {
    params: {
      optionId: optionId,
      roundId: roundId
    }
  }).then(res => {
    return res
  })

// 诗歌列表接口
const OPTIONLIST = 'vote/option/list'
// pageNum=1 pageSize=10 voteId=2 roundId=2
const getOptionList = (pageNum = 1, pageSize = 10, voteId = 2, roundId = 2) => axios.get(URL + OPTIONLIST,
  {
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      voteId: voteId,
      roundId: roundId
    }
  }).then(res => {
    return res
  })
// 传参加密
const encryption = (codeJson) => {
  let jsonData = {
    'data': codeJson
  }
  let strData = JSON.stringify(jsonData)
  try {
    let sendData = window.SecrectActivity.requestParamesters(strData)
    sendData = JSON.parse(sendData)
    console.log(sendData)
    return sendData
  } catch (e) {
    console.log('请下载最新版本')
  }
}
// 投票接口
const VOTE = 'vote/option/ballot'

// optionId=41 voteId=2
const vote = (optionId, voteId) => axios.post(
    URL + VOTE,
    encryption({
      optionId: optionId,
      voteId: voteId
    }), {
      headers: {
        'Content-Type': 'application/JSON'
      }
    }).then(res => {
      return res
    })
export {
  getDetails,
  getList,
  getPreList,
  getTop,
  getOption,
  getOptionList,
  vote,
  axios
}

