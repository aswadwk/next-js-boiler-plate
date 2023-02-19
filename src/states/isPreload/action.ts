import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { AppDispatch } from '..';
import api from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setIsPreloadActionCreator(isPreload: any): any {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

function asyncIsPreloadProcess(): any {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());
    try {
      // preload process
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      dispatch(setAuthUserActionCreator(null));
    //   alert(error);
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  setIsPreloadActionCreator,
  asyncIsPreloadProcess,
};
