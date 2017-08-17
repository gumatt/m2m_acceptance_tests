import { Selector, t } from 'testcafe';

import { getLocation } from '../helpers/common';
import { TEMPLATE_SELECTORS } from '../config/selectors';
import { BaseValidator, BasePage } from './base'

class DashboardPageMap {
  constructor() {
    this.menu = Selector(TEMPLATE_SELECTORS.menu.menu);
    this.programsMenuItem = Selector(TEMPLATE_SELECTORS.menu.programs.selector);
    this.programsSubMenu = Selector(TEMPLATE_SELECTORS.menu.programs.subMenu);
    this.flashAlertModal = Selector(TEMPLATE_SELECTORS.Modals.flashAlert);
    this.welcomeUsernameSpan = Selector(
      TEMPLATE_SELECTORS.labels.welcome_username
    );
    this._flashmessage = Selector(TEMPLATE_SELECTORS.labels.flash_message);
  }

  async subMenu(menu) {
    return Selector(TEMPLATE_SELECTORS.menu[menu]['subMenu']);
  }
}

class DashboardPageValidator extends BaseValidator {
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

  async subMenuVisible(menu) {
    const subMenu = await this.m.subMenu(menu);
    const isVisible = await subMenu.visible;
    await this.t.expect(isVisible).ok(menu + ' subMenu visible');
  }

  async subMenuContains(menu, item) {
    const subMenu = await this.m.subMenu(menu);
    const items = await subMenu.innerText;
    await this.t.expect(items).contains(item);
  }
}

class DashboardPage extends BasePage {
  constructor(url, map, validator) {
    super(url, map, validator)
  }

  async clickMenu(menu) {
    await t.click(Selector(TEMPLATE_SELECTORS.menu[menu]['selector']));
  }
}

export { DashboardPage, DashboardPageValidator, DashboardPageMap };

// TODO:  BasePageValidator w location(url), and elementStyle(el, attrib, value)
