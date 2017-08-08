import { Selector, ClientFunction } from 'testcafe';

import { getLocation } from '../helpers/common';
import { urls } from '../config';

class HedgeTransPage {
  constructor() {
    this.createTransButton = Selector(
      '#main-content > div.content-body > div > div > div.box-head.clearfix > div > a:nth-child(2)'
    );
    this.createTransButtonShort = Selector(
      'div.box-head.clearfix > div > a:nth-child(2)'
    );
    this.hedgeTransModal = Selector('#add-hedge-tran');
    this.hedgeTransForm = Selector('#hedge_tran_info');
    this.transTable = Selector('#users');
    this.transData = Selector('#users > tbody').addCustomMethods({
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
    this.transFields = Selector('#users > thead > tr').addCustomMethods({
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
}

export { HedgeTransPage };
