<template>
  <div>
    <div class="m-exemplar f-cb">
      <div class="left">
        <i class="u-icon u-icon-h" ></i>
        <i class="u-icon u-icon-font-xsx" ></i>
        <p class="u-name">
          <span>{{ fst.actor }}</span>
          <span>{{ fst.addrs }}</span>
          <span>{{ fst.name }}</span>
        </p>
      </div>
      <div class="right">
        <div class="m-nums-show">
          <span class="s-tips" >荣誉得票数</span>
          <span class="u-icon u-icon-nums" >{{ fst.nums }}</span>
        </div>
        <div class="m-btn-box">
          <vbtn class="u-numbers u-btn-pop" :msg="exbtn1" @click.native="popup('poem', fst.optionId)"></vbtn>
          <vbtn class="u-numbers u-short u-btn-vote" :msg="exbtn2" @click.native="govote('tips', fst.optionId)"></vbtn>
        </div>
      </div>
    </div>
    <div class="m-vote-box">
      <ul class="u-vote-list f-cb">
        <li class="u-vote-el f-fl" v-for="el in listarr">
          <vel :elinfo="el" v-on:listenToEle="geteledata"></vel>
        </li>
      </ul>
      <span class="u-btn-detail" @click="showdetail"></span>
    </div>
    <div class="m-detail-info">
      <div class="u-title-box">
        <span class="u-title">
          <i class="u-line-left"></i>活动详情<i class="u-line-right"></i>
        </span>
      </div>
      <ul class="u-prize-list f-cb">
        <li class="u-prize-el">
          <img class="u-img" src="./../img/img-prize1.png" alt="">
          <span class="u-cc1">一等奖</span>
          <span class="u-cc2">APPLE IPAD 128G WIFI版及证书</span>
        </li>
        <li class="u-prize-el">
          <img class="u-img" src="./../img/img-prize2.png" alt="">
          <span class="u-cc1">二等奖</span>
          <span class="u-cc2">KINDLE PAPERWHITE3 电子书及证书</span>
        </li>
        <li class="u-prize-el">
          <img class="u-img" src="./../img/img-prize3.png" alt="">
          <span class="u-cc1">三等奖</span>
          <span class="u-cc2">Kindle 6英寸电子书 阅读器4G及证书</span>
        </li>
      </ul>
      <p class="u-prize-cc">前10名入围奖 “飘逸小诗人” 10名，奖励当当读书卡（价值200元）及2017小学生诗歌节网络人气奖入围证书及优秀辅导员证书</p>
      <div class="u-title-box">
        <span class="u-title">
          <i class="u-line-left"></i>活动规则<i class="u-line-right"></i>
        </span>
      </div>
      <p class="u-prize-rule">
        由天空城、南方+客户端联合主办的诗小仙争霸赛暨2017年小学生诗歌节线上票选活动正式开始啦！为你最心仪的小诗人投出宝贵一票，助力登顶诗歌江湖，成为小诗仙！
      </p>
      <p class="u-prize-rule">
        投票活动一共分3轮，第一轮共312篇作文参与，根据投票数选出前40名进入第二轮投票。第一轮投票将在9月中旬结束。具体日期及安排请识别下方二维码进群获取更多最新大赛消息。
      </p>
    </div>
    <div class="m-copy f-cb">
      <div class="left">
        <img class="u-img" src="./../img/wx-ewm.png" alt="">
        <span class="u-c">进群领红包哦</span>
      </div>
      <div class="right">
        <div class="u-host">
          <p class="u-c1">
            <span class="u-t">主办方:</span>
            <img class="u-img-nf" src="./../img/logo-nf.png" alt="">
            <img class="u-img-tkc" src="./../img/logo-tkc.png" alt="">
          </p>
          <p class="u-c2">比赛全部解释权归主办方所有</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vbtn from '@/components/public/btn'
import vel from '@/components/list/vel'
import { initShare } from '@/plugins/shareWx'
import {STATES} from '@/vuex/state'
import { getOption, vote } from '@/plugins/getData'
// import { getOptionList, getOption, vote } from '@/plugins/getData'

