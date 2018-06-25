var express = require('express');
var router = express.Router();
var fs = require('fs');

var clazzCache = [];

// 获取所有班级
router.get('/', function (req, res) {

  if(clazzCache.length){

    res.status(200).send(clazzCache);

  } else {

    fs.readFile(__dirname + './../data/clazzes.json', 'utf8', function (err, data) {

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

      clazzCache = data;

      res.status(200).send(data);

    });
  }
})

// 获取指定ID的班级
router.get('/:id', function (req, res) {

  if(clazzCache.length){

    var clazz = [];
    
    clazzCache.forEach(function (item, index) {
      if (item.id == req.params.id) {
        clazz.push(clazzCache[index]);
      }
    });

    res.status(200).send(clazz);
    
  } else {

    fs.readFile(__dirname + './../data/clazzes.json', 'utf8', function (err, data) {

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

      var clazz = [];
    
      data.forEach(function (item, index) {
        if (item.id == req.params.id) {
          clazz.push(data[index]);
        }
      });

      clazzCache = data;

      res.status(200).send(clazz);

    });
  }

})

// 更新一条数据
router.put('/:id', function (req, res) {

  fs.readFile(__dirname + './../data/clazzes.json', 'utf8', function (err, data) {

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

    data.forEach(function (clazz, index) {
      if (clazz.id == req.params.id) {
        data[index] = req.body;
      }
    });

    fs.writeFile(__dirname + './../data/clazzes.json', JSON.stringify(data), function (err) {

      if (err) {
        res.status(500).end();
        return console.log(err);
      }

      clazzCache = data;

      res.status(200).send(data);
    });
  });
});

// 创建一条数据
router.post('/', function (req, res) {

  fs.readFile(__dirname + './../data/clazzes.json', 'utf8', function (err, data) {

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

    fs.writeFile(__dirname + './../data/clazzes.json', JSON.stringify(data), function (err) {

      if (err) {
        res.status(500).end();
        return console.log(err);
      }

      clazzCache = data;

      res.status(201).send(data);
    });
  });
});

// 删除一条数据
router.delete('/:id', function (req, res) {

  fs.readFile(__dirname + './../data/clazzes.json', 'utf8', function (err, data) {

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
    data.forEach(function (clazz, i) {
      if (clazz.id == req.params.id) {
        index = i;
      }
    });

    if (index >= 0) {
      data.splice(index, 1);
    }

    fs.writeFile(__dirname + './../data/clazzes.json', JSON.stringify(data), function (err) {

      if (err) {
        res.status(500).end();
        return console.log(err);
      }

      clazzCache = data;

      res.status(204).end();
    });
  });
});

module.exports = router;