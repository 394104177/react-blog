/* eslint-disable strict */
const Controller = require('egg').Controller;

class User extends Controller {
  // 提供登录页面
  async login() {
    const model = { title: '服务端渲染页面', err: '', loginId: '默认账号' };

    // render(name, locals) 渲染模板文件, 并赋值给 ctx.body
    // renderView(name, locals) 渲染模板文件, 仅返回不赋值
    // renderString(tpl, locals) 渲染模板字符串, 仅返回不赋值,当使用 renderString 时需要指定模板引擎，如果已经定义 defaultViewEngine 这里可以省略。
    await this.ctx.render('login.ejs', model);

  }
  // 处理登录
  async handleLogin() {
    const model = { title: '服务端渲染页面', err: '密码错误', loginId: '默认账号' };
    console.log(this.config);
    if (this.ctx.request.body.password !== 123 + '') {

      await this.ctx.render('login.ejs', model);
    } else {
      this.ctx.cookies.set('token', 'mytoken');
      this.ctx.redirect('/');
    }

  }
}

module.exports = User
;
