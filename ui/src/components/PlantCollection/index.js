import React, { useEffect, useState } from 'react';
import { Row, Button } from 'antd';
import { PLANT_STATUS } from 'constant';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'store/actions';

import './style.css';

function PlantCollection(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const plantInStock = state.plants.filter((item) => item.plantStatus === PLANT_STATUS.INSTOCK);
    setPlants(plantInStock);
  }, [state]);

  const handleTakeOut = (id) => {
    dispatch(actions.changePlantStatus(id, PLANT_STATUS.PLANTED));
    props.onClose();
  };

  if (plants.length === 0) {
    return (
      <div>
        <div className='collection align-center'>
          <strong>No plant in the stock</strong>
        </div>
      </div>
    );
  } else {
    return (
      <div className='collection'>
        {plants.map((item) => {
          return (
            <Row key={item.id} className='bgc-w item'>
              <div className='plantAva bgc-blue'>
                <img src={item.plantImg} className='plantImg' alt='' />
              </div>
              <div className='center-ver'>
                <strong>{item.name}</strong> <br />
              </div>
              <Button
                type='primary'
                className='bgc-green radius align-center'
                onClick={() => handleTakeOut(item.id)}
              >
                <strong>Plant</strong>
              </Button>
            </Row>
          );
        })}
      </div>
    );
  }
}

export default PlantCollection;
