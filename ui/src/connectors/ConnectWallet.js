import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'store/actions';
import { isTxSuccess, mintBonsai, receiveOxygen } from 'helpers';

export const ConnectWallet = () => {
  const address = useSelector((state) => state.walletAddress);
  const numPlants = useSelector((state) => state.plants.length);
  const dispatch = useDispatch();

  useEffect(() => {
    if (address) {
      dispatch(actions.getBalanceICX(address));
      dispatch(actions.getBalanceBonsai(address));
      dispatch(actions.getBalanceOxy(address));
    }
  }, [address, dispatch]);

  useEffect(() => {
    if (address && numPlants > 0) {
      receiveOxygen(address, numPlants);
      dispatch(actions.getBalanceOxy(address));
    }
  }, [numPlants, address, dispatch]);

  const eventHandler = async (event) => {
    var type = event.detail.type;
    var payload = event.detail.payload;
    switch (type) {
      case 'RESPONSE_ADDRESS':
        dispatch(actions.setAddress(payload));
        break;
      case 'RESPONSE_JSON-RPC':
        if (payload.id === 1) {
          const tx = await isTxSuccess(payload.result);

          let bonsai = JSON.parse(localStorage.getItem('BonsaiBuying'));
          if (tx && bonsai) {
            mintBonsai(address, bonsai);
            localStorage.removeItem('BonsaiBuying');
          }
          setTimeout(() => {
            dispatch(actions.getBalanceBonsai(address));
            dispatch(actions.getBalanceOxy(address));
          }, 5000);
        } else if (payload.id === 2) {
          setTimeout(() => {
            dispatch(actions.getBalanceOxy(address));
          }, 5000);
        }
        break;
      default:
    }
  };
  window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler, false);
  return <></>;
};
