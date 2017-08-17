import { t } from 'testcafe';

import { getLocation } from '../helpers/common';
import { urls } from '../config';
import {
  DashboardPage,
  DashboardPageValidator,
  DashboardPageMap,
  HedgeTransactionPage
} from '../pages';
import { userRole as user } from '../helpers/roles';
import { simple_hedge_txn } from '../data/hedge_transactions';

import { TEMPLATE_SELECTORS } from '../config/selectors';

const map = new DashboardPageMap();
const validator = new DashboardPageValidator(map);
const page = new DashboardPage(urls.dashboard, map, validator);

fixture`Nav Menu UI Tests`
  .page`${urls.home}`.beforeEach(async () => {
  await page.navigateToAs(user);
});

test('SOW-5 Card-33 Progams Menu Populated', async () => {
  await page.clickMenu('programs');
  await page.validate().subMenuVisible('programs');

  await page.clickMenu('programs');
  await page.validate().subMenuVisible('programs');
  
  await page.clickMenu('transactions');
  await page.validate().subMenuVisible('transactions');
})

test('Transactions Menu contains phys and hedge', async () => {
  await page.clickMenu('transactions');
  await page.validate().subMenuContains('transactions', 'Hedge');
  await page.validate().subMenuContains('transactions', 'Physical')
})

test('Settings Menu contains Users and Accounts', async() => {
  await page.clickMenu('settings');
  await page.validate().subMenuContains('settings', 'Users');
  await page.validate().subMenuContains('settings', 'Accounts');
})
