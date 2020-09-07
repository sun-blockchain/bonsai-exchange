import { convertHexToDec, getBalanceIcon, getBalanceBonsaiIcon, getBalanceOxyIcon } from 'helpers';
import { PLANT_STATUS, plantsInitDic } from 'constant';

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
  dispatch({
    type: GET_BALANCE_OXY,
    balanceOxy: amount,
  });
};

export const SET_ADDRESS = 'SET_ADDRESS';
export const setAddress = (walletAddress) => (dispatch) => {
  localStorage.setItem('address', walletAddress);
  dispatch({
    type: SET_ADDRESS,
    walletAddress,
  });
};

export const GET_BALANCE_BONSAI = 'GET_BALANCE_BONSAI';
export const getBalanceBonsai = (address) => async (dispatch) => {
  const balanceBonsai = await getBalanceBonsaiIcon(address);
  let plants = JSON.parse(JSON.stringify(plantsInitDic));
  // if not error
  if (balanceBonsai && balanceBonsai !== -1) {
    balanceBonsai[0].forEach((name, id) => {
      if (name in plants) {
        plants[name].plantStatus = PLANT_STATUS.PLANTED;
        plants[name].id = balanceBonsai[1][id];
      }
    });
  }

  plants = Object.values(plants);
  plants.map((plant, index) => (plant.index = index));

  dispatch({
    type: GET_BALANCE_BONSAI,
    plants,
    balanceBonsai,
  });
};

export const UPDATE_TOUR_STEP = 'UPDATE_TOUR_STEP';
export const updateTourStep = (tourStep) => (dispatch) => {
  dispatch({
    type: UPDATE_TOUR_STEP,
    tourStep,
  });
};

export const SET_FIRST_PLANT = 'SET_FIRST_PLANT';
export const setFirstPlant = (firstPlant) => (dispatch) => {
  dispatch({
    type: SET_FIRST_PLANT,
    firstPlant,
  });
};

export const transferPlantLocation = (secondPlant) => async (dispatch, getState) => {
  let state = getState();

  let firstPlant = state.firstPlant;
  let plants = state.plants;

  // transfer
  let temp = plants[firstPlant];
  plants[firstPlant] = plants[secondPlant];
  plants[secondPlant] = temp;

  // update index
  plants.map((plant, index) => (plant.index = index));

  dispatch({
    type: CHANGE_PLANT_STATUS,
    plants,
  });
};
