<template>
  <div class="panel panel-default form-horizontal">
    <div class="panel-heading">
      <div class="form-group">
        <label for="title" class="col-xs-1 control-label">标题：</label>
        <div class="col-xs-3">
          <input type="text" id="title" class="form-control" v-model="paper.name">
        </div>
        <label for="range" class="col-xs-1 control-label">范围：</label>
        <div class="col-xs-2">
          <select class="form-control" id="range" v-model="filterCondition.range" @change="changeHandler">
            <option value="">所有范围</option>
            <option v-for="range in ranges" :value="range.id" :key="range.id">{{range.name}}</option>
          </select>
        </div>
        <label for="type" class="col-xs-1 control-label">题型：</label>
        <div class="col-xs-2">
          <select class="form-control" id="type" v-model="filterCondition.type" @change="changeHandler">
            <option value="">所有题型</option>
            <option v-for="type in types" :value="type.id" :key="type.id">{{type.name}}</option>
          </select>
        </div>
        <div class="col-xs-2">
          <router-link class="btn btn-warning btn-sm" tag="button" to="/paper">取消</router-link>&nbsp;
          <button class="btn btn-success btn-sm" @click="save">保存</button>
        </div>
      </div>
    </div>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>操作</th>
          <th>编号</th>
          <th>考题</th>
          <th>时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="question in questions" :key="question.id">
          <td>
            <div class="checkbox"><label><input type="checkbox" :value="question.id" v-model="newQuestions"></label></div>
          </td>
          <td>{{question.id}}</td>
          <td>{{question.title}}</td>
          <td>{{question.date}}</td>
        </tr>
        <tr v-if="!questions.length">
          <td colspan="4">暂无考题</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'PaperEdit',
  props: ['paperid'],
  data: function() {
    return {
      ranges: [],
      types: [],
      questions: [],
      paper: {},
      newQuestions: [],  // 用来保存用户在修改时新增的考题
      filterCondition: {range: '', type: ''},
      url: 'http://localhost:3001',
      error: ''
    }
  },
  created: function() {
    // 获取所有范围
    this.$http.get(this.url + '/ranges').then(function(res){
      this.ranges = res.body;
    },function(){
      this.error = '获取范围失败';
    });

    // 获取所有类型
    this.$http.get(this.url + '/types').then(function(res){
      this.types = res.body;
    },function(){
      this.error = '获取题型失败';
    });

    // 获取试卷信息
    this.$http.get(this.url + '/papers/' + this.paperid).then(function(res){

      // 使用remotePaper变量保存获取到的试卷信息
      var remotePaper = res.body[0];

      // 将试卷中已有的试题添加到newQuestions数组中，
      remotePaper.questions.forEach(function(question){
        this.newQuestions.push(question.id);
      }, this);

      this.paper = res.body[0];
    },function(){
      this.error = '获取试卷信息失败';
    });

    // 获取所有考题
    this.loadQuestions(this.url + '/questions');
  },
  methods: {
    changeHandler: function() {
      console.log(this.filterCondition)

      // 获取所有考题的接口
      // http://localhost:3001/questions
      var loadUrl = this.url + '/questions';

      if(this.filterCondition.range && this.filterCondition.type) {
        // 获取指定范围和题型的考题接口
        // http://localhost:3001/questions/ranges/1512546866327/types/1530084407524
        loadUrl += '/ranges/' + this.filterCondition.range + '/types/' + this.filterCondition.type;

      } else if(this.filterCondition.range) {
        // 获取指定范围的考题
        // http://localhost:3001/questions/ranges/1512546866327
        loadUrl += '/ranges/' + this.filterCondition.range;
      } else if(this.filterCondition.type) {
        // 获取指定类型的考题
        // http://localhost:3001/questions/types/1530084407524
        loadUrl += '/types/' + this.filterCondition.type;
      }

      this.loadQuestions(loadUrl);
    },
    loadQuestions: function(url) {
      this.$http.get(url).then(function(res){
        this.questions = res.body;
      },function(){
        this.error = '获取试题失败';
      });
    },
    save: function() {

      // 将新增加的考题和已存在的考题（newQuestions），保存到 paper 对象的 questions 属性中
      this.paper.questions = this.newQuestions;

      // 生成日期
      this.paper.date = new Date();

      // 保存
      this.$http.put(this.url + '/papers/' + this.paper.id, this.paper).then(function(){
        // 回到PaperHome页面，
        this.$router.push('/paper');
      },function(){
        this.error = '编辑试卷失败';
      });
    }
  }
}
</script>
