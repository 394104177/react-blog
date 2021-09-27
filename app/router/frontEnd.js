// eslint-disable-next-line strict
module.exports = app => {
  const { router } = app;
  router.get('/frontEnd', 'frontEnd.home.index');
  router.get('/frontEnd/getArticleList', 'frontEnd.home.getArticleList');
  router.get('/frontEnd/getArticleById/:id', 'frontEnd.home.getArticleById');
  router.get('/frontEnd/getTypeInfo', 'frontEnd.home.getTypeInfo');
  router.get('/frontEnd/getListById/:id', 'frontEnd.home.getListById');
  return router;
};
