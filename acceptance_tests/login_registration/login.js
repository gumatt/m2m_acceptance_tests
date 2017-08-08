import { Selector, t } from 'testcafe';

import { getLocation } from '../helpers/common';
import { urls } from '../config';
import { user } from '../data/users';
import { LoginPage, LoginPageValidator } from '../pages';

fixture`Simple Login Test`.page`${urls.login}`;

const validator = new LoginPageValidator(t);
const page = new LoginPage(t, validator);

test('Login Success', async t => {
  await t
    .typeText(page.usernameInput, user.username)
    .typeText(page.passwordInput, user.password)
    .click(page.submitButton);

  await page.validate().location(urls.home);
  await page.validate().welcomeUsername(user.username);
});

test('Refactor LoginPage Test', async t => {
  await page.login(user.username, user.password);
  await page.validate().location(urls.home);
  await page.validate().welcomeUsername(user.username);
});

test('Login Failure', async t => {
  await t
    .typeText(page.usernameInput, user.username)
    .typeText(page.passwordInput, 'badPassword')
    .click(page.submitButton);

  await page.validate().location(urls.login);
  await page.validate().flashMessageIsVisible();
  await page.validate().flashMessageContains('Invalid username or password');
});
