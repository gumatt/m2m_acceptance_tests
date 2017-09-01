const TEMPLATE_SELECTORS = {
  menu: {
    menu: '#menu-accordian',
    dashboard: {
      text: 'Dashboard',
      selector: '#menu-accordion > li.panel.dashboard',
    },
    programs: {
      selector: '#menu-accordion > li.panel.program',
      text: 'Programs',
      subMenu: '#program-link'
    },
    transactions: {
      selector: '#menu-accordion > li.panel.transactions',
      text: 'Transactions',
      subMenu: '#transactions-link'
    },
    settings: {
      selector: '#menu-accordion > li.panel.inv',
      text: 'Settings',
      subMenu: '#inv-link'
    }
  },
  labels: {
    flash_message: 'div.text-center',
    welcome_username: '#topbar > div.pull-right.pull-right-head > div > div > span.admin-user-span2'
  },
  Modals: {
    flashAlert: 'body > div.bootbox.modal.fade.bootbox-alert.in > div'
  }
}

const DASHBOARD_SELECTORS = {
  labels: {
    companyName: '#com_name'
  },
  cards: {
    first: '#main-content > div.content-body > div:nth-child(1) > div > div'
  },
  tabs: {
    programs: '#main-content > div.main-boxes > div > div > div.box-content > ul > li:nth-child(1) > a',
    positions: '#main-content > div.main-boxes > div > div > div.box-content > ul > li:nth-child(2) > a',
    hedgeLog: '#main-content > div.main-boxes > div > div > div.box-content > ul > li:nth-child(3) > a',
    physicalLog: '#main-content > div.main-boxes > div > div > div.box-content > ul > li:nth-child(4) > a'
  },
  menus: {
    fieldSelector: '#hedge-pos > div.bootstrap-table > div.fixed-table-toolbar > div.columns.columns-right.btn-group.pull-right > div > button',
    fieldsMenu: '#hedge-pos > div.bootstrap-table > div.fixed-table-toolbar > div.columns.columns-right.btn-group.pull-right > div > ul'
  },
  tables: {
    programs: {
      table: '#table14',
      headers: '#table14 > thead > tr',
      body: '#table14 > tbody'
    },
    positions: '#table13',
    hedgeLog: '#table12',
    physicalLog: '#table11'
  },
  filters: {
    programs: {
      programFilter: '#table14 > thead > tr > th:nth-child(1) > div.fht-cell > div > select',
      programFilterOptions: '#table14 > thead > tr > th:nth-child(1) > div.fht-cell > div > select > option'
    },
    postions: {
      programFilter2: '#table13 > thead > tr > th:nth-child(1) > div.fht-cell > div > select',
    },
    hedgeLog: {
      programFilter3: '#table12 > thead > tr > th:nth-child(2) > div.fht-cell > div > select',
    },
    physicalLog: {
      programFilter4: '#table11 > thead > tr > th:nth-child(2) > div.fht-cell > div > select'
    }
  }
}

const LOGIN_PAGE_SELECTORS = {
  buttons: {
    submit: 'button.btn', 
  },
  inputs: {
    username: '#id_username',
    password: '#id_password',
  }, 
  labels: {
    flash_message: 'div.text-center',
    welcome_username: '#topbar > div.pull-right.pull-right-head > div > div > span.admin-user-span2'
  },
  Modals: {
    flashAlert: 'body > div.bootbox.modal.fade.bootbox-alert.in > div'
  }
}

const HEDGE_TRANS_PAGE_SELECTORS = {
  Buttons: {
    CreateHedgeTrans:
      '#main-content > div.content-body > div > div > div.box-head.clearfix > div > a:nth-child(2)',
    DeleteTransaction: '#delete_hedge_tran',
    DeleteTransConfirm: '#confirm',
    ConfirmSuccess: '#ok',
    UploadTrans: 
      '#main-content > div.content-body > div > div > div.box-head.clearfix > div > a:nth-child(1)',
    BrowseFiles: '#UploadFileForm > div.modal-body.clearfix > div > div.input-group.file-caption-main > div.input-group-btn > div',
    UploadFiles: 
      '#UploadFileForm > div.modal-body > div > div.input-group.file-caption-main > div.input-group-btn > button.btn.btn-default.fileinput-upload.fileinput-upload-button'
  },
  Modals: {
    HedgeTrans: '#add-hedge-tran'
  },
  Forms: {
    HedgeTrans: {
      Form: '#hedge_tran_info',
      Fields: {
        TransNo: '#name',
        TransType: '#hedge_trans_type',
        HedgeAccount: '#hedge_account',
        Program: '#inventory',
        Product: '#product',
        Contract: '#contract_entry',
        MonthYear: '#month_year',
        Volume: '#volume',
        TransPrice: '#price',
        TransDate: '#trans_date',
        InitialPosition: '#initial_pos',
        ConfirmationNumber: '#confirm_number',
        Trader: '#trader',
        Status: '#status',
        Inventory: '#program',
        SubmitBtn: '#add_user_btn',
        CancelBtn:
          '#hedge_tran_info > div.modal-footer > button.btn.btn-default'
      }
    },
    HedgeTransUpload: {
      Form: '#UploadFileForm',
      Fields: {
        filePath: 
          '#UploadFileForm > div.modal-body.clearfix > div > div.input-group.file-caption-main > div.form-control.file-caption.kv-fileinput-caption',
        filesInput: '#file_upload'
      }
    }
  },
  Tables: {
    TransTable: {
      Table: '#users',
      Columns: '#users > thead > tr',
      Rows: '#users > tbody'
    }
  },
  Labels: {
    countDisplay: '#users_info'
  }
};

export { HEDGE_TRANS_PAGE_SELECTORS, LOGIN_PAGE_SELECTORS, TEMPLATE_SELECTORS, DASHBOARD_SELECTORS };
