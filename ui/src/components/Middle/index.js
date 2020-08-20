import React, { useState, useEffect, useRef } from 'react';
import shelfImg from 'images/shelf_side_rotate.png';
import './Middle.css';
import { State } from 'constant';
import { useSelector } from 'react-redux';
import Plant from './Plant';
// import * as actions from 'store/actions';

function Middle() {
  const [plantSpace, setPlantSpace] = useState(new Array(12).fill(null));
  const plants = useRef(
    useSelector((state) => state.plants.filter((item) => item.state === State.PLANTED))
  );

  useEffect(() => {
    const newPlantSpace = new Array(12).fill(null);
    plants.current.map((item) => (newPlantSpace[item.id] = item));
    setPlantSpace(newPlantSpace);
  }, []);

  return (
    <div className='plant-area'>
      <div className='row' />
      <img className='shelf' src={shelfImg} alt='' />
      <div>
        <div className='row'>
          {plantSpace.slice(0, 4).map((item, index) => {
            return <Plant key={index} plant={item} />;
          })}
        </div>
        <img className='shelf' src={shelfImg} alt='' />
        <div className='row'>
          {plantSpace.slice(4, 8).map((item, index) => {
            return <Plant key={index} plant={item} />;
          })}
        </div>
        <img className='shelf' src={shelfImg} alt='' />
        <div className='row'>
          {plantSpace.slice(8, 12).map((item, index) => {
            return <Plant key={index} plant={item} />;
          })}
        </div>
      </div>
      <img className='shelf' src={shelfImg} alt='' />
    </div>
  );
}

export default Middle;
