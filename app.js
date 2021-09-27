/* eslint-disable strict */
// egg如果创建好app之后，存在此文件且为一个方法，则会自动将其运行一次
const axios = require('axios');

module.exports = app => {

  app.axios = axios.default;
};

