import { Selector, ClientFunction } from 'testcafe';

import { f, getLocation } from './common'
import { LOGIN_PAGE, HOME_PAGE, HEDGE_TRANS_URL } from './config';
import { HedgeTransPage } from './pages'

const hedgeTransPage = new HedgeTransPage;

fixture `Enter Hedge Transaction`
    .page`${LOGIN_PAGE}`
    .beforeEach( async t => {
        await f.login('atester', 'TeamLevine01')
        await f.goto_hedge_trans()
    })

test('Navigate to Hedge Trans', async t => {
    await t.expect(getLocation()).contains(HEDGE_TRANS_URL);
})

test('Open Hedge Trans Modal', async t => {
    await t
        .click(hedgeTransPage.createTransButton);

    await t.expect(hedgeTransPage.hedgeTransModal.visible).ok();
})