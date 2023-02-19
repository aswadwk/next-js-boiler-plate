/* eslint-disable @typescript-eslint/indent */
import { ActionType } from './action';

function accountTypesReducer(accountTypes = [], action: any = {}): any {
  switch (action.type) {
  case ActionType.RECEIVE_ACCOUNT_TYPES:
    return action.payload.accountTypes;
  case ActionType.ADD_ACCOUNT_TYPE:
    return [action.payload.accountType, ...accountTypes];
  default:
    return accountTypes;
  }
}

export default accountTypesReducer;
