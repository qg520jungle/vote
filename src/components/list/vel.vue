<template>
  <div class="m-list-el">
    <div class="u-el" :class="{'z-snd': elinfo.order === 2, 'z-thd': elinfo.order === 3}">
      <span class="tt">
        {{ elinfo.title }}
      </span>
      <span class="at">
        {{ elinfo.actor }}
      </span>
      <span class="nums">
        {{ elinfo.nums }}
      </span>
    </div>
    <div class="m-btn-box">
      <vbtn class="u-numbers u-btn-vote" :msg="btn2" @click.native="govote('tips', elinfo.optionId)"></vbtn>
    </div>
  </div>
</template>

<script>
import vbtn from '@/components/public/btn'
import {STATES} from '@/vuex/state'
import { initShare } from '@/plugins/shareWx'
import { vote } from '@/plugins/getData'
export default {
  name: 'list-el',
  props: ['elinfo'],
  data () {
    return {
      btn2: '为TA投票'
    }
  },
  computed: {
    roundId () {
      return STATES.getters.getRoundId
    },
    voteId () {
      return STATES.getters.getVoteId
    }
  },
  methods: {
    showdetail () {
      STATES.commit('showList')
    },
    popup (data) {
      this.$emit('listenToDetail', data)
      STATES.commit('showPopup')
    },
    getFromPop () {
      this.ispopshow = false
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
            this.$emit('listenToEle', {
              type: 'tips',
              msg: {
                code: 0
              }
            })
          } else {
            this.$emit('listenToEle', {
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
    vbtn
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "./../../style/var";
  .u-el{
    width: 1.55rem;
    height: 1.55rem;
    margin: 0 auto;
    border: .01rem solid @color-main;
    background-color: @color-bg-dark;
    color: @color-font-light;
    .tt,.at,.nums{
      display: block;
      font-size: .18rem;
    }
    .tt{
      height: .85rem;
      padding-top: .16rem;
    }
    .at{
      height: .4rem;
    }
    .nums{
      height: .3rem;
      border-top: .01rem solid @color-main;
    }
    &.z-snd{
      background: url("../../img/bg-snd-s.png");
      background-size: 100% 100%;
      color: #333;
    }
    &.z-thd{
      background: url("../../img/bg-thd-s.png");
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
      width: 1.4rem;
      height: .44rem;
      margin: 0 auto;
      margin-top: .27rem;
      padding-top: .02rem;
      background: url("../../img/btn-vote.png") no-repeat;
      background-size: 100% 100%;
      color: @color-font-light;
      border-radius: .2rem;
      line-height: 1.6;
    }
  }
</style>
