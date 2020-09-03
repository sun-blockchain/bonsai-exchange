import React from 'react';
import { useSelector } from 'react-redux';
import oxyImg from 'images/oxygen_bubble_big.png';
import { useDispatch } from 'react-redux';
import * as actions from 'store/actions';
import { ConnectWallet } from 'connectors/ConnectWallet';
import AirDrop from 'components/AirDrop';

import './top.css';

function Top() {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.walletAddress);
  const balanceOxy = useSelector((state) => state.balanceOxy);

  if (localStorage.getItem('address')) {
    dispatch(actions.setAddress(localStorage.getItem('address')));
  }

  const handleSwitchAccount = () => {
    // close tour
    dispatch(actions.updateTourStep(100));

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
      {/* Connect to wallet */}
      <ConnectWallet />

      {/* Airdrop 30 Oxy for first-time use per address */}
      <AirDrop />

      <div className='oxy-num connect-wallet' onClick={handleSwitchAccount}>
        <img src={oxyImg} className='oxy-img' alt='oxy' />
        <strong className='number'>{address ? balanceOxy : 'Not connected, click here!'}</strong>
      </div>
    </div>
  );
}

export default Top;
