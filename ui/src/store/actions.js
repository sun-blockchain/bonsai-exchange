import { plantsInitArray } from 'constant';

import { convertHexToDec, getBalanceIcon, getBalanceBonsaiIcon, getBalanceOxyIcon } from 'helpers';

export const SERVER_CONNECTED = 'SERVER_CONNECTED';
export const serverConnected = (connected) => async (dispatch) => {
  dispatch({
    type: SERVER_CONNECTED,
    connected,
  });
};

export const ACTIVATE_CONNECTION = 'ACTIVATE_CONNECTION';
export const activateConnection = (active) => async (dispatch) => {
  dispatch({
    type: ACTIVATE_CONNECTION,
    active,
  });
};

export const UPDATE_PURSES = 'UPDATE_PURSES';
export const updatePurses = (data) => async (dispatch) => {
  dispatch({
    type: UPDATE_PURSES,
    purses: plantsInitArray,
  });
};

export const UPDATE_PLANTS = 'UPDATE_PLANTS';
export const updatePlants = (plants) => (dispatch) => {
  console.log('update Plants');

  dispatch({
    type: UPDATE_PLANTS,
    plants,
  });
};

export const CHANGE_PLANT_STATUS = 'CHANGE_PLANT_STATUS';
export const changePlantStatus = (id, status) => (dispatch, getState) => {
  let state = getState();

  let plants = state.plants;
  plants[id].plantStatus = status;
  dispatch({
    type: CHANGE_PLANT_STATUS,
    plants,
  });
};

export const RESET_ALL = 'RESET_ALL';
export const resetAll = () => (dispatch) => {
  dispatch({
    type: RESET_ALL,
  });
};

export const GET_BALANCE_ICX = 'GET_BALANCE_ICX';
export const getBalanceICX = (address) => async (dispatch) => {
  const balanceICX = convertHexToDec(await getBalanceIcon(address));
  dispatch({
    type: GET_BALANCE_ICX,
    balanceICX,
  });
};

export const GET_BALANCE_OXY = 'GET_BALANCE_OXY';
export const getBalanceOxy = (address) => async (dispatch) => {
  const amount = await getBalanceOxyIcon(address);
  console.log(amount);
  dispatch({
    type: GET_BALANCE_OXY,
    balanceOxy: amount,
  });
};

export const SET_ADDRESS = 'SET_ADDRESS';
export const setAddress = (walletAddress) => (dispatch) => {
  dispatch({
    type: SET_ADDRESS,
    walletAddress,
  });
};

export const GET_BALANCE_BONSAI = 'GET_BALANCE_BONSAI';
export const getBalanceBonsai = (address) => async (dispatch) => {
  const balanceBonsai = await getBalanceBonsaiIcon(address);
  // if not error
  if (balanceBonsai !== -1)
    dispatch({
      type: GET_BALANCE_BONSAI,
      balanceBonsai: balanceBonsai,
      bonsaiNumber: balanceBonsai.length,
    });
};
