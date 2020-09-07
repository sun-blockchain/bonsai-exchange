import React from 'react';
import { Row, Button } from 'antd';
import { PLANT_STATUS } from 'constant';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'store/actions';

import './style.css';

function PlantCollection({ onClose }) {
  const dispatch = useDispatch();
  // const state = useSelector((state) => state);
  const plants = useSelector((state) =>
    state.plants.filter((item) => item.plantStatus === PLANT_STATUS.PLANTED)
  );

  // const handleTakeOut = (id) => {
  //   dispatch(actions.changePlantStatus(id, PLANT_STATUS.PLANTED));
  //   onClose();
  // };

  const handleMovingPlant = (index) => {
    dispatch(actions.setFirstPlant(index));
    onClose();
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
        {plants.map((item, index) => {
          return (
            <Row key={index} className='bgc-w item'>
              <div className='plant-ava bgc-blue'>
                <img src={item.plantImg} className='plantImg' alt='plant-img' />
              </div>
              <div className='center-ver'>
                <strong>{item.name}</strong> <br />
              </div>
              <div className='colection-button'>
                {item.plantStatus === PLANT_STATUS.PLANTED ? (
                  <Button
                    type='primary'
                    className='margin-left'
                    onClick={() => handleMovingPlant(item.index)}
                  >
                    <strong>Move</strong>
                  </Button>
                ) : (
                  <Button
                    type='primary'
                    className='margin-left'
                    // onClick={() => handleTakeOut(item.id)}
                  >
                    <strong>Plant</strong>
                  </Button>
                )}
                <Button
                  type='primary'
                  className='margin-left'
                  // onClick={() => handleTakeOut(item.id)}
                >
                  <strong>Transfer</strong>
                </Button>
              </div>
            </Row>
          );
        })}
      </div>
    );
  }
}

export default PlantCollection;
