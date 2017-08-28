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
      STATES.commit('setSrhCityId', id)
      STATES.commit('setSrhText', '')
      STATES.commit('setInfiniteLoading', false)
      STATES.commit('setCounterSrh', 2)
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
    height: .66rem;
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
      width: 18%;
      height: .64rem;
      font-size: .28rem;
      line-height: .64rem;
      color: @color-main;
      &.z-act{
        color: #333;
        background-color: #fff1a7;
        position: relative;
        &:before{
          content: " ";
          display: block;
          position: absolute;
          top: 0;
          width: 100%;
          box-shadow: 0 0 0.2rem 0.03rem #333;
        }
        &:after{
          content: " ";
          display: inline-block;
          width: 0;
          height: 0;
          border-top: .05rem solid transparent;
          border-left: .06rem solid transparent;
          border-right: .06rem solid #333;
          border-bottom: .05rem solid transparent;
          vertical-align: middle;
          margin-left: .01rem;
        }
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
