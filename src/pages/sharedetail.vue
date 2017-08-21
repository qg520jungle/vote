<template>
  
</template>

<script>
import vbtn from '@/components/public/btn'
import { initShare } from '@/plugins/shareWx'
import {STATES} from '@/vuex/state'
import { getOption, vote } from '@/plugins/getData'
// import { getOptionList, getOption, vote } from '@/plugins/getData'

export default {
  name: 'detail',
  data () {
    return {
      exbtn1: '完整诗歌',
      exbtn2: '投票'
    }
  },
  computed: {
    islist () {
      return STATES.state.showListState
    },
    ispopshow () {
      return STATES.state.ispopshow
    },
    roundId () {
      return STATES.getters.getRoundId
    },
    voteId () {
      return STATES.getters.getVoteId
    },
    
  },
  mounted () {
  },
  methods: {
    
  },
  components: {
    'vbtn': vbtn
  }
}
</script>

<style lang="less" scoped>
  @import "./../style/var";
  
</style>
