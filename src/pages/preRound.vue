<template>
  <div class="m-index">
    <div class="m-overview">
      <div class="u-deadline">
        <i class="u-icon u-icon-tan"></i>
        <!-- <span class="c" v-if="!isstart">距离第{{ round }}轮投票开始，还有{{ startline }}天</span>
        <span class="c" v-else-if="isend > 0">距离第{{ round }}轮投票结束，还有{{ deadline }}天</span>
        <span class="c" v-else-if="isend < 0">投票已结束</span>
        <span class="c" v-else></span> -->
        <span v-if="space.isSpace" class="c">第{{ space.preRound }}轮投票结束，第{{ space.nextRound }}轮在{{ space.startTime }}开始</span>
        <span v-else class="c">第{{ round }}投票已经完满结束</span>
      </div>
      <div class="m-btn-box">
        <!-- <vbtn class="u-numbers" :msg="btn1" @click.native="loadApp"></vbtn> -->
        <!-- <vbtn class="u-numbers" :msg="'候选人数' + btn2 + '人'" @click.native="loadApp"></vbtn> -->
        <vbtn v-if="!space.isSpace" class="u-numbers u-large" :msg="btn4" @click.native="toIndex"></vbtn>
      </div>
    </div>
    <div class="m-showlist" key="detail">
      <vshow class="f-pos-list" ref="perRoundList" :isshow="isshow"></vshow>
    </div>
  </div>
</template>

<script>
import {STATES} from '@/vuex/state'
import vbtn from '@/components/public/btn'
import vshow from '@/components/list/preRoundList'
import { getPreList, getDetails } from '@/plugins/getData'

