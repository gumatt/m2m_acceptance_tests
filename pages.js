import { Selector, ClientFunction } from 'testcafe';

class LoginPage {
  constructor() {
    this.usernameInput = Selector('#id_username');
    this.passwordInput = Selector('#id_password');
    this.submitButton = Selector('button.btn');
    this.flashMessage = Selector('div.text-center');
  }
}

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
      }
    });
    this.transTableRows = Selector('#user tbody tr');
  }
}

export { LoginPage, HedgeTransPage };
