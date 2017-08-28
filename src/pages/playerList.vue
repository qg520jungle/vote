<template>
  <div class="m-player-list">
    <vscroll v-if="isshow"  :on-refresh="onRefreshSrh" :on-infinite="onInfiniteSrh" :loading-text="loadingText" :isTexthide="!isshow">
      <ul class="u-list-box">
        <li class="u-list l2"  :class="{'z-lvl1': item.lvl === 1,'z-lvl2': item.lvl === 2,'z-lvl3': item.lvl === 3}" v-for="(item,index) in getlist" >
          <div class="left">
            <i class="u-icon u-icon-h" v-show="item.lvl === 1"></i>
            <i class="u-icon u-icon-font-xsx" v-show="item.lvl === 1"></i>
            <p class="u-title" v-show="item.lvl !== 1">
              {{item.name}}
            </p>
            <p class="u-name">
              <span class="">{{ item.actor }}</span>
              <span class="">{{ item.addrs }}</span>
              <span v-show="item.lvl === 1">{{item.name}}</span>
              <span class="" v-show="item.lvl !== 1">{{ item.nums }}票</span>
            </p>
          </div>
          <div class="right">
            <div class="m-nums-show" v-show="item.lvl === 1">
              <span class="s-tips" >荣誉得票数</span>
              <span class="u-icon u-icon-nums" >{{ item.nums }}</span>
            </div>
            <div class="m-btn-box">
              <vbtn class="u-numbers u-btn-pop" :msg="listbtn1" @click.native="popup('poem', item.optionId)"></vbtn>
              <vbtn class="u-numbers u-short u-btn-vote" @click.native="govote('tips', item.optionId)" :msg="listbtn2"></vbtn>
            </div>
          </div>
        </li>
        <li class="u-list l2" v-for="(item,index) in getdown" >
          <div class="left">
            <i class="u-icon u-icon-h" v-show="item.lvl === 1"></i>
            <i class="u-icon u-icon-font-xsx" v-show="item.lvl === 1"></i>
            <p class="u-title" v-show="item.lvl !== 1">
              {{item.name}}
            </p>
            <p class="u-name">
              <span class="">{{ item.actor }}</span>
              <span class="">{{ item.addrs }}</span>
              <span v-show="item.lvl === 1">{{item.name}}</span>
              <span class="" v-show="item.lvl !== 1">{{ item.nums }}票</span>
            </p>
          </div>
          <div class="right">
            <div class="m-nums-show" v-show="item.lvl === 1">
              <span class="s-tips" >荣誉得票数</span>
              <span class="u-icon u-icon-nums" >{{ item.nums }}</span>
            </div>
            <div class="m-btn-box">
              <vbtn class="u-numbers u-btn-pop" :msg="listbtn1" @click.native="popup('poem', item.optionId)"></vbtn>
              <vbtn class="u-numbers u-short u-btn-vote" @click.native="govote('tips', item.optionId)" :msg="listbtn2"></vbtn>
            </div>
          </div>
        </li>
      </ul>
      <div v-show="isloading" class="u-loading">
        加载中……
      </div>
    </vscroll>
    <vscroll v-if="!isshow" :on-refresh="onRefresh" :on-infinite="onInfinite" :loading-text="loadingText" :isTexthide="isshow">
      <ul class="u-list-box">
        <li class="u-list f-cb" :class="{'z-lvl1': item.lvl === 1,'z-lvl2': item.lvl === 2,'z-lvl3': item.lvl === 3}" v-for="(item,index) in listdata" >
          <div class="left">
            <i class="u-icon u-icon-h" v-show="item.lvl === 1"></i>
            <i class="u-icon u-icon-font-xsx" v-show="item.lvl === 1"></i>
            <p class="u-title" v-show="item.lvl !== 1">
              {{item.name}}
            </p>
            <p class="u-name">
              <span class="">{{ item.actor }}</span>
              <span class="">{{ item.addrs }}</span>
              <span v-show="item.lvl === 1">{{item.name}}</span>
              <span class="" v-show="item.lvl !== 1">{{ item.nums }}票</span>
            </p>
          </div>
          <div class="right">
            <div class="m-nums-show" v-show="item.lvl === 1">
              <span class="s-tips" >荣誉得票数</span>
              <span class="u-icon u-icon-nums" >{{ item.nums }}</span>
            </div>
            <div class="m-btn-box">
              <vbtn class="u-numbers u-btn-pop" :msg="listbtn1" @click.native="popup('poem', item.optionId)"></vbtn>
              <vbtn class="u-numbers u-short u-btn-vote" @click.native="govote('tips', item.optionId)" :msg="listbtn2"></vbtn>
            </div>
          </div>
        </li>
        <li class="u-list l2" v-for="(item,index) in downdata" >
          <div class="left">
            <i class="u-icon u-icon-h" v-show="item.lvl === 1"></i>
            <i class="u-icon u-icon-font-xsx" v-show="item.lvl === 1"></i>
            <p class="u-title" v-show="item.lvl !== 1">
              {{item.name}}
            </p>
            <p class="u-name">
              <span class="">{{ item.actor }}</span>
              <span class="">{{ item.addrs }}</span>
              <span v-show="item.lvl === 1">{{item.name}}</span>
              <span class="" v-show="item.lvl !== 1">{{ item.nums }}票</span>
            </p>
          </div>
          <div class="right">
            <div class="m-nums-show" v-show="item.lvl === 1">
              <span class="s-tips" >荣誉得票数</span>
              <span class="u-icon u-icon-nums" >{{ item.nums }}</span>
            </div>
            <div class="m-btn-box">
              <vbtn class="u-numbers u-btn-pop" :msg="listbtn1" @click.native="popup('poem', item.optionId)"></vbtn>
              <vbtn class="u-numbers u-short u-btn-vote" @click.native="govote('tips', item.optionId)" :msg="listbtn2"></vbtn>
            </div>
          </div>
        </li>
      </ul>
    </vscroll>
    <div class="u-icon-box" v-if="(!isshow && isupshow)">
      <i class="u-icon u-icon-up"></i>
      <span class="u-cc">
        向上滑动查看更多
      </span>
    </div>
    <div class="u-icon-box" v-if="(isshow && isdataupshow)">
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
import vbtn from '@/components/public/btn'
import { getOptionList, getOption, vote, getList } from '@/plugins/getData'

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
    getlist () {
      let arr = STATES.getters.getSearchList
      let ldata = arr.slice(0, 10)
      return ldata
    },
    getdown () {
      let arr = STATES.getters.getSearchList
      let ddata = arr.slice(10)
      return ddata
    },
    isloading () {
      return STATES.getters.getIsLoading
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
      return STATES.getters.getCounter
    },
    counterSrh () {
      return STATES.getters.getCounterSrh
    },
    downdata () {
      let arr = STATES.getters.getList
      let ddata = arr.slice(10)
      return ddata
    },
    listdata () {
      let arr = STATES.getters.getList
      let ldata = arr.slice(0, 10)
      return ldata
    },
    loadingText () {
      let text = ' '
      if (!this.isshow) {
        if (this.listdata.length < 10) {
          text = ' '
        } else if (this.perListLoadFlag === 0) {
          text = '加载中……'
        } else {
          text = '加载完毕'
        }
      } else {
        if (this.getlist.length < 10) {
          text = ' '
        } else if (this.perLoadFlag === 0) {
          text = '加载中……'
        } else {
          text = '加载完毕'
        }
      }
      return text
    },
    loadingTextSrh () {
      let text = ' '
      if (this.listdata.length < 10) {
        text = ' '
      } else if (this.perLoadFlag === 0) {
        text = '加载中……'
      } else {
        text = '加载完毕'
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
      if (this.getlist.length < 10) {
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
      getOptionList(c, this.num, voteId, roundId).then((response) => {
        c++
        STATES.commit('setCounter', c)
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
        STATES.commit('reloadList', arr)
        done() // call done
      }, (response) => {
        console.log('error')
      })
    },
    onInfiniteSrh (done) {
      let vm = this
      let roundId = this.roundId
      let voteId = this.voteId
      let c = this.counterSrh
      let cityId = this.cityId
      let srhText = this.srhText
      if (srhText) {
        cityId = ''
      }
      // console.log('load')
      // console.log(c)
      // let arrSrh = this.getlist
      if (this.isSrh) {
        // console.log(123)
        done()
        return
      }
      vm.perLoadFlag = 0
      getList(c, this.num, voteId, roundId, srhText, cityId).then((response) => {
        c++
        // console.log(c)
        // console.log(response)
        // console.log(cityId)
        STATES.commit('setCounterSrh', c)
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
        STATES.commit('reloadSearchList', arr)
        // }, 1000)
        // console.log(arr)
        done() // call done
      }, (response) => {
        console.log('error')
      })
    },
    popup (data, optionId) {
      let roundId = this.roundId
      if (optionId) {
        getOption(optionId, roundId).then((res) => {
          let info = res.data.data
          this.$emit('listenToList', {
            type: data,
            poem: info.introduce || '',
            actor: info.author,
            addrs: info.city ? info.city.areaName : '',
            id: info.id,
            name: info.title,
            optionId: info.tickets.optionId,
            nums: info.tickets.voteCount
          })
          STATES.commit('showPopup')
        })
      }
    },
    govote (data, optionId) {
      let voteId = this.voteId
      if (optionId) {
        vote(optionId, voteId).then((res) => {
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
            this.$emit('listenToList', {
              type: 'tips',
              msg: {
                code: 0
              }
            })
          } else {
            this.$emit('listenToList', {
              type: 'tips',
              msg: {
                code: 1,
                msg: res.data.msg
              }
            })
          }
          STATES.commit('showPopup')
        })
      }
    },
    getFromPop () {
      this.ispopshow = false
    }
  },
  components: {
    'vscroll': Scroll,
    'vbtn': vbtn
  }
}
</script>
<style lang="less" scoped>
  @import "./../style/var";
  .m-player-list{
    width: 100%;
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
        background: url('../img/icon-up.png') no-repeat;
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
      background: url("./../img/btn-normal-c.png") no-repeat;
      background-size: 100% 100%;
      color: @color-font-light;
      border-radius: .2rem;
      line-height: 1.6;
      text-align: center;
      &.u-short{
        background: url("./../img/btn-small.png") no-repeat;
        background-size: 100% 100%;
        text-align: center;
        width: 1.2rem;
      }
    }
    .left{
      float: left;
      width: 45%;
      text-align: left;
      padding-left: .6rem;
      position: relative;
    }
    .right{
      float: left;
      width: 45%;
      margin-left: 5%;
      position: relative;
    }
    .u-title{
      margin-top: .05rem;
      width: 100%;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
    .m-btn-box{
      text-align: right;
    }
    &.z-lvl1{
      height: 2.6rem;
      background: url("./../img/bg-fst.png");
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
        background: url("./../img/btn-normal.png") no-repeat;
        background-size: 100% 100%;
        margin-top: 0
      }
      .u-numbers.u-short{
        width: 1.7rem;
        height: .95rem;
        padding-top: .25rem;
        padding-left: .43rem;
        background: url("./../img/btn-star.png");
        background-size: 100% 100%;
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
      .s-tips{
        font-size: .26rem;
        line-height: 2
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
      background: url("./../img/bg-snd.png");
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
      background: url("./../img/bg-thd.png");
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
