<template>
  <div class="m-player-list">
    <vscroll  :on-refresh="onRefreshSrh" :on-infinite="onInfinitePre" :loading-text="loadingText" :isTexthide="!isshow">
      <ul class="u-list-box">
        <li class="u-list l2"  :class="{'z-lvl1': item.lvl === 1,'z-lvl2': item.lvl === 2,'z-lvl3': item.lvl === 3}" v-for="(item,index) in getroundlist" >
          <div class="left">
            <i class="u-icon u-icon-h" v-show="item.lvl === 1"></i>
            <i class="u-icon u-icon-font-ysxsx" v-show="item.lvl === 1"></i>
            <p class="u-title" v-show="item.lvl !== 1">
              【{{item.name}}】
            </p>
          </div>
          <div class="right">
            <p class="u-name" v-show="item.lvl !== 1">
              <span class="">{{ item.actor }}</span>
              <span class="">{{ item.addrs }}</span>
              <span class="">{{ item.nums }}票</span>
            </p>
            <p class="u-name-first a" v-show="item.lvl === 1">
              <span class="">{{ item.actor }}</span>
              <span class="">{{ item.addrs }}</span>
            </p>
            <p class="u-name-first b" v-show="item.lvl === 1">
              <span>【{{item.name}}】</span>
            </p>
            <div class="m-nums-show" v-show="item.lvl === 1">
              <span class="u-icon u-icon-nums" >{{ item.nums }}</span>
            </div>
          </div>
        </li>
        <li class="u-list l2" v-for="(item,index) in getrounddown" >
          <div class="left">
            <p class="u-title" v-show="item.lvl !== 1">
              【{{item.name}}】
            </p>
          </div>
          <div class="right">
            <p class="u-name">
              <span class="">{{ item.actor }}</span>
              <span class="">{{ item.addrs }}</span>
              <span class="" v-show="item.lvl !== 1">{{ item.nums }}票</span>
            </p>
          </div>
        </li>
      </ul>
    </vscroll>
    <div class="u-icon-box">
      <i class="u-icon u-icon-up"></i>
      <span class="u-cc">
        向上滑动查看更多
      </span>
    </div>
  </div>
</template>
<script>
import {STATES} from '@/vuex/state'
import Scroll from '@/components/list/scroll'
import { getPreList } from '@/plugins/getData'

