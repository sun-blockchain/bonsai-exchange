import * as connect from './actions';

import dappConstants from 'conf/dappConstants';

const instanceId = dappConstants.INSTANCE_REG_KEY;

const initialState = {
  active: false,
  connected: false,
  account: null,
  purses: [],
  instanceId,
  plants: [],
  test: [],
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
    case connect.TEST:
      return {
        ...state,
        test: action.test,
      };
    case connect.UPDATE_PLANTS:
      return {
        ...state,
        plants: action.plants,
      };
    case connect.CHANGE_STATE_PLANT:
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
    default:
      return state;
  }
};

export default rootReducer;
