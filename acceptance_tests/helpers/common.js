import { ClientFunction } from 'testcafe';
import { LoginPage, LoginPageMap, LoginPageValidator } from '../pages';

const getLocation = ClientFunction(() => document.location.href);

const map = new LoginPageMap();
const validator = new LoginPageValidator(map)
const page = new LoginPage(map, validator);

var f = {
  login: async function(username, password) {
    await page.login(username, password);
  }
};

export { f, getLocation };
