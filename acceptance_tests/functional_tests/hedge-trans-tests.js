// hedge transactions tests entered manually and with csv upload

import { getLocation } from '../helpers/common';
import { urls } from '../config';
import {
  HedgeTransactionPage,
  HedgeTransactionPageValidator,
  HedgeTransactionPageMap
} from '../pages';
import { userRole as user } from '../helpers/roles';
import { simple_hedge_txn } from '../data/hedge_transactions';

const map = new HedgeTransactionPageMap();
const validator = new HedgeTransactionPageValidator(map);
const page = new HedgeTransactionPage(urls.hedge_txn_log, map, validator);

fixture`Enter Hedge Transaction`
  .page`${urls.hedge_txn_log}`.beforeEach(async () => {
  await page.navigateToAs(user);
});

test('Hedge Transaction Log Exists', async () => {
  await page.validate().location(urls.hedge_txn_log);
  await page.validate().transTableIsVisible();
});

test('Add Hedge Transaction Modal Exists', async () => {
  await page.openTransModal();

  await page.validate().addTransModalIsVisible();
});

test('Hedge Upload Modal Exists', async () => {
  await page.openUploadModal();
  await page.validate().uploadTransModalIsVisible();
  await page.validate().isVisible(page.m.browseFilesButton);
})

test('Upload csv transactions', async () => {
  const initTransCount = await page.transCount();
  await page.openUploadModal();
  await page.uploadFiles(['../data/uploads/hedge_upload_test_2.csv'])
  await page.validate().transCount(initTransCount + 3);
})
.after(async () => {
  await page.removeNthTransaction(2);
  await page.removeNthTransaction(2);
  await page.removeNthTransaction(2); 
})


test('Enter Simple Hedge Trans', async () => {
  const orig_count = await page.transCount();

  await page.addTransaction(simple_hedge_txn);
  await page.validate().transTableIsVisible();
  await page.validate().transCount(orig_count + 1);
  await page.validate().transNoAppears(simple_hedge_txn.name);
  await page
    .validate()
    .transNoHasPrice(simple_hedge_txn.name, simple_hedge_txn.price);
  })
  .after(async () => {
    await page.removeTransaction(simple_hedge_txn);
  });

test('Modify Hedge Trans', async () => {
    await page.addTransaction(simple_hedge_txn);
    await page.openEditModal(simple_hedge_txn.name);
    const new_price = simple_hedge_txn.price + 0.5;
    await page.updatePriceInput(new_price);
    await page.clickSubmit();


    await page.validate().transNoHasPrice(simple_hedge_txn.name, new_price);
  })
  .after(async () => {
    await page.removeTransaction(simple_hedge_txn);
  });
