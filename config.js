const M2M_HOST = 'http://powerhousem2m.azurewebsites.net';
const HOME_URL = '/';
const LOGIN_URL = 'login/';
const HEDGE_TRANS_URL = '/hedge_tran/hedge_tran/';
const LOGIN_PAGE = M2M_HOST + '/' + LOGIN_URL;
const HOME_PAGE = M2M_HOST + HOME_URL;
const HEDGE_TXN_PAGE = M2M_HOST + HEDGE_TRANS_URL;
const regularUser = {
    username: 'atester',
    password: 'TeamLevine01'
}
const adminUser = {
    username: 'admin',
    password: 'admin'
}

export {
  M2M_HOST,
  LOGIN_PAGE,
  HOME_PAGE,
  HOME_URL,
  LOGIN_URL,
  HEDGE_TRANS_URL, 
  HEDGE_TXN_PAGE,
  regularUser,
  adminUser
};
