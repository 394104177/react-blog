/* eslint-disable strict */
module.exports = opt => {
  // option是中间件配置，app是全局对象，和express类似，返回一个中间件
  // 全局中间件所有情况下都会运行，局部则可以控制，koa在注册中间件时都会运行，egg进行了优化
  // 全局注册写在config文件
  return async function(ctx, next) {
    console.log(opt.a);
    if (ctx.session.openId) {
      console.log('sessionExist');
      await next();
    } else {
      console.log('sessionNotExist');
      ctx.body = { data: '没有登录' };
    }


  };
}
;
