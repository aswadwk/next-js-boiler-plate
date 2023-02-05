import api from '@/utils/api'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { AppDispatch } from '..'

const ActionType = {
  RECEIVE_ACCOUNTS: 'RECEIVE_ACCOUNTS',
  ADD_ACCOUNT: 'ADD_ACCOUNT'
}

function receiveAccountsActionCreator (accounts: []): any {
  return {
    type: ActionType.RECEIVE_ACCOUNTS,
    payload: {
      accounts
    }
  }
}

function addAccountsActionCreator (accountType: any): any {
  console.log(accountType)
  return {
    type: ActionType.ADD_ACCOUNT,
    payload: {
      accountType
    }
  }
}

function asyncReceiveAccounts (): any {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading())
    try {
      const accounts = await api.getAllAccounts()
      dispatch(receiveAccountsActionCreator(accounts))
    } catch (error: any) {
      alert(error.message)
    }

    dispatch(hideLoading())
  }
}

function asyncAddAccount ({ code, name, account_type_id }: any): any {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading())
    try {
      const accounts = await api.addAccounts({ code, name, account_type_id })

      dispatch(addAccountsActionCreator(accounts))
    } catch (error: any) {
      alert(error.message)
    }

    dispatch(hideLoading())
  }
}

export {
  ActionType,
  asyncReceiveAccounts,
  receiveAccountsActionCreator,
  asyncAddAccount,
  addAccountsActionCreator
}
