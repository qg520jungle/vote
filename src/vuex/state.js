import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const STATES = new Vuex.Store({
  state: {
    // index page
    showListState: true,
    // 弹出框弹出
    ispopshow: false,
    isloading: false,
    // 弹出框弹出
    istipsshow: false,
    isupshow: true,
    // 第几轮 信息
    round: 0,
    roundId: 0,
    voteId: 1,
    counter: 2,
    // 所有选手的信息
    allList: [],
    // 搜索的结果
    searchList: [],
    // 城市列表
    cityList: []
  },
  getters: {
    getIstips: state => {
      return state.istipsshow
    },
    getIsLoading: state => {
      return state.isloading
    },
    getRound: state => {
      return state.round
    },
    getRoundId: state => {
      return state.roundId
    },
    getVoteId: state => {
      return state.voteId
    },
    getCounter: state => {
      return state.counter
    },
    getList: state => {
      return state.allList
    },
    getSearchList: state => {
      return state.searchList
    },
    getCityList: state => {
      return state.cityList
    }
  },
  mutations: {
    changeTab (state, tabNum) {
      if (tabNum.num >= 0) {
        state.aboutTabIndex = tabNum.num
      } else {
        state.aboutTabIndex = 0
        console.log('error')
      }
    },
    setIstips (state, flag) {
      state.istipsshow = flag
    },
    setIsLoading (state, flag) {
      state.isloading = flag
    },
    setCounter (state, c) {
      state.counter = c
    },
    setIsUp (state, c) {
      state.isupshow = c
    },
    hideList (state) {
      state.showListState = false
    },
    showList (state) {
      state.showListState = true
    },
    hidePopup (state) {
      state.ispopshow = false
    },
    showPopup (state) {
      state.ispopshow = true
    },
    hideTips (state) {
      state.istipsshow = false
    },
    showTips (state) {
      state.istipsshow = true
    },
    setRound (state, r) {
      r = r || 0
      state.round = r
    },
    setRoundId (state, id) {
      id = id || 0
      state.roundId = id
    },
    setVoteId (state, id) {
      id = id || 0
      state.voteId = id
    },
    setList (state, list) {
      list = list || []
      state.allList = list
    },
    reloadList (state, sur) {
      sur = sur || []
      let allList = state.allList
      state.allList = allList.concat(sur)
    },
    reSetList (state, item) {
      for (let el of state.allList) {
        if (el.optionId === item.optionId) {
          el.nums = item.nums
        }
      }
    },
    setSearchList (state, list) {
      list = list || []
      state.searchList = list
    },
    reSetSearchList (state, item) {
      for (let el of state.searchList) {
        if (el.optionId === item.optionId) {
          el.nums = item.nums
        }
      }
    },
    setCityList (state, list) {
      list = list || []
      state.cityList = list
    },
    resetCityList (state, index) {
      index = index || 0
      let tabList = state.cityList
      for (let i in tabList) {
        tabList[i].act = false
      }
      tabList[index].act = true
      state.cityList = tabList
    }
  }
})

export default STATES
