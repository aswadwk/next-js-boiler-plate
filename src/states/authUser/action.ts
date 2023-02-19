import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { AppDispatch } from '..';
import api from '../../utils/api';

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
      console.log('login');
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();

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
    api.putAccessToken('');
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnSetAuthUser,
};
