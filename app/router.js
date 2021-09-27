'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  console.log(app, app.middleware.verifyToken());
  // app.middleware会合并所有中间件，在router中为局部中间件 app.middleware.xxx(option,app),调用后传给第二个参数，全局中间件会由配置文件传入option，局部中间件自己需处理传入配置对象和app全局对象

  require('./router/frontEnd')(app);
  require('./router/backEnd')(app);

};
