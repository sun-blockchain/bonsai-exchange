import React, { useEffect, useState } from 'react';
import { Row, Button } from 'antd';
import { State } from 'constant';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'store/actions';

import './style.css';

function PlantCollection(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const plantInStock = state.plants.filter((item) => item.state === State.INSTOCK);
    setPlants(plantInStock);
  }, [state]);

  const handleTakeOut = (id) => {
    var stockStorage = localStorage.getItem('stock');

    if (!!stockStorage) {
      stockStorage = JSON.parse(stockStorage);
    } else {
      stockStorage = [];
    }
    stockStorage.push(id);
    stockStorage = JSON.stringify(stockStorage);
    localStorage.setItem('stock', stockStorage);
    dispatch(actions.changeStatePursesPlant(id, State.PLANTED));
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
                <img src={item.plant_img} className='plantImg' alt='' />
              </div>
              <div className='center-ver'>
                <strong>{item.name}</strong> <br />
              </div>
              <Button
                type='primary'
                className='bgc-green radius align-center'
                onClick={() => handleTakeOut(item.plantId)}
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