export default {
  name: 'detail',
  data () {
    return {
      exbtn1: '完整诗歌',
      exbtn2: '投票'
    }
  },
  computed: {
    islist () {
      return STATES.state.showListState
    },
    ispopshow () {
      return STATES.state.ispopshow
    },
    roundId () {
      return STATES.getters.getRoundId
    },
    voteId () {
      return STATES.getters.getVoteId
    },
    fst () {
      let arrList = STATES.getters.getList
      let obj = arrList.length > 0 ? arrList[0] : {}
      return obj
    },
    listarr () {
      let arrList = STATES.getters.getList
      let arr = []
      if (arrList.length > 0) {
        for (let i = 1; i < 5; i++) {
          arr.push(
            {
              name: arrList[i].name || '',
              actor: arrList[i].actor || '',
              addrs: arrList[i].addrs || '',
              nums: arrList[i].nums || 0,
              optionId: arrList[i].optionId || '',
              order: parseInt(i) + 1
            })
        }
      }
      return arr
    }
  },
  mounted () {
  },
  methods: {
    showdetail () {
      STATES.commit('showList')
    },
    popup (data, optionId) {
      let roundId = this.roundId
      if (optionId) {
        getOption(optionId, roundId).then((res) => {
          let info = res.data.data
          this.$emit('listenToDetail', {
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
            this.$emit('listenToDetail', {
              type: 'tips',
              msg: {
                code: 0
              }
            })
          } else {
            this.$emit('listenToDetail', {
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
    geteledata (data) {
      this.$emit('listenToDetail', data)
    },
    getFromPop () {
      this.ispopshow = false
    },
    initData () {
    },
    shareWx () {
      let shareData = {
        // 请求失败回调
        getShareFail: function () {},
        // 分享标题
        title: '分享标题',
        // 分享描述
        desc: '分享描述',
        // 分享图片地址
        iconUrl: 'http://lorempixel.com/860/380/technics',
        // 需要分享的路径，不传默认本页面
        shareUrl: ''
      }
      initShare(shareData)
    }
  },
  components: {
    'vbtn': vbtn,
    'vel': vel
  }
}
</script>

<style lang="less" scoped>
  @import "./../style/var";
  .m-exemplar{
    width: 7.2rem;
    // height: 2.35rem;
    margin: 0 auto;
    margin-top: .3rem;
    // background-color: #3355aa;
    height: 2.5rem;
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
          width: 1.6rem;
          height: .8rem;
          padding-top: .242rem;
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
      margin-top: .15rem;
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
      top: .02rem;
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
      font-size: .2rem;
      width: 3.2rem;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
      position: absolute;
    }
    .s-tips{
      font-size: .2rem;
      margin-bottom: .07rem;
      display: inline-block;
      color: #555;
    }
  }
  .m-vote-box{
    width: 7.2rem;
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
      width: 7.2rem;
      margin: 0 auto;
      margin-top: .36rem;
      text-align: center;
      font-size: 0;
    }
    .u-title{
      display: inline-block;
      font-size: .25rem;
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
      
      &:before{

      }
    }
    .u-prize-list{
      width: 7.2rem;
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
        font-size: .18rem;
        font-weight: 700;
        display: block;
        text-align: center;
      }
      .u-cc2{
        width: 1.8rem;
        margin: 0 auto;
        color: @color-main;
        line-height: 1.4;
        font-size: .18rem;
        display: block;
        text-align: center;
      }
    }
    .u-prize-cc{
      width: 6rem;
      margin: 0 auto;
      margin-top: .2rem;
      font-size: .2rem;
      line-height: 1.5;
      color: @color-main;
      text-align: center;
    }
    .u-prize-rule{
      width: 6rem;
      margin: 0 auto;
      margin-top: .2rem;
      font-size: .2rem;
      line-height: 1.5;
      color: @color-main;
      text-align: left;
    }
  }
  .m-copy{
    width: 7.2rem;
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
      // width: 3.2rem;
      margin-left: .45rem;
      text-align: left;
      padding-top: .65rem;
      .u-t{
        font-size: .18rem;
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
</style>
