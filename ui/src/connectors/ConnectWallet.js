import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'store/actions';
import { isTxSuccess, mintBonsai, sleep, receiveOxygen } from 'helpers';

export const ConnectWallet = () => {
  const address = useSelector((state) => state.walletAddress);
  const numBonsai = useSelector((state) => state.balanceBonsai.length);
  const dispatch = useDispatch();

  useEffect(() => {
    if (address) {
      dispatch(actions.getBalanceOxy(address));
      dispatch(actions.getBalanceBonsai(address));
    }
  }, [address, dispatch]);

  useEffect(() => {
    if (address && numBonsai > 0) {
      const init = async () => {
        receiveOxygen(address, numBonsai);
        await sleep(5000);
        await dispatch(actions.getBalanceOxy(address));
      };
      init();
    }
  }, [address, dispatch, numBonsai]);

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
            await sleep(5000);
            dispatch(actions.getBalanceBonsai(address));
            dispatch(actions.getBalanceOxy(address));
          }
        } else if (payload.id === 2) {
          await sleep(5000);
          dispatch(actions.getBalanceOxy(address));
        }
        break;
      default:
    }
  };
  window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler, false);
  return <></>;
};
