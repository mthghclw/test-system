'use strict'

var dase = {};

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

Jsondase.prototype.find = function (table, options) {

	var keys = Object.keys(options);
	// 条件查询
	if(keys.length){

	} else {
	// 查询全部
	}

	var result = [];

	  dase[table].forEach(function(entity){

	    options

	  });

};