<template>
  <div class="m-poem">
    <div class="u-poem-paper">
      <div class="m-poem-head">
        <span class="u-t">他已经获得的荣誉投票</span>
        <span class="u-nums">{{ info.nums }}</span>
      </div>
      <div class="m-poem-body" ref="poemBody">
        <span class="u-t">{{ info.name }}</span>
        <span class="u-artor"> {{ info.actor }} {{ info.addrs }}</span> 
        <div class="u-poem" v-html="info.poem">
        </div>
      </div>
    </div>
    <div class="m-poem-footer">
      <div class="m-btn-box">
        <vbtn class="u-numbers u-btn-back" :msg="backbtn1" @click.native="popdown"></vbtn>
        <vbtn class="u-numbers u-btn-vote" :msg="votebtn2" @click.native="govote"></vbtn>
      </div>
    </div>
    <div v-show="isupsign" class="u-icon-box">
      <i class="u-icon u-icon-up"></i>
      <span class="u-cc">
        滑动阅读
      </span>
    </div>
  </div>
</template>

<script>
import {STATES} from '@/vuex/state'
import vbtn from '@/components/public/btn'
export default {
  name: 'poem',
  data () {
    return {
      title: '选手详情',
      backbtn1: '返回列表',
      votebtn2: '投票',
      votenums: 10000,
      isupsign: true
    }
  },
  computed: {
    info: function () {
      let d = this.poem
      d.poem = d.poem ? d.poem : '当我们是“东亚病夫”，我们被称为“黄祸”。<br>          当我们被宣传为下一个“超级强国”，我们被称为“威胁”。<br>          当我们关上门户，你们走私毒品来打开市场。<br>          当我们拥抱自由贸易，你们指责我们夺走你们的工作。<br>          当我们分裂成碎片，你们的军队操进来想分一份。<br>          当我们想把碎片拼回，你们叫嚣“这是入侵，西藏自由”。<br>          当我们试行共产主义，你们恨我们是共产党人。<br>          当我们拥抱资本主义，你们恨我们是资本家。<br>          当我们有十亿人，你们说我们正毁灭地球。<br>          当我们尝试控制人口，你们说我们侵犯人权。<br>          当我们穷，你们认为我们是狗。<br>          当我们借钞票给你们，你们指责我们令你们国家负债。<br>          当我们建立我们的工业，你们称我们为“污染国”。<br>          当我们向你们出售商品，你们指责我们令地球暖化。<br>          当我们购买石油，你们称之为剥削和种族灭绝。<br>          当你们为石油而开战，你们称之解放。<br>          当我们迷失于混乱和狂躁，你们要求法治。<br>          当我们捍卫法治打击暴乱，你们称之违反人权。<br>          当我们沉默，你们说希望我们有言论自由。<br>          当我们不再沉默，你们说我们是被洗脑的仇外者。<br>          为什么你们如此恨我们，我们问。<br>          不，你们回答，我们不恨你们。<br>          我们也不恨你们，但，你们明白我们吗？<br>          我们当然明白，你们说，<br>          我们有法新社、CNN、BBC……<br>          其实你们想从我们这儿得到什么？<br>          想清楚，再回答……<br>          因为你们只获得这么多的机会。<br>          够了够了，这同一个世界已够虚伪。<br>          我们要的是同一个世界、同一个梦想和世界和平。<br>          这个蓝色大地球大得足以容纳我们所有人。<br>'
      d.name = d.name ? d.name : '作品名'
      d.nums = d.nums ? d.nums : 0
      d.actor = d.actor ? d.actor : '作者'
      d.addrs = d.addrs ? d.addrs : '地址'
      d.id = d.id ? d.id : -1
      d.optionId = d.optionId ? d.optionId : -1
      return d
    }
  },
  mounted () {
    let flag = true
    let el = this.$refs.poemBody
    if (el.scrollHeight > el.clientHeight) {
      flag = true
    } else {
      flag = false
    }
    this.isupsign = flag
  },
  props: ['poem'],
  methods: {
    popdown: function () {
      STATES.commit('hidePopup')
    },
    govote: function () {
      let voteId = STATES.getters.getVoteId
      let tips = {
        data: 'tips',
        msg: {
          code: 1,
          optionId: this.info.optionId,
          voteId: voteId
        }
      }
      this.$emit('listenToTips', tips)
    }
  },
  components: {
    'vbtn': vbtn
  }
}
</script>

