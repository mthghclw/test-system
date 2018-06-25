var express = require('express');
var router = express.Router();
var fs = require('fs');

var studentCache = [];

// 获取所有班级
router.get('/', function (req, res) {

  if(studentCache.length){

    console.log('缓存1')
    res.status(200).send(studentCache);

  } else {

    fs.readFile(__dirname + './../data/students.json', 'utf8', function (err, data) {

      if (err) {
        res.status(500).end();
        return console.log(err);
      }

      try {
        data = JSON.parse(data);
      } catch (e) {
        res.status(500).end();
        return console.log(e);
      }

      studentCache = data;

      res.status(200).send(data);

    });
  }
})

// 获取指定ID的班级
router.get('/:id', function (req, res) {

  if(studentCache.length){

    console.log('缓存2')

    var student = [];
    
    studentCache.forEach(function (item, index) {
      if (item.id == req.params.id) {
        student.push(studentCache[index]);
      }
    });

    res.status(200).send(student);
    
  } else {

    fs.readFile(__dirname + './../data/students.json', 'utf8', function (err, data) {

      if (err) {
        res.status(500).end();
        return console.log(err);
      }

      try {
        data = JSON.parse(data);
      } catch (e) {
        res.status(500).end();
        return console.log(e);
      }

      var student = [];
    
      data.forEach(function (item, index) {
        if (item.id == req.params.id) {
          student.push(data[index]);
        }
      });

      studentCache = data;

      res.status(200).send(student);

    });
  }

})

// 更新一条数据
router.put('/:id', function (req, res) {

  fs.readFile(__dirname + './../data/students.json', 'utf8', function (err, data) {

    if (err) {
      res.status(500).end();
      return console.log(err);
    }

    try {
      data = JSON.parse(data);
    } catch (e) {
      res.status(500).end();
      return console.log(e);
    }

    data.forEach(function (student, index) {
      if (student.id == req.params.id) {
        data[index] = req.body;
      }
    });

    fs.writeFile(__dirname + './../data/students.json', JSON.stringify(data), function (err) {

      if (err) {
        res.status(500).end();
        return console.log(err);
      }

      studentCache = data;

      res.status(200).send(data);
    });
  });
});

// 创建一条数据
router.post('/', function (req, res) {

  fs.readFile(__dirname + './../data/students.json', 'utf8', function (err, data) {

    if (err) {
      res.status(500).end();
      return console.log(err);
    }

    try {
      data = JSON.parse(data);
    } catch (e) {
      res.status(500).end();
      return console.log(e);
    }

    data.push(req.body);

    fs.writeFile(__dirname + './../data/students.json', JSON.stringify(data), function (err) {

      if (err) {
        res.status(500).end();
        return console.log(err);
      }

      studentCache = data;

      res.status(201).send(data);
    });
  });
});

// 删除一条数据
router.delete('/:id', function (req, res) {

  fs.readFile(__dirname + './../data/students.json', 'utf8', function (err, data) {

    if (err) {
      res.status(500).end();
      return console.log(err);
    }

    try {
      data = JSON.parse(data);
    } catch (e) {
      res.status(500).end();
      return console.log(e);
    }

    var index = -1;
    data.forEach(function (student, i) {
      if (student.id == req.params.id) {
        index = i;
      }
    });

    if (index >= 0) {
      data.splice(index, 1);
    }

    fs.writeFile(__dirname + './../data/students.json', JSON.stringify(data), function (err) {

      if (err) {
        res.status(500).end();
        return console.log(err);
      }

      studentCache = data;

      res.status(204).end();
    });
  });
});

module.exports = router;