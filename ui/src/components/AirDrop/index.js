import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { airDropOxyIcon, getTransactionResult } from 'helpers';
import * as actions from 'store/actions';

export default function AirDrop() {
  const address = useSelector((state) => state.walletAddress);
  const dispatch = useDispatch();

  useEffect(() => {
    const success = () => {
      Modal.success({
        content: 'You have been given 30 oxygen to start the game !!!',
      });
    };
    const main = async () => {
      if (address) {
        const txHash = await airDropOxyIcon(address);
        setTimeout(async () => {
          const txObject = await getTransactionResult(txHash);
          if (txObject.status) {
            success();
            dispatch(actions.getBalanceOxy(address));
          }
        }, 4000);
      }
    };

    main();
  }, [address, dispatch]);
  return <></>;
}
