<template>
  <div>
    <div class="u-guide">
      <div class="u-search">
        <input class="u-input-n" type="text" placeholder="搜索作品名/作者" v-model="keyword">
        <span class="u-s"></span>
        <span v-show="isclr" class="u-c" @click="clear"></span>
        <div class="u-btn-rule" @click="search">搜索</div>
      </div>
    </div>
    <div class="m-lists">
      <vtab :showList="showList" v-on:listenToTab="resettab"></vtab>
      <!-- <router-link :to="{name: 'playerList'}">跳到下拉</router-link> -->
      <div class="u-tab-show">
        <vshow ref="playerList" v-on:listenToList="getlistpop" :isshow="isshow"></vshow>
      </div>
    </div>
  </div>
</template>

<script>
import {STATES} from '@/vuex/state'
import vtab from '@/components/tab/tab'
import vshow from './playerList'
import { getList, getTop } from '@/plugins/getData'
export default {
  name: 'showplayerlist',
  data () {
    return {
      title: '投票阶段结果',
      keyword: '',
      tabList: [
        {
          name: '全部',
          act: true
        }
      ],
      isshow: false,
      showList: [
        {
          name: '作品名',
          actor: '作者',
          addrs: '地址',
          nums: '票数'
        }
      ]
    }
  },
  computed: {
    isclr () {
      if (this.keyword) {
        return true
      } else {
        return false
      }
    },
    roundId () {
      return STATES.getters.getRoundId
    },
    voteId () {
      return STATES.getters.getVoteId
    }
  },
  mounted () {
  },
  methods: {
    // 点击搜索 调用getList接口 获得查询结果
    search () {
      let that = this
      let roundId = this.roundId
      let voteId = this.voteId
      if (this.keyword) {
        that.isshow = true
        // 设置在加载是否显示
        STATES.commit('setIsLoading', true)
        // 设置在没结果 为 假
        STATES.commit('setNoResult', false)
        // 设置搜索结果列表为空
        STATES.commit('setSearchList', [])
        // 判断搜索状态为 真 执行 scroll 初始化成功后的消除加载完成
        STATES.commit('setIsSrh', true)
        // 保存搜索关键字
        STATES.commit('setSrhText', this.keyword)
        getList(1, 10, voteId, roundId, this.keyword).then(res => {
          // console.log(res)
          if (res.data.data.length > 0) {
            getTop(voteId, roundId).then(resTop => {
              let arrSrc = res.data.data
              let arr = []
              let arrTop = resTop.data.data
              for (let el of arrSrc) {
                let obj = {
                  name: el.title || '',
                  actor: el.author || '',
                  addrs: el.city ? el.city.areaName : '',
                  nums: el.tickets ? el.tickets.voteCount : '',
                  id: el.tickets ? el.tickets.id : '',
                  optionId: el.tickets ? el.tickets.optionId : ''
                }
                el.tickets.optionId === arrTop[0].tickets.optionId ? obj.lvl = 1 : ''
                el.tickets.optionId === arrTop[1].tickets.optionId ? obj.lvl = 2 : ''
                el.tickets.optionId === arrTop[2].tickets.optionId ? obj.lvl = 3 : ''
                arr.push(obj)
              }
              that.isshow = true
              // that.showList = arr
              STATES.commit('setIsLoading', false)
              STATES.commit('setSearchList', arr)
              STATES.commit('setCounterSrh', 2)
              STATES.commit('setNoResult', false)
              STATES.commit('setInfiniteLoading', false)
              STATES.commit('setIsSrh', false)
            })
          } else {
            STATES.commit('setIsLoading', false)
            STATES.commit('setSearchList', [])
            STATES.commit('setNoResult', true)
            STATES.commit('setInfiniteLoading', false)
            STATES.commit('setIsSrh', false)
          }
        })
      } else {
        // that.isshow = false
        return
      }
    },
    clear () {
      this.keyword = ''
      this.isshow = false
    },
    getlistpop (data) {
      this.$emit('listenToPlayerlist', data)
    },
    resettab (index, id) {
      let that = this
      let roundId = this.roundId
      let voteId = this.voteId
      // STATES.commit('setSearchList', [])
      STATES.commit('resetCityList', index)
      if (index === 0) {
        that.isshow = false
      } else {
        that.isshow = true
        STATES.commit('setIsSrh', true)
        STATES.commit('setNoResult', false)
        STATES.commit('setIsLoading', true)
        STATES.commit('setSearchList', [])
        getList(1, 10, voteId, roundId, '', id).then(res => {
          getTop(voteId, roundId).then(resTop => {
            let arrSrc = res.data.data
            let arr = []
            let arrTop = resTop.data.data
            for (let el of arrSrc) {
              let obj = {
                name: el.title || '',
                actor: el.author || '',
                addrs: el.city ? el.city.areaName : '',
                nums: el.tickets ? el.tickets.voteCount : '',
                id: el.tickets ? el.tickets.id : '',
                optionId: el.tickets ? el.tickets.optionId : ''
              }
              el.id === arrTop[0].id ? obj.lvl = 1 : ''
              el.id === arrTop[1].id ? obj.lvl = 2 : ''
              el.id === arrTop[2].id ? obj.lvl = 3 : ''
              arr.push(obj)
            }
            that.isshow = true
            // that.showList = arr
            STATES.commit('setIsLoading', false)
            STATES.commit('setSearchList', arr)
            STATES.commit('setIsSrh', false)
          })
        })
      }
    },
    async initData () {
      let tempArr = []
      await Promise.all(tempArr).catch(err => {
        console.log(err)
      })
    }
  },
  components: {
    'vtab': vtab,
    'vshow': vshow
  }
}
</script>

