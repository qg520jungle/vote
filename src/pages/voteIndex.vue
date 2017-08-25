<template>
  <div class="m-index">
    <div class="m-overview">
      <div class="u-deadline">
        <i class="u-icon u-icon-tan"></i>
        <span class="c" v-show="deadline >= 0">距离第{{ round }}轮投票结束，还有{{ deadline }}天</span>
        <span class="c" v-show="deadline < 0">投票已结束</span>
      </div>
      <div class="m-btn-box">
        <vbtn class="u-numbers" :msg="btn1" @click.native="popup('information')"></vbtn>
        <vbtn class="u-numbers" :msg="'候选人数' + btn2 + '人'" ></vbtn>
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

export default {
  name: 'index',
  data () {
    return {
      title: '投票主页',
      deadline: 0,
      round: 0,
      btn1: '活动详情',
      btn2: ' 312',
      exbtn2: '投票',
      currentView: 'poem',
      msg: {
        code: 0,
        title: '成功',
        msg: '已经为他增加荣誉票数'
      },
      poemCnt: {}
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
    async initData () {
      let voteId = STATES.getters.getVoteId
      // let roundId = STATES.getters.getRoundId
      let tempArr = [
        getDetails(voteId).then(res => {
          // console.log(res)
          this.btn2 = res.data.data.contestantNum || 0
          let round = res.data.data.roundNum || 0
          let roundId = res.data.data.round.id || 0
          STATES.commit('setRound', round)
          STATES.commit('setRoundId', roundId)
          this.round = STATES.getters.getRound
          let a = res.data.data.nowDate
          let b = res.data.data.round.endTime
          a = a.replace(/-/g, '/')
          b = b.replace(/-/g, '/')
          let s1 = new Date(a)
          let s2 = new Date(b)
          let s3 = s2.getTime() - s1.getTime()
          // 得到相差的毫秒数
          // 然后根据1天=24小时=(24*60)分钟=（24*60*60）秒=（24*60*60*1000）毫秒
          var tianshu = s3 / (24 * 60 * 60 * 1000)
          // 进一法取整
          let dl = Math.ceil(tianshu)
          // console.log(dl)
          this.deadline = dl
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
            arr[0].lvl = 1
            arr[1].lvl = 2
            arr[2].lvl = 3
            STATES.commit('setList', arr)
          })
        })
      ]
      await Promise.all(tempArr).catch(err => {
        console.log(err)
      })
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
