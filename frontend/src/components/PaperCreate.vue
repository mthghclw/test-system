<template>
  <div class="panel panel-default form-horizontal">
    <div class="panel-heading">
      <div class="form-group">
        <label for="title" class="col-xs-1 control-label">标题：</label>
        <div class="col-xs-3">
          <input type="text" id="title" class="form-control">
        </div>
        <label for="range" class="col-xs-1 control-label">范围：</label>
        <div class="col-xs-2">
          <select class="form-control" id="range">
            <option disabled>请选择范围</option>
            <option v-for="range in ranges" :value="range.id" :key="range.id">{{range.name}}</option>
          </select>
        </div>
        <label for="type" class="col-xs-1 control-label">题型：</label>
        <div class="col-xs-2">
          <select class="form-control" id="type">
            <option disabled>请选择题型</option>
            <option v-for="type in types" :value="type.id" :key="type.id">{{type.name}}</option>
          </select>
        </div>
        <div class="col-xs-2">
          <router-link class="btn btn-warning btn-sm" tag="button" to="/paper">取消</router-link>&nbsp;
          <button class="btn btn-success btn-sm">保存</button>
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
        <tr>
          <td>单元格</td>
          <td>单元格</td>
          <td>单元格</td>
          <td>单元格</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'PaperCreate',
  data: function() {
    return {
      ranges: [],
      types: [],
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
  }
}
</script>