<style lang="less" scoped>
  @import "../../style/var";
  .m-poem{
    background-color: @color-main;
    padding: .2rem;
    text-align: center;
    width: 100%;
    height: 80%;
    position: absolute;
    top: 0;
    padding-top: 1.08rem;
    /*left: 50%1
    margin-left: -2.85rem;*/
    background: url("../../img/bd-pop.png");
    background-size: 100% 100%;
    /*margin-top: -5rem;*/
  }
  .u-poem-paper{
    height: 100%;
    width: 5.4rem;
    margin: 0 auto;
    background: url("../../img/bg-pop.png");
    background-size: 100% 100%;
    position: relative;
  }
  .m-poem-head{
    padding-top: .2rem;
    height: 16%;
    .u-t{
      display: block;
      text-align: center;
      font-size: .24rem;
      margin-bottom: .14rem;
    }
    .u-nums{
      display: block;
      text-align: center;
      width: 3rem;
      height: .8rem;
      margin: 0 auto;
      background: url("../../img/bg-nums.png");
      background-size: 100% 100%;
      font-size: .64rem;
      color: #fae997;
      font-weight: 100;
      font-family: Avenir-Light;
      /*border: .03rem solid @color-main;*/
    }
  }
  .m-poem-body{
    height: 68%;
    margin-top: 6%;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 1rem;
    overflow-y: auto;
    ::-webkit-scrollbar{
      width: .05rem;
      height: .05rem;
      background-color: #fff;
    }  
    ::-webkit-scrollbar:hover{
      background-color: #eee;
    }  
    ::-webkit-resizer{}  
    ::-webkit-scrollbar-thumb{
      -webkit-border-radius: .04rem;
      background-color: #ccc;
      height: .1rem;
    }  
    ::-webkit-scrollbar-thumb:hover{
      background-color: #aaa;
    }  
    ::-webkit-scrollbar-thumb:active{
      background-color: #888;
    }
    .u-t{
      font-size: .4rem;
      font-family: cursive;
      font-weight: 500;
      display: block;
      text-align: center;
    }
    .u-artor{
      font-size: .26rem;
      font-family: cursive;
      display: block;
      text-align: center;
      margin-top: .18rem;
      margin-bottom: .28rem;
    }
    .u-poem{
      font-size: .26rem;
      line-height: 2
    }
  }
  .m-poem-footer{
    width: 100%;
    position: absolute;
    bottom: -1rem;
    margin-left: -.2rem;
  }
  .u-btn-back{
    width: 2rem;
    height: .6rem;
    padding-top: .05rem;
    background: url("./../../img/btn-back.png") no-repeat;
    background-size: 100% 100%;
    color: @color-font-light;
  }
  .u-btn-vote{
    width: 1.9rem;
    height: 1rem;
    padding-top: .31rem;
    padding-left: .62rem;
    background: url("./../../img/btn-vote-star.png") no-repeat;
    background-size: 100% 100%;
    color: @color-font-light;
  }
  .u-icon-box{
    position: absolute;
    bottom: .2rem;
    width: 3rem;
    height: .2rem;
    left: 50%;
    font-size: 0;
    margin-left: -1.5rem;
    text-align: center;
    .u-icon-up{
      display: inline-block;
      width: .7rem;
      height: .35rem;
      background: url('../../img/icon-up2.png') no-repeat;
      background-size: 100%;
      position: absolute;
      left: 50%;
      margin-left: -.35rem;
      top: -.5rem;
      animation: iconup .8s ease infinite;
    }
    .u-cc{
      margin-top: .05rem;
      display: block;
      color: #615732;
      text-align: center;
      width: 100%;
      display: block;
      font-size: .24rem;
      position: absolute;
      top: -.3rem;
    }
  }
  @keyframes iconup{
    0% {
      top: -.5rem;
    }
    100% {
      top: -.8rem;
    }
  }
</style>