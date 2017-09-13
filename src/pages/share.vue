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
        <!-- <vbtn class="u-numbers" :msg="btn1" @click.native="loadApp"></vbtn> -->
        <vbtn class="u-numbers" :msg="btn2msg + btn2 + '人'" @click.native="loadApp"></vbtn>
      </div>
    </div>
    <div class="m-showdetail" key="detail">
      <div class="m-exemplar f-cb">
        <div class="left" :class="{'f-left-hasId': hasId}">
          <i class="u-icon u-icon-h" ></i>
          <i class="u-icon u-icon-font-xsx" v-if="!hasId"></i>
          <p class="s-author" v-else>{{ fst.actor }}</p>
          <p class="u-name">
            <span v-show="!hasId">{{ fst.actor }}</span>
            <span>{{ fst.addrs }}</span>
            <span>{{ fst.name }}</span>
          </p>
        </div>
        <!-- <div class="left" v-else>
          <i class="u-icon u-icon-h" ></i>
          <p class="s-author">作者</p>
          <p class="u-name">
            <span>{{ fst.actor }}</span>
            <span>{{ fst.addrs }}</span>
            <span>{{ fst.name }}</span>
          </p>
        </div> -->
        <div class="right">
          <div class="m-nums-show">
            <span class="s-tips" >荣誉得票数</span>
            <span class="u-icon u-icon-nums" >{{ fst.nums }}</span>
          </div>
          <div class="m-btn-box" v-if="!hasId">
            <vbtn class="u-numbers u-btn-pop" :msg="exbtn1" @click.native="loadApp"></vbtn>
            <vbtn class="u-numbers u-short u-btn-vote" :msg="exbtn2" @click.native="loadApp"></vbtn>
          </div>
          <div class="m-tips" v-else>
            <span class="u-c">我的心水小诗仙，</span>
            <span class="u-c">快来为TA助力</span>
          </div>
        </div>
      </div>
      <div class="u-poem-info" v-html="fst.poem" v-show="hasId" ref="sharepoemBody">
      </div>
      <div v-if="isupsign" class="u-icon-box-jump">
        <!-- <i class="u-icon u-icon-up"></i>
        <span class="u-cc">
          滑动阅读
        </span> -->
        <i class="u-icon u-icon-jump"></i>
      </div>
      <div class="m-vote-box" >
        <ul class="u-vote-list f-cb" v-show="!hasId">
          <li class="u-vote-el f-fl" v-for="el in listarr">
            <div class="m-list-el">
              <div class="u-el" :class="{'z-snd': el.order === 2, 'z-thd': el.order === 3}">
                <span class="tt">
                  【{{ el.title }}】
                </span>
                <span class="at">
                  {{ el.actor }}
                </span>
                <span class="nums">
                  {{ el.nums }}
                </span>
              </div>
              <div class="m-btn-box">
                <vbtn class="u-numbers u-btn-vote" :msg="shareBtn2" @click.native="loadApp"></vbtn>
              </div>
            </div>
          </li>
        </ul>
        <span class="u-btn-detail" :class="{'f-btn-detail-hasid': hasId}" @click="loadApp"></span>
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
        <p class="u-prize-cc">前10名入围奖 “飘逸小诗人” 10名，奖励当当读书卡（价值200元）及2017小学生诗歌节网络人气奖入围证书</p>
        <div class="u-title-box">
          <span class="u-title">
            <i class="u-line-left"></i>活动规则<i class="u-line-right"></i>
          </span>
        </div>
        <p class="u-prize-rule">
          由天空城、南方+客户端联合主办的小诗仙争霸赛暨2017年小学生诗歌节线上票选活动正式开始啦！为你最心仪的小诗人投出宝贵一票，助力登顶诗歌江湖，成为小诗仙！
        </p>
        <p class="u-prize-rule">
          投票活动一共分为4轮，本轮共393篇作品参与，根据投票数选出前40名进入第二轮投票。第一轮投票将在9月中旬前后结束。具体日期及安排请截图并识别下方二维码进群获取更多最新大赛消息。
        </p>
          <!-- 由天空城、南方+客户端联合主办的小诗仙争霸赛暨2017年小学生诗歌节线上票选活动正式开始啦！为你最心仪的小诗人投出宝贵一票，助力登顶诗歌江湖，成为小诗仙！
        </p>
        <p class="u-prize-rule">
          投票活动一共分3轮，第一轮共312篇作文参与，根据投票数选出前40名进入第二轮投票。第一轮投票将在9月中旬结束。具体日期及安排请识别下方二维码进群获取更多最新大赛消息。
        </p> -->
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
    <nfj v-show="false" class="m-nfj"></nfj>
  </div>
</template>

<script>
import {STATES} from '@/vuex/state'
import { initShare } from '@/plugins/shareWx'
import { openApp } from '@/plugins/loadApp'
import vbtn from '@/components/public/btn'
import nfj from '@/components/public/nfjapp'
import { getDetails, getOptionList, getOption } from '@/plugins/getData'

