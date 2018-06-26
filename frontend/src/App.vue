<template>
  <div id="app">

    <div id="nav">
      <nav class="navbar navbar-default">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">人人教育考试系统</a>
          </div>

          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right">
              <li><router-link to="/">考试题库</router-link></li>
              <li><router-link to="/paper">考试试卷</router-link></li>
              <li><router-link to="/result">考试结果</router-link></li>
              <li><router-link to="/type">考试题型</router-link></li>
              <li><router-link to="/range">考试范围</router-link></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <router-view/>
  </div>
</template>

<style lang="less">

</style>
