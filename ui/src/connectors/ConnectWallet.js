import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'store/actions';

export const ConnectWallet = () => {
  const address = useSelector((state) => state.walletAddress);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.activateConnection(true));
    dispatch(actions.updatePurses);
  }, [dispatch]);

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
        break;
      case 'RESPONSE_JSON-RPC':
        if (payload.id === 3) {
          console.log(payload);
        }
        break;
      default:
    }
  };
  window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler, false);
  return <></>;
};
