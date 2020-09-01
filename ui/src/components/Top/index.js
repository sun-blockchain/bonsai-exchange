import React from 'react';
import { useSelector } from 'react-redux';
import oxyImg from 'images/oxygen_bubble_big.png';
import { useDispatch } from 'react-redux';
import * as actions from 'store/actions';

import './top.css';
import { ConnectWallet } from 'connectors/ConnectWallet';

function Top() {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.walletAddress);
  const balanceOxy = useSelector((state) => state.balanceOxy);

  if (localStorage.getItem('address')) {
    dispatch(actions.setAddress(localStorage.getItem('address')));
  }

  const handleSwitchAccount = () => {
    window.dispatchEvent(
      new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
          type: 'REQUEST_ADDRESS',
        },
      })
    );
  };

  return (
    <div className='oxy-area p-10px'>
      <ConnectWallet />
      <div className='oxy-num' onClick={handleSwitchAccount}>
        <img src={oxyImg} className='oxy-img' alt='oxy' />
        <strong className='number'>{address ? balanceOxy : 'Not connected, click here!'}</strong>
      </div>
    </div>
  );
}

export default Top;
