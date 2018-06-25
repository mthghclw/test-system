// 生成ID
function generateId () {

  var max = 999999999;
  var min = 100000000;
  return Math.floor(Math.random() * (max - min + 1) + min).toString();

}

// 生成当前日期
function generateDate () {

  return new Date().toLocaleDateString('chinese');

}



module.exports = {
  generateId: generateId,
  generateDate: generateDate
};
