
import { getLocation } from '../helpers/common';
import { urls } from '../config';
import { user } from '../data/users';
import { LoginPage, LoginPageValidator, LoginPageMap } from '../pages';

fixture`Simple Login Test`.page`${urls.login}`;

const map = new LoginPageMap();
const validator = new LoginPageValidator(map);
const page = new LoginPage(urls.login, map, validator);

test('Refactor LoginPage Test', async () => {
  await page.login(user.username, user.password);
  await page.validate().location(urls.home);
  await page.validate().welcomeUsername(user.username);
});

test('Login Failure', async () => {
  await page.login(user.username, 'badPassword');

  await page.validate().location(urls.login);
  await page.validate().flashMessageIsVisible();
  await page.validate().flashMessageContains('Invalid username or password');
});

test('SOW5#30 LoginPage Test', async () => {
  await page.login(user.username, user.password);
  await page.validate().location(urls.home);
  await page.validate().welcomeUsername(user.username);
  await page.validate().noAlert();
});