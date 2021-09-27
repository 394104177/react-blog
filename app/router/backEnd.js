// eslint-disable-next-line strict
module.exports = app => {
  const { router } = app;
  router.get('/admin', 'backEnd.home.index');
  router.post('/backEnd/checkLogin', 'backEnd.home.checkLogin');
  router.get('/backEnd/getTypeInfo', 'backEnd.home.getTypeInfo');
  router.post('/backEnd/addArticles', 'backEnd.home.addArticles');
  router.post('/backEnd/updateArticle', 'backEnd.home.updateArticle');
  router.get('/backEnd/getArticleList', 'backEnd.home.getArticleList');
  router.get('/backEnd/delArticle/:id', 'backEnd.home.delArticle');
  router.get('/backEnd/getArticleById/:id', 'backEnd.home.getArticleById');
  return router;
};

