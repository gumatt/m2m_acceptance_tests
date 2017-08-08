import { Selector, ClientFunction, t } from 'testcafe';

import { f, getLocation } from '../helpers/common';
import { urls, endpoints } from '../config';
import {
  HedgeTransactionPage,
  HedgeTransactionPageValidator
} from '../pages/hedge_trans';
import { userRole as user } from '../helpers/roles';
import { simple_hedge_txn } from '../data/hedge_transactions';

const validator = new HedgeTransactionPageValidator(t);
const page = new HedgeTransactionPage(validator);
user.preserveUrl = true;

fixture`Enter Hedge Transaction`
  .page`${urls.hedge_txn_log}`.beforeEach(async t => {
  await t.useRole(user).navigateTo(urls.hedge_txn_log);
});

test('Hedge Transaction Log Exists', async t => {
  await page.validate().location(urls.hedge_txn_log);
  await page.validate().transTableIsVisible();
});

test('Add Hedge Transaction Modal Exists', async t => {
  await t.click(page.createTransButton);

  await page.validate().addTransModalIsVisible();
});

test('Enter Simple Hedge Trans', async t => {
  const validator = new HedgeTransactionPageValidator(t);
  const page = new HedgeTransactionPage(validator);
  const orig_count = await page.transCount(); 

  await page.addTransaction(simple_hedge_txn);
  await page.validate().transTableIsVisible();
  await page.validate().transCount(orig_count + 1);
  await page.validate().transNoAppears(simple_hedge_txn.name);
  await page.validate().transNoHasPrice(simple_hedge_txn.name, simple_hedge_txn.price);
});
