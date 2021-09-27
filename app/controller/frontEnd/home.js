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
  async getArticleList() {

    await this.app.mongoose.connect('mongodb://127.0.0.1:27017/blog', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(this.ctx.request.url, this.ctx.req.url, this.ctx.query);

    const articleModel = require('../../models/article');
    const queryOption = {};
    queryOption.populate = 'typeId';
    const res = await articleModel.find().setOptions(queryOption);
    console.log(res);
    this.ctx.body = res;
  }
  async getArticleById() {

    await this.app.mongoose.connect('mongodb://127.0.0.1:27017/blog', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(this.ctx.request.url, this.ctx.req.url, this.ctx.query, this.ctx.params);

    const articleModel = require('../../models/article');
    const queryOption = {};
    queryOption.populate = 'typeId';
    const res = await articleModel.find({ _id: `${this.ctx.params.id}` }).setOptions(queryOption);
    console.log(res);
    this.ctx.body = res[0];
  }

  async getTypeInfo() {

    await this.app.mongoose.connect('mongodb://127.0.0.1:27017/blog', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const type = require('../../models/type');
    const res = await type.find({ });
    this.ctx.body = { data: res };

  }

  async getListById() {
    await this.app.mongoose.connect('mongodb://127.0.0.1:27017/blog', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const article = require('../../models/article');
    const queryOption = {};
    queryOption.populate = 'typeId';
    let res = await article.find().setOptions(queryOption);

    res = res.filter(item => {

      return item.typeId.id === +this.ctx.params.id;
    });

    this.ctx.body = { data: res };
  }
  async index() {
    this.ctx.body = 'hello egg';
  }
}

module.exports = HomeController;
