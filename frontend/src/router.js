import Vue from 'vue'
import Router from 'vue-router'
import Question from './views/Question.vue'
import Paper from './views/Paper.vue'
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
      name: 'paper',
      component: Paper
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
