import { Selector } from 'testcafe';

import { getLocation } from './common'
import { LOGIN_PAGE, HOME_PAGE } from './config';
import { LoginPage } from './pages';

fixture `Simple Login Test`
    .page`${LOGIN_PAGE}`;

const page = new LoginPage();


test('Login Success', async t => {
  await t
    .typeText(page.usernameInput, 'atester')
    .typeText(page.passwordInput, 'TeamLevine01')
    .click(page.submitButton);

  await t.expect(getLocation()).eql(HOME_PAGE);
});

test('Login Failure', async t => {
  await t
    .typeText(page.usernameInput, 'atester')
    .typeText(page.passwordInput, 'TeamLevine05')
    .click(page.submitButton);

  await t.expect(getLocation()).eql(LOGIN_PAGE);
  await t.expect(page.flashMessage).visible;
  await t.expect(page.flashMessage.innerText).contains('Invalid');
});
