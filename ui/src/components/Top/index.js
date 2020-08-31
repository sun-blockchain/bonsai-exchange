import React from 'react';
import { useSelector } from 'react-redux';
import oxyImg from 'images/oxygen_bubble_big.png';

import './top.css';
import { ConnectWallet } from 'connectors/ConnectWallet';

function Top() {
  const address = useSelector((state) => state.walletAddress);
  const balanceOxy = useSelector((state) => state.balanceOxy);

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
