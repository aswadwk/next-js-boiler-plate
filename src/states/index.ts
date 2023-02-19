import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import accountsReducer from './accounts/reducer';
import accountTypesReducer from './accountTypes/reducer';
import authUserReducer from './authUser/reducer';
import divisionReducer from './Divisions/reducer';
import isPreloadReducer from './isPreload/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    accountTypesState: accountTypesReducer,
    accountsState: accountsReducer,
    divisionState: divisionReducer,
    // users: usersReducer,
    // threads: threadsReducer,
    // threadDetail: threadDetailReducer,
    // leaderBoards: leaderBoardsReducer,
    // comments: commentReducer,
    loadingBar: loadingBarReducer,

  },
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
