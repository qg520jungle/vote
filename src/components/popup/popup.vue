<template>
  <div class="dialog"
    v-show="ispopshow">
    <div class="cover">
      <transition name="fade">
        <div class="dialog-content" v-if="ispopshow">
          <slot></slot>
        </div>
      </transition>
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
    background-color: rgba(0, 0, 0, .7);
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
  }

  .fade-enter-active, .fade-leave-active {
    transition: transform .5s
  }
  .fade-enter, .fade-leave{
    transform: rotate(9deg) scale(.7, .7) translate(1.4rem);
  }
  .fade-enter-to, .fade-leave-to{
    transform: rotate(0deg) scale(1, 1)  translate(0);
  }
</style>
