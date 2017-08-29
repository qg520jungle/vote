<template>
  <div class="m-info">
    <div class="u-info-paper">
      <div class="m-info-head">
      </div>
      <div class="m-info-body">
        <div class="u-detail">
          <span class="u-t">活动详情</span>
          <span class="u-c">
            <p class="cc">
              由天空城、南方+客户端联合主办的小诗仙争霸赛暨2017年小学生诗歌节线上票选活动正式开始啦！为你最心仪的小诗人投出宝贵一票，助力登顶诗歌江湖，成为小诗仙！
            </p>
            <p class="cc">
              投票活动一共分为4轮，本轮共393篇作品参与，根据投票数选出前40名进入第二轮投票。第一轮投票将在9月中旬前后结束。具体日期及安排请截图并识别下方二维码进群获取更多最新大赛消息。
            </p>
            <!--   由天空城、南方+客户端联合主办的小诗仙争霸赛暨2017年小学生诗歌节线上票选活动正式开始啦！为你最心仪的小诗人投出宝贵一票，助力登顶诗歌江湖，成为小诗仙！
            </p>
            <p class="cc">
              投票活动一共分3轮，第一轮共312篇作文参与，根据投票数选出前40名进入第二轮投票。第一轮投票将在9月中旬结束。具体日期及安排请识别下方二维码进群获取更多最新大赛消息。
            </p> -->
          </span>
          <div class="u-img-box">
            <img class="img" src="../../img/wx-ewm.png" alt="">
            <span class="cc">进群领红包哦!</span>
          </div>
        </div>
        <div class="">
          <span class="u-t">奖励设置</span>
          <span class="u-c">
            <p class="cc">奖励设置分四个等级：</p>
            <div class="m-prize-box f-cb">
              <div class="left">
                <img class="u-img-h" src="../../img/icon-fst-h.png" alt="">
              </div>
              <div class="right">
                <p class="cc">
                  人气小诗仙(一等奖) * 1
                </p>
                <p class="cc">
                  APPLE IPAD 128G WIFI版及证书
                </p>
              </div>
            </div>
            <div class="u-img-box">
              <img class="u-img-prize" src="../../img/img-prize1.png" alt="">
            </div>
            <div class="m-prize-box f-cb">
              <div class="left">
                <img class="u-img-h" src="../../img/icon-snd-h.png" alt="">
              </div>
              <div class="right">
                <p class="cc">
                  才气小诗圣(二等奖) * 3
                </p>
                <p class="cc">
                  KINDLE PAPERWHITE3 电子书及证书
                </p>
              </div>
            </div>
            <div class="u-img-box">
              <img class="u-img-prize" src="../../img/img-prize2.png" alt="">
            </div>
            <div class="m-prize-box f-cb">
              <div class="left">
                <img class="u-img-h" src="../../img/icon-thd-h.png" alt="">
              </div>
              <div class="right">
                <p class="cc">
                  荣耀小诗王(三等奖) * 5
                </p>
                <p class="cc">
                  Kindle 6英寸电子书 阅读器4G及证书
                </p>
              </div>
            </div>
            <div class="u-img-box">
              <img class="u-img-prize" src="../../img/img-prize3.png" alt="">
            </div>
            <div class="m-prize-box f-cb">
              <div class="left">
                <img class="u-img-h" src="../../img/icon-shi-h.png" alt="">
              </div>
              <div class="right">
                <p class="cc">
                  飘逸小诗人(入围奖) * 10
                </p>
                <p class="cc">
                  证书
                </p>
              </div>
            </div>
            <div class="u-img-box">
              <img class="u-img-prize" src="../../img/img-prize3.png" alt="">
            </div>
          </span>
        </div>
      </div>
    </div>
    <div class="m-info-footer">
      <div class="m-btn-box">
        <vbtn class="u-numbers u-btn-go" :msg="backbtn1" @click.native="popdown"></vbtn>
      </div>
    </div>
  </div>
</template>

<script>
import {STATES} from '@/vuex/state'
import vbtn from '@/components/public/btn'
export default {
  name: 'information',
  data () {
    return {
      title: '选手详情',
      backbtn1: ' ',
      votebtn2: '投票',
      votenums: 10000
    }
  },
  methods: {
    popdown: function () {
      STATES.commit('hidePopup')
    },
    govote: function () {
      this.votenums++
    }
  },
  components: {
    'vbtn': vbtn
  }
}
</script>

<style lang="less" scoped>
  @import "../../style/var";
  .m-info{
    padding: .2rem;
    text-align: center;
    width: 100%;
    height: 80%;
    position: absolute;
    top: 0;
    padding-top: 1.2rem;
    /*left: 50%;
    margin-left: -2.85rem;*/
    background: url("../../img/bd-pop.png");
    background-size: 100% 100%;
    // margin-top: -5rem;
  }
  .u-info-paper{
    height: 100%;
    width: 5.2rem;
    margin: 0 auto;

    // border: .1rem double @color-main;
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
  }
  .m-info-head{
  }
  .m-info-body{
    padding-top: .42rem;
    padding-left: .36rem;
    padding-right: .36rem;
    padding-bottom: .36rem;
    .u-t{
      display: block;
      text-align: center;
      font-size: .32rem;
      color: @color-main;
    }
    .u-c{
      display: block;
      margin-top: .3rem;
      .cc{
        font-size: .26rem;
        margin-bottom: .1rem;
        line-height: 1.5;
        color: @color-main;
        text-align: left;
      }
    }
    .u-img-box{
      margin-top: .24rem;
      margin-bottom: .4rem;
      .u-img-prize{
        width: 2rem;
        height: 2.3rem;
        display: block;
        margin: 0 auto;
      }
      .img{
        width: 2.9rem;
        height: 1.6rem;
        display: block;
        margin: 0 auto;
      }
      .cc{
        display: block;
        font-size: .26rem;
        margin-top: .13rem;
        line-height: 1.5;
        color: @color-main;
        text-align: center;
      }
    }
    .u-detail{
      border-bottom: .03rem solid @color-main;
    }
    .u-info{
      font-size: .24rem;
    }
  }
  .m-prize-box{
    padding-top: .08rem;
    font-size: .26rem;
    .u-img-h{
      width: .9rem;
      height: .66rem;
    }
    .left{
      float: left;
      width: 25%;
      font-size: 0;
      text-align: left;
    }
    .right{
      float: left;
      width: 63%
    }
  }
  .m-info-footer{
    width: 100%;
    position: absolute;
    bottom: -2rem;
    margin-left: -.2rem;
  }
  .u-btn-go{
    width: 1.4rem;
    height: 1.4rem;
    background: url("./../../img/btn-go.png") no-repeat;
    background-size: 100% 100%;
  }
</style>
