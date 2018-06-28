var express = require('express');
var router = express.Router();
var fs = require('fs');

var questionCache = [];

// 获取所有试题
router.get('/', function (req, res) {

  if(questionCache.length){

    res.status(200).send(questionCache);

  } else {

    fs.readFile(__dirname + './../data/questions.json', 'utf8', function (err, data) {

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

      questionCache = data;

      res.status(200).send(data);

    });
  }
})

// 获取指定ID的试题
router.get('/:id', function (req, res) {

  if(questionCache.length){

    var question = [];
    
    questionCache.forEach(function (item, index) {
      if (item.id == req.params.id) {
        question.push(questionCache[index]);
      }
    });

    res.status(200).send(question);
    
  } else {

    fs.readFile(__dirname + './../data/questions.json', 'utf8', function (err, data) {

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

      var question = [];
    
      data.forEach(function (item, index) {
        if (item.id == req.params.id) {
          question.push(data[index]);
        }
      });

      questionCache = data;

      res.status(200).send(question);

    });
  }

})

// 获取指定类型的试题
router.get('/types/:id', function (req, res) {

  if(questionCache.length){

    var question = [];
    
    questionCache.forEach(function (item, index) {
      if (item.type == req.params.id) {
        question.push(questionCache[index]);
      }
    });

    res.status(200).send(question);
    
  } else {

    fs.readFile(__dirname + './../data/questions.json', 'utf8', function (err, data) {

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

      var question = [];
    
      data.forEach(function (item, index) {
        if (item.type == req.params.id) {
          question.push(data[index]);
        }
      });

      questionCache = data;

      res.status(200).send(question);

    });
  }

})

// 获取指定范围的试题
router.get('/ranges/:id', function (req, res) {

  if(questionCache.length){

    var question = [];
    
    questionCache.forEach(function (item, index) {
      if (item.range == req.params.id) {
        question.push(questionCache[index]);
      }
    });

    res.status(200).send(question);
    
  } else {

    fs.readFile(__dirname + './../data/questions.json', 'utf8', function (err, data) {

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

      var question = [];
    
      data.forEach(function (item, index) {
        if (item.range == req.params.id) {
          question.push(data[index]);
        }
      });

      questionCache = data;

      res.status(200).send(question);

    });
  }

})

// 获取指定范围的试题
router.get('/ranges/:rangeid/types/:typeid', function (req, res) {

  if(questionCache.length){

    var question = [];
    
    questionCache.forEach(function (item, index) {
      if (item.range == req.params.rangeid && item.type == req.params.typeid) {
        question.push(questionCache[index]);
      }
    });

    res.status(200).send(question);
    
  } else {

    fs.readFile(__dirname + './../data/questions.json', 'utf8', function (err, data) {

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

      var question = [];
    
      data.forEach(function (item, index) {
        if (item.range == req.params.rangeid && item.type == req.params.typeid) {
          question.push(data[index]);
        }
      });

      questionCache = data;

      res.status(200).send(question);

    });
  }

})

// 更新一条数据
router.put('/:id', function (req, res) {

  fs.readFile(__dirname + './../data/questions.json', 'utf8', function (err, data) {

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

    data.forEach(function (question, index) {
      if (question.id == req.params.id) {
        data[index] = req.body;
      }
    });

    fs.writeFile(__dirname + './../data/questions.json', JSON.stringify(data), function (err) {

      if (err) {
        res.status(500).end();
        return console.log(err);
      }

      questionCache = data;

      res.status(200).send(data);
    });
  });
});

// 创建一条数据
router.post('/', function (req, res) {

  fs.readFile(__dirname + './../data/questions.json', 'utf8', function (err, data) {

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

    fs.writeFile(__dirname + './../data/questions.json', JSON.stringify(data), function (err) {

      if (err) {
        res.status(500).end();
        return console.log(err);
      }

      questionCache = data;

      res.status(201).send(data);
    });
  });
});

// 删除一条数据
router.delete('/:id', function (req, res) {

  fs.readFile(__dirname + './../data/questions.json', 'utf8', function (err, data) {

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
    data.forEach(function (question, i) {
      if (question.id == req.params.id) {
        index = i;
      }
    });

    if (index >= 0) {
      data.splice(index, 1);
    }

    fs.writeFile(__dirname + './../data/questions.json', JSON.stringify(data), function (err) {

      if (err) {
        res.status(500).end();
        return console.log(err);
      }

      questionCache = data;

      res.status(204).end();
    });
  });
});

module.exports = router;