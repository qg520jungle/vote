<template>
  <div class="m-tips" @click="popdown">
    <div class="u-bd-tips" >
      <span class="u-tip-t">
        {{ tip.title }}
      </span>
      <span class="u-tip-c">
        {{ tip.msg }}
      </span>
    </div>
  </div>
</template>

<script>
import {STATES} from '@/vuex/state'
export default {
  name: 'tips',
  data () {
    return {
      title: '投票成功',
      titleFalse: '失败',
      msg: '已经为他增加荣誉票数',
      msgFalse: '投票失败'
    }
  },
  computed: {
    tip: function () {
      let obj = {
        title: this.title,
        msg: this.msg
      }
      if (this.tipsMsg.code === 0) {
        obj.title = this.title
        obj.msg = this.tipsMsg.msg || this.msg
      } else if (this.tipsMsg.code === 1) {
        obj.title = this.titleFalse
        obj.msg = this.tipsMsg.msg || this.msgFalse
      } else {
        obj.title = this.tipsMsg.title
        obj.msg = this.tipsMsg.msg
      }
      return obj
    }
  },
  props: ['tipsMsg'],
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
  .m-tips{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    .u-bd-tips{
      display: inline-block;
      width: 3.9rem;
      height: 1rem;
      position: absolute;
      top: 35%;
      left: 50%;
      margin-left: -1.95rem;
      background: url("../../img/bd-tips.png");
      background-size: 100% 100%;
      .u-tip-t{
        margin-top: .18rem;
        display: block;
        text-align: center;
        font-size: .26rem;
        color: @color-font-lighter;
      }
      .u-tip-c{
        display: block;
        text-align: center;
        font-size: .2rem;
        color: @color-font-dack;
      }
    }
  }
</style>
