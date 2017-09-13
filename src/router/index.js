import Vue from 'vue'
import Router from 'vue-router'
import voteIndex from '@/pages/voteIndex'
import compoem from '@/pages/compoem'
import share from '@/pages/share'
import preRound from '@/pages/preRound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'voteIndex',
      component: voteIndex
    },
    {
      path: '/voteIndex',
      name: 'voteIndex',
      component: voteIndex
    },
    {
      path: '/compoem',
      name: 'compoem',
      component: compoem
    },
    {
      path: '/share',
      name: 'share',
      component: share
    },
    {
      path: '/preRound',
      name: 'preRound',
      component: preRound
    }
  ]
})
