import authService from '@/services/auth';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { AppDispatch } from '..';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

function setAuthUserActionCreator(authUser: any | null): any {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator(): object {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

function asyncSetAuthUser({ email, password }: any): any {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());
    try {
      const token = await authService.login({ email, password });
      authService.putAccessToken(token);
      const authUser = await authService.getOwnProfile();

      dispatch(setAuthUserActionCreator(authUser));
    } catch (error: any) {
      alert(error);
    }

    dispatch(hideLoading());
  };
}

function asyncUnSetAuthUser() {
  return (dispatch: any) => {
    dispatch(unsetAuthUserActionCreator());
    authService.putAccessToken('');
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnSetAuthUser,
};
