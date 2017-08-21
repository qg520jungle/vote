<template>
  <div class="m-tab">
    <ul class="u-els f-cb">
      <li class="u-el" :class="{'z-act': item.act}" v-for="(item, index) in tabList" @click="tabClick(index, item.id)">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
import {STATES} from '@/vuex/state'
import vbtn from '../public/btn'
export default {
  name: 'tab',
  props: ['showList'],
  data () {
    return {
      title: '按钮',
      btn1: '完整诗歌',
      btn2: '投票'
    }
  },
  computed: {
    tabList () {
      return STATES.getters.getCityList
    }
  },
  methods: {
    tabClick (index, id) {
      this.$emit('listenToTab', index, id)
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
  .m-tab{
    width: 100%;
    height: .64rem;
    overflow-x: auto;
    border-left: .03rem solid @color-border;
    border-right: .03rem solid @color-border;
    .u-els{
      width: 100%;
      height: .64rem;
      background-color: @color-bg-dark;
      overflow-x: auto;
      font-size: 0;
      white-space: nowrap
    }
    .u-el{
      // float: left;
      display: inline-block;
      width: 16%;
      height: .64rem;
      font-size: .24rem;
      line-height: .64rem;
      color: @color-main;
      &.z-act{
        color: #333;
        background-color: @color-main;
        background: url("../../img/act.png");
        background-size: 100% 100%;
      }
    }
    .u-numbers{
      width: 1.6rem;
      margin: 0 auto;
      margin-top: .2rem;
      padding-top: .02rem;
      background: yellow;
      border-radius: .2rem;
      line-height: 1.6;
      margin-left: .2rem;
    }
    .u-cc{
      font-size: .2rem;
    }
  }
</style>
