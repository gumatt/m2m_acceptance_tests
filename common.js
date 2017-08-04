import { t, ClientFunction } from 'testcafe';
import { LoginPage } from './pages';

const getLocation = ClientFunction(() => document.location.href);

const login = new LoginPage();

var f = {
  login: async function(t, username, password) {
    await t
      .typeText(login.usernameInput, username)
      .typeText(login.passwordInput, password)
      .click(login.submitButton);
  }
};

export { f, getLocation };
