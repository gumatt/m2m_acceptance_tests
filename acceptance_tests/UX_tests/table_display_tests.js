import { t } from 'testcafe';

import { getLocation } from '../helpers/common';
import { urls, HEDGE_TRANS_PAGE_LABELS as labels } from '../config';
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

fixture`Hedge Log UX Tests`
  .page`${urls.hedge_txn_log}`.beforeEach(async () => {
  await page.navigateToAs(user);
});

test('num fields right justified', async () => {
  await page.validate().transTableIsVisible();
  const colIdx = await page.m.transFields.getFieldIdx(labels.transData.fields.volume);
  const rowIdx = 1;
  const cell = await page.m.getDataCell(rowIdx, colIdx);

  await page.validate().elementStyle(cell, 'text-align', 'right')
})

// TODO-DONE:  see if I can make hedge_trans page emit element where I can check a css style value
// TODO:  create a style(el, prop, value) validator as part of M2MBaseValidator
// TODO:  create a dict for hedgePage.transDataTable that includee .data .headers .rows .cells
