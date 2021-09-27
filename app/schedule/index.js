'use strict';
const Subscription = require('egg').Subscription;

module.exports = class extends Subscription {
  // 通过schedule属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '5s', // 一分钟间隔
      type: 'all', // 指定所有worker都要执行
    };
  }

  async subscribe() {
    // console.log('缓存', this.ctx.session.openId);

  }


}
;
