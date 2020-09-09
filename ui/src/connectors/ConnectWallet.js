import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'store/actions';
import { isTxSuccess, sleep, receiveOxygen } from 'helpers';

export const ConnectWallet = () => {
  const address = useSelector((state) => state.walletAddress);
  const numBonsai = useSelector((state) => state.balanceBonsai.length);
  const dispatch = useDispatch();

  useEffect(() => {
    if (address) {
      dispatch(actions.getBalanceOxy());
      dispatch(actions.getBalanceBonsai());
    }
  }, [address, dispatch]);

  useEffect(() => {
    if (address && numBonsai > 0) {
      const init = async () => {
        receiveOxygen(address, numBonsai);
        await sleep(5000);
        await dispatch(actions.getBalanceOxy());
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
          let bonsai = JSON.parse(localStorage.getItem('BonsaiBuying'));
          if (bonsai) {
            localStorage.removeItem('BonsaiBuying');
            dispatch(actions.setLoading(true));
            const tx = await isTxSuccess(payload.result);
            if (tx) {
              await dispatch(actions.mintBonsai(bonsai));
              dispatch(actions.getBalanceOxy());
            } else {
              alert('Transaction fail!!!');
            }
            dispatch(actions.setLoading(false));
          }
        } else if (payload.id === 2) {
          dispatch(actions.setLoading(true));
          if (JSON.parse(localStorage.getItem('buyOxy'))) {
            localStorage.removeItem('buyOxy');
            await sleep(5000);
            dispatch(actions.getBalanceOxy());
            dispatch(actions.setLoading(false));
          }
        } else if (payload.id === 3) {
          dispatch(actions.setLoading(true));
          if (JSON.parse(localStorage.getItem('transferBonsai'))) {
            localStorage.removeItem('transferBonsai');
            await sleep(5000);
            dispatch(actions.getBalanceBonsai());
            dispatch(actions.setLoading(false));
          }
        }
        break;
      default:
    }
  };
  window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler, false);
  return <></>;
};
