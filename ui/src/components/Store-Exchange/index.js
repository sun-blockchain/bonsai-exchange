import React from 'react';
import { Row } from 'antd';
import { useSelector } from 'react-redux';
import { State } from 'constant';
import Item from 'components/Item';

import './style.css';

function Store(props) {
  const plants = useSelector((state) =>
    state.plants.filter((item) => item.state === State.INSTORE)
  );

  const handleBuyPlant = (item) => {
    const plants = [];
    plants.push(item);
    props.onClose();
  };

  return (
    <div>
      {plants.length !== 0 ? (
        <Row gutter={[20, 20]} className='overflow bgc-smoke'>
          {plants.map((item) => {
            return <Item key={item.plantId} onBuyPlant={() => handleBuyPlant(item)} item={item} />;
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
