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
  }
}

export { LoginPage, HedgeTransPage };
