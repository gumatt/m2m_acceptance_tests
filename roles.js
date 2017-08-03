import { Role } from 'testcafe';

import { urls, user, admin } from './config';
import { LoginPage } from './pages'
import { f } from './common';

const login = new LoginPage()

const userRole = Role(urls.login, async t => {
  await f.login(t, user.username, user.password)
    // .typeText(login.usernameInput, user.username)
    // .typeText(login.passwordInput, user.password)
    // .click(login.submitButton)
});

const adminRole = Role(urls.login, async t => {

  f.login(adminUser.username, admin.password);
});

export { userRole, adminRole };
