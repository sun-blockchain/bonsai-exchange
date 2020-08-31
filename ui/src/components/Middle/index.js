import React, { useEffect } from 'react';
import shelfImg from 'images/shelf_side_rotate.png';
import './Middle.css';
import { useSelector, useDispatch } from 'react-redux';
import { PLANT_STATUS, plantsInitArray, plantsInitDic } from 'constant';
import Plant from 'components/Plant';

function Middle() {
  const plantNames = useSelector((state) => state.balanceBonsai);
  const bonsaiNumber = useSelector((state) => state.bonsaiNumber);
  const plantArray = plantsInitArray;
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (plantNames) {
  //     plantNames.forEach((name) => {
  //       if (name in plantsInitDic) {
  //         const plant = plantsInitDic[name];
  //         console.log(plant);
  //         plantArray[plant.id] = plant;
  //       }
  //     });
  //   }
  // }, [bonsaiNumber, dispatch]);

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
        {rowOfPlant(plantArray.slice(0, 4))}
        {rowOfPlant(plantArray.slice(4, 8))}
        {rowOfPlant(plantArray.slice(8, 12))}
      </div>
    </div>
  );
}

export default Middle;
