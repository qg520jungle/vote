<template>
  <div class="m-index">
    <div class="m-overview">
      <div class="u-deadline">
        <i class="u-icon u-icon-tan"></i>
        <span class="c" v-if="!isstart">距离第{{ round }}轮投票开始，还有{{ startline }}天</span>
        <span class="c" v-else-if="isend > 0">距离第{{ round }}轮投票结束，还有{{ deadline }}天</span>
        <span class="c" v-else-if="isend < 0">投票已结束</span>
        <span class="c" v-else></span>
      </div>
      <div class="m-btn-box">
        <vbtn class="u-numbers" :msg="btn1" @click.native="popup('information')"></vbtn>
        <vbtn class="u-numbers" :msg="'候选人数' + btn2 + '人'" ></vbtn>
        <vbtn class="u-numbers" v-show="!isround1" :msg="btn3" @click.native="toPreRound"></vbtn>
      </div>
    </div>
    <transition-group name="goswitch">
      <div class="m-showlist" v-show="islist" key="list">
        <showplayerlist ref="list" v-on:listenToPlayerlist="getlistpop"></showplayerlist>
      </div>
    </transition-group>
    <popup v-show="ispopshow">
      <component v-bind:is="currentView" v-on:listenToTips="gettipspop" :tipsMsg="msg" :poem="poemCnt"></component>
    </popup>
  </div>
</template>

<script>
import {STATES} from '@/vuex/state'
import vbtn from '@/components/public/btn'
import vtab from '@/components/tab/tab'
import showplayerlist from './showplayerlist'
import popup from '@/components/popup/popup'
import poem from '@/components/popup/poem'
import tips from '@/components/popup/tips'
import information from '@/components/popup/information'
import { getDetails, vote, getOptionList } from '@/plugins/getData'

