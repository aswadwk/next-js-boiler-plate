/* eslint-disable @typescript-eslint/indent */
import { ActionType } from './action'

function accountsReducer (accounts = [], action: any = {}): any {
  switch (action.type) {
  case ActionType.RECEIVE_ACCOUNTS:
    return action.payload.accounts
  case ActionType.ADD_ACCOUNT:
    return [action.payload.accountType, ...accounts]
  default:
    return accounts
  }
}

export default accountsReducer
