<template>
  <div class="range">
      <div class="container">
          <div class="row">
              <div class="col-xs-12">
                    <!-- 范围列表开始 -->
                    <div class="panel panel-default" v-show="!editing">
                        <div class="panel-heading">
                            <h3 class="panel-title">考题范围<button class="btn btn-primary btn-xs pull-right" @click="create">新建</button></h3>
                        </div>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>编号</th>
                                    <th>范围</th>
                                    <th>日期</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(range, index) in ranges" :key="index">
                                    <td>{{range.id}}</td>
                                    <td>{{range.name}}</td>
                                    <td>{{range.date}}</td>
                                    <td>
                                        <button class="btn btn-info btn-xs" @click="edit(index)">编辑</button>&nbsp;
                                        <button class="btn btn-danger btn-xs" @click="remove(index)">删除</button>
                                    </td>
                                </tr>
                                <tr v-if="!ranges.length">
                                    <td colspan="5" class="text-center">暂无范围</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="panel-footer">共 {{ranges.length}} 种范围</div>
                    </div>
                    <!-- 范围列表结束 -->
                    <!-- 编辑范围开始 -->
                    <form class="panel panel-default form-horizontal" v-show="editing">
                        <div class="panel-heading">
                            <h3 class="panel-title">
                                编辑范围
                            </h3>
                        </div>
                        <div class="panel-body">
                            <div class="form-group">
                                <label for="type" class="col-xs-1 control-label">范围：</label>
                                <div class="col-xs-5">
                                <input type="text" class="form-control" id="type" placeholder="请输入范围" v-model.trim="editingRange.name">
                                </div>
                            </div>
                        </div>
                        <div class="panel-footer">
                            <button type="button" class="btn btn-success btn-sm" @click="save">保存</button>
                            <button type="button" class="btn btn-warning btn-sm pull-right" @click="editing = false">取消</button>
                        </div>
                    </form>
                    <!-- 编辑范围结束 -->
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'range',
    data: function() {
        return {
            ranges: [],
            editing: false,
            editingRange: {},
            url: 'http://localhost:3001'
        }
    },
    created: function() {
        this.$http.get(this.url + '/ranges').then(function(res) {
            this.ranges = res.body;
        },function() {
            this.error = '获取失败';
        });
    },
    methods: {
        create: function() {
            this.editingRange = {
                name: ''
            };
            this.editing = true;
        },
        edit: function(index) {
            this.editingRange = this.ranges[index];
            this.editing = true;
        },
        save: function() {

            this.editingRange.date = new Date();

            // 保存编辑之后的范围
            if(this.editingRange.id) {

                 this.$http.put(this.url + '/ranges/' + this.editingRange.id, this.editingRange).then(function(res){
                    this.ranges = res.body;
                    this.editing = false;
                },
                function(res){
                    this.error = '更新失败';
                });
            } else {
                // 创建新范围
                this.editingRange.id = Date.now();

                this.$http.post(this.url + '/ranges', this.editingRange).then(function(res){
                    this.ranges = res.data;
                    this.editing = false;
                },
                function(res){
                    this.error = '创建失败';
                }); 
            }

        },
        remove: function (index) {
            this.$http.delete(this.url + '/ranges/' + this.ranges[index].id).then(function(res){
                
                this.ranges.splice(index, 1);
            },
            function(res){
                this.error = '删除失败';
            });

        }
    }
}
</script>
