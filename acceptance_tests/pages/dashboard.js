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
      element: Selector(DASHBOARD_SELECTORS.tables.programs.table),
      filters: {
        programFilter: {
          element: Selector(DASHBOARD_SELECTORS.filters.programs.programFilter),
          options: Selector(DASHBOARD_SELECTORS.filters.programs.programFilterOptions)
        }
      },
      headers: Selector(DASHBOARD_SELECTORS.tables.programs.headers).addCustomMethods({
        colIdx: (headers, label) => {
          for (var i = 0; i < headers.children.length; i++) {
            if (headers.children[i].innerText.indexOf(label) !== -1) {
              return i;
            }
          }
          return -1;
        }
      }),
      body: Selector(DASHBOARD_SELECTORS.tables.programs.body).addCustomMethods({
        data: (table, rowIndex, columnIndex) => {
          return table.rows[rowIndex].cells[columnIndex].innerText;
        },
        styles: (table, rowIndex, columnIndex) => {
          return table.rows[rowIndex].cells[columnIndex].style;
        },
        rowCount: table => table.rows.length,
        rowIdx: (table, programDef) => {
          for (var i = 0; i < table.rows.length; i++) {
            if (table.rows[i].cells[programDef.progCol].innerText.indexOf(programDef.program) !== -1 && 
                table.rows[i].cells[programDef.prodCol].innerText.indexOf(programDef.product) !== -1) {
              return i;
            }
          }
          return -1;
        }
      })
    };

    this.postionsTable = Selector(DASHBOARD_SELECTORS.tables.positions);
    this.hedgeLogTable = Selector(DASHBOARD_SELECTORS.tables.hedgeLog);
    this.physicalLogTable = Selector(DASHBOARD_SELECTORS.tables.physicalLog);

    this.columnSelector = Selector(DASHBOARD_SELECTORS.menus.fieldSelector);
  }

  async subMenu(menu) {
    return Selector(TEMPLATE_SELECTORS.menu[menu]['subMenu']);
  }

  async getProgramRowIndex(program, product) {
    const progCol = await this.programsTable.headers.colIdx("Program");
    const prodCol = await this.programsTable.headers.colIdx("Product");
    const programDef = {
      program: program,
      product: product,
      progCol: progCol,
      prodCol: prodCol
    }
    return await this.programsTable.body.rowIdx(programDef);
  }

  async getProgramData(program, product) {
    const row = await this.getProgramRowIndex(program, product);
    const progIdx = await this.programsTable.headers.colIdx('Program');
    const prodIdx = await this.programsTable.headers.colIdx('Product');
    const pVolIdx = await this.programsTable.headers.colIdx('Physical Volume');
    const hVolIdx = await this.programsTable.headers.colIdx('Hedge Volume');
    const avgCostIdx = await this.programsTable.headers.colIdx('Avg Cost');
    const m2mIdx = await this.programsTable.headers.colIdx('Marked to Market');
    const hBalIdx = await this.programsTable.headers.colIdx('Hedge Balance');
    return {
      program: await this.programsTable.body.data(row, progIdx),
      product: await this.programsTable.body.data(row, prodIdx),
      physicalVolume: await this.programsTable.body.data(row, pVolIdx),
      hedgeVolume: await this.programsTable.body.data(row, hVolIdx),
      avgCost: await this.programsTable.body.data(row, avgCostIdx),
      m2mCost: await this.programsTable.body.data(row, m2mIdx),
      hedgeBalance: await this.programsTable.body.data(row, hBalIdx)
    }
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

  async columnLabelIdx(label, idx) {
    await this.t.expect(this.m.programsTable.headers.colIdx(label)).eql(idx);
  }

  async programIdx(program, product, idx) {
    const progCol = await this.m.programsTable.headers.colIdx('Program');
    const prodCol = await this.m.programsTable.headers.colIdx('Product');
    const programDef = {
      program: program,
      product: product,
      progCol: progCol,
      prodCol: prodCol
    }
    await this.t.expect(this.m.programsTable.body.rowIdx(programDef)).eql(idx);
  }

  async programValue(program, product, field, value) {
    const progCol = await this.m.programsTable.headers.colIdx('Program');
    const prodCol = await this.m.programsTable.headers.colIdx('Product');
    const programDef = {
      program: program,
      product: product,
      progCol: progCol,
      prodCol: prodCol
    }
    const programRow = await this.m.programsTable.body.rowIdx(programDef);
    const valueCol = await this.m.programsTable.headers.colIdx(field);
    await this.t.expect(this.m.programsTable.body.data(programRow, valueCol)).eql(value);
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
    if (program) {
      await this.clickFilterOption(this.m.programsTable.filters.programFilter.element, program);
    }
  }
}

export { DashboardPage, DashboardPageValidator, DashboardPageMap };

// TODO:  BasePageValidator w location(url), and elementStyle(el, attrib, value)
