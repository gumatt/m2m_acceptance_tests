import { Selector } from 'testcafe';

import { getLocation } from '../helpers/common';

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
  constructor(t, validator) {
    this.t = t;
    this.v = validator;
    this.usernameInput = Selector('#id_username');
    this.passwordInput = Selector('#id_password');
    this.submitButton = Selector('button.btn');
    this.flashMessage = Selector('div.text-center');
  }

  async login(username, password) {
    await this.t
      .typeText(this.usernameInput, username)
      .typeText(this.passwordInput, password)
      .click(this.submitButton);
  }

  validate() {
    return this.v;
  }
}

export { LoginPage, LoginPageValidator };
