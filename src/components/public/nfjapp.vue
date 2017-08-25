<template>
  <div class="uploadtip" v-show="isshow">
    <div class="aboutword">
      <img class="logo" src="http://static.nfapp.southcn.com/app/nanfang_logo.png" alt="">
      <span class="slogan">
        <span>创造更多价值</span><br>
        <span>更多精彩尽在南方<sup>+</sup>客户端</span>
      </span>
      <span class="close" @click="hide">×</span>
        <span class="upload" @click="loadApp">点击打开</span>
    </div>
  </div>
</template>

<script>
import { openApp } from '@/plugins/loadApp'
export default {
  name: 'nfj',
  props: ['elinfo'],
  data () {
    return {
      title: '南方+ app',
      isshow: true
    }
  },
  computed: {
  },
  methods: {
    hide () {
      this.isshow = false
    },
    loadApp () {
      openApp(12, false, true, 'http://test2.nfapp.southcn.com/zhxg/vote/index.html#/', 'http://test2.nfapp.southcn.com/zhxg/vote/index.html#/')
    }
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "./../../style/var";
  .uploadtip{
    background: rgba(0,0,0,0.8);
    position: fixed;
    bottom: 0;
    width: 100%;
    height:1.1rem;
    text-align: center;
    color:#fff;
    /*padding: 0.2rem 0;*/
  }
  .uploadtip .logo{
    width:0.7rem;
    height:0.7rem;
    border-radius: 5px;
    float: left;
    margin: 0 0.2rem;
  }
  .uploadtip .slogan{
    float: left;
    text-align: left;
    font-size: 0
  }
  .uploadtip .upload{
    display: inline-block;
    width:1.3rem;
    height:0.5rem;
    border-radius: 5px;
    background:#f83c41;
    font-size:0.24rem;
    line-height: 0.5rem;
    text-align:center;
    color:#fff;
    margin-top: 0.1rem;
    float: right;
  }
  .uploadtip .aboutword{
    padding: 0.2rem 0;
    height: 0.7rem;
  }
  .uploadtip .slogan span:first-child {
    color: #fff;
    font-size: 0.28rem;
  }
  .uploadtip .slogan span:nth-of-type(2) {
    font-size: 0.24rem;
    color: #aaa;
  }
  .uploadtip sup {
    vertical-align: super;
    font-size: smaller;
  }
  .uploadtip .close {
    color: #fff;
    font-size: 0.4rem;
    float: right;
    outline: 0;
    float: right;
    margin: 0.05rem 0.1rem;
    float:right;
  }
</style>
