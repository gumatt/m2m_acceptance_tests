import { endpoints } from './endpoints';

const M2M_HOST = 'https://powerhousem2m.azurewebsites.net';

const urls = {
  login: M2M_HOST + endpoints.login,
  home: M2M_HOST + endpoints.home,
  hedge_txn_log: M2M_HOST + endpoints.hedge_trans
};

export { M2M_HOST, urls };
