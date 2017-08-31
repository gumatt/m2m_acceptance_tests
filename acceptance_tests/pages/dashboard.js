import { Selector, t } from 'testcafe';

import { getLocation } from '../helpers/common';
import { TEMPLATE_SELECTORS, DASHBOARD_SELECTORS } from '../config/selectors';
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

    // labels
    this.companyName = Selector(DASHBOARD_SELECTORS.labels.companyName);

    // Cards
    this.mainProgramCard = Selector(DASHBOARD_SELECTORS.cards.first);

    // Overview tabs
    this.programsOverviewTab = Selector(DASHBOARD_SELECTORS.tabs.programs);
    this.positionsOverviewTab = Selector(DASHBOARD_SELECTORS.tabs.positions);
    this.hedgeLogTab = Selector(DASHBOARD_SELECTORS.tabs.positions);
    this.physicalLogTab = Selector(DASHBOARD_SELECTORS.tabs.physicalLog);
    
    // Overview tables
    this.programsTable = {
      element: Selector(DASHBOARD_SELECTORS.tables.programs),
      filters: {
        programFilter: {
          element: Selector(DASHBOARD_SELECTORS.filters.programs.programFilter),
          options: Selector(DASHBOARD_SELECTORS.filters.programs.programFilterOptions)
        }
      },
      body: Selector(DASHBOARD_SELECTORS.tables.programs + '> tbody').addCustomMethods({
        data: (table, rowIndex, columnIndex) => {
          return table.rows[rowIndex].cells[columnIndex].innerText;
        },
        styles: (table, rowIndex, columnIndex) => {
          return table.rows[rowIndex].cells[columnIndex].style;
        },
        rowCount: table => table.rows.length,
      }),
      rows: Selector(DASHBOARD_SELECTORS.tables.programs + '> tbody > tr')
    };

    this.postionsTable = Selector(DASHBOARD_SELECTORS.tables.positions);
    this.hedgeLogTable = Selector(DASHBOARD_SELECTORS.tables.hedgeLog);
    this.physicalLogTable = Selector(DASHBOARD_SELECTORS.tables.physicalLog);

    this.columnSelector = Selector(DASHBOARD_SELECTORS.menus.fieldSelector);
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

  async hedgeLogCount(num) {

  }

  async programsTableIsVisible() {
    await this.t.expect(this.m.programsTable.element.visible).ok();
  }

  async firstProgramCardIsVisible() {
    await this.t.expect(this.m.mainProgramCard.visible).ok();
  }

  async companySelectedIs(companyName) {
    await this.t.expect(this.m.companyName.innerText).contains(companyName);
  }

  async programsCount(num) {
    await this.t.expect(this.m.programsTable.body.rowCount()).eql(num);
  }

  async testValidator() {
    const out = await this.m.programsTable.body.data(0,1);
    const out2 = await this.m.programsTable.body.data(3, 1);
    const out3 = await this.m.programsTable.body.data(3, 2);
    console.log(out);
    console.log(out2);
    console.log(out3);
    await this.t.expect(this.m.programsTable.body.data(3, 2)).eql('45210');
  }
}

class DashboardPage extends BasePage {
  constructor(url, map, validator) {
    super(url, map, validator)
  }

  async clickMenu(menu) {
    await t.click(Selector(TEMPLATE_SELECTORS.menu[menu]['selector']));
  }

  async clickFilterOption(filter, selected) {
    await this.t.click(filter);
    await this.t.click(filter.find('option').withAttribute('value', selected));
  }

  async showPositions(program) {
    await this.t.click(this.m.positionsOverviewTab);
    if (program && program != 'all') {

    }
  }

  async showPrograms(program) {
    await this.t.click(this.m.programsOverviewTab);
    if (program && program != 'all') {
      await this.clickFilterOption(this.m.programsTable.filters.programFilter.element, program);
    }
  }
}

export { DashboardPage, DashboardPageValidator, DashboardPageMap };

// TODO:  BasePageValidator w location(url), and elementStyle(el, attrib, value)
