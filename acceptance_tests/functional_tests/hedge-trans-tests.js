// hedge transactions tests entered manually and with csv upload

import { getLocation } from '../helpers/common';
import { urls } from '../config';
import {
  HedgeTransactionPage,
  HedgeTransactionPageValidator,
  HedgeTransactionPageMap,
  DashboardPage,
  DashboardPageMap,
  DashboardPageValidator
} from '../pages';
import { userRole as user } from '../helpers/roles';
import { simple_hedge_txn } from '../data/hedge_transactions';

const map = new HedgeTransactionPageMap();
const validator = new HedgeTransactionPageValidator(map);
const page = new HedgeTransactionPage(urls.hedge_txn_log, map, validator);

const dashMap = new DashboardPageMap();
const dashValidator = new DashboardPageValidator(dashMap);
const dash = new DashboardPage(urls.dashboard, dashMap, dashValidator);

fixture`Enter Hedge Transaction`
  .page`${urls.hedge_txn_log}`.beforeEach(async () => {
  await page.visitAs(user);
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

  test('Dashboard page visitor', async () => {
    await dash.visitAs(user);
    await dash.validate().location(urls.dashboard);    
  }); 

  test('"Working"" transactions do not affect program values', async () => {
    const txn = simple_hedge_txn

    // grab initial values
    await dash.visitAs(user);
    const initState = await dash.m.getProgramData(txn.inventory, txn.product);

    // add a working order
    txn.status = 'Working'
    await page.visitAs(user);
    await page.addTransaction(txn);

    await dash.visitAs(user);
    await dash.validate().programValue(txn.inventory, txn.product, 'Physical Volume', initState.physicalVolume);
    await dash.validate().programValue(txn.inventory, txn.product, 'Hedge Volume', initState.hedgeVolume); 
    await dash.validate().programValue(txn.inventory, txn.product, 'Avg Cost', initState.avgCost);
    await dash.validate().programValue(txn.inventory, txn.product, 'Marked to Market', initState.m2mCost);
    await dash.validate().programValue(txn.inventory, txn.product, 'Hedge Balance', initState.hedgeBalance);
  })
  .after(async () => {
    await page.visitAs(user)
    await page.removeTransaction(simple_hedge_txn);
  });

  test('"Canceled"" transactios do not affect program values', async () => {
    const txn = simple_hedge_txn

    // grab initial values
    await dash.visitAs(user);
    const initState = await dash.m.getProgramData(txn.inventory, txn.product);

    // add a working order
    txn.status = 'Canceled'
    await page.visitAs(user);
    await page.addTransaction(txn);

    await dash.visitAs(user);
    await dash.validate().programValue(txn.inventory, txn.product, 'Physical Volume', initState.physicalVolume);
    await dash.validate().programValue(txn.inventory, txn.product, 'Hedge Volume', initState.hedgeVolume); 
    await dash.validate().programValue(txn.inventory, txn.product, 'Avg Cost', initState.avgCost);
    await dash.validate().programValue(txn.inventory, txn.product, 'Marked to Market', initState.m2mCost);
    await dash.validate().programValue(txn.inventory, txn.product, 'Hedge Balance', initState.hedgeBalance);
  })
  .after(async () => {
    await page.visitAs(user)
    await page.removeTransaction(simple_hedge_txn);
  });
