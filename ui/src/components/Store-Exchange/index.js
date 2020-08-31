import React from 'react';
import { Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { PLANT_STATUS } from 'constant';
import Item from 'components/Item';
import { buyBonsaiIcon } from 'helpers';
import * as actions from 'store/actions';

import './style.css';

function Store(props) {
  const plants = useSelector((state) =>
    state.plants.filter((item) => item.plantStatus === PLANT_STATUS.INSTORE)
  );

  const address = useSelector((state) => state.walletAddress);

  const handleBuyPlant = (item) => {
    buyBonsaiIcon(address, item, props);
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
