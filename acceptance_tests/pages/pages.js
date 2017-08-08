import { Selector, ClientFunction } from 'testcafe';

import { getLocation } from '../helpers/common';
import { urls } from '../config';

class LoginPageValidator {
  constructor(controller) {
    this.t = controller;
    this.welcomeUsernameSpan = Selector(
      '#topbar > div.pull-right.pull-right-head > div > div > span.admin-user-span2'
    );
    this._flashmessage = Selector('div.text-center');
  }

  async location(url) {
    await this.t.expect(getLocation()).eql(url);
  }

  async welcomeUsername(username) {
    await this.t.expect(this.welcomeUsernameSpan.innerText).eql(username);
  }

  async flashMessageIsVisible() {
    await this.t.expect(this._flashmessage.visible).ok();
  }

  async flashMessageContains(message) {
    await this.t.expect(this._flashmessage.innerText).contains(message);
  }
}

class LoginPage {
  constructor(validator) {
    this.v = validator;
    this.usernameInput = Selector('#id_username');
    this.passwordInput = Selector('#id_password');
    this.submitButton = Selector('button.btn');
    this.flashMessage = Selector('div.text-center');
  }

  validate() {
    return this.v;
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

export { LoginPage, LoginPageValidator, HedgeTransPage, colIdx };
