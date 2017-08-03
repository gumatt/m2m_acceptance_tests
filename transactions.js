import { cme_months } from './config'

const curr_month = new Date().getMonth();
const curr_year = new Date().getFullYear();
const next_month = (curr_month+1) % 12 + 1;


const curr_contract_month = cme_months[curr_month] + curr_year;
const next_year = next_month > 1 ? curr_year : curr_year + 1
const next_contract_month = cme_months[next_month] + next_year

const simple_hedge_txn = {
  name: '2017-08-02.0001',
  hedge_trans_type: 'Sell',
  hedge_account: 'Primary Hedge Acct',
  inventory: 'Test Program 1',
  product: 'Diesel',
  contract_entry: 'HO',
  contract_symbol: 'HO',
  month_year: next_contract_month,
  volume: 42000,
  price: 1.6789,
  trans_date: '2017-08-03 12:05',
  initial_pos: true,
  confirm_number: 'test_confirm_12345',
  trader: 'testcafe',
  status: 'Confirmed',
  program: 'testing'
};

export { simple_hedge_txn };
