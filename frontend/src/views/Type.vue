<template>
  <div class="type">
      <div class="container">
          <div class="row">
              <div class="col-xs-12">
                    <!-- 题型列表开始 -->
                    <div class="panel panel-default" v-show="!editing">
                        <div class="panel-heading">
                            <h3 class="panel-title">考题类型<button class="btn btn-primary btn-xs pull-right" @click="create">新建</button></h3>
                        </div>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>编号</th>
                                    <th>题型</th>
                                    <th>日期</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(type, index) in types" :key="index">
                                    <td>{{type.id}}</td>
                                    <td>{{type.name}}</td>
                                    <td>{{type.date}}</td>
                                    <td>
                                        <button class="btn btn-info btn-xs" @click="edit(index)">编辑</button>&nbsp;
                                        <button class="btn btn-danger btn-xs" @click="remove(index)">删除</button>
                                    </td>
                                </tr>
                                <tr v-if="!types.length">
                                    <td colspan="5" class="text-center">暂无题型</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="panel-footer">共 {{types.length}} 种题型</div>
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
                                <label for="type" class="col-xs-1 control-label">题型：</label>
                                <div class="col-xs-5">
                                <input type="text" class="form-control" id="type" placeholder="请输入题型" v-model.trim="editingType.name">
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
    name: 'type',
    data: function() {
        return {
            types: [],
            editing: false,
            editingType: {},
            url: 'http://localhost:3001'
        }
    },
    created: function() {
        this.$http.get(this.url + '/types').then(function(res) {
            this.types = res.body;
        },function() {
            this.error = '获取失败';
        });
    },
    methods: {
        create: function() {
            this.editingType = {
                name: ''
            };
            this.editing = true;
        },
        edit: function(index) {
            this.editingType = this.types[index];
            this.editing = true;
        },
        save: function() {

            this.editingType.date = new Date();
            // 保存编辑之后的类型
            if(this.editingType.id) {

                this.$http.put(this.url + '/types/' + this.editingType.id, this.editingType).then(function(res){
                    this.types = res.body;
                    this.editing = false;
                },
                function(res){
                    this.error = '更新失败';
                });
            } else {
                // 保存新建类型
                this.editingType.id = Date.now();

                this.$http.post(this.url + '/types', this.editingType).then(function(res){
                    this.types = res.data;
                    this.editing = false;
                },
                function(res){
                    this.error = '创建失败';
                }); 
            }
        },
        remove: function (index) {

            this.$http.delete(this.url + '/types/' + this.types[index].id).then(function(res){
                
                this.types.splice(index, 1);
            },
            function(res){
                this.error = '删除失败';
            });

        }
    }
}
</script>

