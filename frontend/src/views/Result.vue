<template>
  <div class="home">
    <h1>首页</h1>

  <div class="left">
    <sidebar/>

  </div>
  <div class="right">
    <StudList/>
  </div>
  </div>
</template>

<style scoped lang="less">
  .home {
    width: 980px;
    margin: 0 auto;
    border: 1px solid #000;
    overflow: hidden;
  }

  .left {
    width: 200px;
    float: left;
  }

  .right {
    width: 760px;
    float: right;
  }
</style>


<script>
// @ 是 /src 目录的别名
import Sidebar from '@/components/Sidebar.vue'
import StudList from '@/components/StudList.vue'

export default {
  name: 'result',
  components: {
    Sidebar,
    StudList
  }
}
</script>
