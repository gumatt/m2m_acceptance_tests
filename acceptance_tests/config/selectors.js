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

export { HEDGE_TRANS_PAGE_SELECTORS, LOGIN_PAGE_SELECTORS, TEMPLATE_SELECTORS };
