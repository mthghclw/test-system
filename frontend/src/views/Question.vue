<template>
  <div class="question">
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <!-- 展示所有试题开始 -->
        <div class="panel panel-default" v-show="!editing">
          <div class="panel-heading">
            <h3 class="panel-title">所有考题 <button class="btn btn-primary btn-xs pull-right" @click="create">新建</button></h3>
          </div>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>编号</th>
                <th>考题</th>
                <th>日期</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(question, index) in questions" :key="question.id">
                <td>{{question.id}}</td>
                <td>{{question.title}}</td>
                <td>{{question.date}}</td>
                <td>
                  <button class="btn btn-info btn-xs" @click="edit(index)">
                    <span class="glyphicon glyphicon-edit"></span>
                  </button>&nbsp;
                  <button class="btn btn-danger btn-xs" @click="remove(index)">
                    <span class="glyphicon glyphicon-trash"></span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 展示所有试题结束 -->
        <!-- 编辑试题开始 -->
        <form class="panel panel-default form-horizontal" v-show="editing">
          <div class="panel-heading">
            <h3 class="panel-title">编辑试题</h3>
          </div>
          <div class="panel-body">
            <!-- 范围和题型 -->
            <div class="form-group">
              <label for="range" class="col-xs-1 control-label">范围：</label>
              <div class="col-xs-5">
                <select id="range" class="form-control" v-model="editingQuestion.range">
                  <option disabled>请选择范围</option>
                  <option v-for="range in ranges" :key="range.id" :value="range.id">{{range.name}}</option>
                </select>
              </div>
              <label for="type" class="col-xs-1 control-label">题型：</label>
              <div class="col-xs-5">
                <select id="type" class="form-control" v-model="editingQuestion.type" @change="change">
                  <option disabled>请选择题型</option>
                  <option v-for="type in types" :key="type.id" :value="type.id">{{type.name}}</option>
                </select>
              </div>
            </div>
            <!-- 考题的标题 -->
            <div class="form-group">
              <label for="title" class="col-xs-1 control-label">标题：</label>
              <div class="col-xs-11">
                <textarea class="form-control" id="title" rows="2" v-model="editingQuestion.title"></textarea>
              </div>
            </div>
            <!-- 选择题 -->
            <div class="form-group" v-if="editingQuestion.type == 1529975584123" v-for="option in editingQuestion.options" :key="option.id">
              <label :for="option.flag" class="col-xs-1 control-label">选项：</label>
              <div class="col-xs-8">
                <input type="text" :id="option.flag" class="form-control" v-model="option.content">
              </div>
              <div class="col-xs-1 checkbox">
                <label><input type="checkbox" v-model="option.correct">{{option.flag}}</label>
              </div>
              <div class="col-xs-2">
                <button class="btn btn-primary btn-sm"><span class="glyphicon glyphicon-plus"></span></button>&nbsp;
                <button class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-trash"></span></button>
              </div>
            </div>
            <!-- 填空题 -->
            <div class="form-group" v-if="editingQuestion.type == 1529975597178" v-for="(answer, index) in editingQuestion.answer" :key="index">
              <label :for="'answer' + index" class="col-xs-1 control-label">选项：</label>
              <div class="col-xs-5">
                <input type="text" :id="'answer' + index" class="form-control" v-model="answer.content">
              </div>
              <label :for="'num' + index" class="col-xs-1 control-label">序号：</label>
              <div class="col-xs-3">
                <input type="text" :id="'num' + index" class="form-control" v-model.number="answer.num">
              </div>
              <div class="col-xs-2">
                <button class="btn btn-primary btn-sm"><span class="glyphicon glyphicon-plus"></span></button>&nbsp;
                <button class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-trash"></span></button>
              </div>
            </div>
            <!-- 判断题 -->
            <div class="form-group" v-if="editingQuestion.type == 1529975608713">
              <label for="answer" class="col-xs-1 control-label">答案：</label>
              <div class="col-xs-11">
                <div class="radio-inline">
                  <label for=""><input type="radio" :value="true" v-model="editingQuestion.answer">正确</label>
                </div>
                <div class="radio-inline">
                  <label for=""><input type="radio" :value="false" v-model="editingQuestion.answer">错误</label>
                </div>
              </div>
            </div>
            <!-- 问答题、分析题、编程题 -->
            <div class="form-group" v-if="editingQuestion.type == 1529975627993 || editingQuestion.type == 1529997427743 || editingQuestion.type == 1529999363075">
              <label for="answer" class="col-xs-1 control-label">答案：</label>
              <div class="col-xs-11">
                <textarea id="answer" rows="8" class="form-control" v-model="editingQuestion.answer"></textarea>
              </div>
            </div>

            <!-- 解题思路 -->
            <div class="form-group">
              <label for="solution" class="col-xs-1 control-label">思路：</label>
              <div class="col-xs-11">
                <textarea class="form-control" id="solution" rows="5" v-model="editingQuestion.solution"></textarea>
              </div>
            </div>
          </div>
          <div class="panel-footer">
            <button class="btn btn-success btn-sm" @click="save">保存</button>
            <button class="btn btn-warning btn-sm pull-right" @click="editing = false">取消</button>
          </div>
        </form>
        <!-- 编辑试题结束 -->
      </div>
    </div>
  </div>
  </div>
