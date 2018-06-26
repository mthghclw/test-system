<template>
  <div id="app">
    <div id="nav">
      <nav class="navbar navbar-default">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#mynavbar">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a href="#" class="navbar-brand">人人教育考题系统</a>
          </div>
          <div class="collapse navbar-collapse" id="mynavbar">
            <ul class="nav navbar-nav navbar-right">
              <li><router-link to="/">考试题库</router-link></li>
              <li><router-link to="/paper">考试试卷</router-link></li>
              <li><router-link to="/range">考题范围</router-link></li>
              <li><router-link to="/type">考题类型</router-link></li>
              <li><router-link to="/result">考试结果</router-link></li>
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
