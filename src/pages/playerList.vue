<template>
  <div>
    <vscroll :on-refresh="onRefresh" :on-infinite="onInfinite" :loading-text="loadingText" :isTexthide="isshow">
      <ul class="u-list-box">
        <li v-show="isshow" class="u-list l2"  :class="{'z-lvl1': item.lvl === 1,'z-lvl2': item.lvl === 2,'z-lvl3': item.lvl === 3}" v-for="(item,index) in getlist" >
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
        <li v-show="!isshow" class="u-list f-cb" :class="{'z-lvl1': item.lvl === 1,'z-lvl2': item.lvl === 2,'z-lvl3': item.lvl === 3}" v-for="(item,index) in listdata" >
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
        <li v-show="!isshow" class="u-list l2" v-for="(item,index) in downdata" >
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
  </div>
</template>
<script>
import {STATES} from '@/vuex/state'
import Scroll from '@/components/list/scroll'
import vbtn from '@/components/public/btn'
import { getOptionList, getOption, vote } from '@/plugins/getData'

export default{
  data () {
    return {
      title: '入围选手信息',
      counter: 2, // 默认已经显示出15条数据 count等于一是让从16条开始加载
      num: 10,  // 一次显示多少条
      pageStart: 0, // 开始页数
      pageEnd: 0, // 结束页数
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
      return STATES.getters.getSearchList
    },
    roundId () {
      return STATES.getters.getRoundId
    },
    voteId () {
      return STATES.getters.getVoteId
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
      if (this.listdata.length < 10) {
        text = ' '
      } else if (this.perLoadFlag === 0) {
        text = '加载中……'
      } else {
        text = '加载完毕'
      }
      return text
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
    onInfinite (done) {
      let vm = this
      let roundId = this.roundId
      let voteId = this.voteId
      getOptionList(this.counter, this.num, voteId, roundId).then((response) => {
        vm.counter++
        vm.pageEnd = vm.num * vm.counter
        vm.pageStart = vm.pageEnd - vm.num
        vm.perLoadFlag = 0
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
        STATES.commit('reloadList', arr)
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
<style lang="less">
  @import "./../style/var";
  .u-list-box{
    width: 100%;
    padding: .15rem;
  }
  .u-list{
    font-size: .2rem;
    width: 100%;
    height: .72rem;
    margin-bottom: .25rem;
    background-color: @color-bg-dark;
    border: .03rem solid @color-border;
    color: @color-font-light;
    &:last-child{
      margin-bottom: 0;
    }
    .u-numbers{
      width: 1.6rem;
      height: .44rem;
      margin: 0 auto;
      margin-top: .11rem;
      margin-bottom: .14rem; 
      padding-top: .02rem;
      background: url("./../img/btn-normal.png") no-repeat;
      background-size: 100% 100%;
      color: @color-font-light;
      border-radius: .2rem;
      line-height: 1.6;
      &.u-short{
        width: 1rem;
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
    }
    &.z-lvl1{
      height: 2.5rem;
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
      .u-numbers.u-short{
        width: 1.6rem;
        height: .8rem;
        padding-top: .242rem;
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
        margin-top: .22rem;
        left: 0;
      }
      .s-tips{
        font-size: .2rem;
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
        top: .02rem;
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
    }
    &.z-lvl2{
      color: #333;
      background: url("./../img/bg-snd.png");
      background-size: 100% 100%;
      .u-name{
        color: #9e9e9e;
      }
    }
    &.z-lvl3{
      color: #333;
      background: url("./../img/bg-thd.png");
      background-size: 100% 100%;
      .u-name{
        color: #a2975f;
      }
    }
  }
</style>
