import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'store/actions';
import { isTxSuccess, mintBonsai } from 'helpers';

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

  const eventHandler = (event) => {
    var type = event.detail.type;
    var payload = event.detail.payload;
    switch (type) {
      case 'RESPONSE_ADDRESS':
        dispatch(actions.setAddress(payload));
        dispatch(actions.getBalanceBonsai(payload));
        break;
      case 'RESPONSE_JSON-RPC':
        if (payload.id === 1) {
          if (isTxSuccess(payload.result)) {
            let bonsai = JSON.parse(localStorage.getItem('BonsaiBuying'));
            mintBonsai(address, bonsai);
          }
          setTimeout(() => {
            dispatch(actions.getBalanceICX(address));
            dispatch(actions.getBalanceBonsai(address));
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
