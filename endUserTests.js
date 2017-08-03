import { Selector } from 'testcafe';

import { getLocation } from './common'
import { urls, user } from './config';
import { LoginPage } from './pages';

fixture `Simple Login Test`
    .page`${urls.login}`;

const page = new LoginPage();


test('Login Success', async t => {
  await t
    .typeText(page.usernameInput, user.username)
    .typeText(page.passwordInput, user.password)
    .click(page.submitButton);

  await t.expect(getLocation()).eql(urls.home);
});

test('Login Failure', async t => {
  await t
    .typeText(page.usernameInput, user.username)
    .typeText(page.passwordInput, 'badPassword')
    .click(page.submitButton);

  await t.expect(getLocation()).eql(urls.login);
  await t.expect(page.flashMessage).visible;
  await t.expect(page.flashMessage.visible).ok();
});
