var express = require('express');
var router = express.Router();
var fs = require('fs');

var teacherCache = [];

// 获取所有班级
router.get('/', function (req, res) {

  if(teacherCache.length){

    console.log('缓存1')
    res.status(200).send(teacherCache);

  } else {

    fs.readFile(__dirname + './../data/teachers.json', 'utf8', function (err, data) {

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

      teacherCache = data;

      res.status(200).send(data);

    });
  }
})

// 获取指定ID的班级
router.get('/:id', function (req, res) {

  if(teacherCache.length){

    console.log('缓存2')

    var teacher = [];
    
    teacherCache.forEach(function (item, index) {
      if (item.id == req.params.id) {
        teacher.push(teacherCache[index]);
      }
    });

    res.status(200).send(teacher);
    
  } else {

    fs.readFile(__dirname + './../data/teachers.json', 'utf8', function (err, data) {

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

      var teacher = [];
    
      data.forEach(function (item, index) {
        if (item.id == req.params.id) {
          teacher.push(data[index]);
        }
      });

      teacherCache = data;

      res.status(200).send(teacher);

    });
  }

})

// 更新一条数据
router.put('/:id', function (req, res) {

  fs.readFile(__dirname + './../data/teachers.json', 'utf8', function (err, data) {

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

    data.forEach(function (teacher, index) {
      if (teacher.id == req.params.id) {
        data[index] = req.body;
      }
    });

    fs.writeFile(__dirname + './../data/teachers.json', JSON.stringify(data), function (err) {

      if (err) {
        res.status(500).end();
        return console.log(err);
      }

      teacherCache = data;

      res.status(200).send(data);
    });
  });
});

// 创建一条数据
router.post('/', function (req, res) {

  fs.readFile(__dirname + './../data/teachers.json', 'utf8', function (err, data) {

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

    fs.writeFile(__dirname + './../data/teachers.json', JSON.stringify(data), function (err) {

      if (err) {
        res.status(500).end();
        return console.log(err);
      }

      teacherCache = data;

      res.status(201).send(data);
    });
  });
});

// 删除一条数据
router.delete('/:id', function (req, res) {

  fs.readFile(__dirname + './../data/teachers.json', 'utf8', function (err, data) {

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
    data.forEach(function (teacher, i) {
      if (teacher.id == req.params.id) {
        index = i;
      }
    });

    if (index >= 0) {
      data.splice(index, 1);
    }

    fs.writeFile(__dirname + './../data/teachers.json', JSON.stringify(data), function (err) {

      if (err) {
        res.status(500).end();
        return console.log(err);
      }

      teacherCache = data;

      res.status(204).end();
    });
  });
});

module.exports = router;