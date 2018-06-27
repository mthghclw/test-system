'use strict'

const fs = require('fs');

const baseurl = __dirname + './../data/'

const DASEPATH = __dirname + './../data/dase.json'

var dase = {
	papers: [],
	questions: []
};

function readFile(filePath, fn){

	fs.readFile(filePath, 'utf8', function (err, data) {

        if (err) {
          return console.log(err);
        }

        try {
          data = JSON.parse(data);
        } catch (e) {
          return console.log(e);
        }

	    fn(data);

    });

};

function writeFile(filePath, data, fn){

	fs.writeFile(filePath, JSON.stringify(data), function (err) {

      	if (err) {
        	return console.log(err);
      	}

     	fn(data);
    });
};


// readFile(DASEPATH, function(data){
// 	dase = data;
// });

function Jsondase () {

}

Jsondase.prototype.add = function (entity) {

	if (Array.isArray(entity) && entity.length) {

	} else {
		throw new Error();
	}

};

Jsondase.prototype.delete = function (entity) {

	if (Array.isArray(entity) && entity.length) {

	} else {
		throw new Error();
	}

};

Jsondase.prototype.update = function (entity) {

	if (Array.isArray(entity) && entity.length) {

	} else {
		throw new Error();
	}

};

// 查询全部
Jsondase.prototype.findAll = function (table, fn) {

	if(!table) throw new Error('表名不能为空！');

	if(dase[table].length) {

		fn(dase[table]);

	} else {
		readFile(baseurl + table + '.json', function(data){

			dase[table] = data;

			fn(dase[table]);
		});
	}
};

Jsondase.prototype.findOne = function (table, id, fn) {

	if(!table) throw new Error('表名不能为空！');

	console.log(dase)
	console.log(dase[table])

	
	var result = [];

	if(dase[table].length) {

		console.log('缓存')

		dase[table].forEach(function(entity,index){

		    if(entity.id == id){
		    	result.push(dase[table][index]);
		    }

		});

		fn(result);

	} else {
		readFile(baseurl + table + '.json', function(data){

			dase[table] = data;

			console.log('重新读取')
			

			dase[table].forEach(function(entity, index){

			    if(entity.id == id){
			    	result.push(dase[table][index]);
			    }

			});

			fn(result);
		});
	}
};

module.exports = new Jsondase();