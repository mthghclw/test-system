import Vue from 'vue'
import Router from 'vue-router'
import Result from './views/Result.vue'
import Question from './views/Question.vue'
import Paper from './views/Paper.vue'
import Type from './views/Type.vue'
import Range from './views/Range.vue'

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
      path: '/result',
      name: 'result',
      component: Result
    },
    {
      path: '/type',
      name: 'type',
      component: Type
    },
    {
      path: '/range',
      name: 'range',
      component: Range
    }
  ]
})
