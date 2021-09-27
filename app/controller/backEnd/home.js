'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
//   async index() {
//     // get /
//     const { ctx } = this;
//     // await ctx.render('home.html', { title: '服务端渲染的页面' }); // 找到模板目录
//     const res = await ctx.renderView('home.html', { title: '服务端渲染的页面' });
//     console.log(this);
//     ctx.body = res;
//   }
//   // get /new
//   async new() {
//     this.ctx.body = '获取添加博客的表单页面';
//   }
//   // get /：id/edit
//   async edit() {
//     this.ctx.body = '获取某一篇博客编辑页面';
//   }
//   // post /
//   async create() {
//     this.ctx.body = '添加某一篇博客';
//   }

  //   // put /:id
  //   async update() {
  //     this.ctx.body = '更新某一篇博客';
  //   }

  //   // get /:id
  //   async show() {
  //     this.ctx.body = '获取某一篇博客';
  //   }

  //   // delete /:id
  //   async delete() {
  //     this.ctx.body = '删除某一篇博客';
  //   }
  async index() {
    this.ctx.body = 'backEnd';

  }
  async checkLogin() {

    const res = await this.ctx.service.local.getUserPassport();
    console.log(res);
    if (res.length > 0) {
      // 登录成功,进行session缓存
      const openId = new Date().getTime();

      this.ctx.session.openId = { openId };
      this.ctx.cookies.set('id', '123');
      console.log('sessionSave');
      this.ctx.body = { data: '登录成功', openId };

    } else {
      this.ctx.body = { data: '登录失败' };
    }
  }

  async getTypeInfo() {
    await this.app.mongoose.connect('mongodb://127.0.0.1:27017/blog', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const article = require('../../models/type');

    const res = await article.find();


    this.ctx.body = { data: res };
  }

  async addArticles() {
    const tmpArticles = this.ctx.request.body;
    await this.app.mongoose.connect('mongodb://127.0.0.1:27017/blog', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const article = require('../../models/article');
    try {
      console.log(tmpArticles);
      const res = await article.create(tmpArticles);
      console.log(res);
      this.ctx.body = {
        isScuccess: true,
        _id: res._id,
      };
    } catch (err) {
      console.log(err);
      this.ctx.body = {
        isScuccess: false,

      };
    }


  }
  async updateArticle() {
    const tmpArticles = this.ctx.request.body;
    await this.app.mongoose.connect('mongodb://127.0.0.1:27017/blog', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const article = require('../../models/article');
    try {
      console.log('update+++++++++++++++++++++++++', tmpArticles);
      tmpArticles.addTime = new Date(tmpArticles.addTime + 8 * 3600 * 1000);
      const res = await article.findByIdAndUpdate(tmpArticles._id, tmpArticles);
      console.log(res);
      this.ctx.body = {
        isScuccess: true,

      };
    } catch (err) {
      console.log(err);
      this.ctx.body = {
        isScuccess: false,

      };
    }
  }

  async getArticleList() {
    await this.app.mongoose.connect('mongodb://127.0.0.1:27017/blog', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const article = require('../../models/article');
    const res = await article.find().setOptions({ populate: 'typeId' });
    this.ctx.body = { list: res };
  }
  async delArticle() {
    await this.app.mongoose.connect('mongodb://127.0.0.1:27017/blog', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const id = this.ctx.params.id;
    const article = require('../../models/article');
    const res = await article.findByIdAndDelete(id);
    this.ctx.body = { data: res };
  }
  async getArticleById() {
    await this.app.mongoose.connect('mongodb://127.0.0.1:27017/blog', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const id = this.ctx.params.id;
    const article = require('../../models/article');
    const res = await article.findById(id);
    this.ctx.body = { data: res };
  }

}

module.exports = HomeController;
