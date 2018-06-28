<template>
  <div>
    <h3>{{paper.name}}</h3>
    <p>{{paper.date}}</p>
    <!-- 选择题 -->
    <div class="choose">
      <h1>选择题</h1>
      <div v-for="choose in chooses" :key="choose.id">
          <p>{{choose.title}}</p>
          <p v-for="option in choose.options" :key="option.flag">{{option.flag}}、{{option.content}}</p>
      </div>
    </div>
    <!-- 判断题 -->
    <div class="judgment">
      <h1>判断题</h1>
      <div v-for="judgment in judgments" :key="judgment.id">
          <p>{{judgment.title}}</p>
          <p>{{judgment.answer ? '正确' : '错误'}}</p>
      </div>
    </div>
    <!-- 填空题 -->
    <div class="fill">
      <h1>填空题</h1>
      <div v-for="fill in fills" :key="fill.id">
          <p>{{fill.title}}</p>
          <p v-for="an in fill.answer" :key="an.num">{{fill.content}}</p>
      </div>
    </div>

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
      others: [],
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
          } else if(question.view == 'other') {
            this.others.push(question);
          }

        },this)

      }
    },function(){
      this.error = '获取试卷失败';
    });
  }
}
</script>