export default{
  data () {
    return {
      title: '入围选手信息',
      num: 10,  // 一次显示多少条
      pageStart: 0, // 开始页数
      pageEnd: 0, // 结束页数
      perListLoadFlag: 0,
      perLoadFlag: 0,
      listbtn1: '完整诗歌',
      listbtn2: '投票',
      ispopshow: false
    }
  },
  props: {
    isshow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getroundlist () {
      let arr = STATES.getters.getRoundList
      let ldata = arr.slice(0, 10)
      return ldata
    },
    getrounddown () {
      let arr = STATES.getters.getRoundList
      let ddata = arr.slice(10)
      return ddata
    },
    isloading () {
      return STATES.getters.getIsLoading
    },
    noresult () {
      return STATES.getters.getNoResult
    },
    isSrh () {
      return STATES.getters.getIsSrh
    },
    roundId () {
      return STATES.getters.getRoundId
    },
    voteId () {
      return STATES.getters.getVoteId
    },
    cityId () {
      return STATES.getters.getSrhCityId
    },
    srhText () {
      return STATES.getters.getSrhText
    },
    counter () {
      return 2
    },
    counterSrh () {
      return STATES.getters.getCounterSrh
    },
    theLoadText () {
      return '无匹配'
    },
    loadingText () {
      let text = ' '
      if (!this.isshow) {
        if (this.getroundlist.length < 10) {
          text = ' '
        } else if (this.perListLoadFlag === 0) {
          text = '加载中……'
        } else {
          text = '加载完毕'
        }
      } else {
        if (this.getroundlist.length < 10) {
          text = ' '
        } else if (this.perLoadFlag === 0) {
          text = '加载中……'
        } else {
          text = '加载完毕'
        }
      }
      return text
    },
    isupshow () {
      let flag = true
      if (this.listdata.length < 10) {
        flag = false
      } else if (this.perListLoadFlag === 0) {
        flag = true
      } else {
        flag = false
      }
      return flag
    },
    isdataupshow () {
      let flag = true
      if (this.getroundlist.length < 10) {
        flag = false
      } else if (this.perLoadFlag === 0) {
        flag = true
      } else {
        flag = false
      }
      return flag
    }
  },
  watch: {
    listdata () {
    }
  },
  mounted: function () {
  },
  methods: {
    onRefresh (done) {
      this.getTheList()
      done() // call done
    },
    onRefreshSrh (done) {
      this.getTheList()
      done() // call done
    },
    onInfinite (done) {
      let vm = this
      let roundId = this.roundId
      let voteId = this.voteId
      let c = this.counter
      // console.log(c)
      getPreList(c, this.num, voteId, roundId).then((response) => {
        c++
        vm.pageEnd = vm.num * c
        vm.pageStart = vm.pageEnd - vm.num
        vm.perListLoadFlag = 0
        let arrSrc = response.data.data
        if (arrSrc.length === 0) {
          vm.perListLoadFlag = 1
          return
        }
        let i = vm.pageStart
        // let end = vm.pageEnd
        let arr = []
        for (let el of arrSrc) {
          let obj = {
            name: el.title || '',
            actor: el.author || '',
            addrs: el.city ? el.city.areaName : '',
            nums: el.tickets ? el.tickets.voteCount : '',
            id: el.tickets ? el.tickets.id : '',
            optionId: el.tickets ? el.tickets.optionId : ''
          }
          arr.push(obj)
          if ((i + 1) >= response.data.length) {
            this.$el.querySelector('.load-more').style.display = 'none'
            return
          }
        }
        arr[0].lvl = 1
        arr[1].lvl = 2
        arr[2].lvl = 3
        console.log(arr)
        STATES.commit('reRoundLoadList', arr)
        done() // call done
      }, (response) => {
        console.log('error')
      })
    },
    onInfinitePre (done) {
      let vm = this
      let roundId = this.roundId
      let voteId = this.voteId
      let c = this.counter
      // console.log('load')
      // console.log(c)
      // let arrSrh = this.getlist
      vm.perLoadFlag = 0
      getPreList(c, this.num, voteId, roundId).then((response) => {
        c++
        // console.log(c)
        // console.log(response)
        // console.log(cityId)
        vm.pageEnd = vm.num * c
        vm.pageStart = vm.pageEnd - vm.num
        let arrSrc = response.data.data
        if (arrSrc.length === 0) {
          vm.perLoadFlag = 1
          return
        }
        let i = vm.pageStart
        // let end = vm.pageEnd
        let arr = []
        for (let el of arrSrc) {
          let obj = {
            name: el.title || '',
            actor: el.author || '',
            addrs: el.city ? el.city.areaName : '',
            nums: el.tickets ? el.tickets.voteCount : '',
            id: el.tickets ? el.tickets.id : '',
            optionId: el.tickets ? el.tickets.optionId : ''
          }
          arr.push(obj)
          if ((i + 1) >= response.data.length) {
            this.$el.querySelector('.load-more').style.display = 'none'
            return
          }
        }
        // setTimeout(function () {
        STATES.commit('reRoundLoadList', arr)
        // }, 1000)
        // console.log(arr)
        done() // call done
      }, (response) => {
        console.log('error')
      })
    },
    getFromPop () {
      this.ispopshow = false
    }
  },
  components: {
    'vscroll': Scroll
  }
}
</script>
<style lang="less" scoped>
  @import "./../../style/var";
  .m-player-list{
    width: 100%;
    margin-top: -2rem; 
    .u-icon-box{
      position: absolute;
      bottom: -.01rem;
      bottom: 0rem;
      left: 0;
      width: 100%;
      height: .2rem;
      // left: 50%;
      font-size: 0;
      // margin-left: -1.5rem;
      text-align: center;
      background: @color-bg-dark;
      padding-bottom: .2rem;
      box-shadow: .2rem 0 .5rem .5rem #333;
      .u-icon-up{
        display: inline-block;
        width: .7rem;
        height: .35rem;
        background: url('../../img/icon-up.png') no-repeat;
        background-size: 100%;
        position: absolute;
        left: 50%;
        margin-left: -.35rem;
        top: -.5rem;
        animation: iconup .8s ease infinite;
      }
      .u-cc{
        margin-top: .05rem;
        display: block;
        color: #999;
        text-align: center;
        width: 100%;
        display: block;
        font-size: .24rem;
        position: absolute;
        top: -.3rem;
      }
    }
  }
  @keyframes iconup{
    0% {
      top: -.5rem;
    }
    100% {
      top: -.8rem;
    }
  }
  .u-list-box{
    width: 100%;
    padding: .15rem;
  }
  .u-list{
    font-size: .26rem;
    width: 100%;
    height: .96rem;
    margin-bottom: .25rem;
    background-color: @color-bg-dark;
    border: .03rem solid @color-border;
    color: @color-font-light;
    position: relative;
    &:before{
      display: block;
      content: " ";
      width: .03rem;
      border-left: 0.03rem solid #565240;
      /* border-right: .03rem solid #565240; */
      height: 100%;
      position: absolute;
      left: .1rem;
    }
    &:after{
      display: block;
      content: " ";
      width: .03rem;
      border-right: .03rem solid #565240; 
      height: 100%;
      position: absolute;
      right: .1rem;
      visibility: visible;
    }
    &:last-child{
      margin-bottom: 0;
    }
    .u-numbers{
      width: 1.6rem;
      height: .52rem;
      margin: 0 auto;
      margin-top: .2rem;
      margin-bottom: .14rem; 
      padding-top: .02rem;
      background: url("../../img/btn-normal-c.png") no-repeat;
      background-size: 100% 100%;
      color: @color-font-light;
      border-radius: .2rem;
      line-height: 1.6;
      text-align: center;
      &.u-short{
        background: url("../../img/btn-small.png") no-repeat;
        background-size: 100% 100%;
        text-align: center;
        width: 1.2rem;
      }
    }
    .left{
      float: left;
      width: 47%;
      text-align: left;
      padding-left: .6rem;
      position: relative;
    }
    .right{
      float: left;
      width: 45%;
      margin-left: 3%;
      position: relative;
    }
    .u-title{
      margin-top: 0rem;
      line-height: .96rem;
      width: 100%;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
    .u-name{
      line-height: .96rem;
    }
    .m-btn-box{
      text-align: right;
    }
    &.z-lvl1{
      height: 2.6rem;
      background: url("../../img/bg-fst.png");
      background-size: 100% 100%;
      position: relative;
      color: #333;
      .left{
        height: 2.5rem;
      }
      .right{
        height: 2.5rem;
      }
      .f-nums{
        display: none;
      }
      .u-numbers{
        background: url("../../img/btn-normal.png") no-repeat;
        background-size: 100% 100%;
        margin-top: 0
      }
      .u-numbers.u-short{
        width: 1.7rem;
        height: .95rem;
        padding-top: .25rem;
        padding-left: .43rem;
        background: url("../../img/btn-star.png");
        background-size: 100% 100%;
      }
      .u-icon-h{
        width: .96rem;
        height: .64rem;
        background: url("../../img/icon-h.png");
        background-size: 100% 100%;
        position: absolute;
        top: 0;
        left: .3rem;
      }
      .u-icon-font-ysxsx{
        width: 3rem;
        height: 1.2rem;
        background: url("../../img/font-ysxsx.png");
        background-size: 100% 100%;
        position: absolute;
        top: .83rem;
        left: .35rem;
      }
      .u-name-first{
        margin-top: .05rem;
        &.a{
          margin-top: .3rem;
        }
      }
      .m-nums-show{
        position: relative;
        margin-top: .1rem;
        margin-bottom: .1rem;
        left: 0;
      }
      .s-tips{
        font-size: .26rem;
        line-height: 2
      }
      .u-icon-nums{
        width: 3.2rem;
        height: .88rem;
        background: url("../../img/bg-nums.png");
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
        left: 0;
      }
      .u-btn-vote{
        position: absolute;
        top: 0;
        right: -.15rem;
      }
      .u-title{
        position: absolute;
        top: 1.85rem;
        // right: 2rem;
        right: -.2rem;
        // width: 1.5rem;
        margin-top: 0;
      }
      .u-name{
        top: 1.85rem;
        left: 0.3rem;
        width: 3.2rem;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
        position: absolute;
        .a{
          width: .7rem;
          display: inline-block;
          text-align: center;
        }
        .b{
          width: .9rem;
          display: inline-block;
          text-align: center;
        }
      }
      &:before{
        display: block;
        content: " ";
        width: .03rem;
        border-left: 0;
        /* border-right: .03rem solid #565240; */
        height: 100%;
        position: absolute;
        left: .1rem;
      }
      &:after{
        display: block;
        content: " ";
        width: .03rem;
        border-right: 0; 
        height: 100%;
        position: absolute;
        right: .1rem;
        visibility: visible;
      }         
    }
    &.z-lvl2{
      color: #333;
      background: url("../../img/bg-snd.png");
      background-size: 100% 100%;
      .u-name{
        color: #9e9e9e;
      }
      &:before{
        display: block;
        content: " ";
        width: .03rem;
        border-left: 0;
        /* border-right: .03rem solid #565240; */
        height: 100%;
        position: absolute;
        left: .1rem;
      }
      &:after{
        display: block;
        content: " ";
        width: .03rem;
        border-right: 0; 
        height: 100%;
        position: absolute;
        right: .1rem;
        visibility: visible;
      } 
    }
    &.z-lvl3{
      color: #333;
      background: url("../../img/bg-thd.png");
      background-size: 100% 100%;
      .u-name{
        color: #a2975f;
      }
      &:before{
        display: block;
        content: " ";
        width: .03rem;
        border-left: 0;
        /* border-right: .03rem solid #565240; */
        height: 100%;
        position: absolute;
        left: .1rem;
      }
      &:after{
        display: block;
        content: " ";
        width: .03rem;
        border-right: 0; 
        height: 100%;
        position: absolute;
        right: .1rem;
        visibility: visible;
      } 
    }
  }
  .u-loading{
    font-size: .26rem;
    height: .96rem;
    color: #fff;
    text-align: center;
  }
</style>
