import Vue from 'vue'
import Router from 'vue-router'
import Question from './views/Question.vue'
import Paper from './views/Paper.vue'
import PaperHome from '@/components/PaperHome.vue'
import PaperView from '@/components/PaperView.vue'
import PaperCreate from '@/components/PaperCreate.vue'
import PaperEdit from '@/components/PaperEdit.vue'


import Range from './views/Range.vue'
import Type from './views/Type.vue'
import Result from './views/Result.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'question',
      component: Question
    },
    {
      path: '/paper',
      // name: 'paper',
      component: Paper,
      children: [
        {
          path: '',
          component: PaperHome
        },
        {
          path: 'view/:paperid',
          name: 'paperview',
          component: PaperView,
          props: true
        },
        {
          path: 'create',
          component: PaperCreate
        },
        {
          path: 'edit/:paperid',
          component: PaperEdit,
          props: true
        }
      ]
    },
    {
      path: '/range',
      name: 'range',
      component: Range
    },
    {
      path: '/type',
      name: 'type',
      component: Type
    },
    {
      path: '/result',
      name: 'result',
      component: Result
    }
  ]
})
