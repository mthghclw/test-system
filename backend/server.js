var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

var clazzRouter = require('./routes/clazz');
var studentRouter = require('./routes/student');
var teacherRouter = require('./routes/teacher');
var typeRouter = require('./routes/type');
var rangeRouter = require('./routes/range');
var questionRouter = require('./routes/question');
var paperRouter = require('./routes/paper');
var resultRouter = require('./routes/result');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Content-Type', 'application/json');
  next();
});

app.use('/clazzes', clazzRouter);
app.use('/students', studentRouter);
app.use('/teachers', teacherRouter);
app.use('/types', typeRouter);
app.use('/ranges', rangeRouter);
app.use('/questions', questionRouter);
app.use('/papers', paperRouter);
app.use('/results', resultRouter);


app.listen(3001, function () {
  console.log('服务已经开启。在浏览器中打开 http://localhost:3001');
});



