'use strict'

const fs = require('fs');


const DASEPATH = __dirname + '/dase.json'

var dase = null;

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



function find (table, condition, fn) {

	// 条件查询
	/*if(condition){

		var keys = Object.keys(condition);

		var result = [];

		dase[table].forEach(function(entity){

		    if(entity[keys[0]] = condition[keys[0]]){
		    	result.push(data[index]);
		    }

		});

		return result;

	} else {

		// 查询全部
		return dase[table];
	}*/

	if(!dase) {
		readFile(DASEPATH, function(data){

			dase = data;

			// console.log(dase[table])

			fn(dase[table]);
		})
	}
}


find('paper',null,function(data){

console.log(data)
})


