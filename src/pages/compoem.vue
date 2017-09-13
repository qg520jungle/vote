<template>
  <div class="dialog">
    <div class="cover">
      <transition name="fade">
        <!-- <div class="dialog-content" v-if="ispopshow"> -->
          <!-- <slot></slot> -->
        <!-- </div> -->
        <div class="dialog-content">
          <poem v-show="showPoem" v-on:listenToTips="gettipspop" v-on:listenToArrow="getarrowpop" :poem="getPoem"></poem>
        </div>
      <!-- <div :class="{'u-lighting': !istips}"></div> -->
      </transition>
      <div class="u-lighting"></div>
    </div>
    <popup v-show="ispopshow">
      <!-- <tips :tipsMsg="msg" ></tips> -->
      <component v-bind:is="currentView" :tipsMsg="msg"></component>
    </popup>
  </div>
</template>

<script>
import popup from '@/components/popup/popup'
import poem from '@/components/popup/poem'
import tips from '@/components/popup/tips'
import arrow from '@/components/popup/arrow'
import {STATES} from '@/vuex/state'
import { getOption, vote } from '@/plugins/getData'

export default {
  data () {
    return {
      getPoem: {},
      msg: {
        code: 0,
        title: '成功',
        msg: '已经为他增加荣誉票数'
      },
      showPoem: false,
      currentView: 'tips'
    }
  },
  mounted: function () {
    let query = this.$route.query
    let roundId = query.roundId
    let optionId = query.optionId
    if (roundId && optionId) {
      window.resetShareUrl(optionId)
      getOption(optionId, roundId).then((res) => {
        let info = res.data.data
        this.getPoem = {
          poem: info.introduce || '',
          actor: info.author,
          addrs: info.city ? info.city.areaName : '',
          id: info.id,
          name: info.title,
          optionId: info.tickets.optionId,
          nums: info.tickets.voteCount,
          comment: info.optionComment || ''
        }
        this.showPoem = true
      })
    }
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
    },
    gettipspop (r) {
      let voteId = STATES.getters.getVoteId
      let that = this
      // console.log(1)
      vote(r.msg.optionId, voteId).then(res => {
        if (res.data.code === 200) {
          let newData = res.data.data
          let newObj = {
            name: newData.title || '',
            actor: newData.author || '',
            addrs: newData.city ? newData.city.areaName : '',
            nums: newData.tickets ? newData.tickets.voteCount : '',
            id: newData.tickets ? newData.tickets.id : '',
            optionId: newData.tickets ? newData.tickets.optionId : ''
          }
          this.getPoem.nums = newObj.nums
          STATES.commit('reSetList', newObj)
          STATES.commit('reSetSearchList', newObj)
          let obj = {
            code: 0,
            msg: ''
          }
          that.msg = obj
          this.currentView = 'tips'
          let flag = r.data === 'tips'
          STATES.commit('showPopup')
          STATES.commit('setIstips', flag)
        } else {
          let obj = {
            code: 1,
            msg: res.data.msg
          }
          that.msg = obj
          this.currentView = 'tips'
          let flag = r.data === 'tips'
          STATES.commit('showPopup')
          STATES.commit('setIstips', flag)
          console.log(3)
        }
      })
    },
    getarrowpop (r) {
      this.currentView = 'arrow'
      STATES.commit('setIstips', true)
      // let flag = r.data === 'tips'
      STATES.commit('showPopup')
    }
  },
  components: {
    'tips': tips,
    'popup': popup,
    'arrow': arrow,
    'poem': poem
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
  .fade-enter-to, .fade-leave-active {
    transform: scale(1, 1)  translate(0);
  }
  // .fade-leave-active{

  // }
  // .fade-leave {
  // }
  // .fade-leave-active {

  // }
</style>
