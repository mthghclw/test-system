<template>
  <div class="hello">
    <ul>
      <li><a href="#">a' a'a'a</a></li>
      <li><a href="#">菜单项</a></li>
      <li><a href="#">菜单项</a></li>
      <li><a href="#">菜单项</a></li>
      <li><a href="#">菜单项</a></li>
      <li><a href="#">菜单项</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
