import { t, ClientFunction } from 'testcafe';
import { LoginPage } from './pages'

const getLocation = ClientFunction(() => document.location.href);

const login = new LoginPage

var f = {
    login : async function (username, password) {
        await t
            .typeText(login.usernameInput, username)
            .typeText(login.passwordInput, password)
            .click(login.submitButton)
    },

    goto_hedge_trans: async function () {
        await t
            .click("#menu-accordion > li.panel.transactions")
            .click("#transactions-link > li:nth-child(2) > a")
    }
}

export { f, getLocation }