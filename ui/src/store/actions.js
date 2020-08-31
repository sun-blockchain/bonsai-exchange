import { plantsInitArray } from 'constant';
import IconService, { HttpProvider, IconBuilder, IconConverter, IconAmount } from 'icon-sdk-js';

import { convertHexToDec } from 'helpers';

const provider = new HttpProvider(process.env.REACT_APP_API_ENPOINT);
const iconService = new IconService(provider);

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
  const balanceICX = convertHexToDec(await iconService.getBalance(address).execute());
  dispatch({
    type: GET_BALANCE_ICX,
    balanceICX,
  });
};

export const SET_BALANCE_OXY = 'GET_BALANCE_OXY';
export const setBalanceOxy = (amount) => async (dispatch) => {
  dispatch({
    type: SET_BALANCE_OXY,
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
  try {
    const txObjBonsaiId = new IconBuilder.CallBuilder()
      .from(address)
      .to(process.env.REACT_APP_ADDRESS_CONTRACT_BONSAI)
      .method('getAllBonsaiOfUser')
      .params({
        _address: address,
      })
      .build();
    let bonsaiIds = await iconService.call(txObjBonsaiId).execute();

    let balanceBonsai = [];

    for (var i = 0; i < bonsaiIds.length; i++) {
      const txObjBonsaiName = new IconBuilder.CallBuilder()
        .from(address)
        .to(process.env.REACT_APP_ADDRESS_CONTRACT_BONSAI)
        .method('getNameById')
        .params({
          _tokenId: bonsaiIds[i],
        })
        .build();

      const name = await iconService.call(txObjBonsaiName).execute();
      balanceBonsai.push(name);
    }

    dispatch({
      type: GET_BALANCE_BONSAI,
      balanceBonsai: balanceBonsai,
      bonsaiNumber: balanceBonsai.length,
    });
  } catch (err) {
    console.log({ err });
  }
};

export const buyBonsai = (item) => (dispatch, getState) => {
  const state = getState();
  const address = state.walletAddress;

  const txObjBuyBonsai = new IconBuilder.CallTransactionBuilder()
    .from(address)
    .to(process.env.REACT_APP_ADDRESS_CONTRACT_BONSAI)
    .value(IconAmount.of(item.price, IconAmount.Unit.ICX).toLoop())
    .stepLimit(IconConverter.toBigNumber('2000000'))
    .nid(IconConverter.toBigNumber('3'))
    .nonce(IconConverter.toBigNumber('1'))
    .version(IconConverter.toBigNumber('3'))
    .timestamp(new Date().getTime() * 1000)
    .method('createBonsai')
    .params({
      _tokenName: item.name,
    })
    .build();

  const requestBuyBonsai = JSON.stringify({
    jsonrpc: '2.0',
    method: 'icx_call',
    params: txObjBuyBonsai,
    id: 3,
  });
  window.dispatchEvent(
    new CustomEvent('ICONEX_RELAY_REQUEST', {
      detail: {
        type: 'REQUEST_JSON-RPC',
        payload: JSON.parse(requestBuyBonsai),
      },
    })
  );
};
