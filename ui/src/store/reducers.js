import * as connect from './actions';

import { plantsInitArray } from 'constant';

const initialState = {
  active: false,
  connected: false,
  account: null,
  purses: [],
  plants: plantsInitArray,
  test: [],
  walletAddress: null,
  balanceICX: null,
  balanceOxy: null,
  balanceBonsai: [],
  bonsaiNumber: 0,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case connect.SERVER_CONNECTED:
      return {
        ...state,
        connected: action.connected,
      };
    case connect.ACTIVATE_CONNECTION:
      return {
        ...state,
        active: action.active,
      };
    case connect.UPDATE_PURSES:
      return {
        ...state,
        purses: action.purses,
      };
    case connect.UPDATE_PLANTS:
      return {
        ...state,
        plants: action.plants,
      };
    case connect.CHANGE_PLANT_STATUS:
      return {
        ...state,
        plants: action.plants,
      };
    case connect.RESET_ALL:
      return {
        ...state,
        active: false,
        connected: false,
        account: null,
        purses: [],
        plants: [],
      };
    case connect.SET_ADDRESS:
      return {
        ...state,
        walletAddress: action.walletAddress,
      };
    case connect.GET_BALANCE_ICX:
      return {
        ...state,
        balanceICX: action.balanceICX,
      };
    case connect.GET_BALANCE_OXY:
      return {
        ...state,
        balanceOxy: action.balanceOxy,
      };
    case connect.GET_BALANCE_BONSAI:
      return {
        ...state,
        balanceBonsai: action.balanceBonsai,
        bonsaiNumber: action.bonsaiNumber,
      };
    default:
      return state;
  }
};

export default rootReducer;
