import { Selector, t } from 'testcafe';

import { getLocation } from '../helpers/common';
import { HEDGE_TRANS_PAGE_SELECTORS } from '../config/selectors';
import { urls } from '../config';

const selectors = HEDGE_TRANS_PAGE_SELECTORS;

class HedgeTransactionPageValidator {
  constructor(controller) {
    this.t = controller;
    this.transTable = Selector(selectors.Tables.TransTable.Table);
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

  async transCount(num) {
    const countText = await this.transCountDisplay.innerText;
    const countTokens = countText.split(" ");
    const count = parseInt(countTokens[countTokens.length - 2]);
    await this.t
      .expect(count)
      .eql(num);
  }

  async transTableIsVisible() {
    await this.t.expect(this.transTable.visible).ok();
  }

  async transNoExists(transNo) {
    await this.t.expect(this.transData.getTransNoIdx(transNo)).gte(0);
  }

  async transPrice(transNo, price) {
    await this.t
      .expect(
        this.transData.getCellText(
          await this.transData.getTranNoIdx(tranNo),
          this.fields['Price']
        )
      )
      .eql(price);
  }

  async transNoAppears(transNo) {
    await this.t.expect(
      this.transData.getTranNoIdx(transNo)
    ).gte(0);
  }

  async transNoHasPrice(transNo, price) {
    const fields = await this.transFields.getFieldMap();
    await this.t.expect(
      this.transData.getCellText(
        await this.transData.getTranNoIdx(transNo),
        fields['Price']
      )
    ).eql(price.toString());
  }
}

class HedgeTransactionPage {
  constructor(validator) {
    this.v = validator;
    this.createTransButton = Selector(selectors.Buttons.CreateHedgeTrans);
    this.hedgeTransModal = Selector(selectors.Modals.HedgeTrans);
    this.hedgeTransForm = Selector(selectors.Forms.HedgeTrans.Form);
    this.transTable = Selector(selectors.Tables.TransTable.Table);
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

  async transCount() {
    const displayText = await this.transCountDisplay.innerText;
    const tokens = displayText.split(" ");
    return parseInt(tokens[tokens.length - 2]);
  }

  async addTransaction(trans) {
    const fields = selectors.Forms.HedgeTrans.Fields;

    await t
      .click(this.createTransButton)
      .typeText(this.hedgeTransForm.find(fields.TransNo), trans.name)
      .click(this.hedgeTransForm.find(fields.TransType))
      .click(
        Selector(fields.TransType + ' > option').withText(
          trans.hedge_trans_type
        )
      )
      .click(this.hedgeTransForm.find(fields.HedgeAccount))
      .click(
        Selector(fields.HedgeAccount + ' > option').withText(
          trans.hedge_account
        )
      )
      .click(this.hedgeTransForm.find(fields.Program))
      .click(Selector(fields.Program + ' > option').withText(trans.inventory))
      .click(this.hedgeTransForm.find(fields.Product))
      .click(Selector(fields.Product + ' > option').withText(trans.product))
      .click(this.hedgeTransForm.find(fields.Contract))
      .click(
        Selector(fields.Contract + ' > option').withAttribute(
          'value',
          trans.contract_entry
        )
      )
      .click(this.hedgeTransForm.find(fields.MonthYear))
      .click(
        Selector(fields.MonthYear + ' > option').withAttribute(
          'value',
          trans.month_year
        )
      )
      .typeText(
        this.hedgeTransForm.find(fields.Volume),
        trans.volume.toString()
      )
      .typeText(
        this.hedgeTransForm.find(fields.TransPrice),
        trans.price.toString()
      )
      .typeText(this.hedgeTransForm.find(fields.TransDate), trans.trans_date, {
        replace: true
      })
      .click(this.hedgeTransForm.find(fields.InitialPosition))
      .click(
        Selector(fields.InitialPosition + ' > option').withAttribute(
          'value',
          trans.initial_pos.toString()
        )
      )
      .typeText(
        this.hedgeTransForm.find(fields.ConfirmationNumber),
        trans.confirm_number,
        { replace: true }
      )
      .typeText(this.hedgeTransForm.find(fields.Trader), trans.trader, {
        replace: true
      })
      .click(this.hedgeTransForm.find(fields.Status))
      .click(
        Selector(fields.Status + ' > option').withAttribute(
          'value',
          trans.status.toLowerCase()
        )
      )
      .typeText(this.hedgeTransForm.find(fields.Inventory), trans.program, {
        replace: true
      })
      .click(this.hedgeTransForm.find(fields.SubmitBtn));
  }

  validate() {
    return this.v;
  }
}

export { HedgeTransactionPage, HedgeTransactionPageValidator };
