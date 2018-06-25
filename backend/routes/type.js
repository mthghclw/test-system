var express = require('express');
var router = express.Router();
var fs = require('fs');

var typeCache = [];

// 获取所有班级
router.get('/', function (req, res) {

  if(typeCache.length){

    console.log('缓存1')
    res.status(200).send(typeCache);

  } else {

    fs.readFile(__dirname + './../data/types.json', 'utf8', function (err, data) {

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

      typeCache = data;

      res.status(200).send(data);

    });
  }
})

// 获取指定ID的班级
router.get('/:id', function (req, res) {

  if(typeCache.length){

    console.log('缓存2')

    var type = [];
    
    typeCache.forEach(function (item, index) {
      if (item.id == req.params.id) {
        type.push(typeCache[index]);
      }
    });

    res.status(200).send(type);
    
  } else {

    fs.readFile(__dirname + './../data/types.json', 'utf8', function (err, data) {

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

      var type = [];
    
      data.forEach(function (item, index) {
        if (item.id == req.params.id) {
          type.push(data[index]);
        }
      });

      typeCache = data;

      res.status(200).send(type);

    });
  }

})

// 更新一条数据
router.put('/:id', function (req, res) {

  fs.readFile(__dirname + './../data/types.json', 'utf8', function (err, data) {

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

    data.forEach(function (type, index) {
      if (type.id == req.params.id) {
        data[index] = req.body;
      }
    });

    fs.writeFile(__dirname + './../data/types.json', JSON.stringify(data), function (err) {

      if (err) {
        res.status(500).end();
        return console.log(err);
      }

      typeCache = data;

      res.status(200).send(data);
    });
  });
});

// 创建一条数据
router.post('/', function (req, res) {

  fs.readFile(__dirname + './../data/types.json', 'utf8', function (err, data) {

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

    fs.writeFile(__dirname + './../data/types.json', JSON.stringify(data), function (err) {

      if (err) {
        res.status(500).end();
        return console.log(err);
      }

      typeCache = data;

      res.status(201).send(data);
    });
  });
});

// 删除一条数据
router.delete('/:id', function (req, res) {

  fs.readFile(__dirname + './../data/types.json', 'utf8', function (err, data) {

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
    data.forEach(function (type, i) {
      if (type.id == req.params.id) {
        index = i;
      }
    });

    if (index >= 0) {
      data.splice(index, 1);
    }

    fs.writeFile(__dirname + './../data/types.json', JSON.stringify(data), function (err) {

      if (err) {
        res.status(500).end();
        return console.log(err);
      }

      typeCache = data;

      res.status(204).end();
    });
  });
});

module.exports = router;