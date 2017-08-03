const M2M_HOST = 'http://powerhousem2m.azurewebsites.net';

const endpoints = {
  home: '/',
  main_dash: '/',
  login: '/login/',
  hedge_trans: '/hedge_tran/hedge_tran'
};

const urls = {
  login: M2M_HOST + endpoints.login,
  home: M2M_HOST + endpoints.home,
  hedge_txn_log: M2M_HOST + endpoints.hedge_trans
};

const user = {
  username: 'atester',
  password: 'TeamLevine01'
};
const admin = {
  username: 'admin',
  password: 'admin'
};

const cme_months = ['F', 'G', 'H', 'J', 'K', 'M', 'N', 'Q', 'U', 'V', 'X', 'Z']

export { endpoints, urls, user, admin, cme_months };