export default {
  name: 'share',
  data () {
    return {
      title: '分享页',
      deadline: 0,
      startline: 0,
      round: 0,
      isend: 0,
      isstart: 0,
      btn1: '活动详情',
      btn2: ' 312',
      exbtn1: '完整诗歌',
      exbtn2: '投票',
      fst: {},
      listarr: [],
      shareBtn2: '为TA投票',
      forTa: true
    }
  },
  computed: {
    btn2msg () {
      let msg = '候选人数'
      if (this.forTa) {
        msg = '进阶人数'
      }
      return msg
    },
    hasId () {
      let query = this.$route.query
      let flag = false
      if (query.optionId) {
        flag = true
      }
      return flag
    },
    isupsign () {
      // let flag = true
      let flag = false
      if (this.fst.poem) {
        let el = this.$refs.sharepoemBody
        console.log(el)
        if (el && (el.scrollHeight > el.clientHeight)) {
          flag = true
        } else {
          flag = false
        }
      }
      // console.log(flag)
      return flag
    }
  },
  mounted () {
    console.log(this.$route.query)
    let query = this.$route.query
    console.log(query.optionId)
    this.initData(query.optionId)
  },
  methods: {
    initData (optionId) {
      this.shareWx()
      // let that = this
      let voteId = STATES.getters.getVoteId
      // let roundId = STATES.getters.getRoundId
      // let round = STATES.getters.getRound
      getDetails(voteId).then(res => {
        this.btn2 = res.data.data.contestantNum || 0
        let round = res.data.data.roundNum || 0
        this.round = round
        let roundId = res.data.data.round.id || 0
        let now = res.data.data.nowDate
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
        this.deadline = dl
        this.startline = sl
        // 获得第一页列表
        // 获得第一页初始数据
        if (optionId) {
          console.log(optionId)
          // let roundId = STATES.getters.getRoundId
          getOption(optionId, roundId).then((res) => {
            let info = res.data.data
            this.fst = info ? {
              order: 1,
              poem: info.introduce || '',
              actor: info.author,
              addrs: info.city ? info.city.areaName : '',
              id: info.id,
              name: info.title,
              optionId: info.tickets.optionId,
              nums: info.tickets.voteCount
            } : {}
          })
        } else {
          getOptionList(1, 10, voteId, roundId).then(res => {
            let arrList = res.data.data
            let arr = []
            if (arrList.length > 0) {
              for (let i = 1; i < 5 && i < arrList.length; i++) {
                arr.push(
                  {
                    name: arrList[i].title || '',
                    actor: arrList[i].author || '',
                    title: arrList[i].title || '',
                    addrs: arrList[i].city ? arrList[i].city.areaName : '',
                    nums: arrList[i].tickets ? arrList[i].tickets.voteCount : 0,
                    id: arrList[i].tickets ? arrList[i].tickets.id : '',
                    optionId: arrList[i].tickets ? arrList[i].tickets.optionId : '',
                    order: parseInt(i) + 1
                  })
              }
            }
            this.fst = arrList.length > 0 ? {
              name: arrList[0].title || '',
              actor: arrList[0].author || '',
              addrs: arrList[0].city ? arrList[0].city.areaName : '',
              nums: arrList[0].tickets ? arrList[0].tickets.voteCount : 0,
              id: arrList[0].tickets ? arrList[0].tickets.id : '',
              optionId: arrList[0].tickets ? arrList[0].tickets.optionId : '',
              order: parseInt(0) + 1
            } : {}
            this.listarr = arr
          })
        }
      })
    },
    shareWx () {
      let shareData = {
        // 请求失败回调
        getShareFail: function () {},
        // 分享标题
        title: '小诗仙争霸赛开始啦！',
        // 分享描述
        desc: '赢取丰厚万元奖品，等你一起助力小诗仙起飞！票选你心中的小诗仙。',
        // 分享图片地址
        iconUrl: 'http://static.nfapp.southcn.com/app/nanfang_logo.png',
        // 需要分享的路径，不传默认本页面
        // shareUrl: 'https://static.nfapp.southcn.com/hd/poetryVote/index.html#/share'
        shareUrl: 'http://test2.nfapp.southcn.com/zhxg/vote/index.html#/share'
      }
      initShare(shareData)
    },
    loadApp () {
      openApp(12, false, true, 'https://static.nfapp.southcn.com/hd/poetryVote/index.html#/', 'https://static.nfapp.southcn.com/hd/poetryVote/index.html#/')
    }
  },
  components: {
    'vbtn': vbtn,
    'nfj': nfj
  }
}
</script>

<style lang="less" scoped>
  @import "./../style/var";
  .m-index{
    text-align: center;
    background-color: #333;
    position: relative;
  }
  .m-nfj{
  }
  .m-showdetail{
    width: 100%;
    display: inline-block;
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
      &.f-left-hasId{
        padding-top: .55rem;
      }
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
      .m-tips{
        .u-c{
          font-size: .22rem;
          display: block;
          text-align: center;
        }
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
    .s-author{
      font-size: .8rem;
      text-align: center;
      padding-left: .6rem;
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
  .u-poem-info{
    height: 4rem;
    width: 96%;
    margin: 0 auto;
    background-image: url("./../img/bd-poem-info.png"), url("./../img/bg-bang.png"); 
    background-repeat: no-repeat;
    background-size: 100% 100%, 35%;
    background-position: 0 0,100% 100%;
    padding-bottom: .4rem;
    padding-left: .2rem;
    padding-right: .2rem;
    padding-top: .2rem;
    color: @color-font-light;
    font-size: .26rem;
    overflow-y: auto;
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
      &.f-btn-detail-hasid{
        width: 5rem;
        background: url("./../img/btn-detail-hasid.png");
        background-size: 100% 100%;
        margin-top: -.5rem;
      }
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
  .u-icon-box-jump{
    position: relative;
    top: -2rem;
    width: .5rem;
    height: 0;
    // right: .2rem;
    left: 50%;
    font-size: 0;
    margin-left: 48%;
    text-align: center;
    .u-icon-jump{
      display: inline-block;
      width: .5rem;
      height: 1.5rem;
      background: url('./../img/icon-jump.png') no-repeat;
      background-size: 100%;
      position: absolute;
      right: .7rem;
      top: 0;
      margin-top: -.35rem;
      animation: iconjump .8s ease infinite;
    }
  }
</style>