const handleDate = (date) => {
  date = date.replace(/-/g, '/')
  let _date = new Date(date)
  return _date
}
export default {
  name: 'index',
  data () {
    return {
      title: '投票主页',
      deadline: 0,
      startline: 0,
      round: 0,
      isend: 0,
      isstart: 0,
      btn1: '活动详情',
      btn2: ' 312',
      btn3: '查看上一轮排名',
      exbtn2: '投票',
      currentView: 'tips',
      msg: {
        code: 0,
        title: '成功',
        msg: '已经为他增加荣誉票数'
      },
      poemCnt: {},
      isround1: false
    }
  },
  computed: {
    islist () {
      return STATES.state.showListState
    },
    ispopshow () {
      return STATES.state.ispopshow
    }
    // currentView () {
    //   STATES.state.ispopshow ? poem : information
    // }
  },
  mounted () {
    window.resetShareUrl('')
    this.initData()
  },
  methods: {
    showlist () {
      STATES.commit('hideList')
    },
    popup (info) {
      this.currentView = info
      let flag = info === 'tips'
      STATES.commit('setIstips', flag)
      STATES.commit('showPopup')
    },
    getlistpop (data) {
      this.currentView = data.type
      let flag = data.type === 'tips'
      STATES.commit('setIstips', flag)
      this.msg = data.msg || ''
      this.poemCnt = data
    },
    getdetailpop (data) {
      this.currentView = data.type
      let flag = data.type === 'tips'
      STATES.commit('setIstips', flag)
    },
    gettipspop (r) {
      let voteId = STATES.getters.getVoteId
      let that = this
      // let obj = encryption({
      //   optionId: r.msg.optionId,
      //   voteId: voteId
      // })
      vote(r.msg.optionId, voteId).then(res => {
        if (res.data.code === 200) {
          let newData = res.data.data
          let newObj = {
            name: newData.title || '',
            actor: newData.author || '',
            addrs: newData.city ? newData.city.areaName : '',
            nums: newData.tickets ? newData.tickets.voteCount : '',
            id: newData.tickets ? newData.tickets.id : '',
            optionId: newData.tickets ? newData.tickets.optionId : ''
          }
          STATES.commit('reSetList', newObj)
          STATES.commit('reSetSearchList', newObj)
          let obj = {
            code: 0,
            msg: ''
          }
          that.msg = obj
          that.currentView = r.data
          let flag = r.data === 'tips'
          STATES.commit('setIstips', flag)
        } else {
          let obj = {
            code: 1,
            msg: res.data.msg
          }
          that.msg = obj
          that.currentView = r.data
          let flag = r.data === 'tips'
          STATES.commit('setIstips', flag)
        }
      })
    },
    findSpace (now, arrRound) {
      let obj = STATES.getters.getSpace
      // let flag = false
      now = handleDate(now)
      for (let i = 1; i < arrRound.length; i++) {
        // let end2 = handleDate(arrRound[i].endTime)
        let start2 = handleDate(arrRound[i].startTime)
        let end1 = handleDate(arrRound[i - 1].endTime)
        // let start1 = handleDate(arrRound[i - 1].startTime)
        if (now.getTime() >= end1.getTime() && now.getTime() <= start2.getTime()) {
          obj = {
            isSpace: true,
            preRound: i,
            nextRound: i + 1,
            startTime: (start2.getMonth() + 1) + '月' + start2.getDate() + '日'
          }
          break
        }
      }
      STATES.commit('setSpace', obj)
    },
    findRound (now, arrRound, round) {
      let flag = false
      let r = parseInt(round)
      let start1 = handleDate(arrRound[r - 1].startTime)
      let end1 = handleDate(arrRound[r - 1].endTime)
      now = handleDate(now)
      if (now.getTime() <= end1.getTime() && now.getTime() >= start1.getTime()) {
        flag = true
      }
      return flag
    },
    async initData () {
      let voteId = STATES.getters.getVoteId
      // let roundId = STATES.getters.getRoundId
      let tempArr = [
        getDetails(voteId).then(res => {
          // console.log(res)
          // 计算
          this.btn2 = res.data.data.contestantNum || 0
          let round = res.data.data.roundNum || 0
          let roundId = res.data.data.round.id || 0
          STATES.commit('setRound', round)
          STATES.commit('setRoundId', roundId)
          this.round = STATES.getters.getRound
          let now = res.data.data.nowDate
          this.isround1 = this.findRound(now, res.data.data.rounds, 1)
          this.findSpace(now, res.data.data.rounds)
          let objSpace = STATES.getters.getSpace
          console.log(objSpace)
          if (objSpace.isSpace) {
            this.$router.replace('preRound')
          }
          let end = res.data.data.round.endTime
          let start = res.data.data.round.startTime
          now = now.replace(/-/g, '/')
          end = end.replace(/-/g, '/')
          start = start.replace(/-/g, '/')
          let _now = new Date(now)
          let _end = new Date(end)
          let _start = new Date(start)
          let isstart = _now.getTime() - _start.getTime()
          this.isstart = isstart > 0
          let isend = _end.getTime() - _now.getTime()
          // console.log(s3)
          this.isend = isend
          // 得到相差的毫秒数
          // 然后根据1天=24小时=(24*60)分钟=（24*60*60）秒=（24*60*60*1000）毫秒
          let tianshu = isend / (24 * 60 * 60 * 1000)
          let bfstart = -isstart / (24 * 60 * 60 * 1000)
          // 进一法取整
          let dl = Math.ceil(tianshu)
          let sl = Math.ceil(bfstart)
          // console.log(dl)
          this.deadline = dl
          this.startline = sl
          // 获得城市列表
          let arrCitys = res.data.data.citys
          let getarrCitys = []
          getarrCitys.push({
            name: '全部',
            id: -1,
            act: false
          })
          for (let city of arrCitys) {
            getarrCitys.push({
              name: city.areaName,
              id: city.id,
              act: false
            })
          }
          getarrCitys[0].act = true
          // that.tabList = arr
          STATES.commit('setCityList', getarrCitys)
          // 获得第一页初始数据
          getOptionList(1, 10, voteId, roundId).then(res => {
            let arrList = res.data.data
            let arr = []
            for (let el of arrList) {
              arr.push(
                {
                  name: el.title || '',
                  actor: el.author || '',
                  addrs: el.city ? el.city.areaName : '',
                  nums: el.tickets ? el.tickets.voteCount : '',
                  id: el.tickets ? el.tickets.id : '',
                  optionId: el.tickets ? el.tickets.optionId : ''
                })
            }
            // console.log(arr)
            if (arr.length >= 1) { arr[0].lvl = 1 }
            if (arr.length >= 2) { arr[1].lvl = 2 }
            if (arr.length >= 3) { arr[2].lvl = 3 }
            // arr.length >= 2 && arr[1].lvl = 2
            // arr.length >= 3 && arr[2].lvl = 3
            STATES.commit('setList', arr)
          })
        })
      ]
      await Promise.all(tempArr).catch(err => {
        console.log(err)
      })
    },
    toPreRound () {
      // console.log(this)
      STATES.commit('setInfiniteLoading', false)
      this.$router.push('preRound')
    }
  },
  components: {
    'vbtn': vbtn,
    'vtab': vtab,
    'showplayerlist': showplayerlist,
    'popup': popup,
    'poem': poem,
    'tips': tips,
    'information': information
  }
}
</script>

<style lang="less" scoped>
  @import "./../style/var";
  .m-index{
    text-align: center;
    background-color: #333;
  }
  .m-showlist{
    display: inline-block;
    width: 100%;
  }
  .tab-content-container{
    margin: 0 auto;
    font-size: .24rem;
    width: 1.2rem;
    height: .64rem;
    font-size: .24rem;
    line-height: .64rem;
    color: @color-main;
  }
  .goswitch-enter{
    transform: translate(0, -2.5rem);
  }
  .goswitch-enter-active {
    transition: transform .6s;
  }
  .goswitch-enter-to{
    transform: translate(0);
  }
  .goswitch-leave{
    transform: translate(0);
  }
  .goswitch-leave-active {
    transition: transform .5s;
  }
  .goswitch-leave-to{
    transform: translate(0, 7.5rem);
  }
</style>
