import { getLocation } from '../helpers/common';
import { urls } from '../config';
import {
  DashboardPage,
  DashboardPageValidator,
  DashboardPageMap
} from '../pages';
import { userRole, user } from '../helpers/roles';

const map = new DashboardPageMap();
const validator = new DashboardPageValidator(map);
const page = new DashboardPage(urls.dashboard, map, validator);

fixture`Dashboard Tests`
.page`${urls.dashboard}`.beforeEach(async () => {
await page.navigateToAs(userRole);
});

test('Dashboard Exists', async () => {
  await page.validate().location(urls.dashboard);
  await page.validate().programsTableIsVisible();
  await page.validate().firstProgramCardIsVisible();
  await page.validate().companySelectedIs(user.company);
});

test('Hedge Programs filter works', async () => {
  await page.showPrograms('all');
  await page.validate().programsCount(4);
  await page.showPrograms('Test Program 1');
  await page.validate().programsCount(2);
})