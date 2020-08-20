import React from 'react';
import testPot from 'images/pot_empty.png';
import './Middle.css';
import { State } from 'constant';

export default function Plant(props) {
  return (
    <div>
      {!!props.plant && props.plant.state === State.PLANTED ? (
        <div className='plant'>
          <div className='stem'>
            <img src={props.plant.plant_img} alt='' className='plantImg' />
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
