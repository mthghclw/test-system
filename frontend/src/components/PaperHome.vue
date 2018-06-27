<template>
  <!-- 试卷列表开始 -->
  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title">所有试卷
        <router-link class="btn btn-primary btn-xs pull-right" tag="button" to="/paper/create">新建</router-link>
      </h3>
    </div>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>编号</th>
          <th>标题</th>
          <th>题量</th>
          <th>时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(paper, index) in papers" :key="index">
          <td>{{paper.id}}</td>
          <td>{{paper.name}}</td>
          <td>{{paper.questions.length}}</td>
          <td>{{paper.date}}</td>
          <td>
            <router-link class="btn btn-success btn-xs" to="/paper/view">
              <span class="glyphicon glyphicon-eye-open"></span>
            </router-link>&nbsp;
            <router-link class="btn btn-info btn-xs" to="/paper/edit">
              <span class="glyphicon glyphicon-edit"></span>
            </router-link>&nbsp;
            <button class="btn btn-danger btn-xs">
              <span class="glyphicon glyphicon-trash"></span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- 试卷列表结束 -->
</template>

<script>
export default {
  name: 'PaperHome',
  data: function() {
    return {
      papers: [],
      url: 'http://localhost:3001',
      error: ''
    }
  },
  created: function() {
    this.$http.get(this.url + '/papers').then(function(res){
      this.papers = res.body;
    },function(){
      this.error = '获取试卷失败';
    });
  }
}
</script>
