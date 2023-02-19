import api from '@/utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { AppDispatch } from '..';

const ActionType = {
  RECEIVE_DIVISIONS: 'RECEIVE_DIVISIONS',
  ADD_DIVIOSION: 'ADD_DIVIOSION',
};

function receiveDivisionsActionCreator(divisions: []): any {
  return {
    type: ActionType.RECEIVE_DIVISIONS,
    payload: {
      divisions,
    },
  };
}

function addDivisionActionCreator(divisions: any): any {
  console.log(divisions);
  return {
    type: ActionType.ADD_DIVIOSION,
    payload: {
      divisions,
    },
  };
}

function asyncReceiveDivisions(): any {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());
    try {
      const divisions = await api.getAllDivisions();
      dispatch(receiveDivisionsActionCreator(divisions));
    } catch (error: any) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncAddDivision({ name, code, description }: any): any {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());
    try {
      const divisions = await api.addDivision({ name, code, description });

      dispatch(addDivisionActionCreator(divisions));
    } catch (error: any) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveDivisionsActionCreator,
  addDivisionActionCreator,
  asyncReceiveDivisions,
  asyncAddDivision,
};
