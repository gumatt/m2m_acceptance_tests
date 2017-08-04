import { Selector, ClientFunction } from 'testcafe';

class LoginPage {
  constructor() {
    this.usernameInput = Selector('#id_username');
    this.passwordInput = Selector('#id_password');
    this.submitButton = Selector('button.btn');
    this.flashMessage = Selector('div.text-center');
  }
}

const hedgeTransTableHeaders = Selector('#users > thead > tr');
const colIdx = ClientFunction(
  title => {
    const titles = hedgeTransTableHeaders.cells;
    var idx = -1;
    var i;
    for (i = 0; i < titles.length; i++) {
      if (titles[idx].innerText === title) {
        idx = i;
        break;
      }
    }
    return idx;
  },
  {
    dependencies: { hedgeTransTableHeaders }
  }
);

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
    this.transTableRows = Selector('#user > tbody > tr');
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

export { LoginPage, HedgeTransPage, colIdx };
