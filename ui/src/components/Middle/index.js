import React from 'react';
import shelfImg from 'images/shelf_side_rotate.png';
import './Middle.css';
import Plant from 'components/Plant';
import { useSelector } from 'react-redux';

function Middle() {
  const plants = useSelector((state) => state.plants);

  const rowOfPlant = (plants) => {
    return (
      <div>
        <div className='row'>
          {plants.map((item, index) => {
            return <Plant key={index} plant={item} />;
          })}
        </div>
        <img className='shelf' src={shelfImg} alt='' />
      </div>
    );
  };

  return (
    <div className='plant-area'>
      <div className='row' />
      <img className='shelf' src={shelfImg} alt='' />
      <div>
        {rowOfPlant(plants.slice(0, 4))}
        {rowOfPlant(plants.slice(4, 8))}
        {rowOfPlant(plants.slice(8, 12))}
      </div>
    </div>
  );
}

export default Middle;
