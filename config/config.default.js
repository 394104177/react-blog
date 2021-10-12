/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1610643569389_6741';

  // add your middleware config here全局中间件会在controller处理之前运行，app.config.coremiddleware为内部中间件，最终合并形成函数数组app.middleware
  config.middleware = [ 'mymid' ];
  // 对应的中间件配置，该对象会作为中间件的option参数
  config.mymid = {
    a: 1,
    enable: true, // 内置的属性，是否选择开启
    // 内置的属性，匹配路径再进行中间件的处理，在使用局部中间件时可以给对应的action进行处理，也可以通过此处的正则进行处理
    // ignore：boolean
    match: '/admin',
  };
  // this config will be read by the egg-view internal plugin 内置了egg-view插件
  config.view = {
    // root:"",  //模板所在目录，多个绝对路径用逗号分割，默认app下的view
    // cache:'', //是否在启动时缓存模板路径，默认开启
    mapping: { // 映射配置，讲不同模板的后缀映射到对应引擎进行处理
      '.ejs': 'ejs',
      '.html': 'ejs',
    },
    defaultViewEngine: 'ejs', // 找不到引擎则选择默认引擎
    defaultExtension: '.ejs', // 后续在controller中渲染模板时，默认渲染的模板后缀名
  };
  // 内置中间件配置
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ 'http://localhost:3000', 'http://localhost:3001', 'http://admin.techgrow.top', 'http://blog.techgrow.top' ],
  };

  // mongoose
  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/blog',
    options: { useNewUrlParser: true,
      useUnifiedTopology: true },
    // mongoose global plugins, expected a function or an array of function and options
    plugins: [ ],
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  // If the origin is set, the plugin will follow it to set the Access-Control-Allow-Origin and ignore the security.domainWhiteList. Otherwise, the security.domainWhiteList which is default will take effect as described above.
  config.cors = {

    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
  };

  return {
    ...config,
    ...userConfig,
  };
};
