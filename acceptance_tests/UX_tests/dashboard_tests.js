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
await page.visitAs(userRole);
});

test('Dashboard Exists', async () => {
  await page.validate().location(urls.dashboard);
  await page.validate().programsTableIsVisible();
  await page.validate().firstProgramCardIsVisible();
  await page.validate().companySelectedIs(user.company);
});

test('Hedge Programs filter works', async () => {
  await page.showPrograms();
  await page.validate().programsCount(4);
  await page.showPrograms('Test Program 1');
  await page.validate().programsCount(2);
})

test('Hedge Programs column selector', async () => {
  await page.showPrograms();
  await page.validate().columnLabelIdx('Program', 0);
  await page.validate().columnLabelIdx('Product', 1);
  await page.validate().columnLabelIdx('Physical Volume', 2);
  await page.validate().columnLabelIdx('Avg Cost', 4);
})

test('Hedge Programs program selector', async () => {
  await page.showPrograms();
  await page.validate().programIdx('Test Program 1', 'Diesel', 3);
  await page.showPrograms('Test Program 1');
  await page.validate().programIdx('Test Program 1', 'Diesel', 1);
})

test('Hedge Programs program value selector', async () => {
  await page.showPrograms();
  await page.validate().programValue('Test Program 1', 'Diesel', 'Physical Volume', '45210');
})

test('Hedge Programs data grabber', async () => {
  await page.showPrograms();
  const allData = await page.m.getProgramData('Test Program 1', 'Diesel');
  await page.validate().programValue('Test Program 1', 'Diesel', 'Physical Volume', allData.physicalVolume);
})
