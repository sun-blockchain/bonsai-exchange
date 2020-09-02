import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'store/actions';
import { isTxSuccess, mintBonsai, sleep } from 'helpers';

export const ConnectWallet = () => {
  const address = useSelector((state) => state.walletAddress);
  const dispatch = useDispatch();

  useEffect(() => {
    if (address) {
      dispatch(actions.getBalanceICX(address));
      dispatch(actions.getBalanceBonsai(address));
      dispatch(actions.getBalanceOxy(address));
    }
  }, [address, dispatch]);

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
            dispatch(actions.getBalanceBonsai(address));
            await sleep(5000);
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
