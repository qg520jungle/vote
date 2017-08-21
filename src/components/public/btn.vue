<template>
  <div class="u-btn">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'btn',
  props: ['msg'],
  data () {
    return {
      title: '按钮'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "./../../style/var";
  .u-btn{
    font-size: .2rem;
    color: @color-btn;
  }
</style>
