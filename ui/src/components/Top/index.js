import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import oxyImg from 'images/oxygen_bubble_big.png';
import * as actions from 'store/actions';
import { IconBuilder } from 'icon-sdk-js';
import { convertHexToDec } from 'helpers';

import './top.css';

function Top() {
  const address = useSelector((state) => state.walletAddress);
  const balanceOxy = useSelector((state) => state.balanceOxy);
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
      const callBalanceOxi = callBuilder
        .to(process.env.REACT_APP_ADDRESS_CONTRACT_OXI)
        .method(methodName)
        .params(params)
        .build();
      const requestBalanceOxi = JSON.stringify({
        jsonrpc: '2.0',
        method: 'icx_call',
        params: callBalanceOxi,
        id: 1,
      });

      const callBalanceBonsai = callBuilder
        .from(address)
        .to(process.env.REACT_APP_ADDRESS_CONTRACT_BONSAI)
        .method('getAllBonsaiOfUser')
        .params({
          _address: address,
        })
        .build();

      const requestBalanceBonsai = JSON.stringify({
        jsonrpc: '2.0',
        method: 'icx_call',
        params: callBalanceBonsai,
        id: 2,
      });

      window.dispatchEvent(
        new CustomEvent('ICONEX_RELAY_REQUEST', {
          detail: {
            type: 'REQUEST_JSON-RPC',
            payload: JSON.parse(requestBalanceOxi),
          },
        })
      );
      // window.dispatchEvent(
      //   new CustomEvent('ICONEX_RELAY_REQUEST', {
      //     detail: {
      //       type: 'REQUEST_JSON-RPC',
      //       payload: JSON.parse(requestBalanceBonsai),
      //     },
      //   })
      // );
      dispatch(actions.getBalanceBonsai(address));
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
          dispatch(actions.setBalanceOxy(convertHexToDec(payload.result)));
        } else if (payload.id === 2) {
          console.log('bonsai balance', payload);
        } else if (payload.id === 3) {
          console.log(payload);
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
        <strong className='number'>{address ? balanceOxy : 'Not connected, click here!'}</strong>
      </div>
    </div>
  );
}

export default Top;
