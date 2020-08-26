import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import oxyImg from 'images/oxygen_bubble_big.png';
import * as actions from 'store/actions';
import { IconBuilder } from 'icon-sdk-js';
import { convertHexToDec } from 'helpers';

import './top.css';

function Top() {
  const [balanceOxi, setBalanceOxi] = useState(null);
  const address = useSelector((state) => state.walletAddress);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.activateConnection(true));
    dispatch(actions.updatePurses);
  }, [dispatch]);

  useEffect(() => {
    if (address) {
      dispatch(actions.getBalanceICX(address));

      const methodName = 'balanceOf';
      const params = {
        _owner: address,
      };
      const callBuilder = new IconBuilder.CallBuilder();
      const call = callBuilder
        .to(process.env.REACT_APP_ADDRESS_CONTRACT_OXI)
        .method(methodName)
        .params(params)
        .build();
      const request = JSON.stringify({
        jsonrpc: '2.0',
        method: 'icx_call',
        params: call,
        id: 1,
      });

      window.dispatchEvent(
        new CustomEvent('ICONEX_RELAY_REQUEST', {
          detail: {
            type: 'REQUEST_JSON-RPC',
            payload: JSON.parse(request),
          },
        })
      );
    }
  }, [address, dispatch]);

  const handleSwitchAccount = () => {
    window.dispatchEvent(
      new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
          type: 'REQUEST_ADDRESS',
        },
      })
    );
  };

  const eventHandler = (event) => {
    var type = event.detail.type;
    var payload = event.detail.payload;
    switch (type) {
      case 'RESPONSE_ADDRESS':
        dispatch(actions.setAddress(payload));
        break;
      case 'RESPONSE_JSON-RPC':
        if (payload.id === 1) {
          setBalanceOxi(convertHexToDec(payload.result));
        }
        break;
      default:
    }
  };
  window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler, false);

  return (
    <div className='oxy-area p-10px'>
      <div className='oxy-num' onClick={handleSwitchAccount}>
        <img src={oxyImg} className='oxy-img' alt='oxy' />
        <strong className='number'>{address ? balanceOxi : 'Not connected, click here!'}</strong>
      </div>
    </div>
  );
}

export default Top;
