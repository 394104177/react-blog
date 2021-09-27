'use strict';

/** @type Egg.EggPlugin */
module.exports = {
//   had enabled by egg
  static: {
    enable: true,
    // package:'',node modules
    // path :'' 自定义
  },
  ejs: {
    package: 'egg-view-ejs',
    enable: true,
  },
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
};