<style lang="less" scoped>
  @import "./../style/var";
  .m-lists{
    padding-left: .1rem;
    padding-right: .1rem;
    border: .03rem solid @color-border;
    background: @color-bg-dark;
  }
  .u-guide{
    width: 100%;
    line-height: 1;
    font-size: 0;
  }
  .u-search{
    display: inline-block;
    width: 100%;
    position: relative;
    background-color: #f7f7f7;
    padding: .1rem;
    padding-top: .15rem;
    padding-bottom: .15rem;
    .u-s{
      content: ' ';
      display: block;
      position: absolute;
      width: .8rem;
      height: .6rem;
      top: .16rem;
      left: .15rem;
      background: url("./../img/icon-search.png") no-repeat;
      background-position: .22rem .11rem;
      background-size: 50%; 
    }
    .u-c{
      content: ' ';
      display: block;
      position: absolute;
      width: .8rem;
      height: .6rem;
      top: .16rem;
      right: 1.4rem;
      background: url("./../img/icon-close-search.png") no-repeat;
      background-position: .22rem .11rem; 
      background-size: 50%;
    }
  }
  .u-input-n{
    width: 6rem;
    padding: .15rem .2rem;
    padding-left: .64rem;
    padding-right: .64rem;
    border: 0;
    line-height: 1.2;
    vertical-align: middle;
    position: relative;
    font-size: .3rem;
    &::-webkit-input-placeholder { color:#ccc; }
    &::-moz-placeholder { color:#ccc; } /* firefox 19+ */
    &:-ms-input-placeholder { color:#ccc; } /* ie */
    &input:-moz-placeholder {color:#ccc}
  }
  .u-btn-rule{
    display: inline-block;
    font-size: .28rem;
    width: 1.2rem;
    height: .6rem;
    line-height: .6rem;
    text-align: center;
    vertical-align: middle;
    background: url("./../img/btn-search.png") no-repeat;
    background-size: 100% 100%;
    color: #a89840;
  }
  .yo-scroll{
    top: 4.92rem;
  }
</style>
