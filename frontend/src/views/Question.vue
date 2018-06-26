<template>
  <div class="question">
      <div class="container">
          <div class="row">
              <div class="col-xs-12">
                    <!-- 题型列表开始 -->
                    <div class="panel panel-default" v-show="!editing">
                        <div class="panel-heading">
                            <h3 class="panel-title">所有考题<button class="btn btn-primary btn-xs pull-right" @click="create">新建</button></h3>
                        </div>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>编号</th>
                                    <th>类型</th>
                                    <th>范围</th>
                                    <th>考题</th>
                                    <th>日期</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(question, index) in questions" :key="index">
                                    <td>{{question.id}}</td>
                                    <td>{{question.type}}</td>
                                    <td>{{question.range}}</td>
                                    <td>{{question.title}}</td>
                                    <td>{{question.date}}</td>
                                    <td>
                                        <button class="btn btn-info btn-xs" @click="edit(index)">编辑</button>&nbsp;
                                        <button class="btn btn-danger btn-xs" @click="remove(index)">删除</button>
                                    </td>
                                </tr>
                                <tr v-if="!questions.length">
                                    <td colspan="6" class="text-center">暂无题型</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="panel-footer">共 {{questions.length}} 道考题</div>
                    </div>
                    <!-- 题型列表结束 -->
                    <!-- 编辑题型开始 -->
                    <form class="panel panel-default form-horizontal" v-show="editing">
                        <div class="panel-heading">
                            <h3 class="panel-title">
                                编辑题型
                            </h3>
                        </div>
                        <div class="panel-body">
                            <div class="form-group">
                                <label for="range" class="col-xs-1 control-label">范围：</label>
                                <div class="col-xs-5">
                                  <select class="form-control" id="range" v-model="editingQuestion.range">
                                    <option disabled>请选择范围</option>
                                    <option v-for="range in ranges" :key="range.id" :value="range.id">{{range.name}}</option>
                                  </select>
                                </div>
                                <label for="type" class="col-xs-1 control-label">题型：</label>
                                <div class="col-xs-5">
                                  <select class="form-control" id="type" v-model="editingQuestion.type">
                                    <option disabled>请选择题型</option>
                                    <option v-for="type in types" :key="type.id" :value="type.id">{{type.name}}</option>
                                  </select>
                                </div>
                            </div>

                            <!-- 选择题视图开始 -->
                            <template v-if="view == 1">
                              <div class="form-group">
                                  <label for="title" class="col-xs-1 control-label">问题：</label>
                                  <div class="col-xs-11">
                                    <textarea id="title" class="form-control" rows="2" v-model="editingQuestion.title"></textarea>
                                  </div>
                              </div>
                              <div class="form-group" v-for="option in editingQuestion.options" :key="option.flag">
                                  <label for="answer" class="col-xs-1 control-label">选项：</label>
                                  <div class="col-xs-9">
                                    <input type="text" class="form-control" v-model="option.content">
                                  </div>
                                  <div class="col-xs-1">
                                    <div class="checkbox">
                                      <label>
                                        <input type="checkbox" v-model="option.correct">{{option.flag}}
                                      </label>
                                    </div>
                                  </div>
                                  <div class="col-xs-1">
                                    <button class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-trash"></span></button>
                                  </div>
                              </div>
                            </template>
                            <!-- 选择题视图结束 -->

                            <!-- 判断题视图开始 -->
                            <template v-else-if="view == 2">
                              <div class="form-group">
                                  <label for="title" class="col-xs-1 control-label">问题：</label>
                                  <div class="col-xs-11">
                                    <textarea id="title" class="form-control" rows="2" v-model="editingQuestion.title"></textarea>
                                  </div>
                              </div>
                              <div class="form-group">
                                  <label for="answer" class="col-xs-1 control-label">答案：</label>
                                  <div class="col-xs-11">
                                    <div class="radio-inline">
                                      <label>
                                        <input type="radio" :value="true" v-model="editingQuestion.answer">
                                        正确
                                      </label>
                                    </div>
                                    <div class="radio-inline">
                                      <label>
                                        <input type="radio" :value="false" v-model="editingQuestion.answer">
                                        错误
                                      </label>
                                    </div>
                                  </div>
                              </div>
                            </template>
                            <!-- 判断题视图结束 -->
                            <template v-else>
                              <div class="form-group">
                                  <label for="title" class="col-xs-1 control-label">问题：</label>
                                  <div class="col-xs-11">
                                    <textarea id="title" class="form-control" rows="8" v-model="editingQuestion.title"></textarea>
                                  </div>
                              </div>
                              <div class="form-group">
                                  <label for="answer" class="col-xs-1 control-label">答案：</label>
                                  <div class="col-xs-11">
                                    <textarea id="answer" class="form-control" rows="8" v-model="editingQuestion.answer"></textarea>
                                  </div>
                              </div>
                            </template>

                            <div class="form-group">
                                <label for="solution" class="col-xs-1 control-label">思路：</label>
                                <div class="col-xs-11">
                                  <textarea id="solution" class="form-control" rows="5" v-model="editingQuestion.solution"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="panel-footer">
                            <button type="button" class="btn btn-success btn-sm" @click="save">保存</button>
                            <button type="button" class="btn btn-warning btn-sm pull-right" @click="editing = false">取消</button>
                        </div>
                    </form>
                    <!-- 编辑题型结束 -->
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
            ranges: [],
            types: [],
            viewQuestions: [],
            questions: [],
            editing: false,
            editingQuestion: {},
            url: 'http://localhost:3001'
        }
    },
    computed: {
      view: function() {
        if(this.editingQuestion.type == '1529917283849'){

          // 选择题
          return 1;

        } else if(this.editingQuestion.type == '1529917297057'){

          // 判断题
          return 2;

        } else if(this.editingQuestion.type == '1529920357351'){

          // 填空题
          return 3;

        } else {
          // 问答题、分析题、编程题
          return 4
        }
      }
    },
    created: function() {
      this.$http.get(this.url + '/ranges').then(function(res) {
        this.ranges = res.body;
        },function() {
          this.error = '获取范围失败';
        });
        this.$http.get(this.url + '/types').then(function(res) {
            this.types = res.body;
        },function() {
            this.error = '获取类型失败';
        });
        this.$http.get(this.url + '/questions').then(function(res) {
            this.questions = res.body;
        },function() {
            this.error = '获取考题失败';
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
            // 保存编辑之后的类型
            if(this.editingQuestion.id) {

                this.$http.put(this.url + '/questions/' + this.editingQuestion.id, this.editingQuestion).then(function(res){
                    this.questions = res.body;
                    this.editing = false;
                },
                function(res){
                    this.error = '更新失败';
                });
            } else {
                // 保存新建类型
                this.editingQuestion.id = Date.now();

                this.$http.post(this.url + '/questions', this.editingQuestion).then(function(res){
                    this.questions = res.data;
                    this.editing = false;
                },
                function(res){
                    this.error = '创建失败';
                }); 
            }
        },
        remove: function (index) {

            this.$http.delete(this.url + '/questions/' + this.questions[index].id).then(function(res){
                
                this.questions.splice(index, 1);
            },
            function(res){
                this.error = '删除失败';
            });

        }
    }
}
</script>
