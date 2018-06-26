<template>
  <div class="type">
    <div class="container">
      <div class="row">
        <div class="col-xs-12">
          <!-- 考题类型开始 -->
          <div class="panel panel-default" v-show="!editing">
            <div class="panel-heading">
              <h3 class="panel-title">考题类型
                <button class="btn btn-primary btn-xs pull-right" @click="create">新建</button>
              </h3>
            </div>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>编号</th>
                  <th>类型</th>
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
                    <button class="btn btn-info btn-xs" @click="edit(index)">
                      <span class="glyphicon glyphicon-edit"></span>
                    </button>&nbsp;
                    <button class="btn btn-danger btn-xs" @click="remove(index)">
                      <span class="glyphicon glyphicon-trash"></span>
                    </button>
                  </td>
                </tr>
                <tr v-if="!ranges.length">
                  <td colspan="4" class="text-center">暂无题型</td>
                </tr>
              </tbody>
            </table>
            <div class="panel-footer">共 {{ranges.length}} 种范围</div>
          </div>
          <!-- 考题类型结束 -->
          <!-- 编辑类型开始 -->
          <form class="panel panel-default form-horizontal" v-show="editing">
            <div class="panel-heading">
              <h3 class="panel-title">考题类型</h3>
            </div>
            <div class="panel-body">
              <div class="form-group">
                <label for="type" class="col-xs-1 control-label">类型：</label>
                <div class="col-xs-5">
                  <input type="text" class="form-control" id="type" placeholder="请输入题型" v-model.trim="editingRange.name">
                </div>
              </div>
            </div>
            <div class="panel-footer">
              <button type="button" class="btn btn-success btn-sm" @click="save">保存</button>
              <button type="button" class="btn btn-warning btn-sm pull-right" @click="editing = false">取消</button>
            </div>
          </form>
          <!-- 编辑类型结束 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "range",
  data: function() {
    return {
      editing: false,
      editingRange: {},
      ranges: [],
      url: "http://localhost:3001",
      error: ""
    };
  },
  created: function() {
    this.$http.get(this.url + "/ranges").then(
      function(res) {
        this.ranges = res.body;
      },
      function() {
        this.error = "获取考题类型失败";
      })
  },
  methods: {
    create: function() {
      this.editingRange = {
        name: ""
      };
      this.editing = true;
    },
    edit: function(index) {
      // 将指定索引的类型赋值给 editingRange
      this.editingRange = Object.assign({}, this.ranges[index]);

      // 打开编辑界面
      this.editing = true;
    },
    save: function() {
      // 修改或创建时间
      this.editingRange.date = new Date();

      if (this.editingRange.id) {
        // 修改已有题型
        this.$http
          .put(this.url + "/ranges/" + this.editingRange.id, this.editingRange)
          .then(
            function(res) {
              // 更新页面中的题型
              this.ranges = res.body;

              // 关闭编辑页面
              this.editing = false;
            },
            function() {
              this.error = "修改题型失败";
            }
          );
      } else {
        // 创建ID
        this.editingRange.id = Date.now();

        // 创建新题型
        this.$http.post(this.url + "/ranges", this.editingRange).then(
          function(res) {
            // 更新页面中的题型
            this.ranges = res.body;

            // 关闭编辑界面
            this.editing = false;
          },
          function() {
            this.error = "创建新题型失败";
          }
        );
      }
    },
    remove: function(index) {
      // 删除数据库中的题型
      this.$http.delete(this.url + "/ranges/" + this.ranges[index].id).then(
        function() {
          // 删除界面中的题型
          this.ranges.splice(index, 1);
        },
        function() {}
      );
    }
  }
};
</script>