</template>

<script>

export default {
  name: 'question',
  data: function() {
    return {
      editing: false,
      ranges: [],
      types: [],
      questions: [],
      editingQuestion: {},
      url: 'http://localhost:3001',
      error: ''
    }
  },
  created: function() {
    // 获取所有范围
    this.$http.get(this.url + '/ranges').then(function(res){
      this.ranges = res.body;
    },function() {
      this.error = '获取范围失败';
    });

    // 获取所有题型
    this.$http.get(this.url + '/types').then(function(res){
      this.types = res.body;
    },function(){
      this.error = '获取题型失败';
    });

    // 获取所有试题
    this.$http.get(this.url + '/questions').then(function(res){
      this.questions = res.body;
    }, function() {
      this.error = '获取试题失败';
    });
  },
  methods: {
    create: function() {
      this.editingQuestion = {};
      this.editing = true;
    },
    edit: function(index) {
      this.editingQuestion = Object.assign({}, this.questions[index]);
      this.editing = true;
    },
    save: function() {

      this.editingQuestion.date = new Date();

      // 修改考题
      if(this.editingQuestion.id) {
        this.$http.put(this.url + '/questions/' + this.editingQuestion.id, this.editingQuestion).then(function(res){
          this.questions = res.body;
          this.editing = false;
        },function(){
          this.error = '修改考题失败';
        })
      } else {
        console.log('新建')
        // 新建考题
        this.editingQuestion.id = Date.now();

        this.$http.post(this.url + '/questions', this.editingQuestion).then(function(res){
          this.questions = res.body;
          this.editing = false;
        },function(){
          this.error = '新建考题失败';
        })

      }
    },
    remove: function(index) {
      this.$http.delete(this.url + '/questions/' + this.questions[index].id).then(function() {
        this.questions.splice(index, 1);
      },function() {
        this.error = '删除试题失败';
      })
    },
    change: function() {
      console.log(this.editingQuestion.type)
      if(this.editingQuestion.type == 1529975584123) {
        this.editingQuestion = {options: [{flag: 'A', content:'', correct: false}], type: this.editingQuestion.type};
      } else if(this.editingQuestion.type == 1529975597178) {
        this.editingQuestion = {answer: [{num: 1, content: ''}], type: this.editingQuestion.type};
      } else if(this.editingQuestion.type == 1529975608713) {
        this.editingQuestion = {answer: false, type: this.editingQuestion.type};
      } else {
        this.editingQuestion = {answer: '', type: this.editingQuestion.type};
      }
    }
  }
}
</script>
