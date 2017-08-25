<template>
  <div id="app" :class="{'f-ov-h': ispopshow}">
    <router-view></router-view>
  </div>
</template>

<script>
import {STATES} from '@/vuex/state'
export default {
  name: 'app',
  computed: {
    ispopshow () {
      return STATES.state.ispopshow
    }
  },
  components: {
  }
}
</script>

<style lang="less" scoped>
  .f-ov-h{
    overflow: hidden;
  }
</style>
