<template>
  <div class="dialog"
    v-show="ispopshow">
    <div class="cover">
      <transition name="fade">
        <div class="dialog-content" v-if="ispopshow">
          <slot></slot>
        </div>
      </transition>
      <div :class="{'u-lighting': !istips}"></div>
    </div>
  </div>
</template>

<script>
import {STATES} from '@/vuex/state'
export default {
  data () {
    return {
    }
  },
  mounted: function () {
  },
  computed: {
    ispopshow () {
      return STATES.state.ispopshow
    },
    istips () {
      return STATES.getters.getIstips
    }
  },
  methods: {
    popdown: function () {
      STATES.commit('hidePopup')
    }
  }
}
</script>

<style lang="less" scoped>
  .cover {
    width: 100%;
    height: 100%;
    position: fixed;
    overflow: hidden;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .9);
  }
  .u-lighting{
    position: absolute;
    left: 50%;
    margin-left: -2.8rem;
    height: 5.6rem;
    width: 5.6rem;
    border-radius: 2.8rem;
    background: rgba(39, 87, 121, .8);
    box-shadow: 0 0 2.8rem 1.6rem #275779;
    bottom: -6rem;
  }
  .dialog {
    position: fixed;
    width: 100%;
    height: 100%;
  }

  .dialog-content {
    position: relative;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }

  .fade-enter-active, .fade-leave-active {
    transition: transform .5s
  }
  .fade-enter, .fade-leave{
    transform: scale(.7, .7) translate(1.4rem);
  }
  .fade-enter-to, .fade-leave-to{
    transform: scale(1, 1)  translate(0);
  }
</style>
