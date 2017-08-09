import { t, Role } from 'testcafe';

import { urls } from '../config';
import { user, admin } from '../data/users';
import { f } from '../helpers/common';

const userRole = Role(urls.login, async t => {
  await f.login(user.username, user.password);
});

const adminRole = Role(urls.login, async t => {
  await f.login(adminUser.username, admin.password);
});

export { userRole, adminRole };
