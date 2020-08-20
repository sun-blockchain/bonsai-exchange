import { plants_init } from 'constant';

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
    purses: plants_init,
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