const handleDate = (date) => {
  date = date.replace(/-/g, '/')
  let _date = new Date(date)
  return _date
}
export default {
  name: 'preRound',
  data () {
    return {
      title: '分享页',
      deadline: 0,
      startline: 0,
      isend: 0,
      isstart: 0,
      btn4: '马上去为进阶小诗人投票吧',
      exbtn1: '完整诗歌',
      exbtn2: '投票',
      isshow: true,
      fst: {},
      listarr: [],
      shareBtn2: '为TA投票'
    }
  },
  computed: {
    round () {
      // console.log(STATES.getters.getRound)
      return STATES.getters.getRound - 1
    },
    space () {
      return STATES.getters.getSpace
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
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
    initData () {
      let voteId = STATES.getters.getVoteId
      // let roundId = STATES.getters.getRoundId
      if (this.round === -1) {
        getDetails(voteId).then(res => {
          let round = res.data.data.roundNum || 0
          let roundId = res.data.data.round.id || 0
          STATES.commit('setRound', round)
          STATES.commit('setRoundId', roundId)
          let now = res.data.data.nowDate
          this.findSpace(now, res.data.data.rounds)
          getPreList(1, 10, voteId, roundId).then(res => {
            let arrList = res.data.data
            let arr = []
            if (arrList.length > 0) {
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
            }
            arr[0].lvl = 1
            arr[1].lvl = 2
            arr[2].lvl = 3
            STATES.commit('setRoundList', arr)
          })
        })
      } else {
        let roundId = STATES.getters.getRoundId
        getPreList(1, 10, voteId, roundId).then(res => {
          let arrList = res.data.data
          let arr = []
          if (arrList.length > 0) {
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
          }
          arr[0].lvl = 1
          arr[1].lvl = 2
          arr[2].lvl = 3
          STATES.commit('setRoundList', arr)
        })
      }
    },
    getlistpop (data) {
    },
    toIndex () {
      STATES.commit('setCounter', 2)
      STATES.commit('setInfiniteLoading', false)
      this.$router.push('voteIndex')
    }
  },
  components: {
    'vbtn': vbtn,
    'vshow': vshow
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
  .m-exemplar{
    width: 96%;
    // height: 2.35rem;
    margin: 0 auto;
    margin-top: .3rem;
    // background-color: #3355aa;
    height: 2.6rem;
    background: url("./../img/bg-fst.png");
    background-size: 100% 100%;
    position: relative;
    color: #333;
    .left{
      float: left;
      height: 2.5rem;
      font-size: .18rem;
      width: 45%;
      padding-top: 1.75rem;
      position: relative;
      font-size: 0;
    }
    .right{
      float: left;
      height: 2.5rem;
      width: 45%;
      margin-left: 5%;
      position: relative;
      font-size: 0;
      .u-votenums{
        width: 3.2rem;
        height: 1.4rem;
        font-size: 0;
        margin: 0 auto;
        overflow: hidden;
        .tips{
          display: inline-block;
          font-size: .2rem;
          margin-top: .16rem;
        }
        .nums{
          display: inline-block;
          width: 3.2rem;
          height: .88rem;
          font-size: .45rem;
          margin-top: .14rem;
          color: @color-main;
        }
      }
      .m-btn-box{
        font-size: 0;
      }
      .u-numbers{
        width: 1.6rem;
        height: .5rem;
        margin: 0 auto;
        margin-bottom: .14rem; 
        padding-top: .02rem;
        background: url("./../img/btn-normal.png") no-repeat;
        background-size: 100% 100%;
        color: @color-font-light;
        border-radius: .2rem;
        line-height: 1.6;
        &.u-short{
          width: 1.7rem;
          height: .95rem;
          padding-top: .25rem;
          padding-left: .43rem;
          background: url("./../img/btn-star.png");
          background-size: 100% 100%;
        }
      }
    }
    
    .f-nums{
      display: none;
    }
    .u-icon-h{
      width: .96rem;
      height: .64rem;
      background: url("./../img/icon-h.png");
      background-size: 100% 100%;
      position: absolute;
      top: 0;
      left: .3rem;
    }
    .u-icon-font-xsx{
      width: 2.8rem;
      height: 1.1rem;
      background: url("./../img/font-xsx.png");
      background-size: 100% 100%;
      position: absolute;
      top: .53rem;
      left: .35rem;
    }
    .m-nums-show{
      position: relative;
      margin-top: .1rem;
      margin-bottom: .1rem;
      left: 0;
    }
    .u-icon-nums{
      width: 3.2rem;
      height: .88rem;
      background: url("./../img/bg-nums.png");
      background-size: 100% 100%;
      font-size: .64rem;
      line-height: .88rem;
      color: #fae997;
      font-weight: 100;
      font-family: Avenir-Light;
    }
    .m-btn-box{
      position: relative;
    }
    .u-btn-pop{
      position: absolute;
      top: .24rem;
      left: 0rem;
    }
    .u-btn-vote{
      position: absolute;
      top: 0;
      right: -.15rem;
    }
    .u-title{
      position: absolute;
      top: 1.85rem;
      left: 1.5rem;
      margin-top: 0;
      font-size: .2rem;
    }
    .u-name{
      position: absolute;
      top: 1.85rem;
      left: 0.3rem;
      font-size: .26rem;
      width: 3.2rem;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
      position: absolute;
    }
    .s-tips{
      font-size: .26rem;
      line-height: 2;
      display: inline-block;
      color: #555;
    }
  }
  .m-vote-box{
    width: 96%;
    margin: 0 auto;
    margin-top: .3rem;
    font-size: 0;
    .u-vote-el{
      width: 24.5%;
    }
    .u-btn-detail{
      display: inline-block;
      width: 6rem;
      height: .8rem;
      background: url("./../img/btn-detail.png");
      background-size: 100% 100%;
      font-size: .24rem;
      line-height: .9rem;
      font-weight: 500;
      margin-top: .36rem;
    }
  }
  .m-detail-info{
    .u-title-box{
      width: 96%;
      margin: 0 auto;
      margin-top: .36rem;
      text-align: center;
      font-size: 0;
    }
    .u-title{
      display: inline-block;
      font-size: .3rem;
      color: @color-main;
      position: relative;
      .u-line-left {
        display: inline-block;
        width: 1.6rem;
        height: .03rem;
        background-color: @color-font-light;
        position: absolute;
        top: 50%;
        right: 130%;
        &:after{
          display: block;
          content: " ";
          width: .08rem;
          height: .08rem;
          background-color: @color-border-lighter;
          transform: rotate(45deg);
          position: absolute;
          top: -.02rem;
          right: 0;
        }
      }
      .u-line-right {
        display: inline-block;
        width: 1.6rem;
        height: .03rem;
        background-color: @color-font-light;
        position: absolute;
        top: 50%;
        left: 130%;
        &:after{
          display: block;
          content: " ";
          width: .08rem;
          height: .08rem;
          background-color: @color-border-lighter;
          transform: rotate(45deg);
          position: absolute;
          top: -.02rem;
          left: 0;
        }
      }
    }
    .u-prize-list{
      width: 96%;
      margin: 0 auto;
      margin-top: .3rem;
      /*border: .04rem double @color-main;*/
      background: url("./../img/bd-prize.png");
      background-size: 100% 100%;
    }
    .u-prize-el{
      float: left;
      width: 33.3%;
      padding-top: .26rem;
      padding-bottom: .18rem;
      text-align: center;
      border-right: .01rem solid @color-main;
      &:last-child{
        border-right: 0;
      }
      .u-img{
        width: 1.3rem;
        height: 1.3rem;
      }
      .u-cc1{
        width: 1.8rem;
        margin: 0 auto;
        color: @color-main;
        line-height: 2.4;
        font-size: .24rem;
        font-weight: 700;
        display: block;
        text-align: center;
      }
      .u-cc2{
        width: 1.8rem;
        margin: 0 auto;
        color: @color-main;
        line-height: 1.4;
        font-size: .24rem;
        display: block;
        text-align: center;
      }
    }
    .u-prize-cc{
      width: 6rem;
      margin: 0 auto;
      margin-top: .26rem;
      font-size: .24rem;
      line-height: 1.5;
      color: @color-main;
      text-align: center;
    }
    .u-prize-rule{
      width: 6rem;
      margin: 0 auto;
      margin-top: .2rem;
      font-size: .24rem;
      line-height: 1.5;
      color: @color-main;
      text-align: left;
    }
  }
  .m-copy{
    width: 6.6rem;
    margin: 0 auto;
    margin-top: .7rem;
    margin-bottom: .7rem;
    font-size: 0;
    .left{
      float: left;
      width: 2.6rem;
      .u-img{
        width: 2.5rem;
        height: 1.3rem;
      }
      .u-c{
        display: block;
        font-size: .2rem;
        color: @color-font-light;
        margin-top: .1rem;
      }
    }
    .right{
      float: left;
      width: 3.8rem;
      margin-left: .15rem;
      text-align: left;
      padding-top: .65rem;
      .u-t{
        font-size: .2rem;
      }
      .u-img-nf{
        width: .6rem;
        height: .6rem;
        margin-left: .2rem;
      }
      .u-img-tkc{
        width: 1.3rem;
        height: .6rem;
        margin-left: .26rem;
      }
      .u-c1{
        display: block;
        font-size: .2rem;
        color: @color-font-light;
      }
      .u-c2{
        display: block;
        font-size: .2rem;
        color: @color-font-light;
        margin-top: .1rem
      }
    }
  }
  .u-el{
    width: 1.55rem;
    height: 1.65rem;
    margin: 0 auto;
    border: .015rem solid @color-main;
    background-color: @color-bg-dark;
    color: @color-font-light;
    .tt,.at,.nums{
      display: block;
      font-size: .24rem;
    }
    .tt{
      height: .85rem;
      padding-top: .16rem;
    }
    .at{
      height: .4rem;
    }
    .nums{
      height: .36rem;
      border-top: .015rem solid @color-main;
    }
    &.z-snd{
      background: url("./../img/bg-snd-s.png");
      background-size: 100% 100%;
      color: #333;
    }
    &.z-thd{
      background: url("./../img/bg-thd-s.png");
      background-size: 100% 100%;
      color: #333;
    }
  }
  .m-btn-box{
    margin: 0 auto;
    text-align: center;
    .u-numbers{
      margin: 0;
      margin-top: .2rem;
    }
    .u-btn-vote{
      width: 1.56rem;
      height: .52rem;
      margin: 0 auto;
      margin-top: .27rem;
      padding-top: .02rem;
      background: url("./../img/btn-vote.png") no-repeat;
      background-size: 100% 100%;
      color: @color-font-light;
      border-radius: .2rem;
      line-height: 1.6;
    }
  }
</style>