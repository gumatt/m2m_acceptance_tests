import { t } from 'testcafe';
import { getLocation } from '../helpers/common'

class BaseValidator {
  constructor(map) {
    this.t = t;
    this.m = map;
  }

  async elementStyle(el, attrib, value) {
    await this.t.expect(el.getStyleProperty(attrib)).eql(value);
  }

  async isVisible(selector) {
    await this.t.expect(selector.visible).ok();
  }

  async location(url) {
    await this.t.expect(getLocation()).eql(url);
  }
}

class BasePage {
  constructor(url, map, validator) {
    this.t = t;
    this.v = validator;
    this.m = map;
    this.url = url;
  }

  async navigateToAs(user) {
    await this.t
      .useRole(user)
      .navigateTo(this.url);
  }

  validate() {
    return this.v;
  }
}

export { BaseValidator, BasePage };
