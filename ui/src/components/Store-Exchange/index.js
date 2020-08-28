import React from 'react';
import { Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { PLANT_STATUS } from 'constant';
import Item from 'components/Item';
import * as actions from 'store/actions';
import IconService from 'icon-sdk-js';
import './style.css';

const { IconBuilder, IconConverter, IconAmount } = IconService;
function Store(props) {
  const dispatch = useDispatch();

  const plants = useSelector((state) =>
    state.plants.filter((item) => item.plantStatus === PLANT_STATUS.INSTORE)
  );
  const address = useSelector((state) => state.walletAddress);

  const handleBuyPlant = (item) => {
    // dispatch(actions.changePlantStatus(item.id, PLANT_STATUS.INSTOCK));
    if (address) {
      const txObjBuyBonsai = new IconBuilder.CallTransactionBuilder()
        .from(address)
        .to(process.env.REACT_APP_ADDRESS_CONTRACT_BONSAI)
        .value(IconAmount.of(item.price, IconAmount.Unit.ICX).toLoop())
        .stepLimit(IconConverter.toBigNumber('2000000'))
        .nid(IconConverter.toBigNumber('3'))
        .nonce(IconConverter.toBigNumber(new Date().getTime().toString()))
        .version(IconConverter.toBigNumber('3'))
        .timestamp(new Date().getTime() * 1000)
        .method('createBonsai')
        .params({
          _tokenName: item.name,
        })
        .build();

      const requestBuyBonsai = JSON.stringify({
        jsonrpc: '2.0',
        method: 'icx_sendTransaction',
        params: IconConverter.toRawTransaction(txObjBuyBonsai),
        id: 3,
      });
      window.dispatchEvent(
        new CustomEvent('ICONEX_RELAY_REQUEST', {
          detail: {
            type: 'REQUEST_JSON-RPC',
            payload: JSON.parse(requestBuyBonsai),
          },
        })
      );
      props.onClose();
    } else {
      alert('Select the ICX Address');
    }
  };

  return (
    <div>
      {plants.length !== 0 ? (
        <Row gutter={[20, 20]} className='overflow bgc-smoke'>
          {plants.map((item) => {
            return <Item key={item.id} onBuyPlant={() => handleBuyPlant(item)} item={item} />;
          })}
        </Row>
      ) : (
        <div>
          <div className='collection align-center'>
            <strong>No plant in the store</strong>
          </div>
        </div>
      )}
    </div>
  );
}

export default Store;
