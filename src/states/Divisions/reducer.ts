/* eslint-disable @typescript-eslint/indent */
import { ActionType } from './action'

function divisionReducer (divisions = [], action: any = {}): any {
  switch (action.type) {
  case ActionType.RECEIVE_DIVISIONS:
    return action.payload.divisions
  case ActionType.ADD_DIVIOSION:
    return [action.payload.divisions, ...divisions]
  default:
    return divisions
  }
}

export default divisionReducer
