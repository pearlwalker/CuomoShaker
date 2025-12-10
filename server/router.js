const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getCuomos', mid.requiresLogin, controllers.Cuomo.getCuomos);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/shaker', mid.requiresLogin, controllers.Cuomo.shakerPage);
  app.post('/shaker', mid.requiresLogin, controllers.Cuomo.shakeCuomo);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
