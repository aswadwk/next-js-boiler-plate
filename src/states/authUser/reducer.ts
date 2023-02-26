import { ActionType } from './action';

const initialState = {
  authUser: null,
  error: null,
};

function authUserReducer(authUser = initialState, action: any = {}): any {
  switch (action.type) {
  case ActionType.SET_AUTH_USER:
    return {
      ...authUser,
      authUser: action.payload.authUser,
    };

  case ActionType.SET_AUTH_USER_ERROR:
    return {
      ...authUser,
      error: action.payload.error,
    };

  case ActionType.UNSET_AUTH_USER:
    return {
      ...authUser,
      authUser: action.payload.authUser,
    };

  default:
    return authUser;
  }
}

export default authUserReducer;
