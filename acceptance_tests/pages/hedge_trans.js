import { Selector, t } from 'testcafe';

import { getLocation } from '../helpers/common';
import { HEDGE_TRANS_PAGE_SELECTORS } from '../config/selectors';
import { urls } from '../config';

const selectors = HEDGE_TRANS_PAGE_SELECTORS;

class HedgeTransactionPageMap {
  constructor() {
    this.createTransButton = Selector(selectors.Buttons.CreateHedgeTrans);
    this.transTable = Selector(selectors.Tables.TransTable.Table);
    this.hedgeTransModal = Selector(selectors.Modals.HedgeTrans);
    this.hedgeTransForm = Selector(selectors.Forms.HedgeTrans.Form);
    this.transCountDisplay = Selector(
      selectors.Labels.countDisplay
    ).addCustomMethods({
      count: label => {
        return label.innerText.replace(/.*\D/g, '');
      }
    });
    this.transData = Selector(
      selectors.Tables.TransTable.Rows
    ).addCustomMethods({
      getCellText: (table, rowIndex, columnIndex) => {
        return table.rows[rowIndex].cells[columnIndex].innerText;
      },
      getRowCount: table => {
        return table.rows.length;
      },
      getTranNoIdx: (table, tranNo) => {
        for (var i = 0; i < table.rows.length; i++) {
          if (table.rows[i].cells[2].innerText.indexOf(tranNo) !== -1) {
            return i;
          }
        }
        return -1;
      }
    });
    this.transFields = Selector(
      selectors.Tables.TransTable.Columns
    ).addCustomMethods({
      getFieldIdx: (fields, fieldName) => {
        for (var i = 0; i < fields.children.length; i++) {
          if (fields.children[i].innerText.indexOf(fieldName) !== -1) {
            return i;
          }
        }
        return -1;
      },
      getFieldMap: fields => {
        var myMap = {};
        for (var i = 0; i < fields.children.length; i++) {
          myMap[fields.children[i].innerText || 'checkbox'] = i;
        }
        return myMap;
      }
    });    
  }

  async getDataCell(rowIdx, colIdx) {
    const rows = await this.transData.child('tr');
    const row = rows.nth(rowIdx).child('td');
    const cell = row.nth(colIdx);
    return cell;

  }
}

class HedgeTransactionPageValidator {
  constructor(map) {
    this.t = t;
    this.m = map;
  }

  async addTransModalIsVisible() {
    await this.t.expect(this.m.hedgeTransModal.visible).ok();
  }

  async location(url) {
    await this.t.expect(getLocation()).eql(url);
  }

  async transCount(num) {
    const countText = await this.m.transCountDisplay.innerText;
    const countTokens = countText.split(" ");
    const count = parseInt(countTokens[countTokens.length - 2]);
    await this.t
      .expect(count)
      .eql(num);
  }

  async transTableIsVisible() {
    await this.t.expect(this.m.transTable.visible).ok();
  }

  async transNoExists(transNo) {
    await this.t.expect(this.m.transData.getTransNoIdx(transNo)).gte(0);
  }

  async transPrice(transNo, price) {
    await this.t
      .expect(
        this.m.transData.getCellText(
          await this.m.transData.getTranNoIdx(tranNo),
          this.fields['Price']
        )
      )
      .eql(price);
  }

  async transNoAppears(transNo) {
    await this.t.expect(
      this.m.transData.getTranNoIdx(transNo)
    ).gte(0);
  }

  async transNoHasPrice(transNo, price) {
    const fields = await this.m.transFields.getFieldMap();
    await this.t.expect(
      this.m.transData.getCellText(
        await this.m.transData.getTranNoIdx(transNo),
        fields['Price']
      )
    ).eql(price.toString());
  }
}

class HedgeTransactionPage {
  constructor(map, validator) {
    this.t = t;
    this.v = validator;
    this.m = map;
  }

  async navigateToAs(user) {
    await this.t
      .useRole(user)
      .navigateTo(urls.hedge_txn_log);
  }

  async transCount() {
    const displayText = await this.m.transCountDisplay.innerText;
    const tokens = displayText.split(" ");
    return parseInt(tokens[tokens.length - 2]);
  }

