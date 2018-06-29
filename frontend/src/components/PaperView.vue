<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title">{{paper.name}}<router-link tag="button" class="btn btn-primary btn-xs pull-right" to="/paper">返回</router-link></h3>
    </div>
    <div class="panel-body">
      <!-- 选择题 -->
      <div class="choose" v-if="chooses.length">
        <h3>选择题</h3>
        <div v-for="(choose, index) in chooses" :key="choose.id">
            <p><strong>{{index + 1}}、{{choose.title}}</strong></p>
            <p v-for="option in choose.options" :key="option.flag"><strong>{{option.flag}}、</strong>{{option.content}}</p>
        </div>
      </div>
      <!-- 判断题 -->
      <div class="judgment" v-if="judgments.length">
        <h3>判断题</h3>
        <div v-for="(judgment, index) in judgments" :key="judgment.id">
            <p><strong>{{index + 1}}、{{judgment.title}}</strong></p>
            <p>{{judgment.answer ? '正确' : '错误'}}</p>
        </div>
      </div>
      <!-- 填空题 -->
      <div class="fill" v-if="fills.length">
        <h3>填空题</h3>
        <div v-for="(fill, index) in fills" :key="fill.id">
            <p><strong>{{index + 1}}、{{fill.title}}</strong></p>
            <p v-for="an in fill.answer" :key="an.num">{{an.content}}</p>
        </div>
      </div>

      <!-- 问答题 -->
      <div class="question" v-if="questions.length">
        <h3>问答题</h3>
        <div v-for="(question, index) in questions" :key="question.id">
          <p><strong>{{index + 1}}、{{question.title}}</strong></p>
          <p>{{question.answer}}</p>
        </div>
      </div>

      <!-- 分析题 -->
      <div class="analysis" v-if="analysises.length">
        <h3>分析题</h3>
        <div v-for="(analysis, index) in analysises" :key="analysis.id">
          <p><strong>{{index + 1}}、{{analysis.title}}</strong></p>
          <p>{{analysis.answer}}</p>
        </div>
      </div>

      <!-- 编程题 -->
      <div class="program" v-if="programs.length">
        <h3>编程题</h3>
        <div v-for="(program, index) in programs" :key="program.id">
          <p><strong>{{index + 1}}、{{program.title}}</strong></p>
          <p>{{program.answer}}</p>
        </div>
      </div>
    </div>
    <div class="panel-footer">{{paper.date}}</div>
  </div>
</template>

<script>
export default {
  name: 'PaperView',
  props: { 
    paperid: {
      type: [Number, String],
      required: true
    }
  },
  data: function() {
    return {
      paper: {},
      chooses: [],
      fills: [],
      judgments: [],
      questions: [],
      analysises: [],
      programs: [],
      url: 'http://localhost:3001',
      error: ''
    }
  },
  created: function() {


    // 获取指定ID的试卷
    this.$http.get(this.url + '/papers/' + this.paperid).then(function(res){
      if(res.body.length) {

        this.paper = res.body[0];

        this.paper.questions.forEach(function(question){

          if(question.view == 'choose') {
            this.chooses.push(question)
          } else if(question.view == 'fill') {
            this.fills.push(question);
          } else if(question.view == 'judgment') {
            this.judgments.push(question);
          } else if(question.view == 'question') {
            this.questions.push(question);
          } else  if(question.view == 'analysis') {
            this.analysises.push(question);
          } else if (question.view == 'program') {
            this.programs.push(question);
          }

        },this)

      }
    },function(){
      this.error = '获取试卷失败';
    });
  }
}
</script>
