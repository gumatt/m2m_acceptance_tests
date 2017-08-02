import { Role } from 'testcafe';

import { LOGIN_PAGE, regularUser, adminUser } from './config';
import { LoginPage } from './pages'
import { f } from './common';

const login = new LoginPage()

const user = Role(LOGIN_PAGE, async t => {
  await t
    .typeText(login.usernameInput, 'atester')
    .typeText(login.passwordInput, 'TeamLevine01')
    .click(login.submitButton)
});

const admin = Role(LOGIN_PAGE, async t => {
  f.login(adminUser.username, adminUser.password);
});

export { user, admin };
