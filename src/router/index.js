import Vue from 'vue'
import Router from 'vue-router'
import voteIndex from '@/pages/voteIndex'
import share from '@/pages/share'

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
      path: '/share',
      name: 'share',
      component: share
    }
  ]
})
