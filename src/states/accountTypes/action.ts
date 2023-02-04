import api from '@/utils/api'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { AppDispatch } from '..'

const ActionType = {
  RECEIVE_ACCOUNT_TYPES: 'RECEIVE_ACCOUNT_TYPES',
  ADD_ACCOUNT_TYPE: 'ADD_ACCOUNT_TYPE'
}

function receiveAccountTypesActionCreator (accountTypes: []): any {
  return {
    type: ActionType.RECEIVE_ACCOUNT_TYPES,
    payload: {
      accountTypes
    }
  }
}

function addAccountTypesActionCreator (accountType: any): any {
  console.log(accountType)
  return {
    type: ActionType.ADD_ACCOUNT_TYPE,
    payload: {
      accountType
    }
  }
}

function asyncReceiveAccountTypes (): any {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading())
    try {
      const accountTypes = await api.getAllAccountTypes()
      dispatch(receiveAccountTypesActionCreator(accountTypes))
    } catch (error: any) {
      alert(error.message)
    }

    dispatch(hideLoading())
  }
}

function asyncAddAccountType ({ name, code, positionNormal, description }: any): any {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading())
    try {
      const accountTypes = await api.addAccountType({ name, code, positionNormal, description })

      dispatch(addAccountTypesActionCreator(accountTypes))
    } catch (error: any) {
      alert(error.message)
    }

    dispatch(hideLoading())
  }
}

export {
  ActionType,
  asyncReceiveAccountTypes,
  receiveAccountTypesActionCreator,
  asyncAddAccountType,
  addAccountTypesActionCreator
}
