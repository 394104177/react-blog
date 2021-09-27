/* eslint-disable strict */
const Service = require('egg').Service;

class LocalService extends Service {

  async getUserPassport() {

    const userName = this.ctx.request.body.userName;
    const passWord = this.ctx.request.body.passWord;

    await this.app.mongoose.connect('mongodb://127.0.0.1:27017/blog', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const adminUser = require('../models/adminUser');
    const res = await adminUser.find({ userName, passWord });

    return res;


  }
}

module.exports = LocalService
;
