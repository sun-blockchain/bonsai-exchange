import React from 'react';
import testPot from 'images/pot_empty.png';
import './Plant.css';
import { PLANT_STATUS, plantsInitArray, plantsInitDic } from 'constant';
import Bubbles from 'components/Animation/Bubbles';

export default function Plant({ plant }) {
  return (
    <div className='flexalign'>
      {!!plant && plant.plantStatus === PLANT_STATUS.PLANTED ? (
        <div className='plant'>
          <div className='stem'>
            <img src={plant.plantImg} alt='' className='plantImg' />
            <Bubbles />
          </div>
          <div className='pot'>
            <img src={testPot} alt='' className='potImg' />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
