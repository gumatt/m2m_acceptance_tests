import { Selector, t } from 'testcafe';

import { getLocation } from '../helpers/common';
import { LOGIN_PAGE_SELECTORS } from '../config/selectors';
import { BaseValidator, BasePage } from './base';

class LoginPageMap {
  constructor() {
    this.usernameInput = Selector(LOGIN_PAGE_SELECTORS.inputs.username);
    this.passwordInput = Selector(LOGIN_PAGE_SELECTORS.inputs.password);
    this.submitButton = Selector(LOGIN_PAGE_SELECTORS.buttons.submit);
    this.flashMessage = Selector(LOGIN_PAGE_SELECTORS.labels.flash_message);
    this.flashAlertModal = Selector(LOGIN_PAGE_SELECTORS.Modals.flashAlert);
    this.welcomeUsernameSpan = Selector(
      LOGIN_PAGE_SELECTORS.labels.welcome_username
    );
    this._flashmessage = Selector(LOGIN_PAGE_SELECTORS.labels.flash_message);
  }
}

class LoginPageValidator extends BaseValidator {
  constructor(map) {
    super(map)
  }

  async welcomeUsername(username) {
    await this.t.expect(this.m.welcomeUsernameSpan.innerText).eql(username);
  }

  async flashMessageIsVisible() {
    await this.t.expect(this.m._flashmessage.visible).ok();
  }

  async flashMessageContains(message) {
    await this.t.expect(this.m._flashmessage.innerText).contains(message);
  }

  async noAlert() {
    await this.t.expect(this.m.flashAlertModal.exists).notOk();
  }
}

class LoginPage extends BasePage {
  constructor(url, map, validator) {
    super(url, map, validator)
  }

  async login(username, password) {
    await this.t
      .typeText(this.m.usernameInput, username)
      .typeText(this.m.passwordInput, password)
      .click(this.m.submitButton);
  }
}

export { LoginPage, LoginPageValidator, LoginPageMap };
