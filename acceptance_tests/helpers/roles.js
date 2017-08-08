import { Role } from 'testcafe';

import { urls } from '../config';
import { user, admin } from '../data/users';
import { LoginPage } from '../pages';
import { f } from '../helpers/common';

const login = new LoginPage();

const userRole = Role(urls.login, async t => {
  await f.login(t, user.username, user.password);
  // .typeText(login.usernameInput, user.username)
  // .typeText(login.passwordInput, user.password)
  // .click(login.submitButton)
});

const adminRole = Role(urls.login, async t => {
  f.login(adminUser.username, admin.password);
});

export { userRole, adminRole };
