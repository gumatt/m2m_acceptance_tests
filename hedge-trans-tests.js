import { Selector, ClientFunction } from 'testcafe';

import { f, getLocation } from './common';
import {
  LOGIN_PAGE,
  HOME_PAGE,
  HEDGE_TRANS_URL,
  HEDGE_TXN_PAGE
} from './config';
import { HedgeTransPage } from './pages';
import { user } from './roles';

const hedgeTransPage = new HedgeTransPage();
user.preserveUrl = HEDGE_TXN_PAGE;

fixture `Enter Hedge Transaction`
  .page`${HEDGE_TXN_PAGE}`.beforeEach(async t => {
    user.preserveUrl = HEDGE_TXN_PAGE;
  });

test('Navigate to Hedge Trans', async t => {
  await t.useRole(user);
  await t.expect(getLocation()).contains(HEDGE_TRANS_URL);
});

test('Open Hedge Trans Modal', async t => {
  await t
    .useRole(user)
    .navigateTo(HEDGE_TXN_PAGE)
    .click(hedgeTransPage.createTransButton);

  await t.expect(hedgeTransPage.hedgeTransModal.visible).ok();
});

test('Enter Hedge Trans', async t => {
  await t
    .useRole(user)
    .navigateTo(HEDGE_TXN_PAGE)
    .click(hedgeTransPage.createTransButton)
    .typeText(hedgeTransPage.hedgeTransForm.find('#name'), 'test_txn_001');

  await t
    .expect(hedgeTransPage.hedgeTransForm.find('#name').value)
    .eql('test_txn_001');
});