  async openTransModal() {
    await this.t.click(this.m.createTransButton);
  }

  async openEditModal(txnID) {
    const txnIdx = await this.m.transData.getTranNoIdx(txnID);
    // const rows = await this.m.transData.child('tr');  //#users > tbody > tr:nth-child(3) > td:nth-child(3)
    await this.t
      .click(this.m.transData.child('tr').nth(txnIdx).find('a'))    
  }

  async modifyTransPrice( txnID, price ) {
    const fields = selectors.Forms.HedgeTrans.Fields;
    const txnIdx = await this.m.transData.getTranNoIdx(txnID);
    const rows = await this.m.transData.child('tr');  //#users > tbody > tr:nth-child(3) > td:nth-child(3)
    await this.t
      .click(rows.nth(txnIdx).find('a'))
      .typeText(
        this.m.hedgeTransForm.find(fields.TransPrice),
        price.toString()
      )
      .click(this.m.hedgeTransForm.find(fields.SubmitBtn));
  }

  async updatePriceInput(price) {
    const fields = selectors.Forms.HedgeTrans.Fields;
    await this.t
      .typeText(this.m.hedgeTransForm.find(fields.TransPrice), price.toString(), {replace: true});
  }

  async clickSubmit() {
    const fields = selectors.Forms.HedgeTrans.Fields;
    await this.t
      .click(this.m.hedgeTransForm.find(fields.SubmitBtn));
  }

  async addTransaction(trans) {
    const fields = selectors.Forms.HedgeTrans.Fields;

    await t
      .click(this.m.createTransButton)
      .typeText(this.m.hedgeTransForm.find(fields.TransNo), trans.name)
      .click(this.m.hedgeTransForm.find(fields.TransType))
      .click(
        Selector(fields.TransType + ' > option').withText(
          trans.hedge_trans_type
        )
      )
      .click(this.m.hedgeTransForm.find(fields.HedgeAccount))
      .click(
        Selector(fields.HedgeAccount + ' > option').withText(
          trans.hedge_account
        )
      )
      .click(this.m.hedgeTransForm.find(fields.Program))
      .click(Selector(fields.Program + ' > option').withText(trans.inventory))
      .click(this.m.hedgeTransForm.find(fields.Product))
      .click(Selector(fields.Product + ' > option').withText(trans.product))
      .click(this.m.hedgeTransForm.find(fields.Contract))
      .click(
        Selector(fields.Contract + ' > option').withAttribute(
          'value',
          trans.contract_entry
        )
      )
      .click(this.m.hedgeTransForm.find(fields.MonthYear))
      .click(
        Selector(fields.MonthYear + ' > option').withAttribute(
          'value',
          trans.month_year
        )
      )
      .typeText(
        this.m.hedgeTransForm.find(fields.Volume),
        trans.volume.toString()
      )
      .typeText(
        this.m.hedgeTransForm.find(fields.TransPrice),
        trans.price.toString()
      )
      .typeText(this.m.hedgeTransForm.find(fields.TransDate), trans.trans_date, {
        replace: true
      })
      .click(this.m.hedgeTransForm.find(fields.InitialPosition))
      .click(
        Selector(fields.InitialPosition + ' > option').withAttribute(
          'value',
          trans.initial_pos.toString()
        )
      )
      .typeText(
        this.m.hedgeTransForm.find(fields.ConfirmationNumber),
        trans.confirm_number,
        { replace: true }
      )
      .typeText(this.m.hedgeTransForm.find(fields.Trader), trans.trader, {
        replace: true
      })
      .click(this.m.hedgeTransForm.find(fields.Status))
      .click(
        Selector(fields.Status + ' > option').withAttribute(
          'value',
          trans.status.toLowerCase()
        )
      )
      .typeText(this.m.hedgeTransForm.find(fields.Inventory), trans.program, {
        replace: true
      })
      .click(this.m.hedgeTransForm.find(fields.SubmitBtn));
  }

  validate() {
    return this.v;
  }
}

export { HedgeTransactionPage, HedgeTransactionPageValidator, HedgeTransactionPageMap };
