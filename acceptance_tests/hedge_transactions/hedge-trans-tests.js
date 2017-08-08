import { Selector, ClientFunction } from 'testcafe';

import { f, getLocation } from '../helpers/common';
import { urls, endpoints } from '../config';
import { HedgeTransPage, colIdx } from '../pages/pages';
import {
  HedgeTransactionPage,
  HedgeTransactionPageValidator
} from '../pages/hedge_trans';
import { userRole as user } from '../helpers/roles';
import { simple_hedge_txn } from '../data/hedge_transactions';

const hedgeTransPage = new HedgeTransPage();
user.preserveUrl = true;

fixture`Enter Hedge Transaction`
  .page`${urls.hedge_txn_log}`.beforeEach(async t => {
  await t.useRole(user).navigateTo(urls.hedge_txn_log);
});

test('Navigate to Hedge Trans', async t => {
  // await t.useRole(user);
  await t.expect(getLocation()).contains(endpoints.hedge_trans);
});

test('Open Hedge Trans Modal', async t => {
  await t.click(hedgeTransPage.createTransButton);

  await t.expect(hedgeTransPage.hedgeTransModal.visible).ok();
});

test('Quick Test', async t => {
  const fields = await hedgeTransPage.transFields.getFieldMap();
  const count = await hedgeTransPage.transData.find('tr').count;
  console.log('count=' + count);
  await t
    .expect(hedgeTransPage.transTable.visible)
    .ok()
    .expect(
      hedgeTransPage.transData.getCellText(
        await hedgeTransPage.transData.getTranNoIdx('findme'),
        fields['Contract']
      )
    )
    .eql('RBU2017');
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

// test('Enter Simple Hedge Trans', async t => {
//   const init_count = await hedgeTransPage.transData.find('tr').count;

//   // enter simple heddge transaction
//   await t
//     .click(hedgeTransPage.createTransButton)
//     .typeText(
//       hedgeTransPage.hedgeTransForm.find('#name'),
//       simple_hedge_txn.name
//     )
//     .click(hedgeTransPage.hedgeTransForm.find('#hedge_trans_type'))
//     .click(
//       Selector('#hedge_trans_type > option').withText(
//         simple_hedge_txn.hedge_trans_type
//       )
//     )
//     .click(hedgeTransPage.hedgeTransForm.find('#hedge_account'))
//     .click(
//       Selector('#hedge_account > option').withText(
//         simple_hedge_txn.hedge_account
//       )
//     )
//     .click(hedgeTransPage.hedgeTransForm.find('#inventory'))
//     .click(Selector('#inventory > option').withText(simple_hedge_txn.inventory))
//     .click(hedgeTransPage.hedgeTransForm.find('#product'))
//     .click(Selector('#product > option').withText(simple_hedge_txn.product))
//     .click(hedgeTransPage.hedgeTransForm.find('#contract_entry'))
//     .click(
//       Selector('#contract_entry > option').withAttribute(
//         'value',
//         simple_hedge_txn.contract_entry
//       )
//     )
//     .click(hedgeTransPage.hedgeTransForm.find('#month_year'))
//     .click(
//       Selector('#month_year > option').withAttribute(
//         'value',
//         simple_hedge_txn.month_year
//       )
//     )
//     .typeText(
//       hedgeTransPage.hedgeTransForm.find('#volume'),
//       simple_hedge_txn.volume.toString()
//     )
//     .typeText(
//       hedgeTransPage.hedgeTransForm.find('#price'),
//       simple_hedge_txn.price.toString()
//     )
//     .typeText(
//       hedgeTransPage.hedgeTransForm.find('#trans_date'),
//       simple_hedge_txn.trans_date,
//       { replace: true }
//     )
//     .click(hedgeTransPage.hedgeTransForm.find('#initial_pos'))
//     .click(
//       Selector('#initial_pos > option').withAttribute(
//         'value',
//         simple_hedge_txn.initial_pos.toString()
//       )
//     )
//     .typeText(
//       hedgeTransPage.hedgeTransForm.find('#confirm_number'),
//       simple_hedge_txn.confirm_number,
//       { replace: true }
//     )
//     .typeText(
//       hedgeTransPage.hedgeTransForm.find('#trader'),
//       simple_hedge_txn.trader,
//       { replace: true }
//     )
//     .click(hedgeTransPage.hedgeTransForm.find('#status'))
//     .click(
//       Selector('#status > option').withAttribute(
//         'value',
//         simple_hedge_txn.status.toLowerCase()
//       )
//     )
//     .typeText(
//       hedgeTransPage.hedgeTransForm.find('#program'),
//       simple_hedge_txn.program,
//       { replace: true }
//     )
//     .click(hedgeTransPage.hedgeTransForm.find('#add_user_btn'));

//   // expect the transaction to be in the list with the correct values
//   const fields = await hedgeTransPage.transFields.getFieldMap();
//   await t
//     .expect(hedgeTransPage.transTable.visible)
//     .ok()
//     .expect(hedgeTransPage.transData.find('tr').count)
//     .eql(init_count + 1)
//     .expect(hedgeTransPage.transData.getTranNoIdx(simple_hedge_txn.name))
//     .gte(0)
//     .expect(
//       hedgeTransPage.transData.getCellText(
//         await hedgeTransPage.transData.getTranNoIdx(simple_hedge_txn.name),
//         fields['Price']
//       )
//     )
//     .eql(simple_hedge_txn.price.toString());
// }).after(async t => {
//   //  find new trasnaction and delete it
// });
