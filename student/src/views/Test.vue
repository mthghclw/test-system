<template>
  <div id="test">
      <div class="container">
          <div class="row">
              <div class="col-xs-12">
                  <div class="panel panel-primary">
                      <div class="panel-heading">
                          <h3 class="panel-title">{{paper.name}}<button class="btn btn-primary btn-xs pull-right" @click="save">交卷</button></h3>
                      </div>
                  </div>
                  <div class="panel-body">
                      <form class="form-horizontal">
                            <!-- 选择题 -->
                            <div class="choose" v-if="chooses.length">
                                <h4>选择题</h4>
                                <div class="choose-item" v-for="(choose, index) in chooses" :key="choose.id">
                                    <h5>{{index + 1}}、{{choose.title}}</h5>
                                    <div class="checkbox" v-for="option in choose.options" :key="option.flag">
                                        <label><input type="checkbox" :value="option.flag" v-model="result.chooses[index].answers">{{option.content}}</label>
                                    </div>
                                </div>
                            </div>
                            <!-- 判断题 -->
                            <div class="judgment" v-if="judgments.length">
                              <h4>判断题</h4>
                              <div class="judgment-item" v-for="(judgment, index) in judgments" :key="judgment.id">
                                <h5>{{index +1}}、{{judgment.title}}</h5>
                                <div class="radio">
                                  <label><input type="radio" :value="true" v-model="result.judgments[index].answers">正确</label>
                                </div>
                                <div class="radio">
                                  <label><input type="radio" :value="false" v-model="result.judgments[index].answers">错误</label>
                                </div>
                              </div>
                            </div>
                            <!-- 填空题 -->
                            <div class="fill" v-if="fills.length">
                              <h4>填空题</h4>
                              <div class="fill-item" v-for="(fill, index) in fills" :key="fill.id">
                                <h5>{{index + 1}}、{{fill.title}}</h5>
                                <div class="form-group">
                                  <div class="col-xs-2" v-for="(anser, indx) in fill.answer" :key="anser.num">
                                    <input type="text" class="form-control" v-model="result.fills[index].answers[indx].content">
                                  </div>
                                </div>
                              </div>
                            </div>

                            <!-- 问答题 -->
                            <div class="question" v-if="questions.length">
                              <h4>问答题</h4>
                              <div class="fill-item" v-for="(question, index) in questions" :key="question.id">
                                <h5>{{index + 1}}、{{question.title}}</h5>
                                <div class="form-group">
                                  <textarea class="form-control" rows="10" v-model="result.questions[index].answers"></textarea>
                                </div>
                              </div>
                            </div>

                            <!-- 分析题 -->
                            <div class="analysis" v-if="analysises.length">
                              <h4>分析题</h4>
                              <div class="analysis-item" v-for="(analysis, index) in analysises" :key="analysis.id">
                                <h5>{{index + 1}}、{{analysis.title}}</h5>
                                <div class="form-group">
                                  <textarea class="form-control" rows="10" v-model="result.analysises[index].answers"></textarea>
                                </div>
                              </div>
                            </div>

                            <!-- 编程题 -->
                            <div class="program" v-if="programs.length">
                              <h4>编程题</h4>
                              <div class="analysis-item" v-for="(program, index) in programs" :key="program.id">
                                <h5>{{index + 1}}、{{program.title}}</h5>
                                <div class="form-group">
                                  <textarea class="form-control" rows="10" v-model="result.programs[index].answers"></textarea>
                                </div>
                              </div>
                            </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>


/* 

result {
  fills: [
    {question: 122342434324, answer: ['CSS', 'JS']},
    {question: 122342434324, answer: ['CSS', 'JS']},
    {question: 122342434324, answer: ['CSS', 'JS']}
  ],
  chooses: [
    {question: 122342434324, answer: ['A', 'B']},
    {question: 122342434324, answer: ['CSS', 'JS']},
    {question: 122342434324, answer: ['CSS', 'JS']}
  ],fills: [
    {questionid: 122342434324, answer: [{num: 1, content:''}, {num: 2, content:''}]},
    {question: 122342434324, answer: ['CSS', 'JS']},
    {question: 122342434324, answer: ['CSS', 'JS']}
  ],
}
result.fills[0].answers[1].content
*/

export default {
  name: 'Test',
  data: function() {
    return {
      paper: {},
      chooses: [],
      fills: [],
      judgments: [],
      questions: [],
      analysises: [],
      programs: [],
      paperid: 1530196566832,
      result: {
        chooses: [],
        fills: [],
        judgments: [],
        questions: [],
        analysises: [],
        programs: []
      },
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
            // 将视图为 choose 的试题添加到 chooses 数组中。
            this.chooses.push(question);

            this.result.chooses.push({questionid: question.id,answers: []});
          } else if(question.view == 'fill') {

            // 将视图为 fill 的试题添加到 fills 数组中。
            this.fills.push(question);

            var arr = [];

            question.answer.forEach(function(anser){
              arr.push({num: anser.num, content: ''});
            }, this);

            this.result.fills.push({questionid: question.id,answers: arr})

          } else if(question.view == 'judgment') {

            this.judgments.push(question);
            this.result.judgments.push({questionid: question.id,answers: []})

          } else if(question.view == 'question') {

            this.questions.push(question);
            this.result.questions.push({questionid: question.id,answers: ''})

          } else  if(question.view == 'analysis') {

            this.analysises.push(question);
            this.result.analysises.push({questionid: question.id,answers: ''})

          } else if (question.view == 'program') {

            this.programs.push(question);
            this.result.programs.push({questionid: question.id,answers: ''})

          }

        },this)

      }
    },function(){
      this.error = '获取试卷失败';
    });
  },
  methods: {
    save: function() {
      this.result.paperid = this.paper.id;
      this.result.id = Date.now();
      this.result.date = new Date();

      this.$http.post(this.url + '/results', this.result).then(function(){
        this.$router.push('/');
      },function() {
        this.error = '交卷失败';
      });
    }
  }
}
</script>

<style lang="less" scoped>
    #test {
        margin-top: 70px;
    }
</style>

