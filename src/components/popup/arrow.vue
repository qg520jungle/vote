<template>
  <div class="m-arrow" @click="popdown">
    <div class="u-arrow-box">
      <span class="u-c">分享诗歌出去</span>
      <span class="u-c s-main">为TA拉票涨人气！</span>
      <i class="u-icon u-icon-arrow"></i>
    </div>
  </div>
</template>

<script>
import {STATES} from '@/vuex/state'
export default {
  name: 'arrow',
  data () {
    return {
      title: '投票成功',
      titleFalse: '失败',
      msg: '已经为他增加荣誉票数',
      msgFalse: '投票失败'
    }
  },
  computed: {
  },
  methods: {
    popdown: function () {
      STATES.commit('hidePopup')
    }
  },
  components: {
  }
}
</script>

<style lang="less" scoped>
  @import "../../style/var";
  .m-arrow{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    .u-arrow-box{
      position: absolute;
      width: 40%;
      top: .6rem;
      right: .3rem;
      .u-c{
        display: block;
        font-size: .3rem;
        color: #fff;
        font-weight: 500;
      }
      .s-main{
        color: @color-font-lighter;
      }
    }
    .u-icon-arrow{
      background: url("../../img/icon-arrow.jpg") no-repeat;
      background-size: 100% 100%;
      width: .5rem;
      height: .5rem;
      position: absolute;
      top: -.2rem;
      right: .5rem;
    }
  }
</style>
