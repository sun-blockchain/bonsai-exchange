import * as connect from './actions';

import dappConstants from 'conf/dappConstants';
import { plants_init } from 'constant';

const instanceId = dappConstants.INSTANCE_REG_KEY;

const initialState = {
  active: false,
  connected: false,
  account: null,
  purses: [],
  instanceId,
  plants: plants_init,
  test: [],
  walletAddress: null,
  balanceICX: null,
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
        instanceId,
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
    default:
      return state;
  }
};

export default rootReducer;
